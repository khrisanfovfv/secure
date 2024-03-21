<?php

class Resources{
    protected $resources;
    public function __construct() {
        try{
            $file_name = wp_normalize_path(get_stylesheet_directory() . '/resources.json');
            $json_resources = file_get_contents($file_name);
            $this->resources = json_decode($json_resources);
        }catch(\Exception $ex){
            echo $ex->getMessage();
        }
    }

    /**
     * ============================= ВОЗВРАЩАЕМ ЭМБЛЕМУ =============================== 
     */

     public function get_emblem_icon(){
        $icon = $this->resources->emblem;
        $icon = get_template_directory_uri() .'/'. $this->resources->directory .'/'. $icon;
        return $icon;
     }
    /**
     * ======================= ВОЗВРАЩАЕМ ИКОНКИ ДЛЯ КНОПОК ===========================
     */
    public function get_button_icons(){
        foreach($this->resources->button_icons as &$icon){
            $icon = get_template_directory_uri() .'/'. $this->resources->directory .'/'. $icon;
        }
        return $this->resources->button_icons;
    }
    /**
     * ======================= ВОЗВРАЩАЕМ ИКОНКИ ДЛЯ ДОКУМЕНТОВ ========================
     */
    public function get_document_icons(){
        foreach($this->resources->document_icons as &$icon){
            $icon = get_template_directory_uri() .'/'. $this->resources->directory .'/'. $icon;
        }
        return $this->resources->document_icons;
    }
}

?>