<?php 

class Employee{
    protected $table_name;
    public function __construct() {
        $this->table_name = 'employee';
    }

    /**
     * ================ ПОЛУЧЕНИЕ ЗАПИСЕЙ ТАБЛИЦЫ СОТРУДНИКИ =================
     */
    public function secure_load_employee(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $users = get_users();
        $employeers = array();
        foreach ($users as $user) {
            $employee = array();
            // Значение поля Организация
            $organization_name = $wpdb->get_var( $wpdb->prepare("SELECT fullname FROM {$prefix}organization WHERE id = %d", $user->organization));
            // Значение поля Отдел
            $department_name = $wpdb->get_var( $wpdb->prepare("SELECT name FROM {$prefix}department WHERE id = %d", $user->department));

            $employee['id'] = $user->id;
            $employee['login'] = $user->user_login;
            $employee['first_name'] = $user->first_name;
            $employee['middle_name'] = $user->middle_name;
            $employee['last_name'] = $user->last_name;
            $employee['organization_name'] = $organization_name;
            $employee['department_name'] = $department_name;
            $employee['email'] = $user->user_email;
            array_push($employeers, $employee);
        }
        echo json_encode($employeers);
        wp_die();
    }

    /** Преобразование изображения в кодирофку base64 */
    function image_to_base64($path_to_image)
    {
        $path =  wp_normalize_path($path_to_image); 
        $type = pathinfo($path_to_image, PATHINFO_EXTENSION);
        $image = file_get_contents($path_to_image);
        if ($image === false){
            wp_die('Не удалось загрузить файл', 'Ошибка', array('response' => 500));
        }
        $type = pathinfo($path_to_image, PATHINFO_EXTENSION);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($image) ;
        return $base64;
    }

    /**
     * ============================ ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ===============================
     */
     public function secure_load_card_data($id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $result = array();
        $user = get_user_by('id', $id);
        $result['id'] = $user->id;
        $result['login'] = $user->user_login;
        // ЗАГРУЖАЕМ аватар
        $result['photo'] = get_template_directory_uri() . '/storage/avatars/' . get_user_meta($id,'avatar_path', true);
        $result['last_name'] = $user->last_name;
        $result['first_name'] = $user->first_name;
        $result['middle_name'] = $user->middle_name;
        $result['email'] = $user->user_email;
        $result['organization_id'] = $user->organization;
        $result['organization_name'] = $wpdb->get_var( $wpdb->prepare("SELECT fullname FROM {$prefix}organization WHERE id = %d", $user->organization));
        $result['department_id'] = $user->department;
        $result['department_name'] = $wpdb->get_var( $wpdb->prepare("SELECT name FROM {$prefix}department WHERE id = %d", $user->department));
        return $result;
     }

     // Получение ид текущего пользователя
     function secure_get_current_user_id(){
        echo get_current_user_id();
        wp_die();
     }

     /**
     * ЗАГРУЗКА ДАННЫХ КАРТОЧКИ. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ
     */
    /* protected function secure_select_data_card($table_name, $id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT * FROM {$prefix}{$table_name} WHERE id = $id"), OBJECT );
        return $results;
        wp_die();
    } */


    /**
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ СОТРУДНИК ======================
     */
    function secure_add_employee(){
        check_ajax_referer( 'cit_secure', 'nonce' ); // защита
        $userdata = [
            'user_login'            =>      $_POST['login'],
            'user_pass'             =>      $_POST['password'],
            'user_email'            =>      $_POST['email'],
            'last_name'             =>      $_POST['last_name'],
            'first_name'            =>      $_POST['first_name'],
            'rich_editing'          =>     'false',
            'show_admin_bar_front'  =>      $_POST['role'] == 'administrator' ? 'true' : 'false',
            'role'                  =>      $_POST['role'],
            'meta_input'            =>      [
                'middle_name'       =>      $_POST['middle_name'],
                'organization'      =>      $_POST['organization'],
                'department'        =>      $_POST['department']
            ]
        ];

        $id = wp_insert_user( $userdata );
        
        // Загружаем аватар
        if(!empty( $_FILES )){
		    $files = $_FILES;
            $file_name = $files[0]['name'];
            $ext =  pathinfo($file_name, PATHINFO_EXTENSION);
            // Путь к папке с аватарами
            $path = wp_normalize_path(get_template_directory() .'/storage/avatars/');
            $file_name =  $id . '_' . $_POST['login'] . '.' . $ext;
            $path_avatar = $path . $file_name;
            // Записываем файл на сервер
            if (move_uploaded_file($_FILES[0]['tmp_name'], $path_avatar) === false){
                wp_send_json_error( 'Ошибка загрузки файла');
            }
		}

        $user = get_user_by('id',$id);
        update_user_meta( $user->id, 'avatar_path', $file_name);
        update_user_meta($user->id,'avatar_ext', $ext);



        wp_send_json_success( 'Запись ИД =' .  $id . 'Добавлена успешно!');
        wp_die();
    }

    /**
     * ==================== УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ======================
     */
    function secure_delete_employee(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $employee_id = $_POST['id'];
        
        // Удаляем запись отдел
        $wpdb->delete( $prefix.'employee', array( 'ID' => $employee_id ), array( '%d' ));
        echo 'Запись ид = ' . $_POST['id'] . ' успешно удалена';
        wp_die();

    }
     


    /** 
     * ====================== ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ==========================
     */
    function secure_update_employee(){
        check_ajax_referer( 'cit_secure', 'nonce' ); // защита
        $id = $_POST['id'];
        $user = get_user_by('id',$id);
        $user->user_login       =      $_POST['login'];
        $user-> user_pass       =      $_POST['password'];
        $user-> user_email      =      $_POST['email'];
        $user->last_name        =      $_POST['last_name'];
        $user->first_name       =      $_POST['first_name'];
        $user->role             =      $_POST['role'];
        $user->show_admin_bar_front     =      $_POST['role'] == 'administrator' ? 'true' : 'false';
        update_user_meta( $id, 'middle_name' , $_POST['middle_name']);
        update_user_meta( $id, 'organization' , $_POST['organization']);
        update_user_meta( $id, 'department' , $_POST['department']);

        // Загружаем аватар
        if(!empty( $_FILES )){           
		    $files = $_FILES;
            $file_name = $files[0]['name'];
            $ext =  pathinfo($file_name, PATHINFO_EXTENSION);
            // Путь к папке с аватарами
            $path = wp_normalize_path(get_template_directory() .'/storage/avatars/');
            $file_name =  $id . '_' . $_POST['login'] . '.' . $ext;
            $path_avatar = $path . $file_name;
            // Записываем файл на сервер
            if (move_uploaded_file($_FILES[0]['tmp_name'], $path_avatar) === false){
                wp_send_json_error( 'Ошибка загрузки файла');
            } else{
                update_user_meta( $id, 'avatar_path' , $file_name);
                update_user_meta($user->id,'avatar_ext', $ext);
            }
		}

        wp_send_json_success( 'Запись ИД =' .  $id . ' ' . 'какая-то надпись' . ' обновлена успешно!');
        wp_die();
    }

    /**
     * ============== СМЕНА ПАРОЛЯ =============
     */
    function  secure_employee_change_password(){
        $user_id = get_current_user_id();
        $user_info = get_userdata( $user_id );
        $new_password = $_POST['new_password'];
        wp_set_password($new_password, $user_id);
        // авторизация с новыми учетными данными

        $creds = array();
        $creds['user_login'] = $user_info->user_login;
        $creds['user_password'] = $new_password;
        $creds['remember'] = $user_info->remember;

        $user = wp_signon($creds);
        
        echo "Пароль для пользователя $user_info->user_login изменен";
        wp_die();
    }


    /**
     * ================ СОТРУДНИКИ. ОБЩИЙ ПОИСК =================
     */
    function secure_search_employee(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $value = mb_strtolower($_POST['value']);
        $results = array();
        // Преобразуем массив объектов в двумерный массив
        $users = get_users();
        foreach($users as $user){
            $exist = false;
            // Значение поля Организация
            $organization_name = $wpdb->get_var( $wpdb->prepare("SELECT fullname FROM {$prefix}organization WHERE id = %d", $user->organization));
            // Значение поля Отдел
            $department_name = $wpdb->get_var( $wpdb->prepare("SELECT name FROM {$prefix}department WHERE id = %d", $user->department));
            // Проверяем есть ли совпадения
            // здесь именно !==, т.к. 0 интерпретируется как false
            if (strpos(mb_strtolower($user->user_login),$value)!==false){ $exist = true;};
            if (strpos(mb_strtolower($user->last_name),$value)!==false){ $exist = true;};
            if (strpos(mb_strtolower($user->first_name),$value)!==false){ $exist = true;};
            if (strpos(mb_strtolower($user->middle_name),$value)!==false){ $exist = true;};
            if (strpos(mb_strtolower($organization_name),$value)!==false){ $exist = true;};
            if (strpos(mb_strtolower($department_name),$value)!==false){ $exist = true;};
            if (strpos(mb_strtolower($user->user_email),$value)!==false){ $exist = true;};
            
            // Если совпадение есть выводим данные о пользователе
            if ($exist == true){
                $employee = array();
                $employee['login'] = $user->user_login;
                $employee['first_name'] = $user->first_name;
                $employee['middle_name'] = $user->middle_name;
                $employee['last_name'] = $user->last_name;
                $employee['organization_name'] = $organization_name;
                $employee['department_name'] = $department_name;
                $employee['email'] = $user->user_email;
                array_push($results, $employee);
            }
        }
        echo json_encode($results);
        wp_die();
    }

    /**
     * ================= СОТРУДНИКИ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_employee_extended(){
        global $wpdb;
        $results = array();
        $prefix = $wpdb->prefix;
        $login = $_POST['login'];
        $last_name = $_POST['last_name'];
        $first_name = $_POST['first_name'];
        $middle_name = $_POST['middle_name'];
        $organization_id = $_POST['organization_id'];
        $organization_id = $_POST['department_id'];
        $email = $_POST['email'];
        $state = $_POST['state'];
        

        $args = array(
            'role__in' => array('administrator','author'), 
            'login' => $login,
            'meta_query' => array(
                'relation' => 'OR',
                array(
                    'key' => 'last_name',
                    'value' => $last_name,
                    'compare' => 'LIKE'
                ),
                array(
                    'key' => 'first_name',
                    'value' => $first_name,
                    'compare' => 'LIKE'
                ),
            )
        );
    $users = get_users($args); 
        foreach ($users as $user){
            $employee = array();
            $employee['login'] = $user->user_login;
            $employee['first_name'] = $user->first_name;
            $employee['middle_name'] = $user->middle_name;
            $employee['last_name'] = $user->last_name;
            //$employee['organization_name'] = $organization_name;
            //$employee['department_name'] = $department_name;
            $employee['email'] = $user->user_email;
            array_push($results, $employee);
        }
        echo json_encode($results);
        wp_die();
    }

}

