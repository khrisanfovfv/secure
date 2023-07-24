/** Одиночный клик на строку таблицы */
$('#contract_ref_table tbody tr').on('click', function(){
    $('#contracts_table tbody tr').removeClass('bg_blue');
    $(this).addClass('bg_blue');
})

/** Двойной клик на строку таблицы */
$('#contract_ref_table tbody tr').on('dblclick', function(){
    $('#contract_card').load("document_kind_card.html");
    $("#contract_card").css('z-index',++z_index);
})

$('#contract_card__OK').on('click', function(){
    $('.contracts').parent().css('display', 'none');
});

$('#contract_card__Cancel').on('click', function(){
    $('.contracts').parent().css('display', 'none');
});