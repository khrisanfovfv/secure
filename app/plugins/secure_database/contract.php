<?php

class Contract
{
    protected $table_name;
    public function __construct()
    {
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

        //Запрос на создание таблицы для связи с таблицей "Контракт.Заказчик"
        $table_name = $wpdb->prefix . 'contract_customer';
        $contract_customer_sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            contract_id mediumint(9) NOT NULL,
            organization_id mediumint(9) NOT NULL,
            FOREIGN KEY (contract_id) REFERENCES {$wpdb->prefix}contract(id),
            FOREIGN KEY (organization_id) REFERENCES {$wpdb->prefix}organization(id),
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($contract_customer_sql);


        //Запрос на создание таблицы для связи с таблицей "Контракт.Исполнитель"
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
                'link' => 'https://ya.ru/',
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

        // Заполняем данными таблицу Контракт. Заказчик
        $table_name = $wpdb->prefix . 'contract_customer';
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


    /**
     * ================ ПОЛУЧЕНИЕ ЗАПИСИ ТАБЛИЦЫ КОНТРАКТЫ =================
     */
    public function secure_load_contract()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$prefix}contract"),
            ARRAY_A
        );
        echo json_encode($results);
        wp_die();
    }

    /**
     * ==================== КОНТРАКТЫ ЗАГРУЗКА ОДНОЙ ЗАПИСИ ====================
     */
    public function secure_load_single_contract(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $contract_id = $_POST['contract_id'];
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT contract.id as contract_id, contract.contract_subject, contract.contract_number, 
            contract.conclusionDate, contract.contract_type, contract.link, contract.contract_state
            FROM {$prefix}contract contract
            WHERE id = %d", $contract_id), 
            ARRAY_A );

            if ($wpdb->last_error){
                wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
            }
        echo json_encode($results);
        wp_die();
    }

    /**
     * ============================ ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ===============================
     */

    function secure_load_card_data($id)
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT *  
            FROM {$prefix}contract contract  
            WHERE id = %d", $id),
            OBJECT
        );
        //ДЕТАЛЬНАЯ СТРАНИЦА ЗАКАЗЧИКИ
        $customers = $wpdb->get_results(
            $wpdb->prepare("SELECT organization.id as organization_id, organization.fullname as organization_name  FROM {$prefix}contract_customer customer
            JOIN {$prefix}organization organization on organization.id = customer.organization_id
            WHERE customer.contract_id = %d", $id),
            OBJECT
        );
        if ($wpdb->last_error) {
            wp_die($wpdb->last_error, "Ошибка при загрузке карточки \"Контракты\"", array('response' => 500));
        }

        $results = (object) array_merge((array)$results, array('customers' => $customers));

        //ДЕТАЛЬНАЯ СТРАНИЦА ИСПОЛНИТЕЛИ
        $developpers = $wpdb->get_results(
            $wpdb->prepare("SELECT organization.id as organization_id, organization.fullname as organization_name  FROM {$prefix}contract_developper developper
            JOIN {$prefix}organization organization on organization.id = developper.organization_id
            WHERE developper.contract_id = %d", $id),
            OBJECT
        );
        if ($wpdb->last_error) {
            wp_die($wpdb->last_error, "Ошибка при загрузке карточки \"Контракты\"", array('response' => 500));
        }

        $results = (object) array_merge((array)$results, array('developpers' => $developpers));
        //     $results = (object) array_merge( (array)$results, array( 'administrators' => $administrators ));
        // $remarks = $wpdb->get_results(
        //     $wpdb->prepare("SELECT * FROM {$prefix}remarks WHERE contract_id = $id"), OBJECT);
        //     $results = (object) array_merge( (array)$results, array( 'remarks' => $remarks )); 
        //contract.id, contract.contract_number, contract.conclusionDate, contract.contract_type, 
        //contract.contract_subject, contract.contract_state
        
        // Область с документами
        $documents = $wpdb->get_results(
            $wpdb->prepare("SELECT contract_doc.id, document.name, document_version.type, contract_doc.document_id  
            FROM {$wpdb->prefix}contract_document contract_doc
            JOIN {$wpdb->prefix}document document on contract_doc.document_id = document.id
            JOIN (SELECT * 
                FROM {$wpdb->prefix}document_version document_version
                WHERE document_version.state = 'Active'
                LIMIT 1) document_version
            WHERE contract_doc.contract_id = $id"), OBJECT);
             $results = (object) array_merge( (array)$results, array( 'documents' => $documents ));
            if ($wpdb->last_error){
                wp_die($wpdb->last_error, "Ошибка при загрузке карточки документы",array("response"=>500));
            }
             
        return $results;
    }

    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ Контракты ======================
     */
    function secure_add_contract()
    {

        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->insert(
            $prefix . 'contract',
            array(
                'contract_subject' => $record['contract_subject'],
                'contract_number' => $record['contract_number'],
                'conclusionDate' => $record['conclusionDate'],
                'contract_type' => $record['contract_type'],
                'link' => $record['link'],
                'contract_state' => $record['contract_state']

            ),
            array(
                '%s', // contract_subject
                '%s', // contract_number
                '%s', // conclusionDate
                '%s', // contract_type
                '%s', // link
                '%s' // contract_state                
            )
        );

        $id = $wpdb->insert_id;

        // Обновляем записи в детальном разделе ДОКУМЕНТЫ
        // Убираем символы экранирования '/'
        $documents_json = stripcslashes($record['documents']);
        $documents = json_decode($documents_json);
        foreach ($documents as $document){
            if ($document->id ==''){
                if ($document->is_deleted == 0){
                    Contract::secure_create_document($id, $document);
                }
            }elseif ($document->is_deleted ==='1'){
                Contract::secure_delete_document($document);
            } else {
                Contract::secure_update_document($document);
             }
        }

        $id = $wpdb->insert_id;
        
        // Обновляем записи в детальном разделе ЗАКАЗЧИКИ
        // Убираем символы экранирования '/'
        $customers_json = stripcslashes($record['customers']);
        $customers = json_decode($customers_json);
        foreach ($customers as $customer){
            if ($customer->id ==''){
                if ($customer->is_deleted == 0){
                    Contract::secure_create_customer($id, $customer);
                }
            }elseif ($customer->is_deleted ==='1'){
                Contract::secure_delete_customer($customer);
            } else {
                Contract::secure_update_customer($customer);
             }
        }


        echo 'Запись добавлена ИД=' . $id;
        wp_die();;
    }

    /** 
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ КОНТРАКТА ==========================
     */
    function secure_update_contract()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix . 'contract',
            array(
                'contract_subject' => $record['contract_subject'],
                'contract_number' => $record['contract_number'],
                'conclusionDate' => $record['conclusionDate'],
                'contract_type' => $record['contract_type'],
                'link' => $record['link'],
                'contract_state' => $record['contract_state'],
            ),
            array('ID' => $record['id']),
            array(
                '%s', // contract_subject
                '%s', // contract_number
                '%s', // conclusionDate
                '%s', // contract_type
                '%s', // link
                '%s' // contract_state
            ),
            array('%d')
        );

        // Обновляем записи в детальном разделе ДОКУМЕНТЫ
        // Убираем символы экранирования '/'
        $documents_json = stripcslashes($record['documents']);
        $documents = json_decode($documents_json);
        foreach ($documents as $document){
            if ($document->id ==''){
                if ($document->is_deleted == 0){
                    Contract::secure_create_document($record['id'], $document);
                }
            }elseif ($document->is_deleted ==='1'){
                Contract::secure_delete_document($document);
            } else {
                Contract::secure_update_document($document);
             }
        }

        // Обновляем записи в детальном разделе ЗАКАЗЧИКИ
        // Убираем символы экранирования '/'
        $customers_json = stripcslashes($record['customers']);
        $customers = json_decode($customers_json);
        foreach ($customers as $customer){
            if ($customer->id ==''){
                if ($customer->is_deleted == 0){
                    Contract::secure_create_customer($record['id'], $customer);
                }
            }elseif ($customer->is_deleted ==='1'){
                Contract::secure_delete_customer($customer);
            } else {
                Contract::secure_update_customer($customer);
             }
        }

        if ($wpdb->last_error) {
            wp_die($wpdb->last_error, 'Ошибка при обновлении записи', array('response' => 500));
        }
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена ' .$customers_json;
        wp_die();
        // //         // Обновляем записи в детальном разделе ИСПОЛНИТЕЛИ
        // //         // Убираем символы экранирования '/'
        // $developpers_json = stripcslashes($record['developpers']);
        // $developpers = json_decode($developpers_json);
        // foreach ($developpers as $developper){
        //     if ($developper->id ==''){
        //         if ($developper->is_deleted == 0){
        //             Contract::secure_create_developper($record['id'], $developper);
        //         }
        //     }elseif ($developper->is_deleted ==='1'){
        //         Contract::secure_delete_developper($developper);
        //     } else {
        //         Contract::secure_update_developper($developper);
        //      }
        // }

        // if ($wpdb->last_error) {
        //     wp_die($wpdb->last_error, 'Ошибка при обновлении записи', array('response' => 500));
        // }
        // echo 'Запись ид = ' . $record['id'] . ' успешно обновлена ' .$developpers_json;
        // wp_die();
    }

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

        /**
         * ============== ДЕТАЛЬНАЯ СТРАНИЦА ЗАКАЗЧИКИ. СОЗДАНИЕ ЗАПИСИ ==============
         */
        protected function secure_create_customer($contract_id, $customer){
            global $wpdb;
            $table_name = $wpdb->prefix . 'contract_customer';
            $wpdb->insert(
                $table_name,
                array(
                    'contract_id' => $contract_id,
                    'organization_id' =>$customer->organization_id
                ),
                array(
                    '%d', // contract_id
                    '%d', // organization_id
                )
            );

            if($wpdb-> last_error){
                wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
            }
        }

        /**
         * ================ ДЕТАЛЬНЫЙ РАЗДЕЛ ДОКУМЕНТЫ. СОЗДАНИЕ ЗАПИСИ ================
         */
        protected function secure_create_document($contract_id, $document){
            global $wpdb;
            $prefix = $wpdb->prefix;
            $table_name = $wpdb->prefix . 'contract_document';
            $wpdb->insert(
                $table_name,
                array(
                    'contract_id' => $contract_id,
                    'document_id' => $document->document_id
                ),
                array(
                    '%d', // contract_id
                    '%d' // document_id
                )
            );
            if ($wpdb->last_error){
                wp_die($wpdb->last_error, 'Ошибка', array('responce' => 500));
            }
    
        }

        /**
     * ============== ДОКУМЕНТЫ. РЕДАКТИРОВАНИЕ ЗАПИСИ ==============
     */
    protected function secure_update_document($document){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $wpdb->update(
            $prefix.'contract_document',
            array(
                'document_id' => $document->document_id
            ),
            array( 'ID' => $document->id ),
            array(
                '%d', // document_id
            ),
            array( '%d' )
        );
        if ($wpdb->last_error){
            wp_die($wpdb->last_error, 'Ошибка', array('responce' => 500));
        }
    }

    /**
     * ============== ДОКУМЕНТЫ. УДАЛЕНИЕ ЗАПИСИ ==============
     */
    protected function secure_delete_document($document){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $wpdb->delete( $prefix . 'contract_document', array( 'ID' => $document->id ), array( '%d' ));
        echo 'Запись ид = ' . $document->id . ' успешно удалена';

        if ($wpdb->last_error){
            wp_die($wpdb->last_error, 'Ошибка', array('responce' => 500));
        }
    }

        /**
         * ============== ДЕТАЛЬНАЯ СТРАНИЦА ЗАКАЗЧИКИ. РЕДАКТИРОВАНИЕ ЗАПИСИ ==============
         */
        protected function secure_update_customer($customer){
            global $wpdb;
            $prefix = $wpdb->prefix;
            print_r($customer->eliminated);
            $wpdb->update(
                $prefix.'contarct_customer',
                array(
                    'contract_id' => $customer->contract_id,
                    'organization_id' =>$customer->organization_id
                ),
                array( 'ID' => $customer->id ),
                array(
                    '%d', // contract_id
                    '%d', // organization_id
                ),
                array( '%d' )
            );

            if($wpdb-> last_error){
                wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
            }

        }
        /**
         * ============== ЗАКАЗЧИКИ. УДАЛЕНИЕ ЗАПИСИ ==============
         */
        protected function secure_delete_customer($customer){
            global $wpdb;
            $prefix = $wpdb->prefix;
            $wpdb->delete( $prefix . 'contract_customer', array( 'ID' => $customer->id ), array( '%d' ));
            echo 'Запись ид = ' . $customer->id . ' успешно удалена';
            
            if($wpdb-> last_error){
                wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
            }

            wp_die();
        }

    //     /** ============== ДЕТАЛЬНАЯ СТРАНИЦА ЗАКАЗЧИКИ. СОЗДАНИЕ ЗАПИСИ ==============
    //     */
    //    protected function secure_create_developper($contract_id, $developper){
    //        global $wpdb;
    //        $table_name = $wpdb->prefix . 'contract_developper';
    //        $wpdb->insert(
    //            $table_name,
    //            array(
    //                'contract_id' => $contract_id,
    //                'organization_id' =>$developper->organization_id
    //            ),
    //            array(
    //                '%d', // contract_id
    //                '%d', // organization_id
    //            )
    //        );

    //        if($wpdb-> last_error){
    //            wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
    //        }
    //    }

    //    /**
    //     * ============== ДЕТАЛЬНАЯ СТРАНИЦА ЗАКАЗЧИКИ. РЕДАКТИРОВАНИЕ ЗАПИСИ ==============
    //     */
    //    protected function secure_update_developper($developper){
    //        global $wpdb;
    //        $prefix = $wpdb->prefix;
    //        print_r($developper->eliminated);
    //        $wpdb->update(
    //            $prefix.'contarct_developper',
    //            array(
    //                'contract_id' => $developper->contract_id,
    //                'organization_id' =>$developper->organization_id
    //            ),
    //            array( 'ID' => $developper->id ),
    //            array(
    //                '%d', // contract_id
    //                '%d', // organization_id
    //            ),
    //            array( '%d' )
    //        );

    //        if($wpdb-> last_error){
    //            wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
    //        }

    //    }
    //    /**
    //     * ============== ЗАКАЗЧИКИ. УДАЛЕНИЕ ЗАПИСИ ==============
    //     */
    //    protected function secure_delete_developper($developper){
    //        global $wpdb;
    //        $prefix = $wpdb->prefix;
    //        $wpdb->delete( $prefix . 'contract_developper', array( 'ID' => $developper->id ), array( '%d' ));
    //        echo 'Запись ид = ' . $developper->id . ' успешно удалена';
           
    //        if($wpdb-> last_error){
    //            wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
    //        }

    //        wp_die();
    //    }


    /**
     * ============== ВКЛАДКА ЗАКАЗЧИКИ. ЗАГРУЗКА ЗАПИСЕЙ ==============
     */
    public function secure_load_contract_customers()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $contract_id = $_POST['contract_id'];
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT customer.id, customer.organization_id, organization.fullname as organization_name   
            FROM {$prefix}contract_customer customer
            JOIN {$prefix}organization organization on customer.organization_id=organization.id
            WHERE contract_id = %d", $contract_id),
            ARRAY_A
        );
        echo json_encode($results);
        if ($wpdb->last_error) {
            wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
        }
        wp_die();
    }

    /**
     * ============== ВКЛАДКА ИСПОЛНИТЕЛИ. ЗАГРУЗКА ЗАПИСЕЙ ==============
     */
    public function secure_load_contract_developpers()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $contract_id = $_POST['contract_id'];
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT developper.id, developper.organization_id, organization.fullname as organization_name   
            FROM {$prefix}contract_developper developper
            JOIN {$prefix}organization organization on developper.organization_id=organization.id
            WHERE contract_id = %d", $contract_id),
            ARRAY_A
        );
        echo json_encode($results);
        if ($wpdb->last_error) {
            wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
        }
        wp_die();
    }

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
