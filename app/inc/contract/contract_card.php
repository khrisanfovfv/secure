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
                        <div class="contract_card__general_top">
                            <!-- ПОЛЯ КАРТОЧКИ-->
                            <div class="contract_card__general_fields">
                                <!-- ИД -->
                                <p class="hide" id="contract_card__id"></p>
                                <!-- Кнопка начать аттестацию -->
                                <button id="start_certification_button">Начать аттестацию</button>
                                <!-- Полное наименование -->
                                <label for="contract_card__fullName" id="contract_card__fullName_title">Полное наименование<span class="required">*</span></label>
                                <textarea id="contract_card__fullName" name="contract_card__fullName" size="80" rows="3" cols="33"></textarea>
                                <!-- Краткое наименование -->
                                <label for="contract_card__briefName" id="contract_card__briefName_title">Краткое наименование</label>
                                <input type="text" id="contract_card__briefName" name="contract_card__briefName" value="" size="40">
                                <!-- Масштаб ИС-->
                                <label for="contract_card__scope" id="contract_card__scope_title">Масштаб ИС</label>
                                <select id="contract_card__scope" name="contract_card__scope">
                                    <option value="single">Одиночная</option>
                                    <option value="group">Групповая</option>
                                    <option value="corporate">Корпоративная</option>
                                </select>
                                <!-- Уровень значимости информации -->
                                <Label for="contract_card__significance_level" id="contract_card__significance_level_title">Уровень значимости
                                    информации</Label>
                                <select id="contract_card__significance_level" name="contract_card__significance_level">
                                    <option value="k1">К1</option>
                                    <option value="k2">К2</option>
                                    <option value="k3">К3</option>
                                    <option value="k4">К4</option>
                                </select>
                                <!-- Аттестована -->
                                <input type="checkbox" id="contract_card__certified" name="contract_card__certified" size="40">
                                <label for="contract_card__certified" id="contract_card__certified_title" class="label_checkbox">Аттестована</label>
                                <!-- Дата аттестации -->
                                <label for="contract_card__certifyDate" id="contract_card__certifyDate_title">Дата аттестации</label>
                                <input type="date" id="contract_card__certifyDate" name="contract_card__certifyDate" size="40">
                                <!-- Наличие замечаний-->
                                <input type="checkbox" id="contract_card__has_remark" name="contract_card__has_remark" size="40">
                                <label for="has_remark" id="contract_card__has_remark_title">Есть замечания</label>
                                <!-- Дата ввода в эксплуатацию -->
                                <label for="contract_card__commissioningDate" id="contract_card__commissioningDate_title">Дата ввода в
                                    эксплуатацию</label>
                                <input type="date" id="contract_card__commissioningDate" name="contract_card__commissioningDate" size="40"><br>
                                <!-- Состояние -->
                                <label id="contract_card__state_title" for="contract_card__state">Состояние</label>
                                <select id="contract_card__state">
                                    <option value="Active">Действующая</option>
                                    <option value="Inactive">Не действующая</option>
                                </select>
                            </div>


                        </div>

                        <!-- ТАБЛИЦА С РАЗРАБОТЧИКАМИ -->
                        <div class="contract_card__developpers" id="contract_card__developpers">
                            <p class="reference__title">Разработчик</p>
                            <div class="reference__buttons">
                                <button class="reference__button" id="contract_card__developpers_create">
                                    <img src="<?php echo $button_icons->create ?>" alt="Создать">
                                    <p>Создать</p>
                                </button>
                                <button class="reference__button" id="contract_card__developpers_copy">
                                    <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
                                    <p>Копировать</p>
                                </button>
                                <button class="reference__button" id="contract_card__developpers_delete">
                                    <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
                                    <p>Удалить</p>
                                </button>
                                <button class="reference__button" id="contract_card__developpers_excel">
                                    <img src="<?php echo $button_icons->excel ?>" alt="Эл. таб.">
                                    <p>Эл. таб</p>
                                </button>
                            </div>
                            <div class="contract_card__developpers_container">
                                <table class="reference__table" id="contract_card__developpers_table">
                                    <thead>
                                        <tr>
                                            <th class="hide">Ид</th>
                                            <th style="width: 35px;">№</th>
                                            <th>Полное наименование</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <!-- ВКЛАДКА АДМИНИСТРАТОРЫ -->
                    <section class="contract_card__administrators hide" id="contract_card__administrators">
                        <div class="reference__buttons">
                            <button class="reference__button" id="contract_card__administrators_create">
                                <img src="<?php echo $button_icons->create ?>" alt="">
                                <p>Создать</p>
                            </button>
                            <button class="reference__button" id="contract_card__administrators_copy">
                                <img src="<?php echo $button_icons->copy ?>" alt="">
                                <p>Копировать</p>
                            </button>
                            <button class="reference__button" id="contract_card__administrators_update">
                                <img src="<?php echo $button_icons->update ?>" alt="Обновить">
                                <p>Обновить</p>
                            </button>
                            <button class="reference__button" id="contract_card__administrators_delete">
                                <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
                                <p>Удалить</p>
                            </button>
                            <button class="reference__button" id="contract_card__administrators_excel">
                                <img src="<?php echo $button_icons->excel ?>" alt="Excel">
                                <p>Эл. таб</p>
                            </button>
                        </div>
                        <div class="contract_card__administrators_container">
                            <table class="reference__table" id="contract_card__administrators_table">
                                <thead>
                                    <th class="hide">Ид</th>
                                    <th style="width: 35px;">№</th>
                                    <th style="width: 300px;">ФИО</th>
                                    <th>Дата назначения</th>
                                    <th>Дата прекращения</th>
                                    <th style="width:150;">Тип</th>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <!-- ВКЛАДКА ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ -->
                    <section class="contract_card__remarks hide" id="contract_card__remarks">
                        <div class="reference__buttons">
                            <button class="reference__button" id="contract_card__remarks_create">
                                <img src="<?php echo $button_icons->create ?>" alt="Создать">
                                <p>Создать</p>
                            </button>
                            <button class="reference__button" id="contract_card__remarks_copy">
                                <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
                                <p>Копировать</p>
                            </button>
                            <button class="reference__button" id="contract_card__remarks_update">
                                <img src="<?php echo $button_icons->update ?>" alt="Обновить">
                                <p>Обновить</p>
                            </button>
                            <button class="reference__button" id="contract_card__remarks_delete">
                                <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
                                <p>Удалить</p>
                            </button>
                            <button class="reference__button" id="contract_card__remarks_excel">
                                <img src="<?php echo $button_icons->excel ?>" alt="Удалить">
                                <p>Эл. таб</p>
                            </button>
                        </div>
                        <div class="contract_card__remarks_container">
                            <table class="reference__table" id="contract_card__remarks_table">
                                <thead>
                                    <tr>
                                        <th class="hide">Ид</th>
                                        <th style="width: 35px;">№</th>
                                        <th style="width: 130px;">Дата замечания</th>
                                        <th style="width: 130px;">Автор замечания</th>
                                        <th>Содержание амечания</th>
                                        <th style="width: 130px;">Устранено</th>
                                        <th style="width: 130px;">Дата устранения</th>
                                        <th style="width: 130px;">Кем устранено</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                    </section>

                    <!-- ВКЛАДКА КОНТРАКТЫ -->
                    <section class="contract_card__contracts hide" id="contract_card__contracts">
                        <!-- Кнопки для управления записями в таблице Контракты-->
                        <div class="reference__buttons">
                            <button class="reference__button" id="contract_card__contracts_create">
                                <img src="<?php echo $button_icons->create ?>" alt="">
                                <p>Создать</p>
                            </button>
                            <button class="reference__button" id="contract_card__contracts_edit">
                                <img src="<?php echo $button_icons->edit ?>" alt="">
                                <p>Редактировать</p>
                            </button>
                            <button class="reference__button" id="contract_card__contracts_copy">
                                <img src="<?php echo $button_icons->copy ?>" alt="">
                                <p>Копировать</p>
                            </button>
                            <button class="reference__button" id="contract_card__contracts_delete">
                                <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
                                <p>Удалить</p>
                            </button>
                            <button class="reference__button" id="contract_card__contracts_excel">
                                <img src="<?php echo $button_icons->excel ?>" alt="Удалить">
                                <p>Эл. таб</p>
                            </button>
                        </div>
                        <table class="reference__table" ID="contract_card__contracts_table">
                            <thead>
                                <tr>
                                    <th class="hide">Ид</th>
                                    <th style="width:35px">№</th>
                                    <th style="width:130px">Номер</th>
                                    <th style="width:80px">Дата заключения</th>
                                    <th>Предмет котракта</th>
                                    <th style="width:100px">Тип контракта</th>
                                    <th style="width:230px">Ссылка на сайт закупок</th>
                                    <th style="width:230px">Заказчик</th>
                                    <th style="width:230px">Исполнитель</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr class="contract_card__contracts_table_row">
                                    <td class="id hide"></td>
                                    <td>1</td>
                                    <td>25-36/99-22</td>
                                    <td>25.03.2022</td>
                                    <td>Сопровождение ИС в 2023 году</td>
                                    <td>Поддержка</td>
                                    <td>zakupki.gov.ru/123587566/cardinfo255oh</td>
                                    <td>БУ ВО ЦИТ</td>
                                    <td>ООО Поддержка</td>
                                </tr>


                            </tbody>
                        </table>

                    </section>
                    <!-- ВКЛАДКА АРХИВ -->
                    <section class="contract_card__archive hide" id="contract_card__archive">
                        <div class="reference__buttons">
                            <button class="reference__button" id="contract_card__archive_create">
                                <img src="<?php echo $button_icons->create ?>" alt="">
                                <p>Создать</p>
                            </button>
                            <button class="reference__button" id="contract_card__archive_edit">
                                <img src="<?php echo $button_icons->edit ?>" alt="">
                                <p>Редактировать</p>
                            </button>
                            <button class="reference__button" id="contract_card__archive_copy">
                                <img src="<?php echo $button_icons->copy ?>" alt="">
                                <p>Копировать</p>
                            </button>
                            <button class="reference__button" id="contract_card__archive_delete">
                                <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
                                <p>Удалить</p>
                            </button>
                            <button class="reference__button" id="contract_card__archive_excel">
                                <img src="<?php echo $button_icons->excel ?>" alt="Удалить">
                                <p>Эл. таб</p>
                            </button>
                        </div>

                        <table class="reference__table" id="contract_card__archive_IS_table">
                            <thead>
                                <tr>
                                    <th class="hide">Ид</th>
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
                                <tr class="is_table_row">
                                    <td class="id hide">1</td>
                                    <td>1</td>
                                    <td>АСЭД</td>
                                    <td style="text-align: left;">Автоматизированная система электронного документооборота
                                        органов исполнительной
                                        государственной власти области</td>
                                    <td>Нет</td>
                                    <td>01.01.2021</td>
                                    <td>01.01.2023</td>
                                    <td>Да</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                </div> <!-- contract_card__content -->
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

<!-- КОНТЕКСТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ -->
<div class="context-menu" id="contract_card__remarks_context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="contract_card__remarks_context_copy">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="contract_card__remarks_context_delete">
            <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ЭЛЕМЕНТА contract_card__developpers_container -->
<div class="context-menu" id="contract_card_developpers__out_context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="contract_card_remarks__out_context_create">
            <img src="<?php echo $button_icons->create ?>">
            <p>Создать</p>
        </li>
        <li class="context-menu__item" id="contract_card_remarks__out_context_update">
            <img src="<?php echo $button_icons->update ?>">
            <p>Обновить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ЭЛЕМЕНТА contract_card__remarks_container -->
<div class="context-menu" id="contract_card_remarks__out_context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="contract_card_remarks__out_context_create">
            <img src="<?php echo $button_icons->create ?>">
            <p>Создать</p>
        </li>
        <li class="context-menu__item" id="contract_card_remarks__out_context_update">
            <img src="<?php echo $button_icons->update ?>">
            <p>Обновить</p>
        </li>
    </ul>
</div>

<!-- КОНТЕКТНОЕ МЕНЮ ЭЛЕМЕНТА contract_card__administrators_container -->
<div class="context-menu" id="contract_card_administrators__out_context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="contract_card_administrators__out_context_create">
            <img src="<?php echo $button_icons->create ?>">
            <p>Создать</p>
        </li>
        <li class="context-menu__item" id="contract_card_administrators__out_context_update">
            <img src="<?php echo $button_icons->update ?>">
            <p>Обновить</p>
        </li>
    </ul>
</div>


<!-- КОНТЕКСТНОЕ МЕНЮ ЭЛЕМЕНТА 

<!-- КОНТЕКТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ КОНТРАКТЫ -->
<div class="context-menu" id="contract_card__contracts_context">
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