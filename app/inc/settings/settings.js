/**
 * ПРИВЯЗКА СОБЫТИЙ К КАТОЧКЕ НАСТРОЙКИ
 */
function settings_card_binding_events(){
    /** ================= КНОПКА СОХРАНИТЬ ================ */
    $('#setting_card__button_save').on('click', function(e){
        let documents_path = $('#settings_card__documents_path').val().trim();
        let avatars_path = $('#settings_card__avatars_path').val().trim();

        if (settings_card_check_fields()){
            data ={
                action: 'update_settings',
                documents_path : documents_path,
                avatars_path : avatars_path
            }

            jQuery.post(MainData.ajaxurl, data, function (result) {
                var size = { width: 500, height: 200 };
                reference.show_notification('#footer_ref', 'Уведомление', size, result);
        
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var size = { width: 500, height: 200 };
                message = 'Во время обновления настроек папок произошла ошибка' + textStatus + ' ' + errorThrown;
                reference.show_notification('#information_system_card', 'Ошибка', size, message);
            });

            $(e.target).parents('.appdialog').css('display', 'none');
        }
    })

    function settings_card_check_fields(){
        let documents_path = $('#settings_card__documents_path').val().trim();
        let avatars_path = $('#settings_card__avatars_path').val().trim();
        let message = '';
        if (documents_path != ''){
            $('#settings_card__documents_path').removeClass('red_border');
            if (avatars_path !=''){
                $('#settings_card__avatars_path').removeClass('red_border');
            } else{
                $('#settings_card__avatars_path').addClass('red_border');
                message = 'Не заполнено поле Аватары </br>'
            }
        } else{
            $('#settings_card__documents_path').addClass('red_border');
            message = 'Не заполнено поле Документы'
        }

        if (message != ''){
            var size = { width: 500, height: 200 };
            reference.show_notification('#footer_ref', 'Ошибка', size, message);
            return false;
        } else {
            return true;
        }
    }

    /** ================= КНОПКА ЗАКРЫТЬ ================== */
    $('#setting_card__button_close').on('click', function(e){
        $(e.target).parents('.appdialog').css('display', 'none');
    })
}

