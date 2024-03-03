/**
 * ================================ ВЫБОР ВКЛАДКИ ================================
 */
function information_system_select_tab(src) {
    // Список имеющихся вкладок
    var card_tabs = ['general', 'remarks', 'administrators', 'contracts', 'archive'];

    // Устанавливаем класс main_tabs__highlighted у выбранной вкладки
    $('.tabs__item').removeClass('tabs__highlighted');
    $('.tabs__item').css('z-index', 1);
    $(src).addClass('tabs__highlighted');
    $(src).css('z-index', 2);


    /* Скрываем все вкладки */
    card_tabs.forEach(item => {
        $('#information_system_card__' + item).addClass('hide');
    });
    /* Показываем выбранную */
    tab = $(src).children().attr('href');
    $(tab).removeClass('hide');
}

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
function information_system_card_press_OK(src) {
    if (information_system_card__check_fields()) {
        // Формируем запись для запроса

        // Таблица Разработчики
        var rows = $('#information_system_card__developpers_table tbody tr');
        var developper = {}
        var developpers = []
        rows.each(function(ind,row){
            developper.id = $(row.cells[0]).text();
            developper.developper_id = $(row.cells[2]).find('.ref_record>.id').text();
            developper.is_deleted = $(row.cells[3]).text();
            developpers[ind] = JSON.parse(JSON.stringify(developper));
        })


        // Вкладка Замечания по аттестации
        var rows = $('#information_system_card__remarks_table tbody tr');

        // Создаем двумерный массив
        var remark = {}
        var remarks = []
        rows.each(function (ind, row) {
            remark.id = $(row.cells[0]).text();
            remark.remarkdate = $(row.cells[2]).children().val();
            remark.author = $(row.cells[3]).text();
            remark.content = $(row.cells[4]).text();
            remark.eliminated = $(row.cells[5]).children().val();
            remark.eliminatedate = $(row.cells[6]).children().val();
            remark.performer = $(row.cells[7]).text();
            remark.is_deleted = $(row.cells[8]).text();
            // Копируем обьект в массив
            remarks[ind] = JSON.parse(JSON.stringify(remark));
        })

        // Вкладка Администраторы
        var rows = $('#information_system_card__administrators_table tbody tr');
        var administrator = {}
        var administrators = [];
        rows.each(function (ind, row) {
            administrator.id = $(row.cells[0]).text();
            administrator.information_system_id = $('#information_system_card__id').text()
            administrator.administrator_id = $(row.cells[2]).find('.id').text();
            administrator.appointdate = $(row.cells[3]).children().val();
            administrator.terminatedate = $(row.cells[4]).children().val();
            administrator.type = $(row.cells[5]).children().val();
            administrator.is_deleted = $(row.cells[6]).text();
            // Копируем обьект в массив
            administrators[ind] = JSON.parse(JSON.stringify(administrator));
        });
        record = {
            id: $('#information_system_card__id').text(),
            fullname: $('#information_system_card__fullName').val(),
            briefname: $('#information_system_card__briefName').val(),
            significancelevel: $('#information_system_card__significance_level').val(),
            scope: $('#information_system_card__scope').val(),
            certified: ($('#information_system_card__certified').is(':checked')) ? 1 : 0,
            certifydate: $('#information_system_card__certifyDate').val(),
            hasremark: $('#information_system_card__has_remark').is(':checked') ? 1 : 0,
            commissioningdate: $('#information_system_card__commissioningDate').val(),
            state: $('#information_system_card__state').val(),
            developpers: JSON.stringify(developpers),
            remarks: JSON.stringify(remarks),
            administrators: JSON.stringify(administrators)
        }
        if ($('#information_system_card__id').text() == '') {
            // ДОБАВЛЯЕМ значение в базу+
            var data = {
                action: 'add_information_system',
                record: record
            };
            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                var size = { width: 500, height: 200 };
                reference.show_notification('information_system_ref', 'Уведомление', size, textStatus)
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
        $(src).parents('.appdialog').css('display', 'none');
    }
}

/**
 * ===================== ПРОВЕРЯЕМ ЗАПОЛНЕННОСТЬ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ КАРТОЧКИ =======================
 */
function information_system_card__check_fields() {
    var message = '';
    // Карточка Информационные системы. Поле Полное наименование
    if ($('#information_system_card__fullName').val().trim() == '') {
        message += 'Не заполнено поле Полное наименование\n';
        $('#information_system_card__fullName').addClass('red_border');
    }

    // Таблица замечания по аттестации
    var rows = $('#information_system_card__remarks_table tbody tr');
    var has_empty = false;
    rows.each(function (i, row) {
        // Проверяем не была ли удалена строка
        if ($(row.cells[8]).text() == 0) {
            // Поле Дата замечания
            if ($(row.cells[2]).children().val().trim() == '') {
                $(row.cells[2]).addClass('red_border');
                has_empty = true
            } else {
                $(row.cells[2]).removeClass('red_border');
            }

            // Поле Автор замечания
            if ($(row.cells[3]).text().trim() == '') {
                $(row.cells[3]).addClass('red_border');
                has_empty = true
            } else {
                $(row.cells[3]).removeClass('red_border');
            }

            // Поле Содержание замечания
            if ($(row.cells[4]).text().trim() == '') {
                $(row.cells[4]).addClass('red_border');
                has_empty = true
            } else {
                $(row.cells[4]).removeClass('red_border');
            }
        }
    })

    if (has_empty == true) {
        message += 'Таблица Замечания по аттестации имеет незаполненные обязательные поля\n';
    }

    // Проверяем таблицу Администраторы
    var rows = $('#information_system_card__administrators_table tbody tr');
    var has_empty = false;
    rows.each(function (i, row) {
        // Поле ФИО
        // Проверяем не была ли удалена строка
        if ($(row.cells[6]).text() == 0) {
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
        }

    })

    if (has_empty == true) {
        message += 'Таблица Администраторы имеет незаполненные обязательные поля';
    }


    if (message == '') {
        return true;
    } else {
        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        reference.show_notification('#information_system_ref', 'Предупреждение', size, message);
        return false;
    }
}

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
function information_system_common_search(value) {
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
function information_system_extended_search() {
    size = { width: 900, height: 450 };
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
$('#information_system_search__button_OK').on('click', function (e) {
    var data = {
        // Поля карточки
        action: 'search_information_system_extended',
        fullname: $('#information_system_search__fullName').val(),
        briefname: $('#information_system_search__briefName').val(),
        scope: $('#information_system_search__scope').val(),
        significancelevel: $('#information_system_search__significance_level').val(),
        certified: $('#information_system_search__certified').val(),
        certifydatefrom: $('#information_system_search__certifyDateFrom').val(),
        certifydateto: $('#information_system_search__certifyDateTo').val(),
        commissioningdatefrom: $('#information_system_search__commissioningDateFrom').val(),
        commissioningdateto: $('#information_system_search__commissioningDateTo').val(),
        hasremark: $('#information_system_search__has_remark').val(),
        state: $('#information_system__search_state').val()

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
$('#information_system_search__button_Cancel').on('click', function () {
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
 * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
 */
$('#information_system_select').on('click', function (e) {
    information_system_select_record(e);
})

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
$('#information_system_update').on('click', function () {
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
    $('#information_system_card__fullName').val(cardData[0].fullname.replace(/\\"/g, '"'));
    $('#information_system_card__briefName').val(cardData[0].briefname.replace(/\\"/g, '"'));
    $('#information_system_card__significance_level').val(cardData[0].significancelevel);
    $('#information_system_card__scope').val(cardData[0].scope);
    $('#information_system_card__certified').prop('checked', cardData[0].certified);
    $('#information_system_card__certifyDate').val(cardData[0].certifydate);
    $('#information_system_card__has_remark').prop('checked', cardData[0].hasremark);
    $('#information_system_card__commissioningDate').val(cardData[0].commissioningdate);
    $('#information_system_card__state').val(cardData[0].state);

    // Заполняем таблицу Разработчики
    let developpers = cardData['developpers'];
    ind = 1;
    $('#information_system_card__developpers_table tbody tr').remove();
    developpers.forEach(developper => {
        developper['ind'] = ind++;
        $('#information_system_card__developpers_table tbody').append(
            information_system_card__draw_developper_row(developper)
        )
    })

    // Заполняем область с документами
    let documents = cardData['documents'];
    ind = 1;
    $('#information_system_card__documents li').remove();
    documents.forEach(document => {
        $('#information_system_card__documents').append(
            information_system_card__draw_document(document)
        )
        
    })

    // Заполняем таблицу Замечания по аттестации
    remarks = cardData['remarks'];
    ind = 1;
    $('#information_system_card__remarks_table tbody tr').remove();
    remarks.forEach(remark => {
        remark['ind'] = ind++;
        $('#information_system_card__remarks_table tbody').append(
            information_system_card__draw_remark_row(remark)
        );
    });

    // Очищаем таблицу Администраторы
    $('#information_system_card__administrators_table tbody tr').remove();
    // Заполняем таблицу Администраторы
    administrators = cardData['administrators'];
    var ind = 1;
    administrators.forEach(administrator => {
        administrator['ind'] = ind++;
        $('#information_system_card__administrators_table tbody').append(
            information_system_card__draw_administrator_row(administrator)
        );
    });
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
            "<td>" + record["briefname"].replace(/\\"/g, '"') + "</td>" +
            "<td style='text-align: left'>" + record["fullname"].replace(/\\"/g, '"') + "</td>" +
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
            information_system_edit_record();
        })
    });
}

/**================================================================================= 
* ==================================== ДЕЙСТВИЯ ==================================== 
* ==================================================================================*/

/**
 * ======================= ИНФОРМАЦИОННАЯ СИСТЕМА. СОЗДАТЬ =========================
 */
function information_system_create_record() {
    var size = { width: 1400, height: 800 };
    reference.open_card('#information_system_ref', 'Карточка Информационной системы', size, OpenMode.Create, 0);
}

/**
 * ======================= ИНФОРМАЦИОННАЯ СИСТЕМА. РЕДАКТИРОВАТЬ =========================
 */
function information_system_edit_record() {
    rows = $('.information_system_table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        reference.open_card('#information_system_ref', 'Карточка Информационной системы', size, OpenMode.Edit, id);
    }
    $('#information_system_ref__context').css('display', 'none');

}

/**
 * ======================= ИНФОРМАЦИОННАЯ СИСТЕМА. ВЫБРАТЬ =========================
 */
function information_system_select_record(e) {
    rows = $('.information_system_table_row.highlight');
    if (rows.length > 0) {
        id = rows[0].children.item(0).textContent
        fullname = rows[0].children.item(3).textContent
        // Извлекаем элемент с помощью которого вызвали справочник из стэка
        el = stack.pop();
        // Присваиваем элементу значения выбранного элемента
        el.children('.id').text(id);
        el.children('.fullname').val(fullname);
        // Закрываем окно выбора
        $(e.target).parents('.appdialog:first').css('display', 'none');
    }
}

/**
 * ======================= ИНФОРМАЦИОННАЯ СИСТЕМА. КОПИРОВАТЬ =========================
 */
function information_system_copy_record() {
    rows = $('.information_system_table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        // Открываем карточку в режиме копирования записи
        reference.open_card('#information_system_ref', 'Карточка Информационной системы', size, OpenMode.Copy, id);
    }
    $('#information_system_ref__context').css('display', 'none');
}

/**
 * ======================= ИНФОРМАЦИОННАЯ СИСТЕМА. УДАЛИТЬ =========================
 */
function information_system_delete_record() {
    rows = $('.information_system_table_row.highlight');
    if (rows.length > 0) {
        reference.delete_record('#information_system_ref', rows, 'delete_information_system');
    }
    $('#information_system_ref__context').css('display', 'none');
}

/**
 * ============================== РАЗРАБОТЧИКИ. СОЗДАТЬ ==============================
 */

function information_system_card__developpers_create_record() {
    var ind = $('#information_system_card__developpers_table tbody tr').length + 1;
    developper = [];
    developper['id'] = '';
    developper['ind'] = ind;
    developper['developper_id'] = '';
    developper['developper_name'] = '';

    $('#information_system_card__developpers_table tbody').append(
        information_system_card__draw_developper_row(developper)
    )

}

/**
 * ============================== РАЗРАБОТЧИКИ. КОПИРОВАТЬ ==============================
 */

function information_system_card__developpers_copy_record() {
    var ind = $('#information_system_card__developpers_table tbody tr').length + 1;
    var rows = $('#information_system_card__developpers_table>tbody>tr.highlight')
    if (rows.length > 0) {
        developper = [];
        developper['id'] = ''
        developper['ind'] = ind;
        developper['developper_id'] = $(rows[0]).find('.ref_record>.id').text();
        developper['developper_name'] = $(rows[0]).find('.ref_record>.fullname').val();
    }
    
    $('#information_system_card__developpers_table tbody').append(
        information_system_card__draw_developper_row(developper)
    )

}



/**
 * ========================= РАЗРАБОТЧИКИ. УДАЛИТЬ ===========================
 * Нам нельзя сразу удалять строку из формы, мы должны сообщить базе что эту строку 
 * требуется удалить. Поэтому мы ее просто скрываем, а не удаляем. 
 */
function information_system_card__developpers_delete_record() {
    var rows = $('#information_system_card__developpers_table>tbody>tr.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        rows[0].children.item(3).textContent = 1;
        rows[0].classList.add('hide');
    }
}


/**
 * ============================== АДМИНИСТРАТОРЫ. СОЗДАТЬ ==============================
 */
function information_system_card__administrator_create_record() {
    var ind = $('#information_system_card__administrators_table tbody tr').length + 1;
    administrator = [];
    administrator['id'] = '',
    administrator['ind'] = ind;
    administrator['information_system_id'] = $('information_system_card__id').text();
    administrator['administrator_id'] = ''
    administrator['administrator_name'] = ''
    administrator['appointdate'] = ''
    administrator['terminatedate'] = ''
    administrator['type'] = ''
    $('#information_system_card__administrators_table tbody').append(
        information_system_card__draw_administrator_row(administrator)
    );
}

/**
 * =========================== АДМИНИСТРАТОРЫ. КОПИРОВАТЬ ===========================
 */
function information_system_card__administrator_copy_record() {
    var rows = $('#information_system_card__administrators_table>tbody>tr.highlight')
    var ind = $('#information_system_card__administrators_table tbody tr').length + 1;
    if (rows.length > 0) {
        var row = rows[0];
        var administrator = [];
        administrator['id'] = '',
        administrator['ind'] = ind;
        administrator['information_system_id'] = $('#information_system_card__id').text();
        administrator['administrator_id'] = $(row.cells[2]).find('.id').text();
        administrator['administrator_name'] = $(row.cells[2]).find('.fullname').val();
        administrator['appointdate'] = $(row.cells[3]).children().val();
        administrator['terminatedate'] = $(row.cells[4]).children().val();
        administrator['type'] = $(row.cells[5]).children().val();
        administrator['is_deleted'] = 0;
        $('#information_system_card__administrators_table tbody').append(
            information_system_card__draw_administrator_row(administrator)
        );
    }
}


/**
 * =========================== АДМИНИСТРАТОРЫ. ОБНОВИТЬ ===========================
 */
function information_system_card__administrator_update_record() {
    var information_system_id = $('#information_system_card__id').text();
    // Загружаем детальный раздел Администраторы
    var data = {
        action: 'load_information_system_administrators',
        information_system_id: information_system_id
    };
    jQuery.post(MainData.ajaxurl, data, function (result) {
        var rows = JSON.parse(result);
        $('#information_system_card__administrators_table tbody tr').remove();
        var ind = 1;

        rows.forEach(administrator => {
            administrator['ind'] = ind++;
            $('#information_system_card__administrators_table tbody').append(
                information_system_card__draw_administrator_row(administrator)
            );
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки детального раздела Замечания по аттестации произощла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#information_system_ref', 'Ошибка', size, message);
    });
}

/**
 * ========================= АДМИНИСТРАТОРЫ. УДАЛИТЬ ===========================
 * Нам нельзя сразу удалять строку из формы, мы должны сообщить базе что эту строку 
 * требуется удалить. Поэтому мы ее просто скрываем, а не удаляем. 
 */
function information_system_card_administrator_delete_record() {
    var rows = $('#information_system_card__administrators_table>tbody>tr.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        rows[0].children.item(6).textContent = 1;
        rows[0].classList.add('hide');
    }
}


/**
 * ========================= ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. СОЗДАТЬ ==========================
 */
function information_system_remark_create_record() {
    var ind = $('#information_system_card__remarks_table tbody tr').length + 1;
    var remark = []
    remark['id'] = '',
        remark['ind'] = ind,
        remark['remarkdate'] = '',
        remark['author'] = '',
        remark['content'] = '',
        remark['eliminated'] = 1,
        remark['eliminatedate'] = '',
        remark['performer'] = ''

    $('#information_system_card__remarks_table tbody').append(
        information_system_card__draw_remark_row(remark)
    );
    // Привязываем событи выделения строки к столюбцу №
    /*$('.information_system_card__remarks_table_num').on('click', function(e){
        reference.highlight(e)
    })*/
}





/**
 * ========================= ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. КОПИРОВАТЬ ===========================
 */
function information_system_remark_copy_record() {
    var rows = $('#information_system_card__remarks_table>tbody>tr.highlight')
    var ind = $('#information_system_card__remarks_table tbody tr').length + 1;
    if (rows.length > 0) {
        var row = rows[0];
        var remark = []
        remark['id'] = '',
            remark['ind'] = ind++,
            remark['remarkdate'] = $(row.cells[2]).children().val(),
            remark['author'] = $(row.cells[3]).text(),
            remark['content'] = $(row.cells[4]).text(),
            remark['eliminated'] = $(row.cells[5]).children().val(),
            remark['eliminatedate'] = $(row.cells[6]).children().val(),
            remark['performer'] = $(row.cells[7]).text()


        $('#information_system_card__remarks_table tbody').append(
            information_system_card__draw_remark_row(remark)
        );

        // Привязываем событи выделения строки к столюбцу №
        /*$('.information_system_card__remarks_table_num').on('click', function(e){
            reference.highlight(e)
        })*/
    }
}

/**
 * ========================= ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. ОБНОВИТЬ ===========================
 */
function information_system_remark_update_records() {
    var information_system_id = $('#information_system_card__id').text();
    // Загружаем детальный раздел Замечания по аттестации
    var data = {
        action: 'load_information_system_remarks',
        information_system_id: information_system_id
    };
    jQuery.post(MainData.ajaxurl, data, function (result) {
        var rows = JSON.parse(result);
        $('#information_system_card__remarks_table tbody tr').remove();
        var ind = 1;

        rows.forEach(remark => {
            remark['ind'] = ind++;
            $('#information_system_card__remarks_table tbody').append(
                information_system_card__draw_remark_row(remark)
            );
        });
        // Привязываем событи выделения строки к столюбцу №
        /*$('.information_system_card__remarks_table_num').on('click', function(e){
            reference.highlight(e)
        })*/

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки детального раздела Замечания по аттестации произощла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#information_system_ref', 'Ошибка', size, message);
    });
}


/**
 * ========================= ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. УДАЛИТЬ ===========================
 * Нам нельзя сразу удалять строку из формы, мы должны сообщить базе что эту строку 
 * требуется удалить. Поэтому мы ее просто скрываем, а не удаляем. 
 */
function information_system_remark_delete_record() {
    var rows = $('#information_system_card__remarks_table>tbody>tr.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        rows[0].children.item(8).textContent = 1;
        rows[0].classList.add('hide');
    }
}

/** ============================================================================
 * ========================= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===========================
   ============================================================================*/


/** ================== ОТРИСОВКА СТРОКИ ТАБЛИЦЫ РАЗРАБОТЧИКИ ================= */
function information_system_card__draw_developper_row(developper) {
    var content_html =
        $("<tr>")
            .append($("<td class='id hide'>").text(developper['id']))
            .append($("<td class='information_system_card__developpers_table_num'>").text(developper['ind']))
            .append($("<td>")
                .append($("<div class='ref_record'>")
                    .append($("<p class='hide name_reference'>").text("organization"))
                    .append($("<p class='id hide'>").text(developper['developper_id']))
                    .append($("<input class='fullname'>").val(developper['developper_name'].replace(/\\"/g, '"')))
                    .append($("<div class='ref_record__button'>").text("..."))
                    .on('click', function (e) {
                        reference.open_reference(e, '#information_system_card', 'Справочник Организации');
                    })
                )
            )
            .append($("<td class='is_deleted hide'>").text(0))
    return content_html;
}
/**
 * ================ ОТРИСОВКА ДОКУМЕНТА В ОБЛАСТИ ВЛОЖЕНИЙ ======================
 * @param {object} document
 */
function information_system_card__draw_document(document){
    var icon = document_icons.other
    switch (document['type']) {
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            icon = document_icons.ms_word; break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            icon = document_icons.ms_excel; break;
        case 'application/pdf': icon = document_icons.pdf; break;
    }
    var content_html = 
    $("<li class='attachments__item document__item'>")
        .append($("<a class='attachments__link' href = '#'>")
            .append($("<p class='id hide'>").text(document.id))
            .append($("<img class='attachments__ico'>").attr('src', icon))
            .append($("<p class='attachments__name_item'>").text(document.name))
        )
    return content_html;
}

/**
 * =========== ОТРИСОВКА СТРОКИ ТАБЛИЦЫ ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ ================
 * @param {Object} remark 
 *==============================================================================*/
function information_system_card__draw_remark_row(remark) {
    var content_html =
        $("<tr>")
            .append($("<td class='id hide'>").text(remark['id']))
            .append($("<td class='information_system_card__remarks_table_num'>").text(remark['ind']))
            .append($("<td contenteditable='true'>")
                .append($("<input type='date'>").val(remark['remarkdate'])))
            .append($("<td contenteditable='true'>").text(remark['author']))
            .append($("<td contenteditable='true'>").text(remark['content']))
            .append($("<td>")
                .append($("<select>")
                    .append($('<option>', {
                        value: "1",
                        text: "Да"
                    }))
                    .append($('<option>', {
                        value: "0",
                        text: "Нет"
                    })).val(remark['eliminated'])
                ))
            .append($("<td contenteditable='true'>")
                .append($("<input type='date'>").val(remark['eliminatedate'])))
            .append($("<td contenteditable='true'>").text(remark['performer']))
            .append($("<td class='is_deleted hide'>").text(0))
    return content_html;
}

/**
 * =================== ОТРИСОВКА СТРОКИ ТАБЛИЦЫ АДМИНИСТРАТОРЫ =================
 * @param {Object} administrator 
 *==============================================================================*/
function information_system_card__draw_administrator_row(administrator) {
    var content_html =
        $("<tr>")
            .append($("<td class='id hide'>").text(administrator['id']))
            .append($("<td class='information_system_card__administrators_table_num'>").text(administrator['ind']))
            .append($("<td>")
                .append($("<div class='ref_record'>")
                    .append($("<p class='hide name_reference'>").text("administrator"))
                    .append($("<p class='id hide'>").text(administrator['administrator_id']))
                    .append($("<input class='fullname'>").val(administrator['administrator_name']))
                    .append($("<div class='ref_record__button'>").text("..."))
                    .on('click', function (e) {
                        reference.open_reference(e, '#information_system_card', 'Справочник Информационные системы');
                    })
                ))
            .append($("<td>")
                .append($("<input type='date'>").val(administrator['appointdate'])))
            .append($("<td>")
                .append($("<input type='date'>").val(administrator['terminatedate'])))
            .append($("<td>")
                .append($("<select>")
                    .append($('<option>', {
                        value: "base",
                        text: "Основной"
                    }))
                    .append($('<option>', {
                        value: "substitute",
                        text: "Замещающий"
                    }))
                    .val(administrator['type'])
                )
            )
            .append($("<td class='is_deleted hide'>").text(0))
    return content_html;
}

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ИНФОРМАЦИОННОЙ СИСТЕМЕ ========== 
 */
function information_system_card_binging_events() {

    /* ============================ ВЫБОР ВКЛАДОК НА КАРТОЧКЕ ИС =========================== */
    $('.information_system_card__tabs_item').on('click', function () {
        information_system_select_tab(this);
    })

    /** =========================== НАЖАТИЕ КНОПКИ ОК НА КАРТОЧКЕ ИС ======================== */
    $('#information_system_card__OK').on('click', function () {
        information_system_card_press_OK(this);
    });

    /** ========== НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ИНФОРМАЦИОНОЙ СИСТЕМЫ ==================== */
    $('#information_system_card__Cancel').on('click', function () {
        $(this).parents('.appdialog').css('display', 'none');
    });

    /** ============================= РАЗРАБОТЧИКИ. КНОПКА СОЗДАТЬ ============================== */
    $('#information_system_card__developpers_create').on('click', function () {
        information_system_card__developpers_create_record();
    })

    /** ===================== РАЗРАБОТЧИКИ. КНОПКА КОПИРОВАТЬ ==================== */
    $('#information_system_card__developpers_copy').on('click', function () {
        information_system_card__developpers_copy_record();
    })

    /** ============================= РАЗРАБОТЧИКИ. КНОПКА УДАЛИТЬ ============================== */
    $('#information_system_card__developpers_delete').on('click', function () {
        information_system_card__developpers_delete_record();
    })
    

    /** =========================== АДМИНИСТРАТОРЫ. КНОПКА СОЗДАТЬ ========================== */
    $('#information_system_card__administrators_create').on('click', function () {
        information_system_card__administrator_create_record();
    });

    /** =========================== АДМИНИСТРАТОРЫ. КНОПКА КОПИРОВАТЬ ======================= */
    $('#information_system_card__administrators_copy').on('click', function () {
        information_system_card__administrator_copy_record();
    });

    /** =========================== АДМИНИСТРАТОРЫ. КНОПКА ОБНОВИТЬ ========================= */
    $('#information_system_card__administrators_update').on('click', function () {
        information_system_card__administrator_update_record();
    });

    /** =========================== АДМИНИСТРАТОРЫ. КНОПКА УДАЛИТЬ ========================== */
    $('#information_system_card__administrators_delete').on('click', function () {
        information_system_card_administrator_delete_record();
    })


    /** ===================== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. КНОПКА СОЗДАТЬ ======================= */
    $('#information_system_card__remarks_create').on('click', function (e) {
        information_system_remark_create_record(this)
    })

    /** ===================== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. КНОПКА КОПИРОВАТЬ ==================== */
    $('#information_system_card__remarks_copy').on('click', function () {
        information_system_remark_copy_record();
    })

    /** ===================== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. КНОПКА ОБНОВИТЬ =====================  */
    $('#information_system_card__remarks_update').on('click', function () {
        information_system_remark_update_records();
    })

    /** ===================== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. КНОПКА УДАЛИТЬ ======================= */
    $('#information_system_card__remarks_delete').on('click', function () {
        information_system_remark_delete_record();
    })

    /** ============== ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. КОНТЕКСТНОЕ МЕНЮ. КОПИРОВАТЬ ===============  */
    $('#information_system_card__remarks_context_copy').on('click', function () {
        information_system_remark_copy_record();
    })

    /** ================ ЗАМЕЧАНИЯ ПО АТТЕСТАЦИИ. КОНТЕКСТНОЕ МЕНЮ. УДАЛИТЬ ================= */
    $('#information_system_card__remarks_context_delete').on('click', function () {
        information_system_remark_delete_record();
    })
}




