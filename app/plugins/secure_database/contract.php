<?php 

class Contract{
    protected $table_name;
    public function __construct() {
        $this->table_name = 'contract';
    }

    /**
     * ========= СОЗДАНИЕ ТАБЛИЦЫ КОНТРАКТЫ ========
     */
    public function table_install()
    {
        global $wpdb;
        global $sec_db_version;
        $table_name = $wpdb->prefix . 'contract';
        $charset_collate = $wpdb->get_charset_collate();

        // Запрос на создание таблицы контракты
        $contract_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            contract_subject text,
            contract_number text NOT NULL,
            conclusionDate date NULL,
            contract_type tinytext,
            link text,
            contract_state varchar(14) DEFAULT 'Active' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";


        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($contract_sql);

        //Запрос на создание таблицы для связи с таблицей "Контракт.Документы"
        $table_name = $wpdb->prefix . 'contract_document';
        $contract_document_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            contract_id mediumint(9) NOT NULL,
            document_id mediumint(9) NOT NULL,
            FOREIGN KEY (contract_id) REFERENCES {$wpdb->prefix}contract(id),
            FOREIGN KEY (document_id) REFERENCES {$wpdb->prefix}document(id),
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($contract_document_sql);
        // add_option('sec_db_version', $sec_db_version);

        //Запрос на создание таблицы для связи с таблицей "Контракт.Исполнитель"
        $table_name = $wpdb->prefix . 'contract_сustomer';
        $contract_customer_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            contract_id mediumint(9) NOT NULL,
            organization_id mediumint(9) NOT NULL,
            FOREIGN KEY (contract_id) REFERENCES {$wpdb->prefix}contract(id),
            FOREIGN KEY (organization_id) REFERENCES {$wpdb->prefix}document(id),
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($contract_customer_sql);
        
   
        //Запрос на создание таблицы для связи с таблицей "Контракт.Заказчик"
        $table_name = $wpdb->prefix . 'contract_developper';
        $contract_developper_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            contract_id mediumint(9) NOT NULL,
            organization_id mediumint(9) NOT NULL,
            FOREIGN KEY (contract_id) REFERENCES {$wpdb->prefix}contract(id),
            FOREIGN KEY (organization_id) REFERENCES {$wpdb->prefix}document(id),
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($contract_developper_sql);
    }




     

    /**
     * ===== ЗАПОЛНЕНИЕ ДАННЫМИ ТАБЛИЦЫ Контракты =====
     *
     * @return void
     */
    function install_data()
    {
        global $wpdb;


        $table_name = $wpdb->prefix . 'contract';
        $wpdb->insert(
            $table_name,
            array(
                'contract_number' => '234',
                'conclusionDate' => '2022-01-02',
                'contract_subject' => 'Сопровождение АСЭД в 2024 г.',
                'contract_type' => 'Support',
                'link' => 'ssilka',
                'contract_state' => 'Active',
            ),
            array(
                '%s', // contract_number
                '%s', // conclusionDate
                '%s', // contract_subject
                '%s', // contract_type
                '%s',  // link
                '%s'  // state
            )

        );

        
     

        // Заполняем данными таблицу Контракт.Документы
        $table_name = $wpdb->prefix . 'contract_document';
        $wpdb->insert(
            $table_name,
            array(
                'contract_id' => 1,
                'document_id' => 2,
            ),
            array(
                '%d', // contract_id
                '%d', // document_id
            )
        );

        // Заполняем данными таблицу Контракт.Исполнитель
        $table_name = $wpdb->prefix . 'contract_сustomer';
        $wpdb->insert(
            $table_name,
            array(
                'contract_id' => 1,
                'organization_id' => 2,
            ),
            array(
                '%d', // contract_id
                '%d', // organization_id
            )
        );

         // Заполняем данными таблицу Контракт.Исполнитель
         $table_name = $wpdb->prefix . 'contract_developper';
         $wpdb->insert(
             $table_name,
             array(
                 'contract_id' => 1,
                 'organization_id' => 2,
             ),
             array(
                 '%d', // contract_id
                 '%d', // organization_id
             )
         );


        }


//     /**
//      * ================ ПОЛУЧЕНИЕ ЗАПИСИ ТАБЛИЦЫ ИНФОРМАЦИОННЫЕ СИСТЕМЫ =================
//      */
//     public function secure_load_contract(){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $results = $wpdb->get_results( 
//             $wpdb->prepare("SELECT * FROM sec_contract"), ARRAY_A );
//         echo json_encode($results);
//         wp_die();
//     }

    /**
     * ============================ ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ===============================
     */

    function secure_load_card_data($id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT *  
            FROM {$prefix}contract contract  
            WHERE id = %d", $id),
            OBJECT
        );

        if ($wpdb->last_error){
            wp_die($wpdb->last_error, "Ошиббка при загрузке карточки \"Контракты\"", array('response'=> 500));
        }  
        //     $results = (object) array_merge( (array)$results, array( 'administrators' => $administrators ));
        // $remarks = $wpdb->get_results(
        //     $wpdb->prepare("SELECT * FROM {$prefix}remarks WHERE contract_id = $id"), OBJECT);
        //     $results = (object) array_merge( (array)$results, array( 'remarks' => $remarks )); 
        //contract.id, contract.contract_number, contract.conclusionDate, contract.contract_type, 
            //contract.contract_subject, contract.contract_state
        return $results;
     }

//     /**
//      * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ИНФОРМАЦИОННАЯ СИСТЕМА ======================
//      */
//     function secure_add_contract(){

//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $record = $_POST['record'];
        
//         $wpdb->insert(
//             $prefix.'contract',
//             array(
//                 'fullname' => $record['fullname'],
//                 'briefname' => $record['briefname'],
//                 'significancelevel' => $record['significancelevel'],
//                 'scope' => $record['scope'],
//                 'certified' => $record['certified'],
//                 'certifydate' => $record['certifydate'],
//                 'hasremark' => $record['hasremark'],
//                 'commissioningdate' => $record['commissioningdate'],
//                 'state' => $record['state']
//             ),
//             array(
//                 '%s', // fullname
//                 '%s', // briefname
//                 '%s', // significancelevel
//                 '%s', // scope
//                 '%d', // certified
//                 '%s', // certifydate
//                 '%d', // hasremark
//                 '%s', // commissioningdate
//                 '%s'  // state
//             )
//         );

//         $id = $wpdb->insert_id;
//         // Создаем записи в детальном разделе Замечания по аттестации
//         // Убираем символы экранирования '/'
//         $remarks_json = stripcslashes($record['remarks']);
//         $remarks = json_decode($remarks_json);
//         foreach ($remarks as $remark){
//             InformationSystem::secure_create_remark($id, $remark);
//         }

//         // Создаем записи в детальном разделе Администраторы
//         $administrators_json = stripcslashes($record['administrators']);
//         $administrators = json_decode($administrators_json);
//         foreach ($administrators as $administrator){
//             InformationSystem::secure_create_administrator($id, $administrator);
//         }
        

//         echo 'Запись добавлена ИД=' . $id ; 
//         wp_die();
//         ;
//     }

//     /** 
//      * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ИНФОРМАЦИОННАЯ СИСТЕМА ==========================
//      */
//     function secure_update_contract(){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $record = $_POST['record'];

//         $wpdb->update(
//             $prefix.'contract',
//             array(
//                 'fullname' => $record['fullname'],
//                 'briefname' => $record['briefname'],
//                 'significancelevel' => $record['significancelevel'],
//                 'scope' => $record['scope'],
//                 'certified' => $record['certified'],
//                 'certifydate' => $record['certifydate'],
//                 'hasremark' => $record['hasremark'],
//                 'commissioningdate' => $record['commissioningdate'],
//                 'state' => $record['state']
//             ),
//             array( 'ID' => $record['id'] ),
//             array(
//                 '%s', // fullname
//                 '%s', // briefname
//                 '%s', // significancelevel
//                 '%s', // scope
//                 '%d', // certified
//                 '%s', // certifydate
//                 '%d', // hasremark
//                 '%s', // commissioningdate
//                 '%s'  // state
//             ),
//             array( '%d' )
//         );
//         // Обновляем записи в детальном разделе Замечания по аттестации
//         // Убираем символы экранирования '/'
//         $remarks_json = stripcslashes($record['remarks']);
//         $remarks = json_decode($remarks_json);
//         foreach ($remarks as $remark){
//             if ($remark->id ==''){
//                 if ($remark->is_deleted == 0){
//                     InformationSystem::secure_create_remark($record['id'], $remark);
//                 }
//             }elseif ($remark->is_deleted ==='1'){
//                 InformationSystem::secure_delete_remark($remark);
//             } else {
//                 InformationSystem::secure_update_remark($remark);
//             }
//         }

//         // Обновляем записи в детальном разделе Администраторы
//         $administrators_json = stripcslashes($record['administrators']);
//         $administrators = json_decode($administrators_json);
//         foreach ($administrators as $administrator){
//             if (trim($administrator->id) ==''){
//                 print_r($administrator->id);
//                 if ($administrator->is_deleted == 0){
//                     InformationSystem::secure_create_administrator($record['id'], $administrator);
//                 }
//             }elseif ($administrator->is_deleted == 1){
//                 print_r('Выполняем удаение записи');
//                 InformationSystem::secure_delete_administrator($administrator);
//             } else {
//                 InformationSystem::secure_update_administrator($administrator);
//             }
//         }
        
//         echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
//         wp_die();
//     }

//     /**
//      * ============== УДАЛЕНИЕ ЗАПИСИ ИНФОРМАЦИОННАЯ СИСТЕМА ===============
//      */
//     public function secure_delete_contract(){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $contract_id = $_POST['id'];
//         // Удаляем связанные записи из таблицы remarks
//         $remarks = $wpdb->get_results( 
//             $wpdb->prepare("SELECT * FROM {$prefix}remarks WHERE contract_id = %d", Array($contract_id)), OBJECT );
//         foreach($remarks as $remark){
//             InformationSystem::secure_delete_remark($remark);
//         }

//         // Удаляем связанные записи из таблицы contract_administrator
//         $administrators = $wpdb->get_results( 
//             $wpdb->prepare("SELECT * FROM {$prefix}contract_administrator WHERE contract_id = %d", Array($contract_id)), OBJECT );
//         foreach($administrators as $administrator){
//             InformationSystem::secure_delete_administrator($administrator);
//         }

//         // Удаляем запись информационная система
//         $wpdb->delete( $prefix.'contract', array( 'ID' => $contract_id ), array( '%d' ));
//         echo 'Запись ид = ' . $_POST['id'] . ' успешно удалена';
//         wp_die();

//     }

//     /**
//      * ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. СОЗДАНИЕ ЗАПИСИ ==============
//      */
//     protected function secure_create_remark($contract_id, $remark){
//         global $wpdb;
//         $table_name = $wpdb->prefix . 'remarks';
//         $wpdb->insert(
//             $table_name,
//             array(
//                 'contract_id' => $contract_id,
//                 'remarkdate' =>$remark->remarkdate,
//                 'author' => $remark->author,
//                 'content' => $remark->content,
//                 'eliminated' => $remark->eliminated,
//                 'eliminatedate' => $remark->eliminatedate,
//                 'performer' => $remark->performer
//             ),
//             array(
//                 '%d', // contract_id
//                 '%s', // remarkdate
//                 '%s', // author
//                 '%s', // content
//                 '%d', // eliminated
//                 '%s', // eliminatedate
//                 '%s' // performer
//             )
//         );
//     }

//     /**
//      * ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. РЕДАКТИРОВАНИЕ ЗАПИСИ ==============
//      */
//     protected function secure_update_remark($remark){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         print_r($remark->eliminated);
//         $wpdb->update(
//             $prefix.'remarks',
//             array(
//                 'remarkdate' =>$remark->remarkdate,
//                 'author' => $remark->author,
//                 'content' => $remark->content,
//                 'eliminated' => $remark->eliminated,
//                 'eliminatedate' => $remark->eliminatedate,
//                 'performer' => $remark->performer
//             ),
//             array( 'ID' => $remark->id ),
//             array(
//                 '%s', // remarkdate
//                 '%s', // author
//                 '%s', // content
//                 '%d', // eliminated
//                 '%s', // eliminatedate
//                 '%s' // performer
//             ),
//             array( '%d' )
//         );

//     }
//     /**
//      * ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. УДАЛЕНИЕ ЗАПИСИ ==============
//      */
//     protected function secure_delete_remark($remark){
//         print_r('Мы зашли в функцию');
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $wpdb->delete( $prefix . 'remarks', array( 'ID' => $remark->id ), array( '%d' ));
//         echo 'Запись ид = ' . $remark->id . ' успешно удалена';
//         wp_die();
//     }

//     /**
//      * ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. ЗАГРУЗКА ЗАПИСЕЙ ==============
//      */
//     public function secure_load_contract_remarks(){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $contract_id = $_POST['contract_id'];
//         $results = $wpdb->get_results( 
//             $wpdb->prepare("SELECT * FROM {$prefix}remarks WHERE contract_id = $contract_id"), ARRAY_A );
//         echo json_encode($results);
//         wp_die();
//     }

//     /**
//      * ======================== АДМИНИСТРАТОРЫ. ЗАГРУЗКА ЗАПИСЕЙ ===============
//      */
//     public function secure_load_contract_administrators(){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $contract_id = $_POST['contract_id'];
//         $results = $wpdb->get_results(
//                 $wpdb->prepare("SELECT inf_sys_adm.id,inf_sys_adm.administrator_id, administrator.fullname as administrator_name , inf_sys_adm.appointdate, inf_sys_adm.terminatedate, inf_sys_adm.type 
//             FROM {$prefix}contract_administrator inf_sys_adm 
//             JOIN {$prefix}administrator administrator on inf_sys_adm.administrator_id = administrator.id            
//             WHERE inf_sys_adm.contract_id = $contract_id"), OBJECT);
//          echo json_encode($results);
//         wp_die();
//     }

//     /**
//      * ============== АДМИНИСТРАТОРЫ. СОЗДАНИЕ ЗАПИСИ ==============
//      */
//     protected function secure_create_administrator($contract_id, $administrator){
//         global $wpdb;
//         $table_name = $wpdb->prefix . 'contract_administrator';
//         $wpdb->insert(
//             $table_name,
//             array(
//                 'contract_id' => $contract_id,
//                 'administrator_id' => $administrator->administrator_id,
//                 'appointdate' => $administrator->appointdate,
//                 'terminatedate' => $administrator->terminatedate,
//                 'type' => $administrator->type
//             ),
//             array(
//                 '%d', // contract_id
//                 '%d', // administrator_id
//                 '%s', // appointdate
//                 '%s', // terminatedate
//                 '%s'  // type   
//             )
//         );
//     }

//     function secure_update_administrator($administrator){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $wpdb->update(
//             $prefix.'administrators',
//             array(
//                 'contract_id' => $administrator->contract_id,
//                 'administrator_id' => $administrator->administrator_id,
//                 'appointdate' => $administrator->appointdate,
//                 'terminatedate' => $administrator->terminatedate,
//                 'type' => $administrator->type
//             ),
//             array( 'ID' => $administrator->id ),
//             array(
//                 '%d', // contract_id
//                 '%d', // administrator_id
//                 '%s', // appointdate
//                 '%s', // terminatedate
//                 '%s'  // type   
//             ),
//             array( '%d' )
//         );
//     }

//     /**
//      * ============== АДМИНИСТРАТОРЫ. УДАЛЕНИЕ ЗАПИСИ ==============
//      */
//     protected function secure_delete_administrator($administrator){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $wpdb->delete( $prefix . 'contract_administrator', array( 'ID' => $administrator->id ), array( '%d' ));
//         echo 'Запись ид = ' . $administrator->id . ' успешно удалена';
//         wp_die();
//     }



//     /**
//      * ================ ИНФОРМАЦИОННЫЕ СИСТЕМЫ. ОБЩИЙ ПОИСК =================
//      */
//     function secure_search_contract(){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $value = $_POST['value'];
//         $results = $wpdb->get_results( 
//             $wpdb->prepare("SELECT * FROM {$prefix}contract 
//             WHERE fullname LIKE '%$value%'
//             OR briefname LIKE '%$value%'
//             OR certifydate LIKE '%$value%'
//             OR commissioningdate LIKE '%$value%'
//             "), ARRAY_A ); 
//         echo json_encode($results);
//         wp_die();
//     }

//     /**
//      * ================= ИНФОРМАЦИОННЫЕ СИСТЕМЫ. РАСШИРЕННЫЙ ПОИСК =================
//      */
//     function secure_search_contract_extended(){
//         global $wpdb;
//         $prefix = $wpdb->prefix;
//         $fullname = $_POST['fullname'];
//         $briefname = $_POST['briefname'];
//         $scope = $_POST['scope'];
//         $significancelevel = $_POST['significancelevel'];
//         $certified = $_POST['certified'];
//         $certifydatefrom = $_POST['certifydatefrom'];
//         $certifydateto = $_POST['certifydateto'];
//         $hasremark = $_POST['hasremark'];
//         $commissioningdatefrom = $_POST['commissioningdatefrom'];
//         $commissioningdateto = $_POST['commissioningdateto'];
//         $state = $_POST['state'];
//         $scope_query = '';
//         $significancelevel_query ='';
//         $certified_query = '';
//         $certifydate_query ='';
//         $hasremark_query = '';
//         $commissioningdate_query = '';
//         $state_query = '';
//         if (trim($scope) !==''){
//             $scope_query = "AND scope = '$scope'";        
//         }
//         if (trim($significancelevel) !==''){
//             $significancelevel_query = "AND significancelevel = '$significancelevel'";
//         }

//         if (trim($certified) !==''){
//             if ($certified === 'Yes')
//                 $certified_query = "AND certified = '1'";
//             else
//                 $certified_query = "AND certified = '0'";
//         }

//         if (trim($certifydatefrom) !=='' and trim($certifydateto) ===''){
//             $certifydate_query = " AND certifydate >= '" . $certifydatefrom . "'";
//         } elseif(trim($certifydatefrom) !== '' and trim($certifydateto) !== ''){
//             $certifydate_query = " AND certifydate BETWEEN '" . $certifydatefrom . "' and '" . $certifydateto . "'" ;
//         } elseif(trim($certifydatefrom) ==='' and trim($certifydateto) !=='')
//             $certifydate_query = " AND certifydate <= '" . $certifydateto . "'";
             
//         if (trim($hasremark) !==''){
//             if ($hasremark === 'Yes')
//                 $hasremark_query = "AND hasremark = '1'";
//             else
//                 $hasremark_query = "AND hasremark = '0'";
//         }

//         if (trim($commissioningdatefrom) !=='' and trim($commissioningdateto) ===''){
//             $commissioningdate_query = " AND commissioningdate >= '" . $commissioningdatefrom . "'";
//         } elseif(trim($commissioningdatefrom) !== '' and trim($commissioningdateto) !== ''){
//             $commissioningdate_query = " AND commissioningdate BETWEEN '" . $commissioningdatefrom . "' and '" . $commissioningdateto . "'" ;
//         } elseif(trim($commissioningdatefrom) ==='' and trim($commissioningdateto) !=='')
//             $commissioningdate_query = " AND commissioningdate <= '" . $commissioningdateto . "'";

//         if (trim($state) !==''){
//             $state_query = "AND state = '$state'";
//         }

//         $results = $wpdb->get_results( 
//             $wpdb->prepare("SELECT * FROM {$prefix}contract 
//             WHERE fullname LIKE '%$fullname%'
//             AND briefname LIKE '%$briefname%'" . $scope_query .
//             $significancelevel_query .
//             $certified_query .
//             $certifydate_query .
//             $hasremark_query .
//             $commissioningdate_query .
//             $state_query), ARRAY_A ); 
//         echo json_encode($results);
//         wp_die();
//     }

    }
