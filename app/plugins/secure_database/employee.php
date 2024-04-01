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

    /**
     * ============================ ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ===============================
     */
     public function secure_load_card_data($id){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT employee.id, employee.name, organization.id as organization_id, organization.fullname as organization_name, employee.boss, employee.state FROM {$prefix}employee employee JOIN {$prefix}organization organization on employee.organization_id = organization.id
            WHERE employee.id = %d", $id), OBJECT );
        return $results;
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
     * ================= ОТДЕЛЫ. РАСШИРЕННЫЙ ПОИСК =================
     */
    function secure_search_employee_extended(){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $name = $_POST['name'];
        $organization_id = $_POST['organization_id'];
        $boss = $_POST['boss'];
        $state = $_POST['state'];
        $wild = '%';
        $like_name = $wild . $wpdb->esc_like($name) .$wild;
        $organization_query = $organization_id != '' ? "organization.id='$organization_id' AND" : '';
        $like_boss = $wild . $wpdb->esc_like($boss) .$wild;
        $state_query = $state !='' ? "AND employee.state='$state'" : '';        
        $results = $wpdb->get_results( 
            $wpdb->prepare("SELECT employee.id, employee.name, organization.fullname as organization_name, employee.boss, employee.state FROM {$prefix}employee employee 
            JOIN {$prefix}organization organization on employee.organization_id = organization.id
            WHERE employee.name LIKE %s AND $organization_query employee.boss LIKE %s $state_query", array($like_name, $like_boss)), ARRAY_A 
    
        );
        echo json_encode($results);
        wp_die();
    }

}
?>