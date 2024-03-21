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

    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        window.location.replace(textStatus);
        //open_page('information_system');
    }).fail(function(jqXHR, textStatus, errorThrown){
        alert('Авторизация не удалась ' + errorThrown)
        /*var size = { width: 500, height: 200 };
                var message = 'Во время авторизации произощла ошибка';
                reference.show_notification('login', 'Ошибка', size, message);
    */
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
