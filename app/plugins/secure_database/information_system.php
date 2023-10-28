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
            certifydate date NULL,
            scope varchar(13),
            significancelevel varchar(2),
            commissioningdate date NULL,
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
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM sec_information_system"), ARRAY_A );
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
        
        $wpdb->insert(
            $prefix.'information_system',
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
    function secure_update_information_system(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix.'information_system',
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
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}information_system 
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
    function secure_search_information_system_extended(){
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
            $wpdb->prepare("SELECT * FROM {$prefix}information_system 
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
?>