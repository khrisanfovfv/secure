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
     * ===== ЗАПОЛНЕНИЕ ДАННЫМИ ТАБЛИЦЫ ИНФОРМАЦИОННЫЕ СИСТЕМЫ =====
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
        $remarks = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}remarks WHERE administrator_id = $id"), OBJECT);
            $results = (object) array_merge( (array)$results, array( 'remarks' => $remarks ));
        return $results;
        wp_die();
     }

    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ИНФОРМАЦИОННАЯ СИСТЕМА ======================
     */
    function secure_add_administrator(){

        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        
        $wpdb->insert(
            $prefix.'administrator',
            array(
                'fullname' => $record['fullname'],
                'briefname' => $record['briefname'],
                'significancelevel' => $record['significancelevel'],
                'scope' => $record['scope'],
                'certified' => $record['certified'],
                'certifydate' => $record['certifydate'],
                'hasremark' => $record['hasremark'],
                'commissioningdate' => $record['commissioningdate'],
                'state' => $record['state']
            ),
            array(
                '%s', // fullname
                '%s', // briefname
                '%s', // significancelevel
                '%s', // scope
                '%d', // certified
                '%s', // certifydate
                '%d', // hasremark
                '%s', // commissioningdate
                '%s'  // state
            )
        );

        $id = $wpdb->insert_id;
        echo 'Запись добавлена ИД=' . $id ; 
        wp_die();
        ;
    }

    /** 
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ИНФОРМАЦИОННАЯ СИСТЕМА ==========================
     */
    function secure_update_administrator(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix.'administrator',
            array(
                'fullname' => $record['fullname'],
                'briefname' => $record['briefname'],
                'significancelevel' => $record['significancelevel'],
                'scope' => $record['scope'],
                'certified' => $record['certified'],
                'certifydate' => $record['certifydate'],
                'hasremark' => $record['hasremark'],
                'commissioningdate' => $record['commissioningdate'],
                'state' => $record['state']
            ),
            array( 'ID' => $record['id'] ),
            array(
                '%s', // fullname
                '%s', // briefname
                '%s', // significancelevel
                '%s', // scope
                '%d', // certified
                '%s', // certifydate
                '%d', // hasremark
                '%s', // commissioningdate
                '%s'  // state
            ),
            array( '%d' )
        );

        $remarks = json_decode($record['remarks']);
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена'. $remarks[0]['content'];
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
