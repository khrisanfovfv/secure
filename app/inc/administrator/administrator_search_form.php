<div class="administrator_search__content">
    <div class="administrator_search__fields">
        <!-- Наименование -->
        <label for="administrator_search__fullname">ФИО</label>
        <input id="administrator__search_fullname">
        <!-- Организация -->
        <label for="administrator_search__organization">Организация</label>
        <div class="card__record" id="administrator_search__organization">
            <p class='hide name_reference'>organization</p>
            <p class="id hide"></p>
            <input class='fullname' type="text">
            <div class="card_record__button" id="administrator_search__organization_btn">&#183;&#183;&#183;</div>
        </div>
        <!-- Отдел -->
        <label for="administrator_search__department">Отдел</label>
        <div class="card__record" id="administrator_search__department">
            <p class='hide name_reference'>department</p>
            <p class="id hide"></p>
            <input class='fullname' type="text">
            <div class="card_record__button" id="administrator_search__department_btn">&#183;&#183;&#183;</div>
        </div>
        <!-- Состояние -->
        <label for="administrator__search_state">Состояние</label>
        <select id="administrator__search_state">
            <option value=""></option>
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>  
    </div>
     <div class="finish_buttons">
        <button class="finish_button" id="administrator_search__button_OK">OK</button>
        <button class="finish_button" id="administrator_search__button_Cancel">Отмена</button>
    </div>
</div>

<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="administrator_search__dialog">
    <div class="appdialog__window" id="administrator_search__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="administrator_search__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="administrator_search__dialog_content"></div>
        </div>
    </div>
</div>