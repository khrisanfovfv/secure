<?php
class Settings
{
    function secure_load_card_data(){
        $settings = [];
        $settings["avatars"] = get_theme_mod("folder_settings_avatars_setting");
        $settings["documents"] = get_theme_mod("folder_settings_documents_setting");
        return $settings;
    }
}