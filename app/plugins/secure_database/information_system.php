<?php 

class InformationSystem{
    protected $table_name;
    public function __construct() {
        $this->table_name = 'information_system';
    }

    /**
     * ========= СОЗДАНИЕ ТАБЛИЦЫ ИНФОРМАЦИОННЫЕ СИСТЕМЫ И ЗАМЕЧАНИЯ ПО АТТЕСТАЦИ ========
     */
    public function table_install()
    {
        global $wpdb;
        global $sec_db_version;
        $table_name = $wpdb->prefix . 'information_system';
        $charset_collate = $wpdb->get_charset_collate();

        // Запрос на создание таблицы информационные системы
        $information_system_sql = "CREATE TABLE $table_name (
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

        $table_name = $wpdb->prefix . 'remarks';

        // Запрос на создание таблицы Замечания по аттестации
        $remarks_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            information_system_id mediumint(9) NOT NULL,
            remarkdate date NULL,
            author text NOT NULL,
            content text NOT NULL,
            eliminated boolean,
            eliminatedate date NULL,
            performer text,
            PRIMARY KEY  (id),
            FOREIGN KEY (information_system_id) REFERENCES {$wpdb->prefix}information_system(id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($information_system_sql);
        dbDelta($remarks_sql);
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
            ),
            array(
                '%s', // fullname
                '%s', // briefname
                '%d', // certified
                '%s', // certifydate
                '%s', // scope
                '%s', // significancelevel
                '%s', // commissioningdate
                '%d', // hasremark
                '%s'  // state
            )

        );

        // Заполняем данными таблицу Замечания по аттестации
        $table_name = $wpdb->prefix . 'remarks';
        $wpdb->insert(
            $table_name,
            array(
                'information_system_id' => 1,
                'remarkdate' =>'2022-01-01',
                'author' => 'Смирнов А.В.',
                'content' => 'Нет антивируса',
                'eliminated' => 0,
                'eliminatedate' => NULL,
                'performer' => 'Петров А.Г.'
            ),
            array(
                '%d', // information_system_id
                '%s', // remarkdate
                '%s', // author
                '%s', // content
                '%d', // eliminated
                '%s', // eliminatedate
                '%s' // performer
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
     * ============================ ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ===============================
     */

     public function secure_load_card_data($id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM sec_information_system WHERE id = $id"), OBJECT );
        $remarks = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}remarks WHERE information_system_id = $id"), OBJECT);
            $results = (object) array_merge( (array)$results, array( 'remarks' => $remarks ));
        return $results;
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
        // Обновляем записи в детальном разделе Замечания по аттестации
        // Убираем символы экранирования '/'
        $remarks_json = stripcslashes($record['remarks']);
        $remarks = json_decode($remarks_json);
        foreach ($remarks as $remark){
            if ($remark->id ==''){
                InformationSystem::secure_create_remark($record['id'], $remark);
            }elseif ($remark->is_deleted ==='1'){
                InformationSystem::secure_delete_remark($remark);
            } else {
                InformationSystem::secure_update_remark($remark);
            }
        }
        
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
        wp_die();
    }

    /**
     * ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. СОЗДАНИЕ ЗАПИСИ ==============
     */
    protected function secure_create_remark($information_system_id, $remark){
        global $wpdb;
        $table_name = $wpdb->prefix . 'remarks';
        $wpdb->insert(
            $table_name,
            array(
                'information_system_id' => $information_system_id,
                'remarkdate' =>$remark->remarkdate,
                'author' => $remark->author,
                'content' => $remark->content,
                'eliminated' => $remark->eliminated,
                'eliminatedate' => $remark->eliminatedate,
                'performer' => $remark->performer
            ),
            array(
                '%d', // information_system_id
                '%s', // remarkdate
                '%s', // author
                '%s', // content
                '%d', // eliminated
                '%s', // eliminatedate
                '%s' // performer
            )
        );
    }

    /**
     * ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. РЕДАКТИРОВАНИЕ ЗАПИСИ ==============
     */
    protected function secure_update_remark($remark){
        global $wpdb;
        $prefix = $wpdb->prefix;
        print_r($remark->eliminated);
        $wpdb->update(
            $prefix.'remarks',
            array(
                'remarkdate' =>$remark->remarkdate,
                'author' => $remark->author,
                'content' => $remark->content,
                'eliminated' => $remark->eliminated,
                'eliminatedate' => $remark->eliminatedate,
                'performer' => $remark->performer
            ),
            array( 'ID' => $remark->id ),
            array(
                '%s', // remarkdate
                '%s', // author
                '%s', // content
                '%d', // eliminated
                '%s', // eliminatedate
                '%s' // performer
            ),
            array( '%d' )
        );

    }
    /**
     * ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. УДАЛЕНИЕ ЗАПИСИ ==============
     */
    protected function secure_delete_remark($remark){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $wpdb->delete( $prefix . 'remarks', array( 'ID' => $remark->id ), array( '%d' ));
        echo 'Запись ид = ' . $remark->id . ' успешно удалена';
        wp_die();
    }

    /**
     * ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. ЗАГРУЗКА ЗАПИСЕЙ ==============
     */
    public function secure_load_information_system_remarks(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $information_system_id = $_POST['information_system_id'];
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}remarks WHERE information_system_id = $information_system_id"), ARRAY_A );
        echo json_encode($results);
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
