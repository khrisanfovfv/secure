/**
 * =================== ВЫБОР ВКЛАДОК НА КАРТОЧКЕ ИС =====================
 * */
$('.information_system_card__tabs_item').on('click',function(){
    // Список имеющихся вкладок
    var card_tabs = ['general','remarks','administrators','contracts','archive'];

    // Устанавливаем класс main_tabs__highlighted у выбранной вкладки
    $('.main_tabs__item').removeClass('main_tabs__highlighted');
    $('.main_tabs__item').css('z-index',1);
    $(this).addClass('main_tabs__highlighted');
    $(this).css('z-index',2);

    
    /* Скрываем все вкладки */
    card_tabs.forEach(item => {
        $('#information_system_card__'+ item).addClass('hide');
    });
    /* Показываем выбранную */
    tab=$(this).children().attr('href');
    $(tab).removeClass('hide');
})

/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#information_system_table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#information_system_table tbody tr').on('dblclick', function () {
    information_system_edit_record();
})

/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ИНФОРМАЦИОНОЙ СИСТЕМЫ =========================
 */
$('#information_system_card__OK').on('click', function () {
    if ($('#information_system_card__fullName').val().trim() == '') {
        $('#information_system_card__fullName').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#information_system_ref', 'Предупреждение', size, message);
    } else {
        $('#information_system_card__name').removeClass('red_border');
        // Формируем запись для запроса
        record = {
            id: $('#information_system_card__id').text(),
            fullname: $('#information_system_card__fullName').val(),
            briefname: $('#information_system_card__briefName').val(),
            significancelevel: $('#information_system_card__significance_level').val() ,
            scope: $('#information_system_card__scope').val(),
            certified: ($('#information_system_card__certified').is(':checked')) ? 1 : 0,
            certifydate: $('#information_system_card__certifyDate').val(),
            hasremark: $('#information_system_card__has_remark').is(':checked') ? 1 : 0,
            commissioningdate: $('#information_system_card__commissioningDate').val(),
            state: $('#information_system_card__state').val()
        }
        if ($('#information_system_card__id').text() == '') {
            // ДОБАВЛЯЕМ значение в базу+
            var data = {
                action: 'add_information_system',
                record: record
            };
            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                alert(textStatus);
                information_system_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произощла ошибка';
                reference.show_notification('information_system_ref', 'Ошибка', size, message);
            })
        } else {
            // ОБНОВЛЯЕМ значение в базе данных
            var data = {
                action: 'update_information_system',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                information_system_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время обновления записи произощла ошибка';
                reference.show_notification('information_system_ref', 'Ошибка', size, message);
            })
        }
        $(this).parents('.appdialog').css('display', 'none');
    }

});

/**
 * ==================== НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ИНФОРМАЦИОНОЙ СИСТЕМЫ ======================
 */
$('#information_system_card__Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});




/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function information_system_load_records() {
    var data = {
        action: 'load_information_system',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        information_system_update_reference(records);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время обновления списка записей произощла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#information_system_ref', 'Ошибка', size, message);
    });

}

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function information_system_common_search(value){
    // Делаем ajax - запрос
    var data = {
        action: 'search_information_system',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        console.log(records);
        information_system_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#information_system_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function information_system_extended_search(){
    size = {width : 900, height : 450};
    prefix = '#information_system_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'information_system_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var size = { width: 500, height: 200 };
            message = 'Во время загрузки карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
            reference.show_notification('#information_system_ref', 'Ошибка', size, message);
        });
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
$('#information_system_search__button_OK').on('click', function(e){
    var data = {
        action: 'search_information_system_extended',
        fullname : $('#information_system_search__fullName').val(),
        briefname: $('#information_system_search__briefName').val(),
        scope: $('#information_system_search__scope').val(),
        significancelevel: $('#information_system_search__significance_level').val(),
        certified: $('#information_system_search__certified').val(),
        certifydatefrom: $('#information_system_search__certifyDateFrom').val(),
        certifydateto: $('#information_system_search__certifyDateTo').val(),
        commissioningdatefrom: $('#information_system_search__commissioningDateFrom').val(),
        commissioningdateto: $('#information_system_search__commissioningDateTo').val(),
        hasremark: $('#information_system_search__has_remark').val(),
        state : $('#information_system__search_state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        information_system_update_reference(records);
        reference.hide_dialog(e);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#information_system_ref', 'Ошибка', size, message);
    });

})

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена =============
*/
$('#information_system_search__button_Cancel').on('click', function(){
    $(this).parents('.appdialog').css('display', 'none');
});



/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#information_system_create').on('click', function () {
    information_system_create_record()
});

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#information_system_edit').on('click', function () {
    information_system_edit_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ===========================
 */
$('#information_system_copy').on('click', function () {
    information_system_copy_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#information_system_delete').on('click', function () {
    information_system_delete_record();
});
/**
 * ============================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ =============================
 */
$('#information_system_update').on('click', function(){
    information_system_load_records();
})


/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
function card_information_system_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при редимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#information_system_card__id').text(''); break;
        case OpenMode.Edit: $('#information_system_card__id').text(cardData[0].id); break;
        case OpenMode.Copy: $('#information_system_card__id').text(''); break;
    }
    $('#information_system_card__fullName').val(cardData[0].fullname);
    $('#information_system_card__briefName').val(cardData[0].briefname);
    $('#information_system_card__significance_level').val(cardData[0].significancelevel);
    $('#information_system_card__scope').val(cardData[0].scope);
    $('#information_system_card__certified').prop('checked',cardData[0].certified);
    $('#information_system_card__certifyDate').val(cardData[0].certifydate);
    $('#information_system_card__has_remark').prop('checked',cardData[0].hasremark);
    $('#information_system_card__commissioningDate').val(cardData[0].commissioningdate);
    $('#information_system_card__state').val(cardData[0].state);
}

/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ИНФОРМАЦИОННЫЕ СИСТЕМЫ ===========================
 * @param {Object} records 
 */
function information_system_update_reference(records) {
    var ind = 1;
    $('#information_system_table tbody tr').remove();
    records.forEach(record => {
        var tr = $('#information_system_table tbody').append(
            "<tr class='information_system_table_row'>" +
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
            information_system_edit_record();
        })
    });
}

/**================================================================================= 
* ==================================== ДЕЙСТВИЯ ==================================== 
* ==================================================================================*/

function information_system_create_record(){
    var size = { width: 1400, height: 800 };
    reference.open_card('#information_system_ref', 'Карточка Информационной системы', size, OpenMode.Create, 0);
}

function information_system_edit_record(){
    rows = $('.information_system_table_row.highlight')
    if (rows.length > 0){
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        reference.open_card('#information_system_ref', 'Карточка Информационной системы', size, OpenMode.Edit, id);
    }
    $('#information_system_ref__context').css('display', 'none');

}

function information_system_copy_record(){
    rows = $('.information_system_table_row.highlight')
    if (rows.length > 0){
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        // Открываем карточку в режиме копирования записи
        reference.open_card('#information_system_ref', 'Карточка Информационной системы', size, OpenMode.Copy, id);
    } 
    $('#information_system_ref__context').css('display', 'none');
}

function information_system_delete_record(){
    rows = $('.information_system_table_row.highlight');
    if (rows.length > 0){
        reference.delete_record('#information_system_ref', rows);
    }
    $('#information_system_ref__context').css('display', 'none');
}    
    