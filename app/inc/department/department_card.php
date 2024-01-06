<div class="department_card__content">
    <div class="department_card__fields">
        <!-- ИД -->
        <p class="hide" id="department_card__id"></p>
        <!-- Наименование -->
        <label for="department_card__name">Наименование</label>
        <input type="text" name="department_card__name" id="department_card__name">
        <!-- Организация -->
        <label for="department_card__organization">Организация</label>
            <div class="card__record" id="department_card__organization">
                <p class='hide name_reference'>organization</p>
                <p class="id hide"></p>
                <input class='fullname' type="text">
                <div class="card_record__button" id="department_card__organization_btn">&#183;&#183;&#183;</div>
            </div>
        <!-- Руководитель -->
        <label for="department_card__boss">Начальник</label>
        <input type="text" name="department_card__boss" id="department_card__boss">
        <!-- Состояние -->
        <label for="department_card__state">Состояние</label>
        <select name="department_card__state" id="department_card__state">
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>
    </div>
    <div class="finish_buttons">
        <button class="finish_button" id="department__card_OK">OK</button>
        <button class="finish_button" id="department__card_Cancel">Cancel</button>
    </div> 
</div> <!-- /department_card__content -->

<!-- Диалоговое окно -->
<div class="appdialog" id="department_card__dialog">
    <div class="appdialog__window" id="department_card__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="department_card__dialog_title">Карточка</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="department_card__dialog_content">
                <!-- P - Для диалогоых окон -->
                <p class="appdialog__content_text"></p>
            </div>
        </div>
    </div>
</div>