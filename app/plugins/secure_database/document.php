<?php 

class Document{
    protected $table_name;
    public function __construct() {
        $this->table_name = 'administrator';
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
            version mediumint(9),
            sender mediumint(9),
            sendreceive date,
            signer tinytext,
            signed boolean,
            state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY (kind) REFERENCES {$wpdb->prefix}document_kind(id)
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
                'kind' => 15
            ),
            array(
                '%s', // number
                '%s', // documentdate
                '%s', // name
                '%d'  // kind
            )

        );




    }


    /**
     * ================ ПОЛУЧЕНИЕ ЗАПИСИ ТАБЛИЦЫ ДОКУМЕНТЫ =================
     */
    public function secure_load_document(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT administrator.id, administrator.fullname, organization.fullname as organization_name, department.name as department_name, administrator.state FROM {$prefix}administrator administrator 
            JOIN {$prefix}organization organization on administrator.organization = organization.id 
            JOIN {$prefix}department department on administrator.department = department.id"), ARRAY_A );
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
            $wpdb->prepare("SELECT administrator.id, administrator.fullname,organization.id as organization_id, organization.fullname as organization_name, department.id as department_id, department.name as department_name, administrator.state FROM {$prefix}administrator administrator 
            JOIN {$prefix}organization organization on administrator.organization = organization.id 
            JOIN {$prefix}department department on administrator.department = department.id 
            WHERE administrator.id = $id"), OBJECT );
        $information_system_administrator = $wpdb->get_results(
            $wpdb->prepare("SELECT inf_sys_adm.id,inf_sys_adm.information_system_id, inf_sys.fullname as information_system_name , inf_sys_adm.appointdate, inf_sys_adm.terminatedate, inf_sys_adm.type 
            FROM {$prefix}information_system_administrator inf_sys_adm 
            JOIN {$prefix}information_system inf_sys on inf_sys_adm.information_system_id = inf_sys.id            
            WHERE administrator_id = $id"), OBJECT);
            $results = (object) array_merge( (array)$results, array( 'information_systems' => $information_system_administrator ));
        return $results;
        wp_die();
     }

    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ДОКУМЕНТА ======================
     */
    function secure_add_administrator(){

        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        
        $wpdb->insert(
            $prefix.'administrator',
            array(
                'fullname' => $record['fullname'],
                'organization' => $record['organization_id'],
                'department' => $record['department_id'],
                'state' => $record['state'],
            ),
            array(
                '%s', // fullname
                '%d', // organization
                '%d', // department
                '%s'  // state
            )
        );
        $id = $wpdb->insert_id;

        // Создаем записи в детальном разделе Информационные системы
        // Убираем символы экранирования '/'
        $information_systems_json = stripcslashes($record['information_systems']);
        $information_systems = json_decode( $information_systems_json);
        foreach ($information_systems as $information_system ){
            $information_system->administrator_id = $id;
            if ($information_system->id == ''){
                // Запись не удалена
                if ($information_system->is_deleted == 0){
                    Document::secure_create_information_system($information_system);
                }
            } else{
                // Запись не удаена
                if ($information_system->is_deleted == 0){
                    Document::secure_update_information_system($information_system);
                }
                // Запись удалена
                else{
                    Document::secure_delete_information_system($information_system);
                } 
            }
        }

        echo 'Запись добавлена ИД=' . $id; 
        wp_die();
    }

    /** 
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ДОКУМЕНТ ==========================
     */
    function secure_update_administrator(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix.'administrator',
            array(
                'fullname' => $record['fullname'],
                'organization' => $record['organization_id'],
                'department' => $record['department_id'],
                'state' => $record['state'],
            ),
            array( 'ID' => $record['id'] ),
            array(
                '%s', // fullname
                '%d', // organization
                '%d', // department
                '%s'  // state
            ),
            array( '%d' )
        );

        $information_systems_json = stripcslashes($record['information_systems']);
        $information_systems = json_decode($information_systems_json);
        // Цикл по информационным системам
        foreach($information_systems as $information_system){
            if ($information_system->id == ''){
                // Запись не удалена
                if ($information_system->is_deleted == 0){
                    Document::secure_create_information_system($information_system);
                }
            } else{
                // Запись не удаена
                if ($information_system->is_deleted == 0){
                    Document::secure_update_information_system($information_system);
                }
                // Запись удалена
                else{
                    Document::secure_delete_information_system($information_system);
                } 
            }
        }
        
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
        wp_die();
    }
    /** 
     * ====================== УДАЛЕНИЕ ЗАПИСИ ДОКУМЕНТ ==========================
     */
    public function secure_delete_administrator(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $administrator_id = $_POST['id'];
        
        // Удаляем связанные записи из таблицы information_system_administrator
        $information_systems = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}information_system_administrator WHERE administrator_id = %d", Array($administrator_id)), OBJECT );
        foreach($information_systems as $information_system){
            Document::secure_delete_information_system($information_system);
        }
        // Удаляем запись Документ
        $wpdb->delete( $prefix.'administrator', array( 'ID' => $administrator_id ), array( '%d' ));
        echo 'Запись ид = ' . $_POST['id'] . ' успешно удалена';
        wp_die();
    }

    /**
     * ============== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. СОЗДАНИЕ ЗАПИСИ ==============
     */
    public function secure_create_information_system($information_system){
        global $wpdb;
        $table_name = $wpdb->prefix . 'information_system_administrator';
        $wpdb->insert(
            $table_name,
            array(
                'information_system_id' => $information_system->information_system_id,
                'administrator_id' => $information_system->administrator_id,
                'appointdate' => $information_system->appointdate,
                'terminatedate' => $information_system->terminatedate,
                'type' => $information_system->type,
            ),
            array(
                '%d', // information_system_id
                '%d', // administrator_id
                '%s', // appointdate
                '%s', // terminatedate
                '%s'  // type   
            )
        );
    }
    /**
     * ============== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. РЕДАКТИРОВАНИЕ ЗАПИСИ ==============
     */
    public function secure_update_information_system($information_system){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $wpdb->update(
            $prefix.'information_system_administrator',
            array(
                'information_system_id' => $information_system->information_system_id,
                'administrator_id' => $information_system->administrator_id,
                'appointdate' => $information_system->appointdate,
                'terminatedate' => $information_system->terminatedate,
                'type' => $information_system->type,
            ),
            array( 'ID' => $information_system->id ),
            array(
                '%d', // information_system_id
                '%d', // administrator_id
                '%s', // appointdate
                '%s', // terminatedate
                '%s'  // type   
            ),
            array( '%d' )
        );
    }
    /**
     * ============== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. УДАЛЕНИЕ ЗАПИСИ ==============
     */
    public function secure_delete_information_system($information_system){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $wpdb->delete( $prefix . 'information_system_administrator', array( 'ID' => $information_system->id ), array( '%d' ));
        echo 'Запись ид = ' . $information_system->id . ' успешно удалена';
        wp_die();
    }

    /**
     * ============== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. ОБНОВЛЕНИЕ ДЕТАЛЬНОГО РАЗДЕЛА ==============
     */
    public function secure_load_administrator_information_systems(){
        global $wpdb;
        $prefix = $wpdb->prefix;

            $administrator_id = $_POST['administrator_id'];
            $results = $wpdb->get_results( 
                $wpdb->prepare("SELECT inf_sys_adm.id, inf_sys_adm.information_system_id, information_system.fullname as information_system_name, inf_sys_adm.appointdate, inf_sys_adm.terminatedate, inf_sys_adm.type FROM {$prefix}information_system_administrator inf_sys_adm
                    JOIN  {$prefix}information_system information_system on inf_sys_adm.information_system_id = information_system.id
                    WHERE inf_sys_adm.administrator_id = $administrator_id"), ARRAY_A ); 
        echo json_encode($results);
        wp_die();
    }


    /**
     * ================ ДОКУМЕНТЫ. ОБЩИЙ ПОИСК =================
     */
    function secure_search_administrator(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $wild = '%';
        $like = $wild . $wpdb->esc_like($value) .$wild;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT administrator.id, administrator.fullname, organization.fullname as organization_name, department.name as department_name, administrator.state FROM {$prefix}administrator administrator 
            JOIN {$prefix}organization organization on administrator.organization = organization.id 
            JOIN {$prefix}department department on administrator.department = department.id 
            WHERE administrator.fullname LIKE %s
            OR organization.fullname LIKE '%s'
            OR department.name LIKE '%s'
            ",array($like,$like, $like)), ARRAY_A); 
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= ИНФОРМАЦИОННЫЕ СИСТЕМЫ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_administrator_extended(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $fullname  = $_POST['fullname'];
        $organization_id = $_POST['organization_id'];
        $department_id  = $_POST['department_id'];
        $state = $_POST['state'];
        $wild = '%';
        $like_fullname = $wild . $wpdb->esc_like($fullname) .$wild;
        $organization_query = $organization_id != '' ? " AND organization.id ='$organization_id'" : '';
        $department_query = $department_id != '' ? " AND department.id = '$department_id'" : '';
        $state_query = $state != '' ? " AND administrator.state = '$state'" : '';  
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT administrator.id, administrator.fullname, organization.fullname as organization_name, department.name as department_name, administrator.state FROM {$prefix}administrator administrator 
            JOIN {$prefix}organization organization on administrator.organization = organization.id 
            JOIN {$prefix}department department on administrator.department = department.id
            WHERE administrator.fullname LIKE %s $organization_query $department_query $state_query", array($like_fullname)), ARRAY_A);
            //WHERE administrator.fullname LIKE %s $organization_query $department_query $state_query", array($like_fullname, $organization_id, $department_id)), ARRAY_A); 
        echo json_encode($results);
        wp_die();
    }

}
