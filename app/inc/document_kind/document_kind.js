/** Одиночный клик на строку таблицы */
$('#doc_kind_table tbody tr').on('click', function(){
    $('#doc_kind_table tbody tr').removeClass('bg_blue');
    $(this).addClass('bg_blue');
})

/** Двойной клик на строку таблицы */
$('#doc_kind_table tbody tr').on('dblclick', function(){
    $('#doc_kind_ref__dialog').css('display','flex')
    $("#doc_kind_ref__dialog").css('z-index',++z_index);
    $('#doc_kind_ref__dialog_content').load(host+"inc/document_kind/document_kind_card.html");
})

$('#document_kind__OK').on('click', function(){
    $('.document_kind').parent().css('display', 'none');
});

$('#document_kind__Cancel').on('click', function(){
    $('.document_kind').parent().css('display', 'none');
});