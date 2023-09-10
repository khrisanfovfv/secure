<div class="document_kind_card__content">
    <div class="document_kind_card__fields">
        <!-- ФИО -->
        <label for="document_kind_card__name">ФИО</label>
        <input type="text" name="document_kind_card__name" id="document_kind_card__name">
        <!-- Организация -->
        <label for="document_kind_card__state">Организация</label>
        <select name="document_kind_card__state" id="document_kind_card__state">
            <option value="Active">Действующая</option>
            <option value="Inactive">Не действующая</option>
        </select>
    </div>
</div> <!-- /document_kind_card__content -->

<!-- Диалоговое окно справочника-->
<div class="appdialog" id="document_kind_card__dialog">
    <div class="appdialog__window" id="document_kind_card__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="document_kind_card__dialog_title">Карточка</h3>
            <a class="appdialog__header_close" href="#">
            <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="document_kind_card__dialog_content"></div>
            <div class="appdialog__finish_buttons">
                <button class="appdialog__finish_button">OK</button>
                <button class="appdialog__finish_button">Cancel</button>
            </div> 
        </div>
    </div>
</div>