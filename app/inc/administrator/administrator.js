/**
 * =================== ВЫБОР ВКЛАДОК НА КАРТОЧКЕ ИС =====================
 * */
$('.administrator_card__tabs_item').on('click', function () {
    // Список имеющихся вкладок
    var card_tabs = ['general', 'remarks', 'administrators', 'contracts', 'archive'];

    // Устанавливаем класс main_tabs__highlighted у выбранной вкладки
    $('.main_tabs__item').removeClass('main_tabs__highlighted');
    $('.main_tabs__item').css('z-index', 1);
    $(this).addClass('main_tabs__highlighted');
    $(this).css('z-index', 2);


    /* Скрываем все вкладки */
    card_tabs.forEach(item => {
        $('#administrator_card__' + item).addClass('hide');
    });
    /* Показываем выбранную */
    tab = $(this).children().attr('href');
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
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ АДМИНИСТРАТОРА =========================
 */
$('#administrator_card__OK').on('click', function () {
    if (administrator_card__check_fields()) {
        // Формируем запись для запроса
        // Вкладка Замечания по аттестации
        var rows = $('#administrator_card__information_systems_table tbody tr');
        // Создаем двумерный массив
        var information_system = {};
        var information_systems = [];
        rows.each(function (ind, row) {
            information_system.id = $(row.cells[0]).text();
            information_system.information_system_id = $(row.cells[2]).find('id').val();
            information_system.information_system_name = $(row.cells[2]).find('fullname').val();
            information_system.administrator_id = $('#administrator_card__id').text();
            information_system.appointdate = $(row.cells[3]).children().val();
            information_system.terminatedate = $(row.cells[4]).children().val();
            information_system.type = $(row.cells[5]).children().val();
            // Копируем обьект в массив
            information_systems[ind] = JSON.parse(JSON.stringify(information_system));
    
        })
        record = {
            id: $('#administrator_card__id').text(),
            fullname: $('#administrator_card__fullname').val(),
            organisation: 1, // временно
            department: 1,  // временно
            state: $('#administrator_card__state').val(),
            information_systems: JSON.stringify(information_systems)
        }
        if ($('#administrator_card__id').text() == '') {
            // ДОБАВЛЯЕМ значение в базу
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
function administrator_card__check_fields() {
    var message = '';
    // Карточка Информационные системы. Поле Полное наименование
    if ($('#administrator_card__fullname').val().trim() == '') {
        message += 'Не заполнено поле Полное наименование\n';
        $('#administrator_card__fullName').addClass('red_border');
    }

    // Таблица информационные системы
    var rows = $('#administrator_card__information_systems_table tbody tr');
    var has_empty = false;
    rows.each(function (i, row) {
        // Поле Информационная система
        if ($(row.cells[2]).find('.fullname').val().trim() == '') {
            $(row.cells[2]).addClass('red_border');
            has_empty = true
        } else {
            $(row.cells[2]).removeClass('red_border');
        }
        // Поле Дата назначения
        if ($(row.cells[3]).children().val().trim() == '') {
            $(row.cells[3]).addClass('red_border');
            has_empty = true
        } else {
            $(row.cells[3]).removeClass('red_border');
        }
    })

    if (has_empty == true) {
        message += 'Таблица Замечания по аттестации имеет незаполненные обязательные поля';
    }


    if (message == '') {
        return true;
    } else {
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
function administrator_common_search(value) {
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
function administrator_extended_search() {
    size = { width: 900, height: 450 };
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
$('#administrator_search__button_OK').on('click', function (e) {
    var data = {
        // Поля карточки
        action: 'search_administrator_extended',
        fullname: $('#administrator_search__fullName').val(),
        briefname: $('#administrator_search__briefName').val(),
        scope: $('#administrator_search__scope').val(),
        significancelevel: $('#administrator_search__significance_level').val(),
        certified: $('#administrator_search__certified').val(),
        certifydatefrom: $('#administrator_search__certifyDateFrom').val(),
        certifydateto: $('#administrator_search__certifyDateTo').val(),
        commissioningdatefrom: $('#administrator_search__commissioningDateFrom').val(),
        commissioningdateto: $('#administrator_search__commissioningDateTo').val(),
        hasremark: $('#administrator_search__has_remark').val(),
        state: $('#administrator__search_state').val()

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
$('#administrator_search__button_Cancel').on('click', function () {
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
$('#administrator_update').on('click', function () {
    administrator_load_records();
})

/**
 * ТАБЛИЦА ИНФОРМАЦИОННЫЕ СИСТЕМЫ. НАЖАТИЕ КНОПКИ СОЗДАТЬ
 */
$('#administrator_card__information_systems_create').on('click', function () {
    administrator_information_systems_create();
});


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
    $('#administrator_card__fullname').val(cardData[0].fullname);
    $('#administrator_card__state').val(cardData[0].state);

    // Заполняем таблицу Информационные системы
    information_systems = cardData['information_systems'];
    var ind = 1;
    $('#administrator_card__information_systems_table tbody tr').remove();
    information_systems.forEach(row => {
        var information_system = [];
        information_system['id'] = row['id'];
        information_system['ind'] = ind++;
        information_system['information_system_id'] =row['information_system_id'];
        information_system['information_system_name'] = row['information_system_name'];
        information_system['appointdate'] = row['appointdate'];
        information_system['terminatedate'] = row['terminatedate'];
        information_system['type'] = row['type'];
        var tr = $('#administrator_card__information_systems_table tbody').append(
            administrator_card__draw_information_system_row(information_system)
        );
    });
     // Привязываем событи выделения строки к столюбцу №
    $('.information_system_card__information_systems_table_num').on('click', function (e) {
        reference.highlight(e)
    })

    $('#administrator_card__information_systems_table .ref_record__button').on('click', function(e){
        reference.open_reference(e, '#administrator_card','Справочник Информационные системы');
    })
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
        tr.on('dblclick', function () {
            administrator_edit_record();
        })
    });
}

/**================================================================================= 
* ==================================== ДЕЙСТВИЯ ==================================== 
* ==================================================================================*/

/**
 * АДМИНИСТРАТОР. СОЗДАНИЕ ЗАПИСИ
 */
function administrator_create_record() {
    var size = { width: 1000, height: 800 };
    reference.open_card('#administrator_ref', 'Карточка Администратор', size, OpenMode.Create, 0);
}

/**
 * АДМИНИСТРАТОР. РЕДАКТИРОВАНИЕ ЗАПИСИ
 */
function administrator_edit_record() {
    rows = $('.administrator_ref__table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1000, height: 800 };
        reference.open_card('#administrator_ref', 'Карточка Администратор', size, OpenMode.Edit, id);
    }
    $('#administrator_ref__context').css('display', 'none');

}

/**
 * АДМИНИСТРАТОР. КОПИРОВАНИЕ ЗАПИСИ
 */
function administrator_copy_record() {
    rows = $('.administrator_table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        // Открываем карточку в режиме копирования записи
        reference.open_card('#administrator_ref', 'Карточка Информационной системы', size, OpenMode.Copy, id);
    }
    $('#administrator_ref__context').css('display', 'none');
}

/**
 * АДМИНИСТРАТОР. УДАЛЕНИЕ ЗАПИСИ
 */
function administrator_delete_record() {
    rows = $('.administrator_table_row.highlight');
    if (rows.length > 0) {
        reference.delete_record('#administrator_ref', rows);
    }
    $('#administrator_ref__context').css('display', 'none');
}

/**
 * ==================== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. СОЗДАНИЕ ЗАПИСИ =====================
 */
function administrator_information_systems_create() {
    var ind = $('#administrator_card__information_systems_table tbody tr').length + 1;
    var information_system =[];
    information_system['id'] = '';
    information_system['ind'] = ind;
    information_system['information_system_id'] ='';
    information_system['information_system_name'] = '';
    information_system['appointdate'] = '';
    information_system['terminatedate'] = '';
    information_system['type'] = 'base';

    $('#administrator_card__information_systems_table tbody').append(
        administrator_card__draw_information_system_row(information_system)
    );
    // Привязываем событи выделения строки к столюбцу №
    $('.information_system_card__information_systems_table_num').on('click', function (e) {
        reference.highlight(e)
    })

    $('#administrator_card__information_systems_table .ref_record__button').on('click', function(e){
        reference.open_reference(e, '#administrator_card','Справочник Информационные системы');
    })
}


/** ============================================================================
 * ========================= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===========================
   ============================================================================*/


function administrator_card__draw_information_system_row(information_system) {
    var type = [];
    type['base'] = '';
    type['substitute'] = '';
        type[information_system['type']] = 'selected';
    var content_html = 
    "<tr>" +
        "<td class='id hide'>" + information_system['id'] + "</td>" +
        "<td class='administrator_card__information_systems_table_num'>" + information_system['ind'] + "</td>" +
        "<td>" + 
            "<div class='ref_record'>" +
                "<p class='hide name_reference'>information_system</p>" +
                "<p class='id hide'>" + information_system['information_system_id'] +"</p>" +
                "<input class='fullname' value='"+ information_system['information_system_name'] + "'>" +
                "<div class='ref_record__button'>...</div>" +
            "</div>" +
        "</td>" +
        "<td><input type=date value=" + information_system['appointdate'] +"></td>" +
        "<td><input type=date value=" + information_system['terminatedate']+ "></td>" +
        "<td>" +
            "<select>" +
                "<option value=base " + type['base'] +">Основной</option>" +
                "<option value=substitute " + type['substitute'] + ">Замещающий</option>" +
            "</select></td>" +
    "</tr>"
    return content_html;
}




