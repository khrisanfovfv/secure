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
        $result['photo'] = Employee::image_to_base64(get_template_directory().'/storage/avatars/2_naimovada.jpg');
        $result['last_name'] = $user->last_name;
        $result['first_name'] = $user->first_name;
        $result['middle_name'] = $user->middle_name;
        $result['email'] = $user->user_email;
        $result['organization_id'] = $user->organization;
        $result['organization_name'] = $wpdb->get_var( $wpdb->prepare("SELECT fullname FROM {$prefix}organization WHERE id = %d", $user->organization));
        $result['department_id'] = $user->department;
        $result['department_name'] = $wpdb->get_var( $wpdb->prepare("SELECT name FROM {$prefix}department WHERE id = %d", $user->department));
        return $result;
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
     * ==================== ДОБАВЛЕНИЕ ЗАПИСИ ОТДЕЛА ======================
     */
    function secure_add_employee(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];
        $wpdb->insert(
            $prefix . 'employee',
            array(
                'name' => $record['name'],
                'organization_id' => $record['organization_id'],
                'boss' => $record['boss'],
                'state' => $record['state']
            ),
            array(
                '%s', // name
                '%d', // organization_id
                '%s', // boss
                '%s'  // state
            )
        );
        wp_die();
    }

    /**
     * ==================== УДАЛЕНИЕ ЗАПИСИ ОТДЕЛА ======================
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
     * ====================== ОБНОВЛЕНИЕ ЗАПИСИ ОТДЕЛ ==========================
     */
    function secure_update_employee(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $record = $_POST['record'];

        $wpdb->update(
            $prefix . 'employee',
            array(
                'name' => $record['name'],
                'organization_id' => $record['organization_id'],
                'boss' => $record['boss'],
                'state' => $record['state']
            ),
            array( 'ID' => $record['id'] ),
            array(
                '%s', // name
                '%d', // organization_id
                '%s', // boss
                '%s'  // state
            ),
            array( '%d' )
        );
        echo 'Запись ид = ' . $record['id'] . ' успешно обновлена';
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
            $employee['organization_name'] = $organization_name;
            $employee['department_name'] = $department_name;
            $employee['email'] = $user->user_email;
            array_push($results, $employee);
        }
        echo json_encode($results);
        wp_die();
    }

}
?>