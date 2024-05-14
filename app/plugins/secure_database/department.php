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
        // Считываем значение фильтра
        $wild = '%';
        $like_name = $wild . $wpdb->esc_like($_POST['fname']) . $wild;
        $like_organization = $wild . $wpdb->esc_like($_POST['forganization']) . $wild;
        $like_boss = $wild . $wpdb->esc_like($_POST['fboss']) . $wild;

        $state_query = '';
        if ($_POST['fstate'] !=='') {
            $state_query = " AND department.state = '" . $_POST['fstate'] . "'"; 
        }
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT department.id, department.name, organization.fullname as organization_name, department.boss, department.state 
            FROM {$prefix}department department 
            JOIN {$prefix}organization organization on department.organization_id = organization.id
            WHERE department.name LIKE %s AND organization.fullname LIKE %s AND department.boss LIKE %s $state_query",
                array($like_name, $like_organization, $like_boss)), ARRAY_A ); 
            if ($wpdb->last_error){
                wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
            }
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
            $wpdb->prepare("SELECT department.id, department.name, organization.id as organization_id, organization.fullname as organization_name, department.boss, department.state FROM {$prefix}department department JOIN {$prefix}organization organization on department.organization_id = organization.id
            WHERE department.id = %d", $id), OBJECT );
        return $results;
        wp_die();
     }

     /**
     * ЗАГРУЗКА ДАННЫХ КАРТОЧКИ. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ
     */
    /* protected function secure_select_data_card($table_name, $id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}{$table_name} WHERE id = $id"), OBJECT );
        return $results;
        wp_die();
    } */


    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ОТДЕЛА ======================
     */
    function secure_add_department(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        $wpdb->insert(
            $prefix . 'department',
            array(
                'name' => $record['name'],
                'organization_id' => $record['organization_id'],
                'boss' => $record['boss'],
                'state' => $record['state']
            ),
            array(
                '%s', // name
                '%d', // organization_id
                '%s', // boss
                '%s'  // state
            )
        );
        wp_die();
    }

    /**
     * ==================== УДАЛЕНИЕ ЗАПИСИ ОТДЕЛА ======================
     */
    function secure_delete_department(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $department_id = $_POST['id'];
        
        // Удаляем запись отдел
        $wpdb->delete( $prefix.'department', array( 'ID' => $department_id ), array( '%d' ));
        echo 'Запись ид = ' . $_POST['id'] . ' успешно удалена';
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
                'organization_id' => $record['organization_id'],
                'boss' => $record['boss'],
                'state' => $record['state']
            ),
            array( 'ID' => $record['id'] ),
            array(
                '%s', // name
                '%d', // organization_id
                '%s', // boss
                '%s'  // state
            ),
            array( '%d' )
        );
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
        wp_die();
    }

    /**
     * ================ ОТДЕЛЫ. ОБЩИЙ ПОИСК =================
     */
    function secure_search_department(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $wild = '%';
        $like = $wild . $wpdb->esc_like($value) .$wild;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT department.id, department.name, organization.fullname as organization_name, department.boss, department.state FROM {$prefix}department department JOIN {$prefix}organization organization on department.organization_id = organization.id 
            WHERE department.name LIKE %s 
            OR organization.fullname LIKE %s
            OR department.boss LIKE %s
            ", array($like, $like, $like)), ARRAY_A);
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= ОТДЕЛЫ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_department_extended(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $name = $_POST['name'];
        $organization_id = $_POST['organization_id'];
        $boss = $_POST['boss'];
        $state = $_POST['state'];
        $wild = '%';
        $like_name = $wild . $wpdb->esc_like($name) .$wild;
        $organization_query = $organization_id != '' ? "organization.id='$organization_id' AND" : '';
        $like_boss = $wild . $wpdb->esc_like($boss) .$wild;
        $state_query = $state !='' ? "AND department.state='$state'" : '';        
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT department.id, department.name, organization.fullname as organization_name, department.boss, department.state FROM {$prefix}department department 
            JOIN {$prefix}organization organization on department.organization_id = organization.id
            WHERE department.name LIKE %s AND $organization_query department.boss LIKE %s $state_query", array($like_name, $like_boss)), ARRAY_A 
    
        );
        echo json_encode($results);
        wp_die();
    }

}
?>