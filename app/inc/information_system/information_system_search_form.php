<?php wp_head() ?>
<div class="information_system_search__content">
    <div class="information_system_search__fields">
        <!-- Наименование -->
        <label for="information_system_search__name">Наименование</label>
        <input id="information_system__search_name">
        <!-- Состояние -->
        <label for="information_system__search_state">Состояние</label>
        <select id="information_system__search_state">
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
