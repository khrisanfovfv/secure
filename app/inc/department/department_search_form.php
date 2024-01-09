<div class="department_search__content">
    <div class="department_search__fields">
        <!-- Наименование -->
        <label for="department_search__name">Наименование</label>
        <input id="department__search_name">
        <!-- Организация -->
        <label for="department_search__organization">Организация</label>
        <div class="card__record" id="department_search__organization">
            <p class='hide name_reference'>organization</p>
            <p class="id hide"></p>
            <input class='fullname' type="text">
            <div class="card_record__button" id="department_search__organization_btn">&#183;&#183;&#183;</div>
        </div>
        <!-- Начальник -->
        <label for="department__search_boss">Начальник</label>
        <input id="department__search_boss">
        <!-- Состояние -->
        <label for="department__search_state">Состояние</label>
        <select id="department__search_state">
            <option value=""></option>
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>  
    </div>
     <div class="finish_buttons">
        <button class="finish_button" id="department_search__button_OK">OK</button>
        <button class="finish_button" id="department_search__button_Cancel">Отмена</button>
    </div>
</div>

<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="department_search__dialog">
    <div class="appdialog__window" id="department_search__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="department_search__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="department_search__dialog_content"></div>
        </div>
    </div>
</div>