<?php 

class Administrator{
    protected $table_name;
    public function __construct() {
        $this->table_name = 'administrator';
    }

    /**
     * ========= СОЗДАНИЕ ТАБЛИЦЫ АДМИНИСТРАТОРЫ И ТАЛИЦЫ ДЛЯ СВЯЗИ С ТАБЛИЦЕЙ ИНФОРМАЦИОННЫЕ СИСТЕМЫ ========
     */
    public function table_install()
    {
        global $wpdb;
        global $sec_db_version;
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'administrator';

        // Запрос на создание таблицы Администраторы
        $administrator_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            fullname text NOT NULL,
            organisation mediumint(9),
            department mediumint(9),
            state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($administrator_sql);
        //add_option('sec_db_version', $sec_db_version);

        //Запрос на создание таблицы для связи с таблицей "Информационные системы"
        $table_name = $wpdb->prefix . 'information_system_administrator';
        $information_system_administrator_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            information_system_id mediumint(9) NOT NULL,
            administrator_id mediumint(9) NOT NULL,
            appointdate date NULL,
            terminatedate date NULL,
            type varchar(14),
            FOREIGN KEY (information_system_id) REFERENCES {$wpdb->prefix}information_system(id),
            FOREIGN KEY (administrator_id) REFERENCES {$wpdb->prefix}administrator(id),
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($information_system_administrator_sql);
    }

    /**
     * ===== ЗАПОЛНЕНИЕ ДАННЫМИ ТАБЛИЦЫ АДМИНИСТРАТОРЫ =====
     *
     * @return void
     */
    function install_data()
    {
        global $wpdb;


        $table_name = $wpdb->prefix . 'administrator';
        $wpdb->insert(
            $table_name,
            array(
                'fullname' => 'Васильев Игорь Петрович',
                'organisation' => 1,
                'department' => 1,
                'state' => 'Active',
            ),
            array(
                '%s', // fullname
                '%d', // organisation
                '%d', // department
                '%s'  // state
            )

        );

        $table_name = $wpdb->prefix . 'information_system_administrator';
        $wpdb->insert(
            $table_name,
            array(
                'information_system_id' => 1,
                'administrator_id' => 1,
                'appointdate' => '2022-01-01',
                'terminatedate' => '2023-02-04',
                'type' => 'substitute',
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
     * ================ ПОЛУЧЕНИЕ ЗАПИСИ ТАБЛИЦЫ АДМИНИСТРАТОРЫ =================
     */
    public function secure_load_administrator(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM  {$prefix}administrator"), ARRAY_A );
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
            $wpdb->prepare("SELECT * FROM sec_administrator WHERE id = $id"), OBJECT );
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
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ АДМИНИСТРАТОРА ======================
     */
    function secure_add_administrator(){

        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        
        $wpdb->insert(
            $prefix.'administrator',
            array(
                'fullname' => $record['fullname'],
                'organisation' => $record['organisation'],
                'department' => $record['department'],
                'state' => $record['state'],
            ),
            array(
                '%s', // fullname
                '%d', // organisation
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
                    Administrator::secure_create_information_system($information_system);
                }
            } else{
                // Запись не удаена
                if ($information_system->is_deleted == 0){
                    Administrator::secure_update_information_system($information_system);
                }
                // Запись удалена
                else{
                    Administrator::secure_delete_information_system($information_system);
                } 
            }
        }

        echo 'Запись добавлена ИД=' . $id; 
        wp_die();
    }

    /** 
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ АДМИНИСТРАТОР ==========================
     */
    function secure_update_administrator(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix.'administrator',
            array(
                'fullname' => $record['fullname'],
                'organisation' => $record['organisation'],
                'department' => $record['department'],
                'state' => $record['state'],
            ),
            array( 'ID' => $record['id'] ),
            array(
                '%s', // fullname
                '%d', // organisation
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
                    Administrator::secure_create_information_system($information_system);
                }
            } else{
                // Запись не удаена
                if ($information_system->is_deleted == 0){
                    Administrator::secure_update_information_system($information_system);
                }
                // Запись удалена
                else{
                    Administrator::secure_delete_information_system($information_system);
                } 
            }
        }
        
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
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
     * ================ ИНФОРМАЦИОННЫЕ СИСТЕМЫ. ОБЩИЙ ПОИСК =================
     */
    function secure_search_administrator(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}administrator 
            WHERE fullname LIKE '%$value%'
            OR briefname LIKE '%$value%'
            OR certifydate LIKE '%$value%'
            OR commissioningdate LIKE '%$value%'
            "), ARRAY_A ); 
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= ИНФОРМАЦИОННЫЕ СИСТЕМЫ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_administrator_extended(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $fullname = $_POST['fullname'];
        $briefname = $_POST['briefname'];
        $scope = $_POST['scope'];
        $significancelevel = $_POST['significancelevel'];
        $certified = $_POST['certified'];
        $certifydatefrom = $_POST['certifydatefrom'];
        $certifydateto = $_POST['certifydateto'];
        $hasremark = $_POST['hasremark'];
        $commissioningdatefrom = $_POST['commissioningdatefrom'];
        $commissioningdateto = $_POST['commissioningdateto'];
        $state = $_POST['state'];
        $scope_query = '';
        $significancelevel_query ='';
        $certified_query = '';
        $certifydate_query ='';
        $hasremark_query = '';
        $commissioningdate_query = '';
        $state_query = '';
        if (trim($scope) !==''){
            $scope_query = "AND scope = '$scope'";        
        }
        if (trim($significancelevel) !==''){
            $significancelevel_query = "AND significancelevel = '$significancelevel'";
        }

        if (trim($certified) !==''){
            if ($certified === 'Yes')
                $certified_query = "AND certified = '1'";
            else
                $certified_query = "AND certified = '0'";
        }

        if (trim($certifydatefrom) !=='' and trim($certifydateto) ===''){
            $certifydate_query = " AND certifydate >= '" . $certifydatefrom . "'";
        } elseif(trim($certifydatefrom) !== '' and trim($certifydateto) !== ''){
            $certifydate_query = " AND certifydate BETWEEN '" . $certifydatefrom . "' and '" . $certifydateto . "'" ;
        } elseif(trim($certifydatefrom) ==='' and trim($certifydateto) !=='')
            $certifydate_query = " AND certifydate <= '" . $certifydateto . "'";
             
        if (trim($hasremark) !==''){
            if ($hasremark === 'Yes')
                $hasremark_query = "AND hasremark = '1'";
            else
                $hasremark_query = "AND hasremark = '0'";
        }

        if (trim($commissioningdatefrom) !=='' and trim($commissioningdateto) ===''){
            $commissioningdate_query = " AND commissioningdate >= '" . $commissioningdatefrom . "'";
        } elseif(trim($commissioningdatefrom) !== '' and trim($commissioningdateto) !== ''){
            $commissioningdate_query = " AND commissioningdate BETWEEN '" . $commissioningdatefrom . "' and '" . $commissioningdateto . "'" ;
        } elseif(trim($commissioningdatefrom) ==='' and trim($commissioningdateto) !=='')
            $commissioningdate_query = " AND commissioningdate <= '" . $commissioningdateto . "'";

        if (trim($state) !==''){
            $state_query = "AND state = '$state'";
        }





        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}administrator 
            WHERE fullname LIKE '%$fullname%'
            AND briefname LIKE '%$briefname%'" . $scope_query .
            $significancelevel_query .
            $certified_query .
            $certifydate_query .
            $hasremark_query .
            $commissioningdate_query .
            $state_query), ARRAY_A ); 
        echo json_encode($results);
        wp_die();
    }

}
