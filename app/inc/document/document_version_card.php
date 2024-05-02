<?php

require_once(wp_normalize_path(get_template_directory()) . '/common.php');
$resources = new Resources();
$button_icons = $resources->get_button_icons();
$document_icons = $resources->get_document_icons();

?>

<div class="document_version_card">
    <div class="document_version_card__frame">
        <div class="document_version_card__content">
            <div class="document_version_card__general">
                <!-- ИД -->
                <p class="hide" id="document_version_card__id"></p>
                <!-- НАИМЕНОВАНИЕ -->
                <label for="document_version_card__title">Наименование<span class="required">*</span></label>
                <input type="text" id="document_version_card__title">
                <!-- НОМЕР ВЕРСИИ -->
                <label for="document_version_card__number">Номер<span class="required">*</span></label>
                <input type="text" id="document_version_card__number">
                <!-- ФАЙЛ -->
                <label>Файл<span class="required">*</span></label>
                <div class="attachment__file" id="document_version_card__file">
                    <img class="attachments__ico">
                    <p class="attachments__name_item"></p>
                    <input type="file" id="document_version_card__browse">
                </div>
                <label for="document_version_card__state">Состояние</label>
                <select id ="document_version_card__state">
                    <option value="Active">Действующая</option>
                    <option value="Inactive">Не Действующая</option> 
                </select>
            </div>

        </div>
        <div class="finish_buttons">
            <button class="finish_button" id="document_version_card__OK">OK</button>
            <button class="finish_button" id="document_version_card__Cancel">Отмена</button>
        </div>
    </div>
</div>

<!-- Диалоговое окно -->
<div class="appdialog" id="document_version_card__dialog">
    <div class="appdialog__window" id="document_version_card__dialog_window">
        <div class="appdialog__header">
            <h3 class="appdialog__header_title" id="document_version_card__dialog_title">Карточка</h3>
            <a class="appdialog__header_close" href="#">
                <span>&#10006;</span> </a>
        </div>
        <div class="appdialog__content">
            <div id="document_version_card__dialog_content">
                <!-- P - Для диалогоых окон -->
                <p class="appdialog__content_text"></p>
            </div>
        </div>
    </div>
</div>