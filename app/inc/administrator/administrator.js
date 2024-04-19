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

function administrator_card_press_OK(sender) {
    if (administrator_card__check_fields()) {
        // Формируем запись для запроса
        // Вкладка Замечания по аттестации
        var rows = $('#administrator_card__information_systems_table tbody tr');
        // Создаем двумерный массив
        var information_system = {};
        var information_systems = [];
        rows.each(function (ind, row) {
            information_system.id = $(row.cells[0]).text();
            information_system.information_system_id = $(row.cells[2]).find('.id').text();
            information_system.administrator_id = $('#administrator_card__id').text();
            information_system.appointdate = $(row.cells[3]).children().val();
            information_system.terminatedate = $(row.cells[4]).children().val();
            information_system.type = $(row.cells[5]).children().val();
            information_system.is_deleted = $(row.cells[6]).text();
            // Копируем обьект в массив
            information_systems[ind] = JSON.parse(JSON.stringify(information_system));

        })
        record = {
            id: $('#administrator_card__id').text(),
            fullname: $('#administrator_card__fullname').val(),
            organization_id: $('#administrator_card__organization').find('.id').text(),
            department_id: $('#administrator_card__department').find('.id').text(),
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
                administrator_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произошла ошибка';
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
        $(sender).parents('.appdialog').css('display', 'none');
    }

}



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
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#administrator_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function administrator_extended_search() {
    size = { width: 600, height: 250 };
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
        administrator_search_binding_events();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#administrator_ref', 'Ошибка', size, message);
    });
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
function administrator_extended_search_OK(e) {
    var data = {
        // Поля карточки
        action: 'search_administrator_extended',
        fullname: $('#administrator__search_fullname').val(),
        organization_id: $('#administrator_search__organization').find('.id').text(),
        department_id: $('#administrator_search__department').find('.id').text(),
        state: $('#administrator__search_state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        administrator_update_reference(records);
        reference.hide_dialog(e);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#administrator_ref', 'Ошибка', size, message);
    });
}

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
$('#administrator_ref__create').on('click', function () {
    administrator_create_record()
});

/**
 * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
 */
$('#administrator_ref__select').on('click', function (e) {
    administrator_select_record(e);
})

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#administrator_ref__edit').on('click', function () {
    administrator_edit_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ===========================
 */
$('#administrator_ref__copy').on('click', function () {
    administrator_copy_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#administrator_ref__delete').on('click', function () {
    administrator_delete_record();
});
/**
 * ============================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ =============================
 */
$('#administrator_ref__update').on('click', function () {
    administrator_load_records();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ СОЗДАТЬ =================================
 */
$('#administrator_ref__out_context_create').on('click', function(){
    administrator_create_record();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ =================================
 */
$('#administrator_ref__context_edit').on('click', function(){
    administrator_edit_record();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ КОПИРОВАТЬ =================================
 */
$('#administrator_ref__context_copy').on('click', function(){
    administrator_copy_record();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ УДАЛИТЬ =================================
 */
$('#administrator_ref__context_delete').on('click', function(){
    administrator_delete_record();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ ОБНОВИТЬ =================================
 */
$('#administrator_ref__out_context_update').on('click', function(){
    administrator_load_records();
})


/**
 * ТАБЛИЦА ИНФОРМАЦИОННЫЕ СИСТЕМЫ. НАЖАТИЕ КНОПКИ СОЗДАТЬ
 */
$('#administrator_card__information_systems_create').on('click', function () {
    administrator_information_systems_create();
});

/**
 * ТАБЛИЦА ИНФОРМАЦИОННЫЕ СИСТЕМЫ. НАЖАТИЕ КНОПКИ УДАЛИТЬ
 */
$('#administrator_card__information_systems_delete').on('click', function () {
    administrator_information_systems_delete();
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
    $('#administrator_card__organization').find('.id').text(cardData[0].organization_id);
    $('#administrator_card__organization').find('.fullname').val(cardData[0].organization_name);
    $('#administrator_card__department').find('.id').text(cardData[0].department_id);
    $('#administrator_card__department').find('.fullname').val(cardData[0].department_name);
    $('#administrator_card__state').val(cardData[0].state);

    // Заполняем таблицу Информационные системы только в режиме редактирования 
    if (openMode == OpenMode.Edit) {
        information_systems = cardData['information_systems'];
        var ind = 1;
        $('#administrator_card__information_systems_table tbody tr').remove();
        information_systems.forEach(row => {
            var information_system = [];
            information_system['id'] = row['id'];
            information_system['ind'] = ind++;
            information_system['information_system_id'] = row['information_system_id'];
            information_system['information_system_name'] = row['information_system_name'];
            information_system['appointdate'] = row['appointdate'];
            information_system['terminatedate'] = row['terminatedate'];
            information_system['type'] = row['type'];
            var tr = $('#administrator_card__information_systems_table tbody').append(
                administrator_card__draw_information_system_row(information_system)
            );
        });
    }

}



/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА АДМИНИСТРАТОРЫ ===========================
 * @param {Object} records 
 */
function administrator_update_reference(records) {
    var ind = 1;
    $('#administrator_ref__table tbody tr').remove();
    records.forEach(record => {
        $('#administrator_ref__table tbody').append(
            $("<tr class='administrator_ref__table_row'>")
                .append($("<td class='id hide'>").text(record["id"]))
                .append($("<td>").text(ind++))
                .append($("<td>").text(record["fullname"]))
                .append($("<td>").text(record["organization_name"]))
                .append($("<td>").text(record["department_name"]))
                .append($("<td>").text(reference.get_state(record["state"])))
        ).on('click', function (e) {
            reference.highlight(e);
        }).on('dblclick', function () {
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
    var size = { width: 1000, height: 600 };
    reference.open_card('#administrator_ref', 'Карточка Администратор', size, OpenMode.Create, 0);
}

/**
 * ======================= АДМИНИСТРАТОР. ВЫБОР ЗАПИСИ =========================
 */
function administrator_select_record(e) {
    rows = $('.administrator_ref__table_row.highlight');
    if (rows.length > 0) {
        id = rows[0].children.item(0).textContent
        fullname = rows[0].children.item(2).textContent
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
 * АДМИНИСТРАТОР. РЕДАКТИРОВАНИЕ ЗАПИСИ
 */
function administrator_edit_record() {
    rows = $('.administrator_ref__table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1000, height: 600 };
        reference.open_card('#administrator_ref', 'Карточка Администратор', size, OpenMode.Edit, id);
    }
    $('#administrator_ref__context').css('display', 'none');

}

/**
 * АДМИНИСТРАТОР. КОПИРОВАНИЕ ЗАПИСИ
 */
function administrator_copy_record() {
    rows = $('.administrator_ref__table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 600 };
        // Открываем карточку в режиме копирования записи
        reference.open_card('#administrator_ref', 'Карточка Информационной системы', size, OpenMode.Copy, id);
    }
    $('#administrator_ref__context').css('display', 'none');
}

/**
 * АДМИНИСТРАТОР. УДАЛЕНИЕ ЗАПИСИ
 */
function administrator_delete_record() {
    rows = $('.administrator_ref__table_row.highlight');
    if (rows.length > 0) {
        reference.delete_record('#administrator_ref', rows, 'delete_administrator');
    }
    $('#administrator_ref__context').css('display', 'none');
}

/**
 * ==================== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. СОЗДАНИЕ ЗАПИСИ =====================
 */
function administrator_information_systems_create() {
    var ind = $('#administrator_card__information_systems_table tbody tr').length + 1;
    var information_system = [];
    information_system['id'] = '';
    information_system['ind'] = ind;
    information_system['information_system_id'] = '';
    information_system['information_system_name'] = '';
    information_system['appointdate'] = '';
    information_system['terminatedate'] = '';
    information_system['type'] = 'base';
    $('#administrator_card__information_systems_table tbody').append(
        administrator_card__draw_information_system_row(information_system)
    );
    // Удаляем переменную чтобы избежать дублей строк
    ///information_system = undefined;
}

/**
 * ================== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. КОПИРОВАНИЕ ЗАПИСИ ====================
 */
function administrator_information_systems_copy() {
    var rows = $('#administrator_card__information_systems_table>tbody>tr.highlight')
    var ind = $('#administrator_card__information_systems_table tbody tr').length + 1;
    if (rows.length > 0) {
        var row = rows[0];
        var information_system = []
        information_system['id'] = '',
            information_system['ind'] = ind,
            information_system['information_system_id'] = $(row.cells[2]).find('.id').text(),
            information_system['information_system_name'] = $(row.cells[2]).find('.fullname').val(),
            information_system['administrator_id'] = $('#administrator_card__id').text(),
            information_system['appointdate'] = $(row.cells[3]).children().val(),
            information_system['terminatedate'] = $(row.cells[4]).children().val(),
            information_system['type'] = $(row.cells[5]).children().val(),
            information_system['is_deleted'] = 0;
        $('#administrator_card__information_systems_table tbody').append(
            administrator_card__draw_information_system_row(information_system)
        );
    }
}


/**
 * ==================== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. УДАЛЕНИЕ ЗАПИСИ =====================
 */
function administrator_information_systems_delete() {
    var rows = $('.administrator_card__information_systems_table_row.highlight');
    var row = rows[0];
    $(row).children('.is_deleted').text(1);
    $(row).css('display', 'none');
}

/**
 * ==================== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. ОБНОВЛЕНИЕ РАЗДЕЛА ==================
 */
function administrator_information_systems_update() {
    var administrator_id = $('#administrator_card__id').text();
    // Загружаем детальный раздел Замечания по аттестации
    var data = {
        action: 'load_administrator_information_systems',
        administrator_id: administrator_id
    };
    jQuery.post(MainData.ajaxurl, data, function (result) {
        var rows = JSON.parse(result);
        $('#administrator_card__information_systems_table tbody tr').remove();
        var ind = 1;

        rows.forEach(information_system => {
            information_system['ind'] = ind++;
            $('#administrator_card__information_systems_table tbody').append(
                administrator_card__draw_information_system_row(information_system)
            );
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки детального раздела Замечания по аттестации произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#information_system_ref', 'Ошибка', size, message);
    });
}




/** ============================================================================
 * ========================= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===========================
   ============================================================================*/

/**
 * ============== ОТРИСОВКА СТРОКИ ТАБЛИЦЫ ИНФОРМАЦИОННЫЕ СИСТЕМЫ ==============
 * @param {Object} information_system 
 * @returns  html строки
 */
function administrator_card__draw_information_system_row(information_system) {
    var type = [];
    type['base'] = '';
    type['substitute'] = '';
    type[information_system['type']] = 'selected';
    var content_html =
        $("<tr class = 'administrator_card__information_systems_table_row'>")
            // ИД
            .append($("<td class='id hide'>").text(information_system['id']))
            // №
            .append($("<td class='administrator_card__information_systems_table_num'>").text(information_system['ind']))
            // Информационная система
            .append($("<td>")
                .append($("<div class='ref_record'>")
                    .append($("<p class='hide name_reference'>").text("information_system"))
                    .append($("<p class='id hide'>").text(information_system['information_system_id']))
                    .append($("<input class='fullname'>").val(information_system['information_system_name']))
                    .append($("<div class='ref_record__button'>").text("..."))
                    .on('click', function (e) {
                        reference.open_reference(e, '#administrator_card', 'Справочник Информационные системы');
                    })
                )
            )
            // Дата назначения
            .append($("<td>")
                .append($("<input type=date>").val(information_system['appointdate']))
            )
            // Дата прекращения
            .append($("<td>")
                .append($("<input type=date>").val(information_system['terminatedate']))
            )
            // Тип
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
                    .val(information_system['type'])
                )
            )
            // Скрытый признак удаления записи
            .append($("<td class = 'is_deleted hide'>").text(0))

    return content_html;
}

/**
 * ====================ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ АДМИНИИСТРАТОР =====================
 */
function adminisrator_card_binding_events() {

    /** ============== ВЫБОР ИЗ СПРАВОЧНИКА ОРГАНИЗАЦИИ ==================== */
    $('#administrator_card__organization_btn').on('click', function (e) {
        reference.open_reference(e, '#administrator_card', 'Справочник Оргранизации');
    })

    /** =================== ВЫБОР ИЗ СПРАВОЧНИКА ОТДЕЛЫ ==================== */
    $('#administrator_card__department_btn').on('click', function (e) {
        reference.open_reference(e, '#administrator_card', 'Справочник Отделы');
    })

    /** ============== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. КНОПКА СОЗДАТЬ ============== */
    $('#administrator_card__information_systems_create').on('click', function () {
        administrator_information_systems_create();
    })

    /** ============== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. КНОПКА КОПИРОВАТЬ ============== */
    $('#administrator_card__information_systems_copy').on('click', function () {
        administrator_information_systems_copy();
    })

    /** ============== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. КНОПКА УДАЛИТЬ ============== */
    $('#administrator_card__information_systems_delete').on('click', function () {
        administrator_information_systems_delete();
    })
    /** ============== ИНФОРМАЦИОННЫЕ СИСТЕМЫ. КНОПКА ОБНОВИТЬ ============== */
    $('#administrator_card__information_systems_update').on('click', function () {
        administrator_information_systems_update();
    })

    /** ==================== НАЖАТИЕ КНОПКИ ОК ============================= */
    $('#administrator_card__OK').on('click', function () {
        administrator_card_press_OK(this);
    });

    /** ======================== НАЖАТИЕ КНОПКИ ОТМЕНА ====================== */
    $('#administrator_card__Cancel').on('click', function () {
        $(this).parents('.appdialog').css('display', 'none');
    })
}

/**
 * ==================== ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ПОИСКА =====================
 */
function administrator_search_binding_events() {

    /** ============= НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА ОРГАНИЗАЦИИ ========= */
    $('#administrator_search__organization_btn').on('click', function (e) {
        reference.open_reference(e, '#administrator_search', 'Справочник Организации');
    })

    $('#administrator_search__button_OK').on('click', function (e) {
        administrator_extended_search_OK(e);
    })

    /** ============= НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА ОРГАНИЗАЦИИ ========= */
    $('#administrator_search__department_btn').on('click', function (e) {
        reference.open_reference(e, '#administrator_search', 'Справочник Отделы');
    })

    /** ======================== НАЖАТИЕ КНОПКИ ОТМЕНА  ======================= */
    $('#administrator_search__button_Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    })


}




