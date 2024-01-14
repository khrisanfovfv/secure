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
                    <div class="document_card__general">
                        <!-- Номер -->
                        <label for="document_card__number">Номер</label>
                        <input id="document_card__number">
                        <!-- Дата документа -->
                        <label for="document_card__documentdate" id=document_card__documentdate_label>Дата документа</label>
                        <input type="date" id=document_card__documentdate>
                        <!-- Наименование -->
                        <label for="document_card__name">Наименование</label>
                        <textarea id="document_card__name" name="document_card__name" size="80" rows="3" cols="33"></textarea>
                        <!-- Вид документа -->
                        <label for="document_card__kind">Вид документа</label>
                        <div class="card__record" id="document_kard__kind">
                            <p class='hide name_reference'>document_kind</p>
                            <p class="id hide"></p>
                            <input class='fullname' type="text">
                            <div class="card_record__button" id="document_card__kind_btn">&#183;&#183;&#183;</div>
                        </div>
                        <!-- Тип -->
                        <label for="document_card__type">Тип</label>
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
                    <p class="attacments__title">Версии</p>
                    <ul class="attacments__list">
                        <li class="attacments__item document__item">
                            <a class="attacments__link" href="">
                                <img class="attacments__ico" src="<?php echo $document_icons->pdf ?>" alt="">
                                <p class="attacments__name_item">Версия 2</p>
                            </a>
                        </li>
                        <li class="attacments__item document__item">
                            <a class="attacments__link" href="">
                                <img class="attacments__ico" src="<?php echo $document_icons->ms_word ?>" alt="">
                                <p class="attacments__name_item">Версия 1</p>
                            </a>
                        </li>
                </div>
            </div>
        </div>
        <div class="finish_buttons">
            <button class="finish_button" id="document_card__OK">OK</button>
            <button class="finish_button" id="document_card__Cancel">Отмена</button>
        </div>
    </div>
</div>