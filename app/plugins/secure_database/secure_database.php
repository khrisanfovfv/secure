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
require_once('document_kind.php');
require_once('information_system.php');

if (!function_exists('add_action')) {
    exit;
}

class SecDb
{
    protected $document_kind;
    protected $information_system;
    function __construct()
    {
        
        register_activation_hook(__FILE__, array($this, 'secure_install_tables'));
        register_activation_hook(__FILE__, array($this, 'secure_install_data_tables'));
        add_action('init', array($this, 'secure_init_plugin'));
        $this->information_system = new InformationSystem();
        
        //add_action( 'plugins_loaded', array($this, 'myplugin_update_db_check'));
    }

    public function secure_init_plugin(){
        // ОБЩИЕ
        add_action('wp_ajax_load_card_data', array($this,'secure_load_card_data'));
        add_action('wp_ajax_nopriv_load_card_data', array($this, 'secure_load_card_data'));
        add_action('wp_ajax_delete_record', array($this,'secure_delete_record'));
        add_action('wp_ajax_nopriv_delete_record', array($this, 'secure_delete_record'));
        // ВИДЫ ДОКУМЕНТОВ
        add_action('wp_ajax_load_document_kind',array('DocumentKind','secure_load_document_kind'));
        add_action('wp_ajax_nopriv_load_document_kind', array('DocumentKind','secure_load_document_kind'));
        add_action('wp_ajax_add_document_kind', array('DocumentKind','secure_add_document_kind'));
        add_action('wp_ajax_nopriv_add_document_kind', array('DocumentKind','secure_add_document_kind'));
        add_action('wp_ajax_update_document_kind', array('DocumentKind','secure_update_document_kind'));
        add_action('wp_ajax_nopriv_update_document_kind', array('DocumentKind','secure_update_document_kind'));
        add_action('wp_ajax_search_document_kind', array('DocumentKind','secure_search_document_kind'));
        add_action('wp_ajax_nopriv_search_document_kind', array('DocumentKind','secure_search_document_kind'));
        add_action('wp_ajax_search_search_document_kind_extended', array('DocumentKind','secure_search_document_kind_extended'));
        add_action('wp_ajax_nopriv_search_document_kind_extended', array('DocumentKind','secure_search_document_kind_extended'));

        add_action('wp_ajax_load_information_system', array('InformationSystem', 'secure_load_information_system'));
        add_action('wp_ajax_nopriv_load_information_system', array('InformationSystem', 'secure_load_information_system'));
        add_action('wp_ajax_add_information_system', array('InformationSystem', 'secure_add_information_system'));
        add_action('wp_ajax_nopriv_add_information_system', array('InformationSystem', 'secure_add_information_system'));
        add_action('wp_ajax_update_information_system', array('InformationSystem','secure_update_information_system'));
        add_action('wp_ajax_nopriv_update_information_system', array('InformationSystem','secure_update_information_system'));
        add_action('wp_ajax_search_information_system', array('InformationSystem','secure_search_information_system'));
        add_action('wp_ajax_nopriv_search_information_system', array('InformationSystem','secure_search_information_system'));
        add_action('wp_ajax_search_information_system_extended', array('InformationSystem','secure_search_information_system_extended'));
        add_action('wp_ajax_nopriv_search_information_system_extended', array('InformationSystem','secure_search_information_system_extended'));
        
    }

    /**
     * ======================= СОЗДАНИЕ ТАБЛИЦ ==========================
     */
    public function secure_install_tables(){
        $this->document_kind = new DocumentKind();
        $this->information_system->table_install();   
    }

    /**
     * ============ ЗАПОЛНЕНИЕ ТАБЛИЦ ДАННЫМИ ПО-УМОЛЧАНИЮ ===============
     */
    public function secure_install_data_tables(){
        $this->document_kind->install_data();
        $this->information_system->install_data();
    }

    /**
     * ========================= ЗАГРУЗКА ДАННЫХ КАРТОЧКИ =======================
     */
    function secure_load_card_data(){
        $results = '';
        $id = $_POST['id']; 
        switch($_POST['card']){
            case 'document_kind_card' :{ $results = $this->secure_select_data_card('document_kind', $id);};break;
            case 'information_system_card':{ $results = $this->information_system->secure_load_card_data($id);}; break;
        }
        echo json_encode($results);
        wp_die();
    }

    /**
     * ЗАГРУЗКА ДАННЫХ КАРТОЧКИ. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ
     */
    protected function secure_select_data_card($table_name, $id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}{$table_name} WHERE id = $id"), OBJECT );
        return $results;
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