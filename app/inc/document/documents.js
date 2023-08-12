
/** Одиночный клик на строку таблицы */
$('#document_ref__table tbody tr').on('click', function(){
    $('#document_ref__table tbody tr').removeClass('bg_blue');
    $(this).addClass('bg_blue');
})

/** Двойной клик на строку таблицы */
$('#document_ref__table tbody tr').on('dblclick', function(){
    $('#document_ref__dialog').css('display','flex')
    $("#document_ref__dialog").css('z-index',++z_index);
    $('#document_ref__dialog_content').load(host+"inc/document/document_card.html");
})

$('.document_card__send_list_correspondent').on('click', function(){
    var parent = $(this).parents('tr')
    var id = parent.children('.id');
    if (id.length){
        alert(id.text())
    }
    
})