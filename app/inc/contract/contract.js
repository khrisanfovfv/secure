/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#contract_ref__table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#contract_ref__table tbody tr').on('dblclick', function () {
    // rows = $('.contract_ref__table_row.highlight')
    // var size = { width: 600, height: 200 };
    // reference.editRecord('#contract_ref', rows, 'Карточка Вид документа', size);
    contract_edit_record();
})



/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function contract_load_records() {
    var data = {
        action: 'load_contract',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        contract_update_reference(records);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время удаления записи произошла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#contract_ref', 'Ошибка', size, message);
    });

}


/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function contract_extended_search() {
    size = { width: 500, height: 200 };
    prefix = '#contract_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'contract_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#contract_ref', 'Ошибка', size, message);
    });
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена =============
*/
$('#contract_search__button_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});



/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#contract_ref__create').on('click', function () {
    oraganization_create_record();

});

/** 
 * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
 * */
$('#contract_ref__select').on('click', function (e) {
    contract_select_record(e);
});

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#contract_ref__edit').on('click', function () {
    contract_edit_record()

});


/**
 * ========================= НАЖАТИЕ КНОПКИ Обновить ===========================
 */
$('#contract_ref__update').on('click', function () {
    contract_load_records()
})

function oraganization_create_record() {
    var size = { width: 700, height: 650 };
    reference.open_card('#contract_ref', 'Карточка организации', size, OpenMode.Create, 0);
}


/**
 * ======================= ОРГАНИЗАЦИЯ. ВЫБОР ЗАПИСИ =========================
 */
function contract_select_record(e) {
    rows = $('.contract_ref__table_row.highlight');
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
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ===========================
 */
$('#contract_ref__copy').on('click', function () {
    contract_copy_record()
})

/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#contract_delete').on('click', function () {
    contract_delete_record()
    //rows = $('.contract_ref__table_row.highlight');
    //reference.delete_record('#contract_ref', rows);
});


/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
function card_contract_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при режимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#contract_card__id').text(''); break;
        case OpenMode.Edit: $('#contract_card__id').text(cardData[0].id); break;
        case OpenMode.Copy: $('#contract_card__id').text(''); break;
    }
    if (openMode == OpenMode.Copy) {
        $('#contract_card__fullName').val(cardData[0].fullname + ' - Копия');
    }
    else {
        $('#contract_card__fullName').val(cardData[0].fullname.replace(/\\"/g, '"'));
    }
    $('#contract_card__briefName').val(cardData[0].briefname.replace(/\\"/g, '"'));
    $('#contract_card__boss').val(cardData[0].boss);
    $('#contract_card__inn').val(cardData[0].inn);
    $('#contract_card__kpp').val(cardData[0].kpp);
    $('#contract_card__ogrn').val(cardData[0].ogrn);
    $('#contract_card__okpo').val(cardData[0].okpo);
    $('#contract_card__postAddress').val(cardData[0].postAddress.replace(/\\"/g, '"'));
    $('#contract_card__legalAddress').val(cardData[0].legalAddress.replace(/\\"/g, '"'));
    $('#contract_card__email').val(cardData[0].email);
    $('#contract_card__state').val(cardData[0].state);
}


/**
 * Контракты. Редактирование ЗАПИСИ
 */
function contract_edit_record() {
    rows = $('.contract_ref__table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1000, height: 800 };
        reference.open_card('#contract_ref', 'Карточка Контракта', size, OpenMode.Edit, id);
    }
    $('#contract_ref__context').css('display', 'none');
}

/**
 * ОРГАНИЗАТОР. КОПИРОВАНИЕ ЗАПИСИ
 */
function contract_copy_record() {
    rows = $('.contract_ref__table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        // Открываем карточку в режиме копирования записи
        reference.open_card('#contract_ref', 'Карточка Организации', size, OpenMode.Copy, id);
    }
    $('#contract_ref__context').css('display', 'none');
}



/**
 * Организации. УДАЛЕНИЕ ЗАПИСИ
 */
function contract_delete_record() {
    rows = $('.contract_ref__table_row.highlight');
    if (rows.length > 0) {
        reference.delete_record('#contract_ref', rows, 'delete_contract');
    }
    $('#contract_ref__context').css('display', 'none');
}

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К СПРАВОЧНИКУ ОРГАНИЗАЦИИ ============ 
 */
function contract_ref_binding_events() {

    $('#contract_ref__table tbody tr').on('click', function (e) {
        reference.highlight(e);
    });

    $('#contract_ref__select').on('click', function (e) {
        contract_select_record(e);
    })
}
/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ КОНТРАКТА ===============================
 */
function contract_card_binding_events() {
    /** ==============Карточка Организации: НАЖАТИЕ КНОПКИ OK ============= */
    $('#contract_card__OK ').on('click', function (e) {
        contract_card_press_OK(e.target);
        //$(e.target).parents('.appdialog').css('display', 'none');
    });
    /** ==============Карточка Организации: НАЖАТИЕ КНОПКИ Отмена ============= */
    $('#contract_card__Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    });

}

/**
 * ==================== ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ РАСШИРЕННОГО ПОИСКА =====================
 */
function contract_search_binding_events() {

    $('#contract_search__button_OK').on('click', function (e) {
        contract_extended_search_OK(e);
    })
    /** ======================== НАЖАТИЕ КНОПКИ ОТМЕНА  ======================= */
    $('#contract_search__button_Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    })


}


/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ОРГАНИЗАЦИИ (   Проверка на заполнение обязательных полей) =========================
 */
function contract_card_press_OK(sender) {
    if (contract_card__check_fields() == true) {
        //alert($('#contract_card__fullName').val())
        record = {
            id: $('#contract_card__id').text(),
            fullname: $('#contract_card__fullName').val(),
            briefname: $('#contract_card__briefName').val(),
            boss: $('#contract_card__boss').val(),
            inn: $('#contract_card__inn').val(),
            kpp: $('#contract_card__kpp').val(),
            ogrn: $('#contract_card__ogrn').val(),
            okpo: $('#contract_card__okpo').val(),
            postAddress: $('#contract_card__postAddress').val(),
            legalAddress: $('#contract_card__legalAddress').val(),
            email: $('#contract_card__email').val(),
            state: $('#contract_card__state').val(),
        }
        if ($('#contract_card__id').text() == '') {
            // ДОБАВЛЯЕМ значение в базу
            var data = {
                action: 'add_contract',
                record: record
            };
            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                contract_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произошла ошибка';
                reference.show_notification('contract_ref', 'Ошибка', size, message);
            })
        } else {
            // ОБНОВЛЯЕМ значение в базе данных
            var data = {
                action: 'update_contract',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                contract_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время обновления записи произощла ошибка';
                reference.show_notification('contract_ref', 'Ошибка', size, message);
            })
        }
        $(sender).parents('.appdialog').css('display', 'none');
    }
}

function contract_card__check_fields() {
    var message = '';
    // // Карточка Организации. Поле Полное наименование
    if ($('#contract_card__fullName').val().trim() == '') {
        $('#contract_card__fullName').addClass('red_border');
        message += "Не заполнено обязательное поле: Полное наименование <br \/>";
    }
    else {
        $('#contract_card__fullName').removeClass('red_border');
    }
    if ($('#contract_card__briefName').val().trim() == '') {
        $('#contract_card__briefName').addClass('red_border');
        message += "Не заполнено обязательное поле: Краткое наименование  <br \/>";
    }
    else {
        $('#contract_card__briefName').removeClass('red_border');
    }
    if ($('#contract_card__email').val().trim() == '') {
        $('#contract_card__email').addClass('red_border');
        message += " Не заполнено обязательное поле: email <br \/>";
    }
    else {
        $('#contract_card__email').removeClass('red_border');
    }

    if (message == '') {
        return true;
    }
    else {

        // Отправляем уведомление
        var size = { width: 400, height: 200 };

        reference.show_notification('#contract_ref', 'Предупреждение', size, message);
        return false;
    }
}
function contract_load_records(textStatus = '') {
    var data = {
        action: 'load_contract',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var size = { width: 500, height: 200 };
        contract_update_reference(records);
        if (textStatus != '') {
            reference.show_notification('#contract_ref', 'Уведомления', size, textStatus)
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время обновления списка записей произошла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#contract_ref', 'Ошибка', size, message);
    });

}
/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ОРГАНИЗАЦИИ ===========================
 * @param {Object} records 
 */
function contract_update_reference(records) {
    var ind = 1;
    $('#contract_ref__table tbody tr').remove();
    records.forEach(record => {
        $('#contract_ref__table tbody').append(
            $("<tr class='contract_ref__table_row'>")
                .append($("<td class='id hide'>").text(record["id"]))
                .append($("<td>").text(ind++))
                .append($("<td>").text(record["briefname"].replace(/\\"/g, '"')))
                .append($("<td style='text-align: left'>").text(record["fullname"].replace(/\\"/g, '"')))
                .append($("<td>").text(record["boss"]))
                .append($("<td>").text(record["email"]))
                .append($("<td>").text(reference.get_state(record["state"])))
        ).on('click', function (e) {
            reference.highlight(e);
        }).on('dblclick', function () {
            contract_edit_record();
        })
    });
}
/**
 * ============================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ =============================
 */
$('#contract_ref__update').on('click', function () {
    contract_load_records();
})

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function contract_common_search(value) {
    // Делаем ajax - запрос
    var data = {
        action: 'search_contract',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        console.log(records);
        contract_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#contract_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function contract_extended_search() {
    size = { width: 600, height: 500 };
    prefix = '#contract_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'contract_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);
        contract_search_binding_events();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#contract_ref', 'Ошибка', size, message);
    });
}



/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена =============
*/
$('#contract_search__button_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
function contract_extended_search_OK (e){
    var data = {
        action: 'search_contract_extended',
        fullname: $('#contract__search_fullname').val(),
        briefname: $('#contract__search_briefname').val(),
        boss: $('#contract__search_boss').val(),
        email: $('#contract__search_email').val(),
        inn: $('#contract__search_inn').val(), 
        okpo: $('#contract__search_okpo').val(),
        kpp: $('#contract__search_kpp').val(), 
        kpp: $('#contract__search_kpp').val(),
        ogrn: $('#contract__search_ogrn').val(), 
        postAddress: $('#contract__search_postAddress').val(),
        LegalAddress: $('#contract__search_LegalAddress').val(),
        state: $('#contract__search_state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        contract_update_reference(records);
        $(e.target).parents('.appdialog').css('display', 'none');

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_kind_ref', 'Ошибка', size, message);
    });
}




