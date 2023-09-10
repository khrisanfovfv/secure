/** Одиночный клик на строку таблицы */
$('#administrator_ref__table tbody tr').on('click', function(){
    reference.highlight($(this));
});

/** Двойной клик на строку таблицы */
$('#administrator_ref__table tbody tr').on('dblclick', function(){
    var rows = '#administrator_ref__table tbody tr';
    var title = 'Карточка администратора';
    var cardPath = 'inc/administrator/administrator_card.html';
    var size = { width : 800, height : 600 }; 
    reference.editRecord('#administrator_ref', rows, title, cardPath, size);
})

/** Кнока вызова справочника Организации */
$('#administrator_card__organisation_btn').on('click', function(){
    var prefix = '#administrator_card';
    var title = 'Кариочка организации';
    var cardPath = 'inc/reference_tables/organisation.html';
    var size = {width: 1400,  height: 800};
    id = $(this).parent('.card__record').children('.id').text();
    reference.open_card(prefix, title, cardPath, size, id);
});

/** Кнока вызова справочника отделы */
$('#administrator_card__department_btn').on('click', function(){
    var prefix = '#administrator_card';
    var title = 'Карточка отдела';
    var cardPath = 'inc/reference_tables/department.html';
    var size = {width: 1400,  height: 800};
    id = $(this).parent('.card__record').children('.id').text();
    reference.open_card(prefix, title, cardPath, size, id);
});

/** Вызов справочника информационные системы */
$('.administrator_card__table_row .ref_record__button').on('click', function(){
    id = $(this).parents('.administrator_card__table_row').children('.id').text();
    var prefix = '#administrator_card'
    var rows = '.administrator_card__table_row';
    var title = 'Карточка информационной системы';
    var cardPath = 'inc/reference_tables/administrator.html'
    var size ={ width : 800, height : 600 }
    alert(id);
    reference.editRecord(prefix, rows, title, cardPath, size);
})

/** Кнопка создать */
$('#administrator_ref__create').on('click', function(){
    var cardPath = 'inc/administrator/administrator_card.html';
    var size = {width :800, height: 600};
    reference.createRecord('#administrator_ref','Карточка администратора', cardPath, size);
})

/** Кнопка редактировать */
$('#administrator_ref__edit').on('click', function(){
    var rows = '.administrator_ref__table_row'
    var cardPath = 'inc/administrator/administrator_card.html';
    var size ={ width : 800, height : 600 }
    reference.editRecord('#administrator_ref', rows, 'Карточка администратора', cardPath, size);
})

$('#administrator_card__OK').on('click', function(){
    $('.administrator_card').parent().css('display', 'none');
    z_index--;
});

$('#administrator_card__Cancel').on('click', function(){
    $('.administrator_card').parent().css('display', 'none');
    z_index--;
});

