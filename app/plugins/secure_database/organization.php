<?php

class Organization
{
    protected $table_name;
    public function __construct()
    {
        $this->table_name = 'organization';
    }

    /**
     * ========= СОЗДАНИЕ ТАБЛИЦЫ ВИДЫ ДОКУМЕНТОВ ========
     */
    public function table_install()
    {
        global $wpdb;
        global $sec_db_version;
        $table_name = $wpdb->prefix . 'organization';
        $charset_collate = $wpdb->get_charset_collate();


        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            fullname text NOT NULL,
            briefname tinytext,
            inn varchar(10),
            okpo varchar(8),
            kpp varchar(9),
            ogrn varchar(13),
            postAddress text,
            legalAddress text,
            email tinytext,
            boss tinytext,
            state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        //add_option('sec_db_version', $sec_db_version);
    }

    /**
     * ===== ЗАПОЛНЕНИЕ ДАННЫМИ ТАБЛИЦЫ ОРГАНИЗАЦИИ =====
     *
     * @return void
     */
    function install_data()
    {
        global $wpdb;

        $table_name = $wpdb->prefix . 'organization';
        $wpdb->insert(
            $table_name,
            array(
                'fullname' => 'Бюджетное учреждение в сфере информационных технологий Вологодской области "Центр информационных технологий"',
                'briefname' => 'БУ ВО "ЦИТ"',
                'inn' => '3525249297',
                'okpo' => '66756691',
                'ogrn' => '',
                'kpp' => '352501001',
                'postAddress' => '160000, Вологодская область, город Вологда, ул. Герцена, д.27',
                'legalAddress' => '160000, Вологодская область, город Вологда, ул. Герцена, д.27',
                'email' => 'cit@cit.gov35.ru',
                'boss' => 'Пучков Николай Анатольевич',
                'state' => 'Active',
            ),
            array(
                '%s', // fullname
                '%s', // briefname
                '%s', // inn
                '%s', // okpo
                '%s', // kpp  
                '%s', // ogrn             
                '%s', // postAddress
                '%s', // legalAddress
                '%s', // email
                '%s', // boss
                '%s'  // state
            )
        );
    }


    /**
     * ================ ПОЛУЧЕНИЕ ЗАПИСЕЙ ТАБЛИЦЫ ВИДЫ ДОКУМЕНТОВ =================
     */
    public function secure_load_organization()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}organization", ARRAY_A)
        );
        echo json_encode($results);
        wp_die();
    }

    /**
     * ============================ ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ===============================
     */
    public function secure_load_card_data($id)
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}organization WHERE id = %s", $id),
            OBJECT
        );
        return $results;
        wp_die();
    }

    /**
     * ЗАГРУЗКА ДАННЫХ КАРТОЧКИ. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ
     */
    protected function secure_select_data_card($table_name, $id)
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}{$table_name} WHERE id = $id"),
            OBJECT
        );
        return $results;
        wp_die();
    }


    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ВИД ДОКУМЕНТА ======================
     */
    function secure_add_organization()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        $wpdb->insert(
            $prefix . 'organization',
            array(
                'fullname' => $record['fullname'],
                'briefname' => $record['briefname'],
                'boss' => $record['boss'],
                'inn' => $record['inn'],
                'kpp' => $record['kpp'],
                'ogrn' => $record['ogrn'],
                'okpo' => $record['okpo'],
                'postAddress' => $record['postAddress'],
                'legalAddress' => $record['legalAddress'],
                'email' => $record['email'],
                'state' => $record['state']
            ),
            array(
                '%s', // fullname
                '%s', //briefName
                '%s', //boss
                '%s', // inn
                '%s', // kpp
                '%s',  // ogrn
                '%s', // okpo
                '%s', // postAddress
                '%s', // legalAddress
                '%s', // email
                '%s'  // state
            )
        );
        wp_die();
    }

    /** 
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ВИД ДОКУМЕНТА ==========================
     */
    function secure_update_organization()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix . 'organization',
            array(
                'fullname' => $record['fullname'],
                'briefname' => $record['briefname'],
                'boss' => $record['boss'],
                'inn' => $record['inn'],
                'kpp' => $record['kpp'],
                'ogrn' => $record['ogrn'],
                'okpo' => $record['okpo'],
                'postAddress' => $record['postAddress'],
                'legalAddress' => $record['legalAddress'],
                'email' => $record['email'],
                'state' => $record['state']
            ),
            array('ID' => $record['id']),
            array(
                '%s', // fullname
                '%s', //briefName
                '%s', //boss
                '%s', // inn
                '%s', // kpp
                '%s',  // ogrn
                '%s', // okpo
                '%s', // postAddress
                '%s', // legalAddress
                '%s', // email
                '%s'  // state
            ),
            array('%d')
        );
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
        wp_die();
    }

     /** 
     * ====================== УДАЛЕНИЕ ЗАПИСИ Организации ==========================
     */
    function secure_delete_organization(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $organization_id = $_POST['id'];
        
        // Удаляем запись Организации
        $wpdb->delete( $prefix.'organization', array( 'ID' => $organization_id ), array( '%d' ));
        echo 'Запись ид = ' . $_POST['id'] . ' успешно удалена';
        wp_die();
    }

    /**
     * ================ ВИДЫ ДОКУМЕНТОВ. ОБЩИЙ ПОИСК =================
     */
    function secure_search_organization()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $wild = '%';
        $like = $wild . $wpdb->esc_like($value) . $wild;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}organization 
            WHERE name LIKE '%s'", $like),
            ARRAY_A
        );
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= ВИДЫ ДОКУМЕНТОВ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_organization_extended()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $name = $_POST['name'];
        $state = $_POST['state'];
        $wild = '%';
        $like_name = $wild . $wpdb->esc_like($name);
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}organization 
            WHERE name LIKE '%s' AND state=%s", array($like_name, $state)),
            ARRAY_A
        );
        echo json_encode($results);
        wp_die();
    }
}
