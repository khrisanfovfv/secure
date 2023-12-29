/** Одиночный клик на строку таблицы */
$('#department_ref_table tbody tr').on('click', function(){
    $('#department_ref_table tbody tr').removeClass('bg_blue');
    $(this).addClass('bg_blue');
})

/** Двойной клик на строку таблицы */
$('#department_table tbody tr').on('dblclick', function(){
   $('#department_ref__dialog').dialog({
        width: 600,
        height:600,
        modal : true,
        buttons: {
            OK: function(){
                $(this).dialog("close");
            },
            Cancel: function(){
                $(this).dialog("close");
            }
        } 
   });
})

/** Кнока вызова справочника Организации */
$('#department_card__organisation_btn').on('click', function(){
    $('#administrator_card__dialog').css('display', 'flex')
    $('#administrator_card__dialog').css('z-index',++z_index);
    $('#administrator_card__dialog_window').css('width','1400px');
    $('#administrator_card__dialog_window').css('height','800px');
    $('#administrator_card__dialog_content').load('../reference_tables/organisation.html');
})



$('#departments__OK').on('click', function(){
    $('.department_ref').parent().css('display', 'none');
});

$('#administrator__Cancel').on('click', function(){
    $('.departments_ref').parent().css('display', 'none');
});
