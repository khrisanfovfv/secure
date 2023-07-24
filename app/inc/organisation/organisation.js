
/** Одиночный клик на строку таблицы */
$('#organisation_ref_table tbody tr').on('click', function(){
    $('#organisation_ref_table tbody tr').removeClass('bg_blue');
    $(this).addClass('bg_blue');
})

/** Двойной клик на строку таблицы */
$('#organisation_ref_table tbody tr').on('dblclick', function(){
    $('#organisation_ref__dialog').css('display','flex');
    $('#organisation_ref__dialog_content').load(host + "inc/organisation/organisation_card.html");
    $("#organisation_ref__dialog").css('z-index',++z_index);
})

$('#organisations__OK').on('click', function(){
    $('.organisation_ref').parent().css('display', 'none');
});

$('#administrator__Cancel').on('click', function(){
    $('.organisations_ref').parent().css('display', 'none');
});
