<?php

    /** 
     * Theme functions 
     * 
     * @package Secure
     * */
    require_once('common.php');
    $user = wp_get_current_user();
    
    /**
     * ============ ДОБАВЛЕНИЕ ПОЛЕЙ К НАСТРОЙКАМ ПОЛЬЗОВАТЕЛЯ ==============
     */
    add_action( 'show_user_profile', 'extra_user_profile_fields' );
    add_action( 'edit_user_profile', 'extra_user_profile_fields' );

    function extra_user_profile_fields( $user ) { ?>
        <h3><?php _e("Extra profile information", "blank"); ?></h3>
        <table class="form-table">
            <tr>
                <th><label for="middle_name"><?php _e("Middlename"); ?></label></th>
                <td>
                    <input type="text" name="middle_name" id="middle_name"
                        value="<?php echo esc_attr( get_the_author_meta( 'middle_name', $user->ID ) ); ?>"
                        class="regular-text" /><br />
                    <span class="description"><?php _e("Please enter your middle_name."); ?></span>
                </td>
            </tr>
            <tr>
                <th><label for="organization"><?php _e("Organization"); ?></label></th>
                <td>
                    <input type="text" name="organization" id="organization"
                        value="<?php echo esc_attr( get_the_author_meta( 'organization', $user->ID ) ); ?>"
                        class="regular-text" /><br />
                    <span class="description"><?php _e("Please enter your organization."); ?></span>
                </td>
            </tr>
            <tr>
                <th><label for="department"><?php _e("Department"); ?></label></th>
                <td>
                    <input type="text" name="department" id="department"
                        value="<?php echo esc_attr( get_the_author_meta( 'department', $user->ID ) ); ?>"
                        class="regular-text" /><br />
                    <span class="description"><?php _e("Please enter your department."); ?></span>
                </td>
            </tr>
        </table>

<?php }

    add_action( 'personal_options_update', 'save_extra_user_profile_fields' );
    add_action( 'edit_user_profile_update', 'save_extra_user_profile_fields' );

    function save_extra_user_profile_fields( $user_id ) {

    if ( !current_user_can( 'edit_user', $user_id ) ) { return false; }

    update_user_meta( $user_id, 'middle_name', $_POST['middle_name'] );
    update_user_meta( $user_id, 'organization', $_POST['organization'] );
    update_user_meta( $user_id, 'department', $_POST['department'] );
    }


    /**
     * ================================ ПРИВЯЗКА ШАБЛОНОВ К СТРАНИЦАМ ===============================
     */
    add_filter('template_include', 'tie_template'); 
     
    function tie_template( $template ) {
        global $post;
        $slug = $post->post_name;
        switch ($slug){
            case 'login' : $new_template = locate_template(array('inc/login/page-login.php')); break;
            case 'information_system' : $new_template = locate_template(array('inc/information_system/page-information_system.php')); break;
            case 'department' : $new_template = locate_template(array('inc/department/page-department.php')); break;
            case 'document' : $new_template = locate_template(array('inc/document/page-document.php')); break;
            case 'document_kind' : $new_template = locate_template(array('inc/document_kind/page-document_kind.php')); break;
            case 'organization' : $new_template = locate_template(array('inc/organization/page-organization.php')); break;
            case 'administrator' : $new_template = locate_template(array('inc/administrator/page-administrator.php' )); break;
            case 'employee' : $new_template = locate_template(array('inc/employee/page-employee.php')); break; 
            default : $new_template = $template;
        }
        return $new_template;
    }

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
            'document_icons' => secure_get_document_icons(),
            'stack' => array(),
            'nonce' => wp_create_nonce('cit_secure')
        ));
    }

    // Добавляем действия для ajax-запросов 
    add_action('wp_ajax_get_site_url', 'get_url_site');
    add_action('wp_ajax_nopriv_get_site_url', 'get_url_site');
    add_action('wp_ajax_login', 'secure_login');
    add_action('wp_ajax_exit', 'secure_exit');
    add_action('wp_ajax_nopriv_login', 'secure_login');
    add_action('wp_ajax_load_card', 'secure_load_card');
    //add_action('wp_ajax_nopriv_load_card', 'secure_load_card');
    add_action('wp_ajax_load_reference', 'secure_load_reference');
    add_action('wp_ajax_nopriv_load_reference', 'secure_load_reference');
    add_action('wp_ajax_load_document_icons', 'secure_load_document_icons');
    add_action('wp_ajax_nopriv_load_document_icons', 'secure_load_document_icons');
    
    
    
    /**
     * ======================== ПОЛУЧЕНИЕ URL САЙТА =============================
     */
    function get_url_site(){
        echo home_url();
        wp_die();
    }
    /**
     * ====================== АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ ========================
     */
    function secure_login(){
        $record =  $_POST['record'];
        $creds = array();
        $creds['user_login'] = $record['username'];
        $creds['user_password'] = $record['password'];
        $creds['remember'] = $record['remember'];

        
        $user = wp_signon($creds);
        

        // авторизация не удалась
        if ( is_wp_error($user) ) {
            wp_die($user->get_error_message(),'Ошибка авторизации', ['response' => 401 ]);
        }
        
        get_site_url(null, 'information_system', null);
        wp_die();
    }

    /**
     * ====================== ВЫХОД ИЗ ПРОФИЛЯ =======================
     */
    function secure_exit(){
        $user_id = get_current_user_id();
	    wp_destroy_current_session();
	    wp_clear_auth_cookie();
	    wp_set_current_user( 0 );

	    /**
	    * Fires after a user is logged out.
	    *
	    * @since 1.5.0
	    * @since 5.5.0 Added the `$user_id` parameter.
	    *
	    * @param int $user_id ID of the user that was logged out.
	    */
	    do_action( 'wp_logout', $user_id );
        echo 'http://secure/login';
        wp_die();
    }



    

    /**
     * =========================== ЗАГРУЗКА КАРТОЧКИ ============================
     */
    function secure_load_card(){
        switch($_POST['card']){
            case 'document_kind_card' : get_template_part('inc/document_kind/document_kind_card');break;
            case 'document_card' : get_template_part('inc/document/document_card'); break;
            case 'document_version_card' : get_template_part('inc/document/document_version_card'); break;
            case 'department_card' : get_template_part('inc/department/department_card');break;
            case 'information_system_card' : get_template_part('inc/information_system/information_system_card');break;
            case 'administrator_card' : get_template_part('inc/administrator/administrator_card'); break;
            case 'organization_card' : get_template_part('inc/organization/organization_card'); break;
            case 'contract_card' : get_template_part('inc/contract/contract_card'); break;
            case 'information_system_ref' : get_template_part('inc/information_system/information_system_ref'); break;
            case 'profile_card' : get_template_part('inc/login/profile'); break;
            case 'employee_card' : get_template_part('inc/employee/employee_card'); break;
            case 'load_file_form' : get_template_part('load_file_form'); break;
            
            case 'document_kind_search' : get_template_part('inc/document_kind/document_kind_search_form');break;
            case 'document_search' : get_template_part('inc/document/document_search_form'); break;
            case 'department_search' : get_template_part('inc/department/department_search_form'); break;
            case 'information_system_search' : get_template_part('inc/information_system/information_system_search_form');break;
            case 'administrator_search' : get_template_part('inc/administrator/administrator_search_form');break;
            case 'organization_search' : get_template_part('inc/organization/organization_search_form');break;
            case 'employee_search' : get_template_part('inc/employee/employee_search_form'); break;
        }
        wp_die();
    }

    /**
     * =========================== ЗАГРУЗКА СПРАВОЧНИКА ============================
     */
    function secure_load_reference(){
        try{
            switch($_POST['reference']){
                case 'information_system' : get_template_part('inc/information_system/information_system_ref'); break;
                case 'administrator' : get_template_part('inc/administrator/administrator_ref'); break;
                case 'organization' : get_template_part('inc/organization/organization_ref'); break;
                case 'department' : get_template_part('inc/department/department_ref'); break;
                case 'document_kind' : get_template_part('inc/document_kind/document_kind_ref'); break;
            }
        } catch(Exception $ex){
            wp_die($ex->getMessage(),['response' => 501]);
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

    /** 
     * ==================== ПОЛУЧЕНИЕ ИКОНОК ДОКУМЕНТОВ ====================
     * */
    function secure_get_document_icons(){
        $icons = new Resources();
        return json_encode($icons->get_document_icons());
    }




   


?>