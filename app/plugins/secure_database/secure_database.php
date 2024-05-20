<?php

/**
 * @package Secure_database
 */
/*
Plugin Name: Secure database
Description: Рабоает с пользовательскими таблицами базы данных
Version: 1.0.0
Requires at least: 5.8
Requires PHP: 5.6.20
Author: Naimova D.A
License: GPLv2 or later
Text Domain: secure_database
*/


if (!function_exists('add_action')) {
    exit;
}

require_once('document_kind.php');
require_once('department.php');
require_once('administrator.php');
require_once('information_system.php');
require_once('contract.php');
require_once('organization.php');
require_once('document.php');
require_once('employee.php');

class SecDb
{
    protected $document_kind;
    protected $department;
    protected $information_system;
    protected $contract;
    protected $administrator;
    protected $organization;
    protected $document;
    protected $employee;

    function __construct()
    {
        
        register_activation_hook(__FILE__, array($this, 'secure_install_tables'));
        register_activation_hook(__FILE__, array($this, 'secure_install_data_tables'));
        register_deactivation_hook(__FILE__, array($this, 'secure_deactivation'));
        add_action('init', array($this, 'secure_init_plugin'));
        $this->document_kind = new DocumentKind();
        $this->department = new Department();
        $this->information_system = new InformationSystem();
        $this->contract = new Contract();
        $this->administrator = new Administrator();
        $this->organization = new Organization();
        $this->document = new Document();
        $this->employee = new Employee();

    }
    public function secure_init_plugin(){
        // ОБЩИЕ
        add_action('wp_ajax_load_card_data', array($this,'secure_load_card_data'));
        //add_action('wp_ajax_nopriv_load_card_data', array($this, 'secure_load_card_data'));
        add_action('wp_ajax_delete_record', array($this,'secure_delete_record'));
        //add_action('wp_ajax_nopriv_delete_record', array($this, 'secure_delete_record'));
        add_action('wp_ajax_update_settings', array($this,'secure_update_settings'));
        // ВИДЫ ДОКУМЕНТОВ
        add_action('wp_ajax_load_document_kind',array('DocumentKind','secure_load_document_kind'));
        //add_action('wp_ajax_nopriv_load_document_kind', array('DocumentKind','secure_load_document_kind'));
        add_action('wp_ajax_add_document_kind', array('DocumentKind','secure_add_document_kind'));
        //add_action('wp_ajax_nopriv_add_document_kind', array('DocumentKind','secure_add_document_kind'));
        add_action('wp_ajax_update_document_kind', array('DocumentKind','secure_update_document_kind'));
        //add_action('wp_ajax_nopriv_update_document_kind', array('DocumentKind','secure_update_document_kind'));
        add_action('wp_ajax_delete_document_kind', array('DocumentKind', 'secure_delete_document_kind'));
        //add_action('wp_ajax_nopriv_delete_document_kind', array('DocumentKind', 'secure_delete_document_kind'));
        add_action('wp_ajax_search_document_kind', array('DocumentKind','secure_search_document_kind'));
        //add_action('wp_ajax_nopriv_search_document_kind', array('DocumentKind','secure_search_document_kind'));
        add_action('wp_ajax_search_document_kind_extended', array('DocumentKind','secure_search_document_kind_extended'));
        //add_action('wp_ajax_nopriv_search_document_kind_extended', array('DocumentKind','secure_search_document_kind_extended'));
        // ОТДЕЛЫ
        add_action('wp_ajax_load_department',array('Department','secure_load_department'));
        //add_action('wp_ajax_nopriv_load_department', array('Department','secure_load_department'));
        add_action('wp_ajax_add_department', array('Department','secure_add_department'));
        //add_action('wp_ajax_nopriv_add_department', array('Department','secure_add_department'));
        add_action('wp_ajax_update_department', array('Department','secure_update_department'));
        //add_action('wp_ajax_nopriv_update_department', array('Department','secure_update_department'));
        add_action('wp_ajax_delete_department', array('Department', 'secure_delete_department'));
        //add_action('wp_ajax_nopriv_delete_department', array('Department', 'secure_delete_department'));
        add_action('wp_ajax_search_department', array('Department','secure_search_department'));
        //add_action('wp_ajax_nopriv_search_department', array('Department','secure_search_department'));
        add_action('wp_ajax_search_department_extended', array('Department','secure_search_department_extended'));
        //add_action('wp_ajax_nopriv_search_department_extended', array('Department','secure_search_department_extended'));
        // АДМИНИСТРАТОРЫ
        add_action('wp_ajax_load_administrator', array('Administrator', 'secure_load_administrator'));
        //add_action('wp_ajax_nopriv_load_administrator', array('Administrator', 'secure_load_administrator'));
        add_action('wp_ajax_add_administrator', array('Administrator', 'secure_add_administrator'));
        //add_action('wp_ajax_nopriv_add_administrator', array('Administrator', 'secure_add_administrator'));
        add_action('wp_ajax_update_administrator', array('Administrator','secure_update_administrator'));
        //add_action('wp_ajax_nopriv_update_administrator', array('Administrator','secure_update_administrator'));
        add_action('wp_ajax_delete_administrator', array('Administrator', 'secure_delete_administrator'));
        //add_action('wp_ajax_nopriv_delete_administrator', array('Administrator', 'secure_delete_administrator'));
        add_action('wp_ajax_search_administrator', array('Administrator','secure_search_administrator'));
        //add_action('wp_ajax_nopriv_search_administrator', array('Administrator','secure_search_administrator'));
        add_action('wp_ajax_search_administrator_extended', array('Administrator','secure_search_administrator_extended'));
        //add_action('wp_ajax_nopriv_search_administrator_extended', array('Administrator','secure_search_administrator_extended'));
         // Организации
         add_action('wp_ajax_load_organization', array('Organization', 'secure_load_organization'));
         //add_action('wp_ajax_nopriv_load_organization', array('Organization', 'secure_load_organization'));
         add_action('wp_ajax_add_organization', array('Organization', 'secure_add_organization'));
         //add_action('wp_ajax_nopriv_add_organization', array('Organization', 'secure_add_organization'));
         add_action('wp_ajax_update_organization', array('Organization','secure_update_organization'));
         //add_action('wp_ajax_nopriv_update_organization', array('Organization','secure_update_organization'));
         add_action('wp_ajax_delete_organization', array('Organization', 'secure_delete_organization'));
         //add_action('wp_ajax_nopriv_delete_organization', array('Organization', 'secure_delete_organization'));
         add_action('wp_ajax_search_organization', array('Organization','secure_search_organization'));
         //add_action('wp_ajax_nopriv_search_organization', array('Organization','secure_search_organization'));
         add_action('wp_ajax_search_organization_extended', array('Organization','secure_search_organization_extended'));
         //add_action('wp_ajax_nopriv_search_organization_extended', array('Organization','secure_search_organization_extended'));
         //Контракты
         add_action('wp_ajax_load_contract', array('Contract', 'secure_load_contract'));
         add_action('wp_ajax_load_single_contract', array('Contract', 'secure_load_single_contract'));
         //add_action('wp_ajax_nopriv_load_contract', array('Contract', 'secure_load_contract'));
         add_action('wp_ajax_load_contract_customers', array('Contract', 'secure_load_contract_customers'));
         add_action('wp_ajax_load_contract_developpers', array('Contract', 'secure_load_contract_developpers'));
         add_action('wp_ajax_add_contract', array('Contract', 'secure_add_contract'));
         //add_action('wp_ajax_nopriv_add_contract', array('Contract', 'secure_add_contract'));
         add_action('wp_ajax_update_contract', array('Contract','secure_update_contract'));
         //add_action('wp_ajax_nopriv_update_contract', array('Contract','secure_update_contract'));
         add_action('wp_ajax_delete_contract', array('Contract', 'secure_delete_contract'));
         //add_action('wp_ajax_nopriv_delete_contract', array('Contract', 'secure_delete_contract'));
         add_action('wp_ajax_search_contract', array('Contract','secure_search_contract'));
         //add_action('wp_ajax_nopriv_search_contract', array('Contract','secure_search_contract'));
         add_action('wp_ajax_search_contract_extended', array('Contract','secure_search_contract_extended'));
         //add_action('wp_ajax_nopriv_search_contract_extended', array('Contract','secure_search_contract_extended'));
        // ИНФОРМАЦИОННЫЕ СИСТЕМЫ
        add_action('wp_ajax_load_information_system', array('InformationSystem', 'secure_load_information_system'));
        //add_action('wp_ajax_nopriv_load_information_system', array('InformationSystem', 'secure_load_information_system'));
        add_action('wp_ajax_add_information_system', array('InformationSystem', 'secure_add_information_system'));
        //add_action('wp_ajax_nopriv_add_information_system', array('InformationSystem', 'secure_add_information_system'));
        add_action('wp_ajax_update_information_system', array('InformationSystem','secure_update_information_system'));
        //add_action('wp_ajax_nopriv_update_information_system', array('InformationSystem','secure_update_information_system'));

        add_action('wp_ajax_delete_information_system', array('InformationSystem','secure_delete_information_system'));
        //add_action('wp_ajax_nopriv_delete_information_system', array('InformationSystem','secure_delete_information_system'));

        add_action('wp_ajax_search_information_system', array('InformationSystem','secure_search_information_system'));
        //add_action('wp_ajax_nopriv_search_information_system', array('InformationSystem','secure_search_information_system'));
        add_action('wp_ajax_search_information_system_extended', array('InformationSystem','secure_search_information_system_extended'));
        //add_action('wp_ajax_nopriv_search_information_system_extended', array('InformationSystem','secure_search_information_system_extended'));
        add_action('wp_ajax_load_expiring_systems', array('InformationSystem','secure_load_expiring_systems'));

        // ДОКУМЕНТЫ
        add_action('wp_ajax_load_document', array('Document', 'secure_load_document'));
        //add_action('wp_ajax_nopriv_load_document', array('Document', 'secure_load_document'));
        add_action('wp_ajax_add_document', array('Document', 'secure_add_document'));
        //add_action('wp_ajax_nopriv_add_document', array('Document', 'secure_add_document'));
        add_action('wp_ajax_update_document', array('Document','secure_update_document'));
        //add_action('wp_ajax_nopriv_update_document', array('Document','secure_update_document'));
        add_action('wp_ajax_delete_document', array('Document', 'secure_delete_document'));
        //add_action('wp_ajax_nopriv_delete_document', array('Document', 'secure_delete_document'));
        add_action('wp_ajax_search_document', array('Document','secure_search_document'));
        //add_action('wp_ajax_nopriv_search_document', array('Document','secure_search_document'));
        add_action('wp_ajax_search_document_extended', array('Document','secure_search_document_extended'));
        //add_action('wp_ajax_nopriv_search_document_extended', array('Document','secure_search_document_extended'));
        add_action('wp_ajax_load_document_version', array('Document', 'secure_load_document_version'));
        add_action('wp_ajax_load_document_version_list', array('Document', 'secure_load_document_version_list'));
        add_action('wp_ajax_load_single_document', array('Document', 'secure_load_single_document'));

        // СОТРУДНИКИ
        add_action('wp_ajax_load_employee', array('Employee', 'secure_load_employee'));
        //add_action('wp_ajax_nopriv_load_employee', array('Employee', 'secure_load_employee'));
        add_action('wp_ajax_add_employee', array('Employee', 'secure_add_employee'));
        //add_action('wp_ajax_nopriv_add_employee', array('Employee', 'secure_add_employee'));
        add_action('wp_ajax_update_employee', array('Employee','secure_update_employee'));
        add_action('wp_ajax_delete_employee', array('Employee', 'secure_delete_employee'));
        //add_action('wp_ajax_nopriv_delete_employee', array('Employee', 'secure_delete_employee'));
        add_action('wp_ajax_search_employee', array('Employee','secure_search_employee'));
        //add_action('wp_ajax_nopriv_search_employee', array('Employee','secure_search_employee'));
        add_action('wp_ajax_search_employee_extended', array('Employee','secure_search_employee_extended'));
        //add_action('wp_ajax_nopriv_search_employee_extended', array('Employee','secure_search_employee_extended'));
        add_action('wp_ajax_get_current_user_id', array('Employee','secure_get_current_user_id'));
        add_action('wp_ajax_employee_change_password', array('Employee','secure_employee_change_password'));
        //add_action('wp_ajax_get_avatar', array('Employee', 'secure_get_avatar'));
        // ДЕТАЛЬНЫЕ РАЗДЕЛЫ
        add_action('wp_ajax_load_information_system_developpers', array('InformationSystem', 'secure_load_information_system_developpers'));
        //add_action('wp_ajax_nopriv_load_information_system_developpers', array('InformationSystem', 'secure_load_information_system_developpers'));

        add_action('wp_ajax_load_administrator_information_systems', array('Administrator', 'secure_load_administrator_information_systems'));
        //add_action('wp_ajax_nopriv_load_administrator_information_systems', array('Administrator', 'secure_load_administrator_information_systems'));

        add_action('wp_ajax_load_information_system_documents', array('InformationSystem', 'secure_load_information_system_documents'));
        add_action('wp_ajax_load_information_system_remarks', array('InformationSystem', 'secure_load_information_system_remarks'));
        //add_action('wp_ajax_nopriv_load_information_system_remarks', array('InformationSystem', 'secure_load_information_system_remarks'));
        add_action('wp_ajax_load_information_system_administrators', array('InformationSystem', 'secure_load_information_system_administrators'));
        //add_action('wp_ajax_nopriv_load_information_system_administrators', array('InformationSystem', 'secure_load_information_system_administrators'));
        add_action('wp_ajax_load_information_system_contracts', array('InformationSystem', 'secure_load_information_system_contracts'));

        add_action('wp_ajax_load_document_send_list', array('Document', 'secure_load_document_send_list'));
        //add_action('wp_ajax_nopriv_load_document_send_list', array('Document', 'secure_load_document_send_list'));

        
    }

    /**
     * =====================   СМЕНИТЬ НАСТРОЙКИ =======================
     */
    function secure_update_settings(){
        $documents_folder = wp_normalize_path($_POST['documents_path']);
        $avatars_folder = wp_normalize_path($_POST['avatars_path']);
        update_option('documents_folder', $documents_folder);
        update_option('avatars_folder', $avatars_folder);
        echo "Настройки сохранены успешно";
        wp_die();
        
        
    }

    /**
     * ======================= СОЗДАНИЕ ТАБЛИЦ ==========================
     */
    public function secure_install_tables(){
        flush_rewrite_rules();
        $this->organization->table_install();
        $this->department->table_install();
        $this->document_kind->table_install();
        $this->organization->table_install();
        $this->document->table_install(); 
        $this->contract->table_install();
        $this->information_system->table_install();
        $this->administrator->table_install();  
        
    }

    /**
     * ============ ЗАПОЛНЕНИЕ ТАБЛИЦ ДАННЫМИ ПО-УМОЛЧАНИЮ ===============
     */
    public function secure_install_data_tables(){
        $this->organization->install_data();
        $this->department->install_data();
        $this->document_kind->install_data();
        $this->document->install_data();
        $this->contract->install_data();
        $this->information_system->install_data();
        $this->administrator->install_data(); 
        
    }

    /**
     * ========================== ДЕАКТИВАЦИЯ ПЛАГИНА =========================
     */
    function secure_deactivation(){
        flush_rewrite_rules();
    }

    /**
     * ========================= ЗАГРУЗКА ДАННЫХ КАРТОЧКИ =======================
     */
    function secure_load_card_data(){
        $results = '';
        $id = $_POST['id']; 
        switch($_POST['card']){
            case 'document_kind_card' :{ $results = $this->document_kind->secure_load_card_data($id);};break;
            case 'document_card' :{ $results = $this->document->secure_load_card_data($id);}; break;
            case 'department_card' :{ $results = $this->department->secure_load_card_data($id);}; break;
            case 'information_system_card':{ $results = $this->information_system->secure_load_card_data($id);}; break;
            case 'administrator_card' : { $results = $this->administrator->secure_load_card_data($id);}; break;
            case 'organization_card' : { $results = $this->organization->secure_load_card_data($id);}; break;
            case 'contract_card' : { $results = $this->contract->secure_load_card_data($id);}; break;
            case 'employee_card' : {$results = $this->employee->secure_load_card_data($id);}; break;
        }
        echo json_encode($results);
        wp_die();
}

    /**
     * ======================= УДАЛЕНИЕ ЗАПИСИ СПРАВОЧНИКА =======================
     */
    function secure_delete_record(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $wpdb->delete( $prefix . get_reference_name($_POST['card']), array( 'ID' => $_POST['id'] ), array( '%d' ));
        echo 'Запись ид = ' . $_POST['id'] . ' успешно удалена';
        wp_die();
    }
}


if (class_exists('SecDb')) {
    new SecDb();
}
