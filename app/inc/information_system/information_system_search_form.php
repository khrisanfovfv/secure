<?php wp_head() ?>
<div class="information_system_search__content">
    <div class="information_system_search__fields">
        <!-- Полное наименование -->
        <label for="information_system_search__fullName">Полное наименование</label>
        <input id="information_system_search__fullName" autocomplete="off">
        <!-- Краткое наименование -->
        <label for="information_system_search__briefName">Краткое наименование</label>
        <input id="information_system_search__briefName" autocomplete="off">
        <!-- Масштаб ИС -->
        <label for="information_system_search__scope">Масштаб ИС</label>
        <select id="information_system_search__scope">
            <option value=""></option>
            <option value="single">Одиночная</option>
            <option value="group">Групповая</option>
            <option value="corporate">Корпоративная</option>
        </select>
        <!-- Уровень значимости информации -->
        <Label for="information_system_search__significance_level">Уровень значимости информации</Label>
            <select id="information_system_search__significance_level">
                <option value=""></option>
                <option value="k1">К1</option>
                <option value="k2">К2</option>
                <option value="k3">К3</option>
                <option value="k4">К4</option>
            </select>
        <!-- Аттестована -->
        <label for="information_system_search__certified">Аттестована</label>
        <select id="information_system_search__certified">
            <option value=""></option>
            <option value="Yes">Да</option>
            <option value="No">Нет</option>
        </select>
        <!-- Дата аттестации -->
        <label id="certifyDateLabel">Дата аттестации</label> 
        <label for="information_system_search__certifyDateFrom" id="information_system_search__certifyDateFromLabel" >c</label>
        <input type="date" id="information_system_search__certifyDateFrom" size="40">
        <label for="information_system_search__certifyDateTo" id="information_system_search__certifyDateToLabel" >по</label>
        <input type="date" id="information_system_search__certifyDateTo" size="40">
        <!-- Наличие замечаний-->
        <label for="information_system_search__has_remark">Есть замечания</label>
        <select id="information_system_search__has_remark">
            <option value=""></option>
            <option value="Yes">Да</option>
            <option value="No">Нет</option>
        </select>
        
        <!-- Дата ввода в эксплуатацию -->
        <label id="information_system_search__commissioningDateLabel">Дата ввода в эксплуатацию</label>
        <label for="information_system_search__commissioningDateFrom" id="information_system_search__commissioningDateFromLabel">с</label>
        <input type="date" id="information_system_search__commissioningDateFrom" size="40">
        <label for="information_system_search__commissioningDateTo" id="information_system_search__commissioningDateToLabel">по</label>
        <input type="date" id="information_system_search__commissioningDateTo" size="40">
        <!-- Состояние -->
        <label for="information_system__search_state">Состояние</label>
        <select id="information_system__search_state">
            <option value=""></option>
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>
       
    </div>
     <div class="search__finish_buttons">
        <button class="search__finish_button" id="information_system_search__button_OK">OK</button>
        <button class="search__finish_button" id="information_system_search__button_Cancel">Отмена</button>
    </div>
</div>

<?php wp_footer() ?>
