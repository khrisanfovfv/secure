$('#login__submit').on('click', function(){

    record = {
        username : $('#login__username').val(),
        password : $('#login__password').val(), 
        remember : $('#login__remember_check').prop('checked')
    }
    var data = {
        action: 'login',
        record: record
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        window.location.replace(result)
    }).fail(function(jqXHR, textStatus, errorThrown){
        var size = { width: 500, height: 200 };
        var message = 'Во время авторизации произощла ошибка: <br>' + jqXHR.status + ' Не верные учетные данные';
        reference.show_notification('#login_ref', 'Ошибка', size, message);
    });

});

/**
 * НАЖАТИЕ НА КВАДРАТ "ЗАПОМНИТЬ МЕНЯ"
 */
$('#login__remember_span').on('click', function(){
    let checkbox = $('#login__remember_check');
    checkbox.prop('checked', !checkbox.prop('checked'));
    checkbox.trigger('focus');
})
