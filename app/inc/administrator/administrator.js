/** Одиночный клик на строку таблицы */
$('#administrator_ref__table tbody tr').on('click', function(){
    $('#administrator_ref__table tbody tr').removeClass('bg_blue');
    $(this).addClass('bg_blue');
})

/** Двойной клик на строку таблицы */
$('#administrator_ref__table tbody tr').on('dblclick', function(){
    $('#administrator_ref__dialog').css('display','flex')
    $("#administrator_ref__dialog").css('z-index',++z_index);
    $('#administrator_ref__dialog_content').load(host+"inc/administrator/administrator_card.html");
})

/** Кнока вызова справочника Организации */
$('#administrator_card__organisation_btn').on('click', function(){
    $('#administrator_card__dialog').css('display', 'flex')
    $('#administrator_card__dialog').css('z-index',++z_index);
    $('#administrator_card__dialog_window').css('width','1400px');
    $('#administrator_card__dialog_window').css('height','800px');
    $('#administrator_card__dialog_content').load(host+'inc/reference_tables/organisation.html');
});

/** Кнока вызова справочника отдел */
$('#administrator_card__department_btn').on('click', function(){
    $('#administrator_card__dialog').css('display', 'flex')
    $('#administrator_card__dialog').css('z-index',++z_index);
    $('#administrator_card__dialog_window').css('width','1400px');
    $('#administrator_card__dialog_window').css('height','800px');
    $('#administrator_card__dialog_content').load(host+'inc/reference_tables/department.html');
});

$('#administrator_card__OK').on('click', function(){
    $('.administrator_card').parent().css('display', 'none');
    z_index--;
});

$('#administrator_card__Cancel').on('click', function(){
    $('.administrator_card').parent().css('display', 'none');
    z_index--;
});

