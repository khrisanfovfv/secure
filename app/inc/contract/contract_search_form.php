<div class="contract_search__content">
    <div class="contract_search__fields">
        <!-- Предмет контракта -->
        <label for="contract_search__contract_subject">Предмет контракта</label>
        <input id="contract_search__contract_subject">
        <!-- Номер контракта -->
        <label for="contract_search__contract_number">Номер контракта</label>
        <input id="contract_search__contract_number">
        <!-- Дата заключения -->
        <label id="conclusionDateLabel">Дата заключения</label> 
        <label for="contract_search__conclusionDateFrom" id="contract_search__conclusionDateLabel" >c</label>
        <input type="date" id="contract_search__conclusionDateFrom" size="40">
        <label for="contract_search__conclusionDateTo" id="contract_search__conclusionDateLabel" >по</label>
        <input type="date" id="contract_search__conclusionDateTo" size="40">
        <!--Тип контракта-->
        <label for="contract_search__type">Тип контракта</label>
        <select id="contract_search__type">
            <option value=""></option>
            <option value="Support">Поддержка</option>
            <option value="Develop">Развитие</option>
            <option value="Certification">Аттестация</option>
        </select> 
        <!-- Ссылка на сайт закупок -->
        <label for="contract_search__link">Ссылка на сайт закупок</label>
        <input id="contract_search__link">       

        <!-- Состояние -->
        <label for="contract_search__state">Состояние</label>
        <select id="contract_search__state">
            <option value=""></option>
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>  
    </div>
     <div class="finish_buttons">
        <button class="finish_button" id="contract_search__button_OK">OK</button>
        <button class="finish_button" id="contract_search__button_Cancel">Отмена</button>
    </div>
</div>

<!-- ДИАЛОГОВОЕ ОКНО -->
<div class="appdialog" id="contract_search__dialog">
    <div class="appdialog__window" id="contract_search__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="contract_search__dialog_title"></h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="contract_search__dialog_content"></div>
        </div>
    </div>
</div>