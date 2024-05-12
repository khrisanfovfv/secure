/**
 * ПРИВЯЗКА СОБЫТИЙ К КАТОЧКЕ НАСТРОЙКИ
 */
function settings_card_binding_events(){
    /** ================= КНОПКА СОХРАНИТЬ ================ */
    $('#setting_card__button_save').on('click', function(){
        
    })

    /** ================= КНОПКА ЗАКРЫТЬ ================== */
    $('#setting_card__button_close').on('click', function(e){
        $(e.target).parents('.appdialog').css('display', 'none');
    })
}

function card_settings_load_data(result, openMode){

}