<?php

    /** 
     * Theme functions 
     * 
     * @package Secure
     * */

    
    
    /**
     * ПРИВЯЗЫВАЕТ ФАЙЛЫ СКРИПТОВ И СТИЛЕЙ К WORPRESS
     */
    add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );

    function add_theme_scripts() {
        
        wp_register_script( 'main_script', get_template_directory_uri() . '/js/main.min.js', array(), filemtime(get_template_directory() . '/js/main.min.js'), true );
        wp_register_style('main_style', get_template_directory_uri() . '/css/style.min.css', array(), filemtime(get_template_directory() . '/css/style.min.css'), 'all');
        wp_register_style('jquery_style', get_template_directory_uri() . '/css/jquery-ui.css', array(), filemtime(get_template_directory() . '/css/jquery-ui.css'), 'all');
        wp_enqueue_script('main_script');
        wp_enqueue_style('jquery_style');
        wp_enqueue_style('main_style'); 
        
        // Передаем переменную ajaxurl в main.js
        wp_localize_script('main_script','MainData', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'stack' => array()
        ));
    }

    // Добавляем действия для ajax-запросов 
    add_action('wp_ajax_get_site_url', 'get_url_site');
    add_action('wp_ajax_nopriv_get_site_url', 'get_url_site');
    add_action('wp_ajax_load_card', 'secure_load_card');
    add_action('wp_ajax_nopriv_load_card', 'secure_load_card');
    add_action('wp_ajax_load_reference', 'secure_load_reference');
    add_action('wp_ajax_nopriv_load_reference', 'secure_load_reference');
    // add_action('wp_ajax_load_card_data', 'secure_load_card_data');
    // add_action('wp_ajax_nopriv_load_card_data', 'secure_load_card_data');
    
    
    
    /**
     * ======================== ПОЛУЧЕНИЕ URL САЙТА =============================
     */
    function get_url_site(){
        echo home_url();
        wp_die();
    }

    /**
     * =========================== ЗАГРУЗКА КАРТОЧКИ ============================
     */
    function secure_load_card(){
        switch($_POST['card']){
            case 'document_kind_card' : get_template_part('inc/document_kind/document_kind_card');break;
            case 'department_card' : get_template_part('inc/department/department_card');break;
            case 'information_system_card' : get_template_part('inc/information_system/information_system_card');break;
            case 'administrator_card' : get_template_part('inc/administrator/administrator_card'); break;
            case 'organization_card' : get_template_part('inc/organization/organization_card'); break;

            case 'information_system_ref' : get_template_part('inc/information_system/information_system_ref'); break;
            
            case 'document_kind_search' : get_template_part('inc/document_kind/document_kind_search_form');break;
            case 'department_search' : get_template_part('inc/department/department_search_form'); break;
            case 'information_system_search' : get_template_part('inc/information_system/information_system_search_form');break;
            case 'administrator_search' : get_template_part('inc/administrator/administrator_search_form');break;
        }
        wp_die();
    }

    /**
     * =========================== ЗАГРУЗКА СПРАВОЧНИКА ============================
     */
    function secure_load_reference(){
        switch($_POST['reference']){
            case 'information_system' : get_template_part('inc/information_system/information_system_ref'); break;
            case 'administrator' : get_template_part('inc/administrator/administrator_ref'); break;
            case 'organization' : get_template_part('inc/organization/organization_ref'); break;
            case 'department' : get_template_part('inc/department/department_ref'); break;
        }
        wp_die();
    }

    
    //$args = array( 'supports' => array( 'page-attributes') );
    


    /** 
     * ==================== ПОЛУЧЕНИЕ СОСТОЯНИЯ ЗАПИСИ ===================
     * */
    function secure_get_state($state){
        switch ($state){
            case 'Active' : return 'Действующая'; break;
            case 'Inactive' : return 'Не действующая'; break;
            default : '';
        }
    }

    /**
     * ================= ВОЗВРАЩАЕТ ДА/НЕТ ВМЕСТО TRUE/FALSE ==============
     * @param {boolean} $value
     */
    function get_boolean_value($value){
        switch ($value){
            case 1: echo 'Да'; break;
            case 0: echo 'Нет'; break;
            default: echo '';break;
        }
    }

    /**
     * ========== ВОЗВРАЩАЕТ ПУСТУЮ СТРОКУ ЕСЛИ ДАТА НЕ ОПРЕДЕЛЕНА =========
     * @param {string} $value
     */
    function get_data_value($value){
        if ($value ==='0000-00-00'){
            echo '';
        } else echo $value;
    }



    /**
     * ================= ПОЛУЧЕНИЕ НАИМЕНОВАНИЯ СПРАВОЧНИКА ================ 
     */
    function get_reference_name($card){
        switch ($card){
            case 'document_kind_card' : return 'document_kind'; break;
            case 'information_system_card' : return 'information_system'; break;
            case 'administrator_card' : return 'administrator'; break;
            default :'';
        }

    }
   


?>