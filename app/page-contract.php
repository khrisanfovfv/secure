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
<p class="hide" id="page_id">contract</p>

<main class="main">
    <div class="content">
        <div class="reference">
            <p class="reference__title">Контракты</p>
            <div class="reference__buttons">
                <button class="reference__button" id="contract_ref__create">
                    <img src="<?php echo $button_icons->create ?>" alt="Создать">
                    <p>Создать</p>
                </button>
                <button class="reference__button" id="contract_ref__edit" disabled>
                    <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
                    <p>Редактировать</p>
                </button>
                <button class="reference__button" id="contract_ref__copy" disabled>
                    <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
                    <p>Копировать</p>
                </button>
                <button class="reference__button" id="contract_delete" disabled>
                    <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
                    <p>Удалить</p>
                </button>
                <button class="reference__button" id="contract_excel">
                    <img src="<?php echo $button_icons->excel ?>" alt="Excel">
                    <p>Эл. таб</p>
                </button>
                <button class="reference__button" id="contract_ref__update">
                    <img src="<?php echo $button_icons->update ?>" alt="Обновить">
                    <p>Обновить</p>
                </button>
            </div>
            <div class="contract_ref__container">
                <table class="reference__table" id="contract_ref__table">
                    <thead>
                        <tr>
                            <th style="width: 35px;">№</th>
                            <th style="width: 100px;">Номер</th>
                            <th style="width: 130px;">Дата заключения</th>
                            <th>Предмет контракта</th>
                            <th style="width: 130px;">Тип контракта</th>
                            <th>Ссылка на сайт закупок</th>
                            <th style="width: 130px;">Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Выводим строки таблицы -->
                        <?php
                        $rows = $wpdb->get_results(
                            $wpdb->prepare("SELECT * FROM {$prefix}contract"),
                            ARRAY_A
                        );
                        for ($i = 0; $i < count($rows); $i++) {
                            $row = $rows[$i];
                        ?>
                            <tr class="contract_ref__table_row">
                                <td class="id hide"><?php echo $row["id"] ?></td>
                                <td><?php echo $i + 1 ?></td>
                                <td><?php echo str_replace("\\","", $row["contract_number"]) ?></td>
                                <td style="text-align: left;"><?php echo str_replace("\\","", $row["conclusionDate"]) ?></td>
                                <td><?php echo $row["contract_subject"] ?></td>
                                <td><?php echo get_contract_type($row["contract_type"]) ?></td>
                                <td><?php echo $row["link"] ?></td>
                                <td><?php echo secure_get_state($row["contract_state"]) ?></td>
                                <!--td><!?php echo secure_get_state($row["state"]) ?></td-->
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
<div class="appdialog" id="contract_ref__dialog">
    <div class="appdialog__window" id="contract_ref__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="contract_ref__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="contract_ref__dialog_content"></div>
        </div>
    </div>
</div>

<!-- ОКНО УВЕДОМЛЕНИЯ -->
<div class="appdialog" id="contract_ref__notif">
    <div class="appdialog__window" id="contract_ref__notif_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="contract_ref__notif__header_title">Уведомление</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="contract_ref__notif_content"></div>
            <div class="appdialog__finish_buttons">
                <button class="appdialog__notify_button">OK</button>
            </div>
        </div>
    </div>
</div>

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ Контракты -->
<div class="context-menu" id="contract_ref__context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="contract_ref__context_edit">
            <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item" id="contract_ref__context_copy">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="contract_ref__context_delete">
            <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ЭЛЕМЕНТА reference_content -->
<div class="context-menu" id="contract_ref__out_context">
<ul class="context-menu__list">
    <li class="context-menu__item" id="contract_ref__out_context_create">
        <img src="<?php echo $button_icons->create ?>">
        <p>Создать</p>
    </li>
    <li class="context-menu__item" id="contract_ref__out_context_update">
        <img src="<?php echo $button_icons->update ?>">
        <p>Обновить</p>
    </li>
</ul>    
</div>
<script>
    // Стек для передачи данных между окнами
    stack = [];
</script>
<?php get_footer() ?>