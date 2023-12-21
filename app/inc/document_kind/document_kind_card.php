<?php wp_head(); ?>
<div class="document_kind_card__content">
    <div class="document_kind_card__fields">
        <!-- ИД -->
        <p class="hide" id="document_kind_card__id"></p>
        <!-- ФИО -->
        <label for="document_kind_card__name">Наименование</label>
        <input type="text" name="document_kind_card__name" id="document_kind_card__name">
        <!-- Организация -->
        <label for="document_kind_card__state">Состояние</label>
        <select name="document_kind_card__state" id="document_kind_card__state">
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>
    </div>
    <div class="finish_buttons">
        <button class="finish_button" id="document_kind__card_OK">OK</button>
        <button class="finish_button" id="document_kind__card_Cancel">Cancel</button>
    </div> 
</div> <!-- /document_kind_card__content -->
<?php wp_footer() ?>