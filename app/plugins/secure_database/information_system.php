<?php 

class InformationSystem{
    public function __construct() {
        $this->table_install();
    }

    /**
     * ========= СОЗДАНИЕ ТАБЛИЦЫ ИНФОРМАЦИОННЫЕ СИСТЕМЫ ========
     */
    protected function table_install()
    {
        global $wpdb;
        global $sec_db_version;
        $table_name = $wpdb->prefix . 'information_system';
        $charset_collate = $wpdb->get_charset_collate();


        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            fullname text NOT NULL,
            briefname tinytext,
            certified boolean,
            certifydate date,
            scope varchar(13),
            significancelevel varchar(2),
            commissioningdate date,
            hasremark boolean,
            state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        add_option('sec_db_version', $sec_db_version);
    }

    /**
     * ===== ЗАПОЛНЕНИЕ ДАННЫМИ ТАБЛИЦЫ ИНФОРМАЦИОННЫЕ СИСТЕМЫ =====
     *
     * @return void
     */
    function install_data()
    {
        global $wpdb;


        $table_name = $wpdb->prefix . 'information_system';
        $wpdb->insert(
            $table_name,
            array(
                'fullname' => 'Автоматизированная система электронного документооборота органов исполнительной государственной власти',
                'briefname' => 'АСЭД ОИГВО',
                'certified' => true,
                'certifydate' => '2022-01-02',
                'scope' => 'corporate',
                'significancelevel' => 'k1',
                'commissioningdate' => '2023-02-03',
                'hasremark' => true,
                'state' => 'Active',
            )
        );
    }


    /**
     * ================ ПОЛУЧЕНИЕ ЗАПИСИ ТАБЛИЦЫ ИНФОРМАЦИОННЫЕ СИСТЕМЫ =================
     */
    public function secure_load_information_system(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( "SELECT * FROM sec_information_system", ARRAY_A ); 
        echo json_encode($results);
        wp_die();
    }

    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ИНФОРМАЦИОННАЯ СИСТЕМА ======================
     */
    function secure_add_information_system(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        print_r($record['hasremark']);
        $wpdb->insert(
            'sec_information_system',
            array(
                'fullname' => $record['fullname'],
                'briefname' => $record['briefname'],
                'significancelevel' => $record['significancelevel'],
                'scope' => $record['scope'],
                'certified' => $record['certified'] ? 1 : 0,
                'certifydate' => $record['certifydate'],
                'hasremark' => $record['hasremark'],
                'commissioningdate' => $record['commissioningdate'],
                /*'state' => $record['state']*/
            ),
            array(
                '%s', 
                '%s',
                '%s',
                '%s',
                '%d',
                '%s',
                '%d',
                /*'%s',
                '%s'*/
            )
        );
        wp_die();
        echo 'Запись добавлена';
    }

    /** 
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ИНФОРМАЦИОННАЯ СИСТЕМА ==========================
     */
    function secure_update_information_system(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix . 'information_system',
            array(
                'fullname' => $record['fullname'],
                'briefname' => $record['briefname'],
                'significancelevel' => $record['significancelevel'],
                'scope' => $record['scope'],
                'certified' => $record['certified'],
                'certifydate' => $record['certifydate'],
                'hasremark' => $record['hasremark'],
                'commissioningdate' => $record['commissioningdate'],
                'state' => $record['state'], 
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
     * ================ ИНФОРМАЦИОННЫЕ СИСТЕМЫ. ОБЩИЙ ПОИСК =================
     */
    function secure_search_information_system(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $results = $wpdb->get_results( "SELECT * FROM sec_information_system 
            WHERE name LIKE '%$value%'", ARRAY_A );
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= ИНФОРМАЦИОННЫЕ СИСТЕМЫ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_information_system_extended(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $name = $_POST['name'];
        $state = $_POST['state'];
        $results = $wpdb->get_results( "SELECT * FROM sec_information_system 
            WHERE name LIKE '%$name%' AND state='$state'", ARRAY_A );
        echo json_encode($results);
        wp_die();
    }

}
?>