/**
 * =================== ВЫБОР ВКЛАДОК НА КАРТОЧКЕ ИС =====================
 * */
$('.administrator_card__tabs_item').on('click',function(){
    // Список имеющихся вкладок
    var card_tabs = ['general','remarks','administrators','contracts','archive'];

    // Устанавливаем класс main_tabs__highlighted у выбранной вкладки
    $('.main_tabs__item').removeClass('main_tabs__highlighted');
    $('.main_tabs__item').css('z-index',1);
    $(this).addClass('main_tabs__highlighted');
    $(this).css('z-index',2);

    
    /* Скрываем все вкладки */
    card_tabs.forEach(item => {
        $('#administrator_card__'+ item).addClass('hide');
    });
    /* Показываем выбранную */
    tab=$(this).children().attr('href');
    $(tab).removeClass('hide');
})

/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#administrator_ref__table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#administrator_ref__table tbody tr').on('dblclick', function () {
    administrator_edit_record();
})

/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ИНФОРМАЦИОНОЙ СИСТЕМЫ =========================
 */
$('#administrator_card__OK').on('click', function () {
    if (administrator_card__check_fields()){
        // Формируем запись для запроса
        // Вкладка Замечания по аттестации
        var rows = $('#administrator_card__remarks_table tbody tr');
        // Создаем двумерный массив
        var remarks = [];       
        var masiv = ['raz','dva', 'tri']
        rows.each(function(ind, row){
            remarks[ind] = [];
            remarks[ind]['id'] = $(row.cells[0]).text();
            remarks[ind]['remarkdate'] = $(row.cells[2]).children().val();
            remarks[ind]['author'] = $(row.cells[3]).text();
            remarks[ind]['content'] = $(row.cells[4]).text();
            remarks[ind]['eliminated'] = $(row.cells[5]).children().val();
            remarks[ind]['eliminatedate'] = $(row.cells[6]).children().val();
            remarks[ind]['performer'] = $(row.cells[7]).text();
        })
        record = {
            id: $('#administrator_card__id').text(),
            fullname: $('#administrator_card__fullName').val(),
            briefname: $('#administrator_card__briefName').val(),
            significancelevel: $('#administrator_card__significance_level').val() ,
            scope: $('#administrator_card__scope').val(),
            certified: ($('#administrator_card__certified').is(':checked')) ? 1 : 0,
            certifydate: $('#administrator_card__certifyDate').val(),
            hasremark: $('#administrator_card__has_remark').is(':checked') ? 1 : 0,
            commissioningdate: $('#administrator_card__commissioningDate').val(),
            state: $('#administrator_card__state').val(),
            remarks : remarks
        }
        if ($('#administrator_card__id').text() == '') {
            // ДОБАВЛЯЕМ значение в базу+
            var data = {
                action: 'add_administrator',
                record: record
            };
            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                alert(textStatus);
                administrator_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произощла ошибка';
                reference.show_notification('administrator_ref', 'Ошибка', size, message);
            })
        } else {
            // ОБНОВЛЯЕМ значение в базе данных
            var data = {
                action: 'update_administrator',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                administrator_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время обновления записи произощла ошибка';
                reference.show_notification('administrator_ref', 'Ошибка', size, message);
            })
        }
        $(this).parents('.appdialog').css('display', 'none');
    }

});

/**
 * ===================== ПРОВЕРЯЕМ ЗАПОЛНЕННОСТЬ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ КАРТОЧКИ =======================
 */
function administrator_card__check_fields(){
    var message = '';
    // Карточка Информационные системы. Поле Полное наименование
    if ($('#administrator_card__fullName').val().trim() == ''){
        message += 'Не заполнено поле Полное наименование\n';
        $('#administrator_card__fullName').addClass('red_border');
    }

    // Таблица замечания по аттестации
    var rows = $('#administrator_card__remarks_table tbody tr');
    var has_empty = false;
    rows.each(function(i,row){
        // Поле Дата замечания
        if($(row.cells[2]).children().val().trim() ==''){
            $(row.cells[2]).addClass('red_border');
            has_empty = true
        } else {
            $(row.cells[2]).removeClass('red_border');
        }

        // Поле Автор замечания
        if ($(row.cells[3]).text().trim() ==''){
            $(row.cells[3]).addClass('red_border');
            has_empty = true
        } else {
            $(row.cells[3]).removeClass('red_border');
        }

        // Поле Содержание замечания
        if ($(row.cells[4]).text().trim() ==''){
            $(row.cells[4]).addClass('red_border');
            has_empty = true
        } else {
            $(row.cells[4]).removeClass('red_border');
        }
    })

    if (has_empty == true){
        message += 'Таблица Замечания по аттестации имеет незаполненные обязательные поля';
    }


    if (message == ''){
        return true;
    } else{
        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        reference.show_notification('#administrator_ref', 'Предупреждение', size, message);
        return false;
    }
    

}

               
/**
 * ==================== НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ИНФОРМАЦИОНОЙ СИСТЕМЫ ======================
 */
$('#administrator_card__Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});




/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function administrator_load_records() {
    var data = {
        action: 'load_administrator',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        administrator_update_reference(records);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время обновления списка записей произощла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#administrator_ref', 'Ошибка', size, message);
    });

}

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function administrator_common_search(value){
    // Делаем ajax - запрос
    var data = {
        action: 'search_administrator',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        console.log(records);
        administrator_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#administrator_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function administrator_extended_search(){
    size = {width : 900, height : 450};
    prefix = '#administrator_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'administrator_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var size = { width: 500, height: 200 };
            message = 'Во время загрузки карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
            reference.show_notification('#administrator_ref', 'Ошибка', size, message);
        });
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
$('#administrator_search__button_OK').on('click', function(e){
    var data = {
        // Поля карточки
        action: 'search_administrator_extended',
        fullname : $('#administrator_search__fullName').val(),
        briefname: $('#administrator_search__briefName').val(),
        scope: $('#administrator_search__scope').val(),
        significancelevel: $('#administrator_search__significance_level').val(),
        certified: $('#administrator_search__certified').val(),
        certifydatefrom: $('#administrator_search__certifyDateFrom').val(),
        certifydateto: $('#administrator_search__certifyDateTo').val(),
        commissioningdatefrom: $('#administrator_search__commissioningDateFrom').val(),
        commissioningdateto: $('#administrator_search__commissioningDateTo').val(),
        hasremark: $('#administrator_search__has_remark').val(),
        state : $('#administrator__search_state').val()

    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        administrator_update_reference(records);
        reference.hide_dialog(e);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#administrator_ref', 'Ошибка', size, message);
    });

})

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена =============
*/
$('#administrator_search__button_Cancel').on('click', function(){
    $(this).parents('.appdialog').css('display', 'none');
});



/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#administrator_create').on('click', function () {
    administrator_create_record()
});

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#administrator_edit').on('click', function () {
    administrator_edit_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ===========================
 */
$('#administrator_copy').on('click', function () {
    administrator_copy_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#administrator_delete').on('click', function () {
    administrator_delete_record();
});
/**
 * ============================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ =============================
 */
$('#administrator_update').on('click', function(){
    administrator_load_records();
})


/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
function card_administrator_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при редимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#administrator_card__id').text(''); break;
        case OpenMode.Edit: $('#administrator_card__id').text(cardData[0].id); break;
        case OpenMode.Copy: $('#administrator_card__id').text(''); break;
    }
    $('#administrator_card__fullName').val(cardData[0].fullname);
    $('#administrator_card__briefName').val(cardData[0].briefname);
    $('#administrator_card__significance_level').val(cardData[0].significancelevel);
    $('#administrator_card__scope').val(cardData[0].scope);
    $('#administrator_card__certified').prop('checked',cardData[0].certified);
    $('#administrator_card__certifyDate').val(cardData[0].certifydate);
    $('#administrator_card__has_remark').prop('checked',cardData[0].hasremark);
    $('#administrator_card__commissioningDate').val(cardData[0].commissioningdate);
    $('#administrator_card__state').val(cardData[0].state);
    
    // Заполняем таблицу Замечания по аттестации
    remarks = cardData['remarks'];
    var ind = 1;
    $('#administrator_card__remarks_table tbody tr').remove();
    remarks.forEach( remark =>{
        var tr = $('#administrator_card__remarks_table tbody').append(
            "<tr>"+ 
                "<td class='id hide'>"+ remark['id']+ "</td>" +
                "<td>"+ (ind++) + "</td>" +
                "<td contenteditable><input type='date' value=" + remark['remarkdate'] +"></td>" +
                "<td contenteditable>" + remark['author'] + "</td>" +
                "<td contenteditable>" + remark['content'] + "</td>" +
                "<td><select value=" + reference.get_boolean_value(remark['eliminated'])+ ">" +
                    "<option value='yes'>Да</option>" +
                    "<option value='no'>Нет</option>" +
                "</select></td>" + 
                "<td contenteditable><input type='date' value=" + remark['eliminatedate'] + "></td>" +
                "<td contenteditable>" + remark['performer'] + "</td>" +
            "</tr>"
        );
    });
}



/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА АДМИНИСТРАТОРЫ ===========================
 * @param {Object} records 
 */
function administrator_update_reference(records) {
    var ind = 1;
    $('#administrator_table tbody tr').remove();
    records.forEach(record => {
        var tr = $('#administrator_table tbody').append(
            "<tr class='administrator_table_row'>" +
                "<td class='id hide'>" + record["id"] + "</td>" +
                "<td>" + (ind++) + "</td>" +
                "<td>" + record["briefname"] + "</td>" +
                "<td style='text-align: left'>" + record["fullname"] + "</td>" + 
                "<td>" + reference.get_boolean_value(record["certified"]) + "</td>" +
                "<td>" + reference.get_date_value(record["certifydate"]) + "</td>" +
                "<td>" + reference.get_date_value(record["commissioningdate"]) + "</td>" +
                "<td>" + reference.get_boolean_value(record["hasremark"]) + "</td>" +
                /*"<td>" + reference.get_state(record["state"]) + "</td>" +*/
            "</tr>");
        tr.on('click', function (e) {
            reference.highlight(e);
        })
        tr.on('dblclick', function(){
            administrator_edit_record();
        })
    });
}

/**================================================================================= 
* ==================================== ДЕЙСТВИЯ ==================================== 
* ==================================================================================*/

function administrator_create_record(){
    var size = { width: 1000, height: 800 };
    reference.open_card('#administrator_ref', 'Карточка Администраторы', size, OpenMode.Create, 0);
}

function administrator_edit_record(){
    rows = $('.administrator_table_row.highlight')
    if (rows.length > 0){
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        reference.open_card('#administrator_ref', 'Карточка Информационной системы', size, OpenMode.Edit, id);
    }
    $('#administrator_ref__context').css('display', 'none');

}

function administrator_copy_record(){
    rows = $('.administrator_table_row.highlight')
    if (rows.length > 0){
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        // Открываем карточку в режиме копирования записи
        reference.open_card('#administrator_ref', 'Карточка Информационной системы', size, OpenMode.Copy, id);
    } 
    $('#administrator_ref__context').css('display', 'none');
}

function administrator_delete_record(){
    rows = $('.administrator_table_row.highlight');
    if (rows.length > 0){
        reference.delete_record('#administrator_ref', rows);
    }
    $('#administrator_ref__context').css('display', 'none');
}  



    