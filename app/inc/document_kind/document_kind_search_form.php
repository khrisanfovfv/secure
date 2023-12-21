<?php wp_head() ?>
<div class="document_kind_search__content">
    <div class="document_kind_search__fields">
        <!-- Наименование -->
        <label for="document_kind_search__name">Наименование</label>
        <input id="document_kind__search_name">
        <!-- Состояние -->
        <label for="document_kind__search_state">Состояние</label>
        <select id="document_kind__search_state">
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>
       
    </div>
     <div class="finish_buttons">
        <button class="finish_button" id="document_kind_search__button_OK">OK</button>
        <button class="finish_button" id="document_kind_search__button_Cancel">Отмена</button>
    </div>
</div>

<?php wp_footer() ?>
