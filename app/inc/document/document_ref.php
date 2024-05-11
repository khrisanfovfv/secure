<?php 

require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$button_icons = $resources->get_button_icons();


global $wpdb;
$prefix = $wpdb->prefix;


?>
<!-- Идетификатор страницы -->
<p class="hide" id="page_id">document</p>

<main class="main">
    <div class="content">
        <div class="reference">
            <p class="reference__title">Справочник Информационные системы</p>
            <div class="reference__buttons">
                <button class="reference__button" id="document_ref__create">
                    <img src="<?php echo $button_icons->create ?>" alt="Создать">
                    <p>Создать</p>
                </button>
                <button class="reference__button reference__button_select" id="document_ref__select">
                    <img src="<?php echo $button_icons->select ?>" alt="Выбрать">
                    <p>Выбрать</p>
                </button>
                <button class="reference__button" id="document_ref__edit" disabled>
                    <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
                    <p>Редактировать</p>
                </button>
                <button class="reference__button" id="document_ref__copy" disabled>
                    <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
                    <p>Копировать</p>
                </button>
                <button class="reference__button" id="document_ref__delete" disabled>
                    <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
                    <p>Удалить</p>
                </button>
                <button class="reference__button" id="document_ref__excel">
                    <img src="<?php echo $button_icons->excel ?>" alt="Excel">
                    <p>Эл. таб</p>
                </button>
                <button class="reference__button" id="document_ref__update">
                    <img src="<?php echo $button_icons->update ?>" alt="Update">
                    <p>Обновить</p>
                </button>
            </div>
            <div class="document_ref__container">
                <table class="reference__table" id="document_ref__table">
                    <thead>
                        <tr>
                            <th style="width: 35px;">№</th>
                            <th style="width: 130px;">Номер</th>
                            <th style="width: 130px;">Дата</th>
                            <th>Наименование</th>
                            <th style="width: 250px;">Тип</th>
                            <th style="width: 130px;">Состояние</tr> 
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Выводим строки таблицы -->
                        <?php
                        $rows = $wpdb->get_results(
                            $wpdb->prepare("SELECT document.id, document.number, document.documentdate, document.name, document_kind.name as document_kind, document.state  FROM {$prefix}document document 
                                LEFT JOIN {$prefix}document_kind document_kind on document.kind = document_kind.id"),
                            ARRAY_A
                        );
                        for ($i = 0; $i < count($rows); $i++) {
                            $row = $rows[$i];
                        ?>
                            <tr class="document_ref__table_row">
                                <td class="id hide"><?php echo $row["id"] ?></td>
                                <td><?php echo $i + 1 ?></td>
                                <td><?php echo $row["number"] ?></td>
                                <td><?php echo $row["documentdate"] ?></td>
                                <td style="text-align: left;"><?php echo $row["name"] ?></td>
                                <td><?php echo $row["document_kind"]?></td>
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
<div class="appdialog" id="document_ref__dialog">
    <div class="appdialog__window" id="document_ref__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="document_ref__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#" id="document_ref__dialog_close">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="document_ref__dialog_content"></div>
        </div>
    </div>
</div>

<!-- ОКНО УВЕДОМЛЕНИЯ -->
<div class="appdialog" id="document_ref__notif">
    <div class="appdialog__window" id="document_ref__notif_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="document_ref__notif__header_title">Уведомление</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="document_ref__notif_content"></div>
            <div class="appdialog__finish_buttons">
                <button class="appdialog__notify_button">OK</button>
            </div>
        </div>
    </div>
</div>

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ ДОКУМЕНТЫ -->
<div class="context-menu" id="document_ref__context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="document_ref__context_edit">
            <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item" id="document_ref__context_copy">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="document_ref__context_delete">
            <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ЭЛЕМЕНТА reference_content -->
<div class="context-menu" id="document_ref__out_context">
<ul class="context-menu__list">
    <li class="context-menu__item" id="document_ref__out_context_create">
        <img src="<?php echo $button_icons->create ?>">
        <p>Создать</p>
    </li>
    <li class="context-menu__item" id="document_ref__out_context_update">
        <img src="<?php echo $button_icons->update ?>">
        <p>Обновить</p>
    </li>
</ul>    
</div>