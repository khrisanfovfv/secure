/** Одиночный клик на строку таблицы */
$('#employeer_ref_table tbody tr').on('click', function(){
    $('#employeer_ref_table tbody tr').removeClass('bg_blue');
    $(this).addClass('bg_blue');
})

/** Двойной клик на строку таблицы */
$('#employeer_ref_table tbody tr').on('dblclick', function(){
    $('#employeer_ref__dialog').css('display','flex');
    $('#employeer_ref__dialog_content').load("../employeer/employeer_card.html");
    $("#employeer_ref__dialog").css('z-index',++z_index);
})

/** Кнока вызова справочника Сотрудники */
$('#employeer_card__organisation_btn').on('click', function(){
    $('#employeer_card__dialog').css('display', 'flex')
    $('#employeer_card__dialog').css('z-index',++z_index);
    $('#employeer_card__dialog_window').css('width','1400px');
    $('#employeer_card__dialog_window').css('height','800px');
    $('#employeer_card__dialog_content').load(host + 'inc/reference_tables/organisation.html');
})

$('#employeer_card__department_btn').on('click', function(){
    $('#employeer_card__dialog').css('display', 'flex')
    $('#employeer_card__dialog').css('z-index',++z_index);
    $('#employeer_card__dialog_window').css('width','1400px');
    $('#employeer_card__dialog_window').css('height','800px');
    $('#employeer_card__dialog_content').load(host + 'inc/reference_tables/department.html');
})



$('#employeers__OK').on('click', function(){
    $('.employeer_ref').parent().css('display', 'none');
});

$('#employeer__Cancel').on('click', function(){
    $('.employeer_ref').parent().css('display', 'none');
});
