<?php
require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$button_icons = $resources->get_button_icons();


/**
 * Post Template: Information system
 */


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
                <button class="reference__button" id="information_system_ref__create">
                    <img src="<?php echo $button_icons->create ?>" alt="Создать">
                    <p>Создать</p>
                </button>
                <button class="reference__button reference__button_select" id="information_system_ref__select" disabled>
                    <img src="<?php echo $button_icons->select ?>" alt="Выбрать">
                    <p>Выбрать</p>
                </button>
                <button class="reference__button" id="information_system_ref__edit" disabled>
                    <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
                    <p>Редактировать</p>
                </button>
                <button class="reference__button" id="information_system_ref__copy" disabled>
                    <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
                    <p>Копировать</p>
                </button>
                <button class="reference__button" id="information_system_ref__delete" disabled>
                    <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
                    <p>Удалить</p>
                </button>
                <button class="reference__button" id="information_system_ref__excel">
                    <img src="<?php echo $button_icons->excel ?>" alt="Excel">
                    <p>Эл. таб</p>
                </button>
                <button class="reference__button" id="information_system_ref__update">
                    <img src="<?php echo $button_icons->update ?>" alt="Update">
                    <p>Обновить</p>
                </button>
                <button class="reference__button" id="information_system_ref__filter">
                    <img src="<?php echo $button_icons->filter ?>" alt="Фильтр">
                </button>
            </div>
            <div class="information_system_ref__container">
                <table class="reference__table" id="information_system_ref__table">
                    <thead>
                        <tr>
                            <th style="width: 35px;">№</th>
                            <th style="width: 200px;">Краткое наименование</th>
                            <th>Полн. наименование</th>
                            <th style="width: 130px;">Аттестована</th>
                            <th style="width: 130px;">Периодичность аттестации</th>
                            <th style="width: 130px;">Дата аттестации</th>
                            <th style="width: 130px;">Дата ввода в эксплуатацию</th>
                            <th style="width: 130px;">Проблемы ИБ</th>
                            <th style="width: 170px;">Состояние</th>
                        </tr>
                        <tr class = 'hide' id="information_system_ref__container_filter">
                            <th></th>
                            <th><input class="information_system_filter" id="information_system_ref__fbriefname"></th>
                            <th><input class="information_system_filter" id="information_system_ref__ffullname"></th>
                            <th><select class="information_system_filter" id="information_system_ref__fcerified">
                                <option value=""></option>
                                <option value="1">Да</option>
                                <option value="0" >Нет</option>
                            </select></th>
                            <th><select class="information_system_filter" id="information_system_ref__fperiodicity">
                                <option value=""></option>
                                <option value="half_year">Пол года</option>
                                <option value="year">Год</option>
                                <option value="two_years">Два года</option>
                            </select></th>
                            <th><input class="information_system_filter"  id="information_system_ref__fcertifydate"></th>
                            <th><input class="information_system_filter"  id="information_system_ref__fcommissioningdate"></th>
                            <th><select class="information_system_filter" id="information_system_ref__fhasremark">
                                <option value=""></option>
                                <option value="1">Да</option>
                                <option value="0" >Нет</option>
                            </select></th>
                            <th><select class="information_system_filter" id="information_system_ref__fstate">
                            <option value=""></option>
                            <option value="Active" selected="selected">Действующая</option>
                            <option value="Inactive">Не Действующая</option>
                        </select></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Выводим строки таблицы -->
                        <?php
                        $rows = $wpdb->get_results(
                            $wpdb->prepare("SELECT * FROM {$prefix}information_system"),
                            ARRAY_A
                        );
                        for ($i = 0; $i < count($rows); $i++) {
                            $row = $rows[$i];
                        ?>
                            <tr class="information_system_ref__table_row">
                                <td class="id hide"><?php echo $row["id"] ?></td>
                                <td><?php echo $i + 1 ?></td>
                                <td><?php echo $row["briefname"] ?></td>
                                <td style="text-align: left;"><?php echo $row["fullname"] ?></td>
                                <td><?php echo get_boolean_value($row["certified"]) ?></td>
                                <td><?php echo get_periodicity_value($row['periodicity']) ?></td>
                                <td><?php echo get_data_value($row["certifydate"]) ?></td>
                                <td><?php echo get_data_value($row["commissioningdate"]) ?></td>
                                <td><?php echo get_boolean_value($row["hasremark"]) ?></td>
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

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ ИНФОРМАЦИОННЫЕ СИСТЕМЫ -->
<div class="context-menu" id="information_system_ref__context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="information_system_ref__context_edit">
            <img src="<?php echo $button_icons->edit ?>" alt="Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item" id="information_system_ref__context_copy">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="information_system_ref__context_delete">
            <img src="<?php echo  $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ЭЛЕМЕНТА reference_content -->
<div class="context-menu" id="information_system_ref__out_context">
<ul class="context-menu__list">
    <li class="context-menu__item" id="information_system_ref__out_context_create">
        <img src="<?php echo $button_icons->create ?>">
        <p>Создать</p>
    </li>
    <li class="context-menu__item" id="information_system_ref__out_context_update">
        <img src="<?php echo $button_icons->update ?>">
        <p>Обновить</p>
    </li>
</ul>    
</div>