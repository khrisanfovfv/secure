<div class="settings_card">
    <h2 class="settings_card__title">Настройки папок сервера</h2>
    <div class="settings_card__fields">
        <!-- Папка с документами -->
        <label for="settings_card__documents_path">Документы</label>
        <input type="text" id="settings_card__documents_path" value="<?php echo get_option('documents_folder','' )?>">
        <!-- Папка с аватарами -->
        <label>Аватары</label>
        <input type="text" id="settings_card__avatars_path" value="<?php echo get_option('avatars_folder','') ?>">
    </div>
    <div class="settings_card__buttons">
        <button class="settings_card__button" id="setting_card__button_save">Сохранить</button>
        <button class="settings_card__button" id="setting_card__button_close">Закрыть</button>
    </div>
</div>