<div class="employee_search__content">
    <div class="employee_search__fields">
        <!-- Логин -->
        <label for="employee_search__login">Логин</label>
        <input id="employee_search__login">
        <!-- Фамилия -->
        <label for="employee_search__last_name">Фамилия</label>
        <input id="employee__search__last_name">
        <!-- Имя -->
        <label for="employee_search__first_name">Имя</label>
        <input id="employee_search__first_name">
        <!-- Отчество -->
        <label for="employee_search__middle_name">Отчество</label>
        <input id="employee_search__middle_name">
        <!-- Организация -->
        <label for="employee_search__organization">Организация</label>
        <div class="card__record" id="employee_search__organization">
            <p class='hide name_reference'>organization</p>
            <p class="id hide"></p>
            <input class='fullname' type="text">
            <div class="card_record__button" id="employee_search__organization_btn">&#183;&#183;&#183;</div>
        </div>
        <!-- Отдел -->
        <label for="employee_search__department">Отдел</label>
        <div class="card__record" id="employee_search__department">
            <p class='hide name_reference'>department</p>
            <p class="id hide"></p>
            <input class='fullname' type="text">
            <div class="card_record__button" id="employee_search__department_btn">&#183;&#183;&#183;</div>
        </div>
        <!-- Имя -->
        <label for="employee_search__email">email</label>
        <input id="employee_search__email">
        <!-- Состояние -->
        <label for="employee__search_state">Состояние</label>
        <select id="employee__search_state">
            <option value=""></option>
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>  
    </div>
     <div class="finish_buttons">
        <button class="finish_button" id="employee_search__button_OK">OK</button>
        <button class="finish_button" id="employee_search__button_Cancel">Отмена</button>
    </div>
</div>

<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="employee_search__dialog">
    <div class="appdialog__window" id="employee_search__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="employee_search__dialog_title">Карточка Вид документа</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="employee_search__dialog_content"></div>
        </div>
    </div>
</div>