<?php 

class DocumentKind{
    public function __construct() {
        $this->table_install();
    }

    /**
     * ========= СОЗДАНИЕ ТАБЛИЦЫ ВИДЫ ДОКУМЕНТОВ ========
     */
    protected function table_install()
    {
        global $wpdb;
        global $sec_db_version;
        $table_name = $wpdb->prefix . 'document_kind';
        $charset_collate = $wpdb->get_charset_collate();


        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name tinytext NOT NULL,
            state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        add_option('sec_db_version', $sec_db_version);
    }

    /**
     * ===== ЗАПОЛНЕНИЕ ДАННЫМИ ТАБЛИЦЫ ВИДЫ ЛОКУМЕНТОВ =====
     *
     * @return void
     */
    function install_data()
    {
        global $wpdb;

        $document_kinds = array(
            'технический паспорт ИС',
            'акт классификации ИС',
            'акт категорирования ИС',
            'модель угроз ИС',
            'техническое задание',
            'проектная документация',
            'эксплуатационная документация',
            'организационно-распорядительные документы',
            'результаты анализа уязвимостей',
            'результаты  приемочных испытаний системы',
            'ПМИ аттестационных испытаний',
            'Заключение по аттестации',
            'Протокол по аттестации',
            'Аттестат ИС',
        );

        $table_name = $wpdb->prefix . 'document_kind';
        foreach ($document_kinds as &$value) {
            $wpdb->insert(
                $table_name,
                array(
                    'name' => $value,
                    'state' => 'Active',
                )
            );
        }
    }


    /**
     * ================ ПОЛУЧЕНИЕ ЗАПИСИ ТАБЛИЦЫ ВИДЫ ДОКУМЕНТОВ =================
     */
    public function secure_load_document_kind(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( "SELECT * FROM sec_document_kind", ARRAY_A ); 
        echo json_encode($results);
        wp_die();
    }

    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ВИД ДОКУМЕНТА ======================
     */
    function secure_add_document_kind(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        $wpdb->insert(
            'sec_document_kind',
            array(
                'name' => $record['name'],
                'state' => $record['state'] 
            ),
            array(
                '%s', '%s'
            )
        );
        wp_die();
    }

    /** 
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ВИД ДОКУМЕНТА ==========================
     */
    function secure_update_document_kind(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix . 'document_kind',
            array(
                'name' => $record['name'],
                'state' => $record['state']	
            ),
            array( 'ID' => $record['id'] ),
            array(
                '%s',	
                '%s'
            ),
            array( '%d' )
        );
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
        wp_die();
    }

    /**
     * ================ ВИДЫ ДОКУМЕНТОВ. ОБЩИЙ ПОИСК =================
     */
    function secure_search_document_kind(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $results = $wpdb->get_results( "SELECT * FROM sec_document_kind 
            WHERE name LIKE '%$value%'", ARRAY_A );
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= ВИДЫ ДОКУМЕНТОВ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_document_kind_extended(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $name = $_POST['name'];
        $state = $_POST['state'];
        $results = $wpdb->get_results( "SELECT * FROM sec_document_kind 
            WHERE name LIKE '%$name%' AND state='$state'", ARRAY_A );
        echo json_encode($results);
        wp_die();
    }

}
?>