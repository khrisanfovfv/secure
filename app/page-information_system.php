<?php
require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$button_icons = $resources->get_button_icons();


/**
 * Post Template: Information system
 */
get_header();

global $wpdb;
$prefix = $wpdb->prefix;


?>
<!-- Идетификатор страницы -->
<p class="hide" id="page_id">information_system</p>

<main class="main">
    <div class="content">
        <div class="reference">
            <p class="reference__title">Справочник Информационные системы</p>
            <div class="reference__buttons">
                <button class="reference__button" id="information_system_create">
                    <img src="<?php echo $button_icons->create ?>" alt="Создать">
                    <p>Создать</p>
                </button>
                <button class="reference__button" id="information_system_edit" disabled>
                    <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
                    <p>Редактировать</p>
                </button>
                <button class="reference__button" id="information_system_copy" disabled>
                    <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
                    <p>Копировать</p>
                </button>
                <button class="reference__button" id="information_system_delete" disabled>
                    <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
                    <p>Удалить</p>
                </button>
                <button class="reference__button" id="information_system_excel">
                    <img src="<?php echo $button_icons->excel ?>" alt="Exel">
                    <p>Эл. таб</p>
                </button>
            </div>
            <table class="reference__table" id="information_system_table">
                <thead>
                    <tr>
                        <th style="width: 35px;">№</th>
                        <th style="width: 200px;">Краткое наименование</th>
                        <th>Полн. наименование</th>
                        <th style="width: 130px;">Аттестована</th>
                        <th style="width: 130px;">Дата посл. аттестации</th>
                        <th style="width: 130px;">Срок след. аттестации</th>
                        <th style="width: 130px;">Проблемы ИБ</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Выводим строки таблицы -->
                    <?php
                    $information_system_count = $wpdb->get_var("SELECT COUNT(*) FROM $prefix" . "information_system");
                    for ($i = 0; $i < $information_system_count; $i++) {
                        $row = $wpdb->get_row('SELECT * FROM ' . $prefix . 
                                              'information_system', ARRAY_A, $i);
                    ?>
                        <tr class="information_system_table_row">
                            <td class="id hide"><?php echo $row["id"] ?></td>
                            <td><?php echo $i + 1 ?></td>
                            <td><?php echo $row["briefname"] ?></td>
                            <td style="text-align: left;"><?php echo $row["fullname"] ?></td>
                            <td><?php echo get_boolean_value($row["certified"]) ?></td>
                            <td><?php echo $row["certifydate"] ?></td>
                            <td><?php echo $row["commissioningdate"] ?></td>
                            <td><?php echo get_boolean_value($row["hasremark"]) ?></td>
                            <!--td><!?php echo secure_get_state($row["state"]) ?></td-->
                        </tr>

                        <?php
                    }
                        ?>
                </tbody>
            </table>
        </div>
    </div>
</main>
<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="information_system_ref__dialog">
    <div class="appdialog__window" id="information_system_ref__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="information_system_ref__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="information_system_ref__dialog_content"></div>
        </div>
    </div>
</div>

<!-- ОКНО УВЕДОМЛЕНИЯ -->
<div class="appdialog" id="information_system_ref__notif">
        <div class="appdialog__window" id="information_system_ref__notif_window">
            <div class="appdialog__header">
                <h3 class="appdialog__header_title" id="information_system_ref__notif__header_title">Уведомление</h3>
                <a class="appdialog__header_close" href="#">
                    <span>&#10006;</span> </a>
            </div>
            <div class="appdialog__content">
                <div id="information_system_ref__notif_content"></div>
                <div class="appdialog__finish_buttons">
                    <button class="appdialog__notify_button">OK</button>
                </div>
            </div>
        </div>
    </div>

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ ВИДЫ ДОКУМЕНТОВ -->
<div class="context-menu" id="information_system_ref__context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="information_system_ref__context_edit">
            <img src="<?php echo get_template_directory_uri() . '/images/edit.svg' ?>" alt="Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item" id="information_system_ref__context_copy">
            <img src="<?php echo get_template_directory_uri() . '/images/copy.svg' ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="information_system_ref__context_delete">
            <img src="<?php echo get_template_directory_uri() . '/images/delete.svg' ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>

<?php get_footer() ?>



