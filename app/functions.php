<?php

    /** 
     * Theme functions 
     * 
     * @package Secure
     * */

    

    add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );

    function add_theme_scripts() {
        
        wp_register_script( 'main_script', get_template_directory_uri() . '/js/main.min.js', array(), filemtime(get_template_directory() . '/js/main.min.js'), true );
        wp_register_style('main_style', get_template_directory_uri() . '/css/style.min.css', array(), filemtime(get_template_directory() . '/css/style.min.css'), 'all');
        wp_enqueue_script('main_script');
        wp_enqueue_style('main_style');   

        wp_localize_script('main_script','MainData', array(
            'ajaxurl' => admin_url('admin-ajax.php')
        ));
    }

    add_action('wp_ajax_get_site_url', 'get_url_site');
    add_action('wp_ajax_nopriv_get_site_url', 'get_url_site');
    add_action('wp_ajax_load_card', 'secure_load_card');
    add_action('wp_ajax_nopriv_load_card', 'secure_load_card');
    add_action('wp_ajax_load_card_data', 'secure_load_card_data');
    add_action('wp_ajax_nopriv_load_card_data', 'secure_load_card_data');
    add_action('wp_ajax_load_document_kind', 'secure_load_document_kind');
    add_action('wp_ajax_nopriv_load_document_kind', 'secure_load_document_kind');
    add_action('wp_ajax_add_document_kind', 'secure_add_document_kind');
    add_action('wp_ajax_nopriv_add_document_kind', 'secure_add_document_kind');
    add_action('wp_ajax_update_document_kind', 'secure_update_document_kind');
    add_action('wp_ajax_nopriv_update_document_kind', 'secure_update_document_kind');
    add_action('wp_ajax_delete_document_kind', 'secure_delete_document_kind');
    add_action('wp_ajax_nopriv_delete_document_kind', 'secure_delete_document_kind');



    //add_action( 'admin_print_scripts', 'my_action_javascript' ); // такое подключение будет работать не всегда
    //add_action( 'admin_print_footer_scripts', 'my_action_javascript', 99 );

    function get_url_site(){
        echo home_url();
        wp_die();
    }

    function secure_load_card(){
        switch($_POST['card']){
            case 'document_kind_card' : get_template_part('reference/document_kind_card');break;
        }
        wp_die();
    }

    function secure_load_card_data(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = '';
        $id = $_POST['id']; 
        switch($_POST['card']){
            case 'document_kind_card' :{    
                $results = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}document_kind WHERE id = $id", OBJECT );
            }
        }
        echo json_encode($results);
        wp_die();
    }

    function secure_load_document_kind(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( "SELECT * FROM sec_document_kind", ARRAY_A ); 
        echo json_encode($results);
        wp_die();
    }


    //$args = array( 'supports' => array( 'page-attributes') );
    function secure_add_document_kind(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        $wpdb->insert(
            'sec_document_kind',
            array(
                'name' => $record['name'],
                'state' => $record['state'] 
            ),
            array(
                '%s', '%s'
            )
        );
        wp_die();
    }

    function secure_delete_document_kind(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $wpdb->delete( $prefix . 'document_kind', array( 'ID' => $_POST['value'] ), array( '%d' ));
        echo 'Запись ид = ' . $_POST['value'] . ' успешно удалена';
        wp_die();
    }

    function secure_update_document_kind(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix . 'document_kind',
            array(
                'name' => $record['name'],
                'state' => $record['state']	
            ),
            array( 'ID' => $record['id'] ),
            array(
                '%s',	
                '%s'
            ),
            array( '%d' )
        );
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
        wp_die();
    }

    function secure_get_state($state){
        switch ($state){
            case 'Active' : return 'Действующая'; break;
            case 'Inactive' : return 'Не действующая'; break;
            default : '';
        }
    }
   


?>