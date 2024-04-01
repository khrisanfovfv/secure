<?php 

require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$button_icons = $resources->get_button_icons();
?>

<div class="administrator_card__content">
    <div class="administrator_card__frame">
        <div class="administrator_card__fields">
            <!-- ИД -->
            <p class="hide" id="administrator_card__id"></p>
            <!-- ФИО -->
            <label for="administrator_card__fullname">ФИО</label>
            <input type="text" name="administrator_card__fullname" id="administrator_card__fullname">
            <!-- Организация -->
            <label for="administrator_card__organization">Организация</label>
            <div class="card__record" id="administrator_card__organization">
                <p class='hide name_reference'>organization</p>
                <p class="id hide">1</p>
                <input class="fullname" type="text">
                <div class="card_record__button" id="administrator_card__organization_btn">&#183;&#183;&#183;</div>
            </div>
            <!-- Отдел -->
            <label for="administrator_card__department">Отдел</label>
            <div class="card__record" id="administrator_card__department">
                <p class='hide name_reference'>department</p>
                <p class="id hide">1</p>
                <input class="fullname" type="text">
                <div class="card_record__button" id="administrator_card__department_btn">&#183;&#183;&#183;</div>
            </div>
            <label for="administrator_card__state">Состояние</label>
            <select name="administrator_card__state" id="administrator_card__state">
                <option value="Active">Действующая</option>
                <option value="Inactive">Не действующая</option>
            </select>
        </div>
        <!-- ТАБЛИЦА ИНФОРАЦИОННЫЕ СИСТЕМЫ -->
        <section class="administrator_card__information_systems" id="administrator_card__information_systems">
            <div class="reference__buttons">
                <button class="reference__button" id="administrator_card__information_systems_create">
                    <img src="<?php echo $button_icons->create ?>" alt="">
                    <p>Создать</p>
                </button>
                <button class="reference__button" id="administrator_card__information_systems_copy">
                    <img src="<?php echo $button_icons->copy ?>" alt="">
                    <p>Копировать</p>
                </button>
                <button class="reference__button" id="administrator_card__information_systems_update">
                    <img src="<?php echo $button_icons->update ?>" alt="">
                    <p>Обновить</p>
                </button>
                <button class="reference__button" id="administrator_card__information_systems_delete">
                    <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
                    <p>Удалить</p>
                </button>
                <button class="reference__button" id="administrator_card__information_systems_excel">
                    <img src="<?php echo $button_icons->excel ?>" alt="Excel">
                    <p>Эл. таб</p>
                </button>
            </div>
            <div class="administrator_card__information_systems_container">
                <table class="reference__table" id="administrator_card__information_systems_table">
                    <thead>
                        <tr>
                            <th class="hide">Ид</th>
                            <th style="width: 35px;">№</th>
                            <th>Информационная система</th>
                            <th style="width: 130px;">Дата назначения</th>
                            <th style="width: 130px;">Дата прекращения</th>
                            <th style="width: 130px;">Тип</th>
                        </tr>
                    </thead>

                    <tbody>
                    </tbody>
                </table>
            </div>

        </section>
    </div>


    <div class="finish_buttons">
        <button class="finish_button" id="administrator_card__OK">OK</button>
        <button class="finish_button" id="administrator_card__Cancel">Cancel</button>
    </div>
</div> <!-- /administrator_card__content -->

<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="administrator_card__dialog">
    <div class="appdialog__window" id="administrator_card__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="administrator_card__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="administrator_card__dialog_content"></div>
        </div>
    </div>
</div>

<!-- КОНТЕКСТНОЕ МЕНЮ ДЛЯ ТАБЛИЦЫ АДМИНИСТРАТОРЫ -->
<div class="context-menu" id="administrator_card__remarks_context">
    <ul class="context-menu__list">
        <li class="context-menu__item" id="administrator_card__remarks_context_copy">
            <img src="<?php echo $button_icons->copy ?>" alt="Копировать">
            <p>Копировать</p>
        </li>
        <li class="context-menu__item" id="administrator_card__remarks_context_delete">
            <img src="<?php echo $button_icons->delete ?>" alt="Удалить">
            <p>Удалить</p>
        </li>
    </ul>
</div>