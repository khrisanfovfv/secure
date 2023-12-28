<?php 

class Department{
    protected $table_name;
    public function __construct() {
        $this->table_name = 'department';
    }

    /**
     * ========= СОЗДАНИЕ ТАБЛИЦЫ ОТДЕЛЫ ========
     */
    public function table_install()
    {
        global $wpdb;
        global $sec_db_version;
        $table_name = $wpdb->prefix . 'department';
        $charset_collate = $wpdb->get_charset_collate();


        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name text NOT NULL,
            organization_id mediumint(9) NOT NULL,
            boss tinytext,
            FOREIGN KEY (organization_id) REFERENCES {$wpdb->prefix}organization(id),
            state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        add_option('sec_db_version', $sec_db_version);
    }

    /**
     * ===== ЗАПОЛНЕНИЕ ДАННЫМИ ТАБЛИЦЫ ОТДЕЛЫ =====
     *
     * @return void
     */
    function install_data()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'department';

        $wpdb->insert(
            $table_name,
            array(
                'name' => 'Отдел защиты информации',
                'organization_id' => 1,
                'boss' => 'Трошев Андрей Валериевич',
                'state' => 'Active',
            ),
            array(
                '%s', // name
                '%d', // organization
                '%s', // boss
                '%s'  // state
            )
            );
    }


    /**
     * ================ ПОЛУЧЕНИЕ ЗАПИСЕЙ ТАБЛИЦЫ ОТДЕЛЫ =================
     */
    public function secure_load_department(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}department", ARRAY_A )); 
        echo json_encode($results);
        wp_die();
    }

    /**
     * ============================ ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ===============================
     */
     public function secure_load_card_data($id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}department WHERE id = %s", $id), OBJECT );
        return $results;
        wp_die();
     }

     /**
     * ЗАГРУЗКА ДАННЫХ КАРТОЧКИ. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ
     */
    protected function secure_select_data_card($table_name, $id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}{$table_name} WHERE id = $id"), OBJECT );
        return $results;
        wp_die();
    }


    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ОТДЕЛ ======================
     */
    function secure_add_department(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        $wpdb->insert(
            'sec_department',
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
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ОТДЕЛ ==========================
     */
    function secure_update_department(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix . 'department',
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
    function secure_search_department(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $wild = '%';
        $like = $wild . $wpdb->esc_like($value) .$wild;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}department 
            WHERE name LIKE %s",$like), ARRAY_A);
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= ВИДЫ ДОКУМЕНТОВ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_department_extended(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $name = $_POST['name'];
        $state = $_POST['state'];
        $wild = '%';
        $like_name = $wild . $wpdb->esc_like($name) .$wild;        
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}department 
            WHERE name LIKE %s AND state= %s",array($like_name, $state)), ARRAY_A 
        );
        echo json_encode($results);
        wp_die();
    }

}
?>