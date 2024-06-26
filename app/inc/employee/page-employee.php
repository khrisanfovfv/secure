<?php 

/**
 * Post Template: Employee
 */

// Если пользователь не зашел в систему то перекидываем его на страницу авторизации
if (!is_user_logged_in()){
    header("Location: http://secure/login");
    die();
}

require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$button_icons = $resources->get_button_icons();


 get_header();

global $wpdb;
$prefix = $wpdb->prefix;


?>
<!-- Идетификатор страницы -->
<p class="hide" id="page_id">employee</p>

<main class="main">
    <div class="content">
        <div class="reference">
            <p class="reference__title">Справочник Сотрудники</p>
            <div class="reference__buttons">
                <button class="reference__button" id="employee_ref__create">
                    <img src="<?php echo $button_icons->create ?>" alt="Создать">
                    <p>Создать</p>
                </button>
                <button class="reference__button" id="employee_ref__edit" disabled>
                    <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
                    <p>Редактировать</p>
                </button>
                <button class="reference__button" id="employee_ref__copy" disabled>
                    <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
                    <p>Копировать</p>
                </button>
                <button class="reference__button" id="employee_ref__delete" disabled>
                    <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
                    <p>Удалить</p>
                </button>
                <button class="reference__button" id="employee_ref__excel">
                    <img src="<?php echo $button_icons->excel ?>" alt="Excel">
                    <p>Эл. таб</p>
                </button>
                <button class="reference__button" id="employee_ref__update">
                    <img src="<?php echo $button_icons->update ?>" alt="Update">
                    <p>Обновить</p>
                </button>
            </div>
            <div class="employee_ref__container">
                <table class="reference__table" id="employee_ref__table">
                    <thead>
                        <tr>
                            <th style="width: 35px;">№</th>
                            <th style="width: 130px;">Логин</th>
                            <th style="width: 130px;">Фамилия</th>
                            <th style="width: 130px;">Имя</th>
                            <th style="width: 130px;">Отчество</th>
                            <th>Организация</th>
                            <th>Отдел</th>
                            <th style="width: 250px;">email</th>
                            <th style="width: 130px;">Состояние</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Выводим строки таблицы -->
        
                        <?php
                        // sec_user и sec_usermeta - системные таблицы, на случай если что поменяется в структуре 
                        // напрямую запрос к этим таблицам не делаем
                        // используем системную функцию get_users
                        $users = get_users();
                        $ind = 1;
                        
                        foreach ($users as $user) {
                            // Подставляем значение поля Организация
                            $organization = $wpdb->get_var( $wpdb->prepare("SELECT fullname FROM {$prefix}organization WHERE id = %d", $user->organization));
                            // Подставляем значение поля Отдел
                            $department = $wpdb->get_var( $wpdb->prepare("SELECT name FROM {$prefix}department WHERE id = %d", $user->department));
                        ?>
                            <tr class="employee_ref__table_row">
                                <td class="id hide"><?php echo $user->id ?></td>
                                <td><?php echo $ind++ ?></td>
                                <td><?php echo $user->user_login ?></td>
                                <td><?php echo $user->first_name ?></td>
                                <td><?php echo $user->last_name ?></td>
                                <td><?php echo $user->middle_name ?></td>
                                <td><?php echo $organization ?></td>
                                <td><?php echo $department ?></td>
                                <td><?php echo $user->user_email ?></td>
                                <td><?php echo $user->state ?></td>
                            </tr>

                        <?php
                        }
                        ?>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</main>
<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="employee_ref__dialog">
    <div class="appdialog__window" id="employee_ref__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="employee_ref__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#" id="employee_ref__dialog_close">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="employee_ref__dialog_content"></div>
        </div>
    </div>
</div>

<!-- ОКНО УВЕДОМЛЕНИЯ -->
<div class="appdialog" id="employee_ref__notif">
    <div class="appdialog__window" id="employee_ref__notif_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="employee_ref__notif__header_title">Уведомление</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="employee_ref__notif_content"></div>
            <div class="appdialog__finish_buttons">
                <button class="appdialog__notify_button">OK</button>
            </div>
        </div>
    </div>
</div>

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ СОТРУДНИКИ -->
<div class="context-menu" id="employee_ref__context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="employee_ref__context_edit">
            <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item" id="employee_ref__context_copy">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="employee_ref__context_delete">
            <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ЭЛЕМЕНТА reference_content -->
<div class="context-menu" id="employee_ref__out_context">
<ul class="context-menu__list">
    <li class="context-menu__item" id="employee_ref__out_context_create">
        <img src="<?php echo $button_icons->create ?>">
        <p>Создать</p>
    </li>
    <li class="context-menu__item" id="employee_ref__out_context_update">
        <img src="<?php echo $button_icons->update ?>">
        <p>Обновить</p>
    </li>
</ul>    
</div>

<script>
    // Стек для передачи данных между окнами
    stack = [];
    dubl = 0;
</script>

<?php get_footer() ?>