<?php

class Document
{
    protected $table_name;
    public function __construct()
    {
        $this->table_name = 'document';
    }

    /**
     * ========= СОЗДАНИЕ ТАБЛИЦЫ ДОКУМЕНТЫ И ТАЛИЦЫ ДЛЯ СВЯЗИ С ТАБЛИЦЕЙ ИНФОРМАЦИОННЫЕ СИСТЕМЫ ========
     */
    public function table_install()
    {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'document';

        // Запрос на создание таблицы Документы
        $document_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            number tinytext,
            documentdate date,
            name text NOT NULL,
            kind mediumint(9),
            type varchar(9),
            sender mediumint(9),
            correspondent mediumint(9),
            sendreceive date,
            signer tinytext,
            signed boolean,
            state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY (kind) REFERENCES {$wpdb->prefix}document_kind(id),
            FOREIGN KEY (sender) REFERENCES {$wpdb->prefix}organization(id),
            FOREIGN KEY (correspondent) REFERENCES {$wpdb->prefix}organization(id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($document_sql);

        // Запрос на создание таблицы Версии документов
        $table_name = $wpdb->prefix . 'document_version';
        $document_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            document mediumint(9),
            versiondate date,
            version_number smallint,
            version_title tinytext, 
            type tinytext,
            filepath text,
            state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY (document) REFERENCES {$wpdb->prefix}document(id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($document_sql);
    }

    /**
     * ===== ЗАПОЛНЕНИЕ ДАННЫМИ ТАБЛИЦЫ ДОКУМЕНТЫ =====
     *
     * @return void
     */
    function install_data()
    {
        global $wpdb;


        $table_name = $wpdb->prefix . 'document';
        $wpdb->insert(
            $table_name,
            array(
                'number' => 'ИХ.01-20333/15',
                'documentdate' => '2023-02-04',
                'name' => 'Уведомление о прохождении аттестации',
                'kind' => 15,
                'type' => 'Inbox',
                'sender' => 1,
                'correspondent' => 1,
                'sendreceive' => '2023-02-01',
                'signer' => 'Васильев Олег Петрович',
                'signed' => 1,
                'state' => 'Active'

            ),
            array(
                '%s', // number
                '%s', // documentdate
                '%s', // name
                '%d', // kind
                '%s', // type
                '%d', // sender
                '%d', // correspondent
                '%s', // sendreceive
                '%s', // signer
                '%d', // signed
                '%s', // state
            )
        );

        $wpdb->insert(
            $table_name,
            array(
                'number' => '25-П-456',
                'documentdate' => '2023-03-05',
                'name' => 'Уведомление об исправлении ощибок',
                'kind' => 15,
                'type' => 'Outbox',
                'sender' => 1,
                'correspondent' => 1,
                'sendreceive' => '2023-03-04',
                'signer' => 'Пучков Николай Анатольевич',
                'signed' => 1,
                'state' => 'Active'

            ),
            array(
                '%s', // number
                '%s', // documentdate
                '%s', // name
                '%d', // kind
                '%s', // type
                '%d', // sender
                '%d', // correspondent
                '%s', // sendreceive
                '%s', // signer
                '%d', // signed
                '%s', // state
            )
        );
        $table_name = $wpdb->prefix . 'document_version';
        $wpdb->insert(
            $table_name,
            array(
                'document' => 1,
                'versiondate' => 123,
                'version_number' => 1,
                'version_title' => 'Версия 1',
                'type' => 'application/pdf',
                'filepath' => ''
            ),
            array(
                '%d', // document
                '%s', // versiondate
                '%d', // version_number
                '%s', // version_title
                '%s', // type
                '%s'  // filepath
            )
        );
    }


    /**
     * ================ ПОЛУЧЕНИЕ ЗАПИСЕЙ ТАБЛИЦЫ ДОКУМЕНТЫ =================
     */
    public function secure_load_document()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT document.id, document.number, document.documentdate, document.name, document_kind.name as document_kind, document.state  FROM {$prefix}document document 
            LEFT JOIN {$prefix}document_kind document_kind on document.kind = document_kind.id"),
            ARRAY_A
        );
        echo json_encode($results);
        wp_die();
    }

    /**
     * ============================ ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ===============================
     */
    public function secure_load_card_data($document_id)
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT document.id, document.number, document.documentdate, 
            document.name, document.type, document.sendreceive, document.signer, document.signed, document.state, 
            document_kind.id as document_kind_id, document_kind.name document_kind_name, 
            sender.id as sender_id, sender.fullname as sender_name,
            correspondent.id as correspondent_id, correspondent.fullname as correspondent_name 
            FROM {$prefix}document document 
            LEFT JOIN {$prefix}document_kind document_kind on document.kind = document_kind.id 
            LEFT JOIN {$prefix}organization sender on document.sender = sender.id
            LEFT JOIN {$prefix}organization correspondent on document.correspondent = correspondent.id 
            WHERE document.id = $document_id"),
            OBJECT
        );
        $document_versions = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}document_version WHERE document = $document_id"), OBJECT);
        $results = (object) array_merge( (array)$results, array( 'document_versions' => $document_versions ));
        return $results;
        wp_die();
    }

    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ДОКУМЕНТА ======================
     */
    function secure_add_document()
    {

        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
            $wpdb->insert(
                $prefix . 'document',
                array(
                    'number' => $record['number'],
                    'documentdate' => $record['documentdate'],
                    'name' => $record['name'],
                    'kind' => $record['kind'] == ''? null : $record['kind'],
                    'type' => $record['type'],
                    'sender' => $record['sender'] == ''? null : $record['sender'],
                    'correspondent' => $record['correspondent']  == ''? null : $record['correspondent'],
                    'sendreceive' => $record['sendreceive'],
                    'signer' => $record['signer'],
                    'signed' => $record['signed'],
                    'state' => 'Active'
    
                ),
                array(
                    '%s', // number
                    '%s', // documentdate
                    '%s', // name
                    '%d', // kind
                    '%s', // type
                    '%d', // sender
                    '%d', // correspondent
                    '%s', // sendreceive
                    '%s', // signer
                    '%d', // signed
                    '%s', // state
                )
            ) or wp_die($wpdb->last_error,'Ошибка', array('response' => 500));
        $id = $wpdb->insert_id;


        echo 'Запись добавлена ИД=' . $id;
        wp_die();
    }

    /** 
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ДОКУМЕНТ ==========================
     */
    function secure_update_document()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix . 'document',
            array(
                'number' => $record['number'],
                'documentdate' => $record['documentdate'],
                'name' => $record['name'],
                'kind' => $record['kind'] == ''? null : $record['kind'],
                'type' => $record['type'],
                'sender' => $record['sender'] == ''? null : $record['sender'],
                'correspondent' => $record['correspondent']  == ''? null : $record['correspondent'],
                'sendreceive' => $record['sendreceive'],
                'signer' => $record['signer'],
                'signed' => $record['signed'],
                'state' => 'Active'
            ),
            array('ID' => $record['id']),
            array(
                '%s', // number
                '%s', // documentdate
                '%s', // name
                '%d', // kind
                '%s', // type
                '%d', // sender
                '%d', // correspondent
                '%s', // sendreceive
                '%s', // signer
                '%d', // signed
                '%s', // state
            ),
            array('%d')
        ) or wp_die($wpdb->last_error,'Ошибка', array('response' => 500));


        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
        wp_die();
    }
    /** 
     * ====================== УДАЛЕНИЕ ЗАПИСИ ДОКУМЕНТ ==========================
     */
    public function secure_delete_document()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $document_id = $_POST['id'];

        // Удаляем запись Документ
        $wpdb->delete($prefix . 'document', array('ID' => $document_id), array('%d'))
            or wp_die($wpdb->last_error,'Ошибка', array('response' => 500));
        echo 'Запись ид = ' . $_POST['id'] . ' успешно удалена';
        wp_die();
    }

    /**
     * ================ ДОКУМЕНТЫ. ОБЩИЙ ПОИСК =================
     */
    function secure_search_document()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $wild = '%';
        $like = $wild . $wpdb->esc_like($value) . $wild;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT document.id, document.number, document.documentdate, document.name, document_kind.name as document_kind, document.state  FROM {$prefix}document document 
            JOIN {$prefix}document_kind document_kind on document.kind = document_kind.id
            WHERE document.number LIKE %s
            OR document.documentdate LIKE %s
            OR document.name LIKE %s
            OR document_kind.name LIKE %s
            ", array($like, $like, $like, $like)),
            ARRAY_A
        );
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= ДОКУМЕНТЫ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_document_extended()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;

        $number             =   $_POST['number'];
        $documentdate       =   $_POST['documentdate'];
        $name               =   $_POST['name'];
        $kind_id            =   $_POST['kind_id'];
        $type               =   $_POST['type'];
        $sender_id          =   $_POST['sender_id'];
        $sendreceive        =   $_POST['sendreceive'];
        $signer             =   $_POST['signer'];
        $signed             =   $_POST['signed'];
        $state              =   $_POST['state'];

        $wild = '%';
        $like_number        =   $wild . $wpdb->esc_like($number) . $wild;
        $like_documentdate  =   $wild . $wpdb->esc_like($documentdate) . $wild;
        $like_name          =   $wild . $wpdb->esc_like($name) . $wild;
        $like_sendreceive   =   $wild . $wpdb->esc_like($sendreceive) . $wild;
        $like_signer        =   $wild . $wpdb->esc_like($signer) . $wild;

        $kind_query         =   $kind_id != '' ? " AND document_kind.id  ='$kind_id'" : '';
        $type_query         =   $type != '' ? " AND document.type = '$type'" : '';
        $sender_query       =   $sender_id != '' ? " AND organization.id = '$sender_id'" : '';
        $signed_query       =   $signed != '' ? " AND document.signed  ='$signed'" : '';
        $state_query        =   $state != '' ? " AND document.state  ='$state'" : '';

        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT document.id, document.number, document.documentdate, document.name, document_kind.name as document_kind, document.state  
            FROM {$prefix}document document 
            JOIN {$prefix}document_kind document_kind on document.kind = document_kind.id
            JOIN {$prefix}organization organization on document.sender = organization.id
            WHERE document.number LIKE %s AND document.documentdate LIKE %s AND document.name LIKE %s 
            AND document.sendreceive LIKE %s AND document.signer LIKE %s 
            $kind_query $type_query $sender_query $signed_query $state_query",
                array($like_number, $like_documentdate, $like_name, $like_sendreceive, $like_signer)
            ),
            ARRAY_A
        );
        echo json_encode($results);
        wp_die();
    }
}
