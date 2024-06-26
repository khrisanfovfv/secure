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
            $wpdb->prepare("SELECT customer.id, organization.id as organization_id, organization.fullname as organization_name  FROM {$prefix}contract_customer customer
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
            $wpdb->prepare("SELECT developper.id, organization.id as organization_id, organization.fullname as organization_name  FROM {$prefix}contract_developper developper
            JOIN {$prefix}organization organization on organization.id = developper.organization_id
            WHERE developper.contract_id = %d", $id),
            OBJECT
        );
        if ($wpdb->last_error) {
            wp_die($wpdb->last_error, "Ошибка при загрузке карточки \"Контракты\"", array('response' => 500));
        }

        $results = (object) array_merge((array)$results, array('developpers' => $developpers));
        
        // Область с документами
        $documents = $wpdb->get_results(
            $wpdb->prepare("SELECT contract_doc.id, document.name, document_version.id as version_id, document_version.type, 
            contract_doc.document_id as document, document_version.extension, MAX(document_version.version_number)   
            FROM {$wpdb->prefix}contract_document contract_doc
            JOIN {$wpdb->prefix}document document on contract_doc.document_id = document.id
            JOIN {$wpdb->prefix}document_version document_version on document_version.document = document.id
            WHERE document_version.state = 'Active'
            AND contract_doc.contract_id = %d
            GROUP BY contract_doc.id, document.name, document_version.id, document_version.type, 
            contract_doc.document_id, document_version.extension
            ", $id), ARRAY_A);

            if ($wpdb->last_error){
                wp_die($wpdb->last_error, "Ошибка при загрузке карточки документы",array("response"=>500));
        
}            // Если активных версий нет
            if ($documents == null){
                $documents = $wpdb->get_results(
                    $wpdb->prepare("SELECT contract_doc.id, document.name, document_version.id as version_id, document_version.type, 
                    contract_doc.document_id, document_version.extension, MAX(document_version.version_number)   
                    FROM {$wpdb->prefix}contract_document contract_doc
                    JOIN {$wpdb->prefix}document document on contract_doc.document_id = document.id
                    JOIN {$wpdb->prefix}document_version document_version on document_version.document = document.id
                    WHERE document_version.state = 'inActive'
                    AND contract_doc.contract_id = %d
                    GROUP BY contract_doc.id, document.name, document_version.id, document_version.type, 
                    contract_doc.document_id, document_version.extension
                    ", $id), ARRAY_A);
                if ($wpdb->last_error){
                    wp_die($wpdb->last_error, "Ошибка при загрузке карточки документы",array("response"=>500));
                }
            }
             $results = (object) array_merge( (array)$results, array( 'documents' => $documents ));
           
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

        // Обновляем записи в детальном разделе ИСПОЛНИТЕЛИ
        // Убираем символы экранирования '/'
        $developpers_json = stripcslashes($record['developpers']);
        $developpers = json_decode($developpers_json);
        foreach ($developpers as $developper){
            if ($developper->id ==''){
                if ($developper->is_deleted == 0){
                    Contract::secure_create_developper($id, $developper);
                }
            }elseif ($developper->is_deleted ==='1'){
                Contract::secure_delete_developper($developper);
            } else {
                Contract::secure_update_developper($developper);
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
            }elseif ($customer->is_deleted == 1){
                Contract::secure_delete_customer($customer);
            } else {
                Contract::secure_update_customer($customer);
             }
        }

       
        //         // Обновляем записи в детальном разделе ИСПОЛНИТЕЛИ
        //         // Убираем символы экранирования '/'
        $developpers_json = stripcslashes($record['developpers']);
        $developpers = json_decode($developpers_json);
        foreach ($developpers as $developper){
            if ($developper->id ==''){
                if ($developper->is_deleted == 0){
                    Contract::secure_create_developper($record['id'], $developper);
                }
            }elseif ($developper->is_deleted == 1){
                Contract::secure_delete_developper($developper);
            } else {
                Contract::secure_update_developper($developper);
             }
        }

        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена ';
        wp_die();
    }

        /**
         * ============== УДАЛЕНИЕ ЗАПИСИ КОНТРАКТА ===============
         */
        public function secure_delete_contract(){
            global $wpdb;
            $prefix = $wpdb->prefix;
            $contract_id = $_POST['id'];
            // Удаляем связанные записи из таблицы Заказчики
            $customers = $wpdb->get_results( 
                $wpdb->prepare("SELECT * FROM {$prefix}contract_customer WHERE contract_id = %d", Array($contract_id)), OBJECT );
            foreach($customers as $customer){
                Contract::secure_delete_customer($customer);
            }

            // Удаляем связанные записи из таблицы Исполнители
            $developpers = $wpdb->get_results( 
                $wpdb->prepare("SELECT * FROM {$prefix}contract_developper WHERE contract_id = %d", Array($contract_id)), OBJECT );
            foreach($developpers as $developper){
                Contract::secure_delete_developper($developper);
            }

            // Удаляем связанные записи из таблицы Документы
            $documents = $wpdb->get_results( 
                $wpdb->prepare("SELECT * FROM {$prefix}contract_document WHERE contract_id = %d", Array($contract_id)), OBJECT );
            foreach($documents as $document){
                Contract::secure_delete_document($document);
            }

            

            // Удаляем запись информационная система
            $wpdb->delete( $prefix.'contract', array( 'ID' => $contract_id ), array( '%d' ));
            echo 'Запись ид = ' . $_POST['id'] . ' успешно удалена';
            wp_die();

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
         * ============== ДЕТАЛЬНАЯ СТРАНИЦА ЗАКАЗЧИКИ. РЕДАКТИРОВАНИЕ ЗАПИСИ ==============
         */
        protected function secure_update_customer($customer){
            global $wpdb;
            $prefix = $wpdb->prefix;
            print_r($customer->eliminated);
            $wpdb->update(
                $prefix.'contract_customer',
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

        }

        /** ============== ДЕТАЛЬНАЯ СТРАНИЦА ИСПОЛНИТЕЛИ. СОЗДАНИЕ ЗАПИСИ ==============
        */
       protected function secure_create_developper($contract_id, $developper){
           global $wpdb;
           $table_name = $wpdb->prefix . 'contract_developper';
           $wpdb->insert(
            $table_name,
               array(
                   'contract_id' => $contract_id,
                   'organization_id' =>$developper->organization_id
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
        * ============== ДЕТАЛЬНАЯ СТРАНИЦА ИСПОЛНИТЕЛИ. РЕДАКТИРОВАНИЕ ЗАПИСИ ==============
        */
       protected function secure_update_developper($developper){
           global $wpdb;
           $prefix = $wpdb->prefix;
           print_r($developper->eliminated);
           $wpdb->update(
               $prefix.'contract_developper',
               array(
                   'contract_id' => $developper->contract_id,
                   'organization_id' =>$developper->organization_id
               ),
               array( 'ID' => $developper->id ),
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
        * ============== ИСПОЛНИТЕЛИ. УДАЛЕНИЕ ЗАПИСИ ==============
        */
       protected function secure_delete_developper($developper){
           global $wpdb;
           $prefix = $wpdb->prefix;
           $wpdb->delete( $prefix . 'contract_developper', array( 'ID' => $developper->id ), array( '%d' ));
           echo 'Запись ид = ' . $developper->id . ' успешно удалена';
           
           if($wpdb-> last_error){
               wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
           }

           wp_die();
       }


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

    /**
    * ================ КОНТРАКТЫ. ОБЩИЙ ПОИСК =================
    */
    function secure_search_contract(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = $_POST['value'];
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}contract 
            WHERE contract_subject LIKE '%$value%'
            OR contract_number LIKE '%$value%'
            OR conclusionDate LIKE '%$value%'
            OR link LIKE '%$value%'
        "), ARRAY_A ); 
            echo json_encode($results);
            wp_die();
        }

        /**
         * ================= ИНФОРМАЦИОННЫЕ СИСТЕМЫ. РАСШИРЕННЫЙ ПОИСК =================
         */
        function secure_search_contract_extended(){
            global $wpdb;
            $prefix = $wpdb->prefix;
            $wild = '%';
            $contract_subject_like  = $wild .  $_POST['contract_subject'] . $wild;
            $contract_number_like = $wild .  $_POST['contract_number'] .$wild;
            $conclusionDateFrom = trim($_POST['conclusionDateFrom']);
            $conclusionDateTo = trim($_POST['conclusionDateTo']);
            $type = trim($_POST['type']);
            $link_like = $wild .  $_POST['link'] . $wild;
            $state = $_POST['state'];
            $conclusionDate_query = '';
            $type_query = '';
            $state_query = '';
            
            if ($conclusionDateFrom !=='' and $conclusionDateTo ===''){
                $conclusionDate_query = " AND conclusionDate >= '" . $conclusionDateFrom . "'";
            } elseif($conclusionDateFrom !== '' and $conclusionDateTo !== ''){
                $conclusionDate_query = " AND conclusionDate BETWEEN '" . $conclusionDateFrom . "' and '" . $conclusionDateTo . "'" ;
            } elseif(trim($conclusionDateFrom) ==='' and trim($conclusionDateTo) !=='')
                $conclusionDate_query = " AND conclusionDate <= '" . $conclusionDateTo . "'";

            if ($type !== ''){
                $type_query = "AND contract_type = '$type'";
            }
           
            if ($state !==''){
                $state_query = "AND contract_state = '$state'";
            }

            $results = $wpdb->get_results( 
                $wpdb->prepare("SELECT * FROM {$prefix}contract 
                WHERE contract_subject LIKE %s AND contract_number like %s
                AND link LIKE %s $conclusionDate_query $type_query $state_query", 
                array($contract_subject_like, $contract_number_like, $link_like )), ARRAY_A ); 

            if ($wpdb->last_error){
                wp_die($wpdb->last_error, 'Ошибка', array('response' => 500));
            }
            echo json_encode($results);
            wp_die();
        }

}
