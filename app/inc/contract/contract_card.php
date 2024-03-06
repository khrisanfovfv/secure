<?php
//wp_head();
require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$button_icons = $resources->get_button_icons();
$document_icons = $resources->get_document_icons();
?>
<div class="contract_card">
    <div class="contract_card__frame">
        <div class="contract_card__frame-top">
            <!-- Левая сторона -->
            <div class="contract_card__frame-top-left">
                <!-- Группа вкладок -->
                <ul class="tabs">
                    <li class="tabs__item contract_card__tabs_item tabs__highlighted"><a href="#contract_card__general">Общая</a> </li>
                    <li class="tabs__item contract_card__tabs_item"><a href="#contract_card__customers">Заказчики</a> </li>
                    <li class="tabs__item contract_card__tabs_item"><a href="#contract_card__developpers">Исполнители</a></li>
                </ul>
                <!-- Содержимое основной карточки -->
                <div class="contract_card__content">

                    <!-- ВКЛАДКА ОБЩАЯ -->
                    <section class="contract_card__general" id="contract_card__general">
                        <!-- Объединяет поля карточки и Таблицу с администраторами-->
                       
                            <!-- ПОЛЯ КАРТОЧКИ-->
                            <div class="contract_card__general_fields">
                                <!-- ИД -->
                                <p class="hide" id="contract_card__id"></p>
                                <!-- Предмет Контракта-->
                                <label for="contract_subject">Предмет Контракта</label>
                                <textarea id="contract_subject" size="80" rows="3" cols="33"></textarea>
                                <!-- Номер контракта-->
                                <label for="contract_number">Номер контракта</label>
                                <input id="contract_number" type="text">
                                <!--Дата заключения-->
                                <label for="conclusionDate">Дата заключения</label>
                                <input type="date" id="conclusionDate" size="40">
                                <!--Тип контракта-->
                                <label for="contract_type">Тип контракта</label>
                                <select id="contract_type">
                                    <option value="single">Поддержка</option>
                                    <option value="group">Развитие</option>
                                    <option value="corporate">Аттестация</option>
                                </select>
                                 <!-- Номер контракта-->
                                 <label for="link">Ссылка на сайт закупок</label>
                                <input id="link" type="text">
                                 

                                <!-- Состояние -->
                                <label for="contract_card__state">Состояние</label>
                                <select id="contract_card__state">
                                    <option value="Active">Действующая</option>
                                    <option value="Inactive">Не действующая</option>
                                </select>
                            </div>


                    </section>
                </div>
                <!-- ПАНЕЛЬ ДОКУМЕНТЫ -->

            </div>
            <!-- Правая сторона -->
            <div class="contract_card__frame-top-right">
                <div class="attachments">
                    <p class="attachments__title">Документы</p>
                    <ul class="attachments__list">
                        <li class="attachments__item document__item">
                            <a class="attachments__link" href="">
                                <img class="attachments__ico" src="<?php echo $document_icons->pdf ?>" alt="">
                                <p class="attachments__name_item">Аттестат соответствия</p>
                            </a>
                        </li>
                        <li class="attachments__item document__item">
                            <a class="attachments__link" href="">
                                <img class="attachments__ico" src="<?php echo $document_icons->ms_word ?>" alt="">
                                <p class="attachments__name_item">Технический паспорт</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="finish_buttons">
            <button class="finish_button" id="contract_card__OK">OK</button>
            <button class="finish_button" id="contract_card__Cancel">Отмена</button>
        </div>
    </div>

</div>


</div><!-- contract_card -->


<!-- Контекстное меню пользователя -->
<!--div class="user__context" id="user__context">
    <ul class="user__context_list">
        <li class="user__context_item">Сменить пароль</li>
        <li class="user__context_item">Выход</li>
    </ul>
</div-->

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ АДМИНИСТРАТОРЫ -->
<div class="context-menu" id="contract_card__general_admins_context">
    <ul class="context-menu__list">
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->edit ?>" alt=Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ РАЗРАБОТЧИКИ -->
<div class="context-menu" id="contract_card__general_developpers_context">
    <ul class="context-menu__list">
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->edit ?>" alt=Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>


<!-- КОНТЕКСТНОЕ МЕНЮ ЭЛЕМЕНТА 


<!-- КОНТЕКСТНОЕ МЕНЮ ДЛЯ ОБЛАСТИ С ДОКУМЕНТАМИ -->
<div class="context-menu" id="contract_card__documents_context">
    <ul class="context-menu__list">
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->create ?>" alt=Создать">
            <p>Создать документ</p>
        </li>
    </ul>
</div>


<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ДОКУМЕНТА -->
<div class="context-menu" id="contract_card__document_context">
    <ul class="context-menu__list">
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->edit ?>" alt=Редактировать">
            <p>Редактировать</p>
        </li>
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->edit ?>" alt="Читать">
            <p>Читать</p>
        </li>
        <li class="context-menu__item" id="contract_card__documents_open_card">
            <img src="<?php echo $button_icons->edit ?>" alt="Открыть карточку">
            <p>Открыть карточку</p>
        </li>
        <li class="context-menu__item" id="contract_card__documents_create_version">
            <img src="<?php echo $button_icons->edit ?>" alt="Создать версию">
            <p>Создать версию</p>
        </li>
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->edit ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
        <li class="context-menu__item">
            <img src="<?php echo $button_icons->edit ?>" alt="История">
            <p>История</p>
        </li>
    </ul>
</div>

<!-- Диалоговое окно -->
<div class="appdialog" id="contract_card__dialog">
    <div class="appdialog__window" id="contract_card__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="contract_card__dialog_title">Карточка</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="contract_card__dialog_content">
                <!-- P - Для диалогоых окон -->
                <p class="appdialog__content_text"></p>
            </div>
            <!-- <div class="appdialog__finish_buttons">
                <button class="appdialog__finish_button">OK</button>
                <button class="appdialog__finish_button">Cancel</button>
            </div> -->
        </div>
    </div>
</div>

<!-- Окно уведомления -->
<div class="appdialog" id="contract_card__notif">
    <div class="appdialog__window" id="contract_card__notif_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="contract_card__notif__header_title">Уведомление</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="contract_card__notif_content"></div>
            <div class="appdialog__finish_buttons">
                <button class="appdialog__finish_button">OK</button>
            </div>
        </div>
    </div>
</div>
<!--?php wp_footer() ?-->