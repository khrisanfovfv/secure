<?php

/**
 * Post Template: Documents Kind
 */

 require_once(wp_normalize_path(get_template_directory()) . '/common.php');
 $resources = new Resources();
 $button_icons = $resources->get_button_icons();

global $wpdb;
$prefix = $wpdb->prefix;


?>
<!-- Идетификатор страницы -->
<p class="hide" id="page_id">document_kind</p>

<main class="main">
    <div class="content">
        <div class="reference">
            <p class="reference__title">Справочник Виды документов</p>
            <div class="reference__buttons">
                <button class="reference__button" id="document_kind_ref__create">
                    <img src="<?php echo get_template_directory_uri() . '/images/create-record.svg' ?>" alt="Создать">
                    <p>Создать</p>
                </button>
                <button class="reference__button reference__button_select" id="document_kind_ref__select">
                    <img src="<?php echo $button_icons->select ?>" alt="Выбрать">
                    <p>Выбрать</p>
                </button>
                <button class="reference__button" id="document_kind_ref__edit" disabled>
                    <img src="<?php echo get_template_directory_uri() . '/images/edit.svg' ?>" alt="Редактировать">
                    <p>Редактировать</p>
                </button>
                <button class="reference__button" id="document_kind_ref__copy" disabled>
                    <img src="<?php echo get_template_directory_uri() . '/images/copy.svg' ?>" alt="Копировать">
                    <p>Копировать</p>
                </button>
                <button class="reference__button" id="document_kind_ref__delete" disabled>
                    <img src="<?php echo get_template_directory_uri() . '/images/delete.svg' ?>" alt="Удалить">
                    <p>Удалить</p>
                </button>
                <button class="reference__button" id="document_kind_ref__excel">
                    <img src="<?php echo get_template_directory_uri() . '/images/excel.svg' ?>" alt="Exel">
                    <p>Эл. таб</p>
                </button>
                <button class="reference__button" id="document_kind_ref__filter">
                    <img src="<?php echo $button_icons->filter ?>" alt="Фильтр">
                </button>
            </div>
            <table class="reference__table" id="document_kind_ref__table">
                <thead>
                    <tr>
                        <th class="hide">Ид</th>
                        <th style="width: 35px;">№</th>
                        <th>Вид документа</th>
                        <th style="width: 200px;">Состояние</th>
                    </tr>
                    <tr class = 'hide' id="document_kind_ref__table_filter">
                        <th></th>
                        <th><input class="document_kind_filter" id="document_kind_ref__fname"></th>
                        <th><select class="document_kind_filter" id="document_kind_ref__fstate">
                            <option value=""></option>
                            <option value="Active">Действующая</option>
                            <option value="Inactive">Не Действующая</option>
                        </select></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Выводим строки таблицы -->
                    <?php
                    $document_kind_count = $wpdb->get_var("SELECT COUNT(*) FROM $prefix" . "document_kind");
                    for ($i = 0; $i < $document_kind_count; $i++) {
                        $row = $wpdb->get_row('SELECT id,name, state FROM ' . $prefix . 'document_kind', ARRAY_A, $i);
                    ?>
                        <tr class="document_kind_ref__table_row">
                            <td class="id hide"><?php echo $row["id"] ?></td>
                            <td><?php echo $i + 1 ?></td>
                            <td><?php echo esc_html($row["name"]) ?></td>
                            <td><?php echo secure_get_state($row["state"]) ?></td>
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
<div class="appdialog" id="document_kind_ref__dialog">
    <div class="appdialog__window" id="document_kind_ref__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="document_kind_ref__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="document_kind_ref__dialog_content"></div>
        </div>
    </div>
</div>

<!-- ОКНО УВЕДОМЛЕНИЯ -->
<div class="appdialog" id="document_kind_ref__notif">
        <div class="appdialog__window" id="document_kind_ref__notif_window">
            <div class="appdialog__header">
                <h3 class="appdialog__header_title" id="document_kind_ref__notif__header_title">Уведомление</h3>
                <a class="appdialog__header_close" href="#">
                    <span>&#10006;</span> </a>
            </div>
            <div class="appdialog__content">
                <div id="document_kind_ref__notif_content"></div>
                <div class="appdialog__finish_buttons">
                    <button class="appdialog__notify_button">OK</button>
                </div>
            </div>
        </div>
    </div>

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ ВИДЫ ДОКУМЕНТОВ -->
<div class="context-menu" id="document_kind_ref__context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="document_kind_ref__context_edit">
            <img src="<?php echo get_template_directory_uri() . '/images/edit.svg' ?>" alt="Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item" id="document_kind_ref__context_copy">
            <img src="<?php echo get_template_directory_uri() . '/images/copy.svg' ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="document_kind_ref__context_delete">
            <img src="<?php echo get_template_directory_uri() . '/images/delete.svg' ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>



