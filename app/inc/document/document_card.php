<?php

require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$button_icons = $resources->get_button_icons();
$document_icons = $resources->get_document_icons();
?>

<div class="document_card">
    <div class="document_card__frame">
        <div class="document_card__frame-top">
            <!-- Левая сторона -->
            <div class="document_card__frame-top-left">
                <!-- Группа вкладок -->
                <ul class="tabs">
                    <li class="tabs__item document__tabs_item tabs__highlighted"><a href=".document_card__general">Общая</a> </li>
                    <li class="tabs__item document__tabs_item"><a href=".document_card__send_list">Список рассылки</a> </li>
                </ul>

                <div class="document_card__content">
                    <!-- ВКЛАДКА ОБЩАЯ -->
                    <div class="document_card__general">
                        <!-- ИД -->
                        <p class="hide" id="document_card__id"></p>
                        <!-- Номер -->
                        <label for="document_card__number">Номер</label>
                        <input id="document_card__number">
                        <!-- Дата документа -->
                        <label for="document_card__documentdate" id=document_card__documentdate_label>Дата документа</label>
                        <input type="date" id=document_card__documentdate>
                        <!-- Наименование -->
                        <label for="document_card__name">Наименование<span class="required">*</span></label>
                        <textarea id="document_card__name" name="document_card__name" size="80" rows="3" cols="33"></textarea>
                        <!-- Вид документа -->
                        <label for="document_card__kind">Вид документа</label>
                        <div class="card__record" id="document_card__kind">
                            <p class='hide name_reference'>document_kind</p>
                            <p class="id hide"></p>
                            <input class='fullname' type="text">
                            <div class="card_record__button" id="document_card__kind_btn">&#183;&#183;&#183;</div>
                        </div>
                        <!-- Тип -->
                        <label for="document_card__name">Тип</label>
                        <select id="document_card__type">
                            <option value=""></option>
                            <option value="Inbox">Входящий</option>
                            <option value="Outbox">Исходящий</option>
                        </select>
                        <!-- Отправитель -->
                        <label for="document_card__sender">Отправитель</label>
                        <div class="card__record" id="document_card__sender">
                            <p class='hide name_reference'>organization</p>
                            <p class="id hide"></p>
                            <input class='fullname' type="text">
                            <div class="card_record__button" id="document_card__sender_btn">&#183;&#183;&#183;</div>
                        </div>
                        <!-- Корреспондент -->
                        <label for="document_card__correspondent">Корреспондент</label>
                        <div class="card__record" id="document_card__correspondent">
                            <p class='hide name_reference'>organization</p>
                            <p class="id hide"></p>
                            <input class='fullname' type="text">
                            <div class="card_record__button" id="document_card__correspondent_btn">&#183;&#183;&#183;</div>
                        </div>
                        <!-- Дата отправки/получения -->
                        <label for="document_card__sendreceive">Дата отправки/получения</label>
                        <input type="date" id="document_card__sendreceive">
                        <!-- Документ подписан -->
                        <input type="checkbox" id="document_card__signed">
                        <label for="document_card__signed" id="document_card__signed_label">Подписан</label>
                        <!-- Подписант -->
                        <label for="document_card__signer">Подписал</label>
                        <input type="text" id="document_card__signer">
                        <!-- Электронный документ -->
                        <label for="document_card__file">Файл</label>
                        <input type="file" id="document_card__file">
                    </div>
                    <!-- ВКЛАДКА СПИСОК РАССЫЛКИ -->
                    <div class="document_card__send_list hide">
                    <div class="reference__buttons">
                            <button class="reference__button" id="document_card__send_list_create">
                                <img src="<?php echo $button_icons->create ?>" alt="">
                                <p>Создать</p>
                            </button>
                            <button class="reference__button" id="document_card__send_list_copy">
                                <img src="<?php echo $button_icons->copy ?>" alt="">
                                <p>Копировать</p>
                            </button>
                            <button class="reference__button" id="document_card__send_list_update">
                                <img src="<?php echo $button_icons->update ?>" alt="Обновить">
                                <p>Обновить</p>
                            </button>
                            <button class="reference__button" id="document_card__send_list_delete">
                                <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
                                <p>Удалить</p>
                            </button>
                            <button class="reference__button" id="document_card__send_list_excel">
                                <img src="<?php echo $button_icons->excel ?>" alt="Excel">
                                <p>Эл. таб</p>
                            </button>
                        </div>
                        <div class="document_card__send_list_container">
                            <table class="reference__table" id="document_card__send_list_table">
                                <thead>
                                    <th class="hide">Ид</th>
                                    <th style="width: 35px;">№</th>
                                    <th>Корреспондент</th>
                                    <th style="width: 150px;">Дата направления</th>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
            <!-- Правая сторона -->
            <div class="document_card__frame-top-right">
                <div class="attachments">
                    <p class="attachments__title">Версии</p>
                    <ul class="attachments__list" id="document_card__version_list">
                    </ul>
                </div>
            </div>
        </div>
        <div class="finish_buttons">
            <button class="finish_button" id="document_card__OK">OK</button>
            <button class="finish_button" id="document_card__Cancel">Отмена</button>
        </div>
    </div>
</div>

<!-- Диалоговое окно -->
<div class="appdialog" id="document_card__dialog">
    <div class="appdialog__window" id="document_card__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="document_card__dialog_title">Карточка</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="document_card__dialog_content">
                <!-- P - Для диалогоых окон -->
                <p class="appdialog__content_text"></p>
            </div>
        </div>
    </div>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ДЛЯ ОБЛАСТИ С ВЕРСИЯМИ ДОКУМЕНТА -->
<div class="context-menu" id="document_card__version_out_context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="documents_card__version_out_context-create">
            <img src="<?php echo $button_icons->create ?>" alt=Создать">
            <p>Создать</p>
        </li>
        <li class="context-menu__item" id="documents_card__version_out_context-update">
            <img src="<?php echo $button_icons->update ?>" alt=Обновить">
            <p>Обновить</p>
        </li>

    </ul>
</div>