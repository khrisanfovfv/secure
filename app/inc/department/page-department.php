<?php
/**
 * Post Template: Department
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
<p class="hide" id="page_id">department</p>

<main class="main">
    <div class="content">
        <div class="reference">
            <p class="reference__title">Справочник Отделы</p>
            <div class="reference__buttons">
                <button class="reference__button" id="department_ref__create">
                    <img src="<?php echo $button_icons->create ?>" alt="Создать">
                    <p>Создать</p>
                </button>
                <button class="reference__button" id="department_ref__edit" disabled>
                    <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
                    <p>Редактировать</p>
                </button>
                <button class="reference__button" id="department_ref__copy" disabled>
                    <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
                    <p>Копировать</p>
                </button>
                <button class="reference__button" id="department_ref__delete" disabled>
                    <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
                    <p>Удалить</p>
                </button>
                <button class="reference__button" id="department_ref__excel">
                    <img src="<?php echo $button_icons->excel ?>" alt="Exel">
                    <p>Эл. таб</p>
                </button>
                <button class="reference__button" id="department_ref__update">
                    <img src="<?php echo $button_icons->update ?>" alt="Update">
                    <p>Обновить</p>
                </button>
                <button class="reference__button" id="department_ref__filter">
                    <img src="<?php echo $button_icons->filter ?>" alt="Фильтр">
                </button>
            </div>
            <div class="department_ref__container">
                <table class="reference__table" id="department_ref__table">
                    <thead>
                        <tr>
                            <th class="hide">Ид</th>
                            <th style="width: 35px;">№</th>
                            <th>Наименование</th>
                            <th>Организация</th>
                            <th style="width: 200px;">Руководитель</th>
                            <th style="width: 200px;">Состояние</th>
                        </tr>
                        <tr class = 'hide' id="department_ref__container_filter">
                        <th></th>
                            <th><input class="department_filter" id="department_ref___fname"></th>
                            <th><input class="department_filter" id="department_ref___forganization"></th>
                            <th><input class="department_filter" id="department_ref___fboss"></th>
                            <th><select class="department_filter" id="department_ref__fstate">
                                <option value=""></option>
                                <option value="Active">Действующая</option>
                                <option value="Inactive">Не Действующая</option>
                            </select></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Выводим строки таблицы -->
                        <?php
                        $rows = $wpdb->get_results(
                            $wpdb->prepare("SELECT department.id, department.name, organization.fullname as organization_name, department.boss, department.state FROM {$prefix}department department JOIN {$prefix}organization organization on department.organization_id = organization.id"),
                            ARRAY_A
                        );
                        for ($i = 0; $i < count($rows); $i++) {
                            $row = $rows[$i];
                        ?>
                            <tr class="department_ref__table_row">
                                <td class="id hide"><?php echo $row["id"] ?></td>
                                <td><?php echo $i + 1 ?></td>
                                <td><?php echo esc_html($row["name"]) ?></td>
                                <td><?php echo esc_html($row["organization_name"]) ?></td>
                                <td><?php echo esc_html($row["boss"]) ?></td>
                                <td><?php echo secure_get_state($row["state"]) ?></td>
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
<div class="appdialog" id="department_ref__dialog">
    <div class="appdialog__window" id="department_ref__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="department_ref__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="department_ref__dialog_content"></div>
        </div>
    </div>
</div>

<!-- ОКНО УВЕДОМЛЕНИЯ -->
<div class="appdialog" id="department_ref__notif">
    <div class="appdialog__window" id="department_ref__notif_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="department_ref__notif__header_title">Уведомление</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="department_ref__notif_content"></div>
            <div class="appdialog__finish_buttons">
                <button class="appdialog__notify_button">OK</button>
            </div>
        </div>
    </div>
</div>

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ ОТДЕЛЫ -->
<div class="context-menu" id="department_ref__context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="department_ref__context_edit">
            <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item" id="department_ref__context_copy">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="department_ref__context_delete">
            <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ПД ТАБЛИЦЕЙ ОТДЕЛЫ -->
<div class="context-menu" id="department_ref__out_context">
<ul class="context-menu__list">
    <li class="context-menu__item" id="department_ref__out_context_create">
        <img src="<?php echo $button_icons->create ?>">
        <p>Создать</p>
    </li>
    <li class="context-menu__item" id="department_ref__out_context_update">
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