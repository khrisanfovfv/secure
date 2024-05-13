

/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#organization_ref__table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#organization_ref__table tbody tr').on('dblclick', function () {
    organization_edit_record();
})


/**
 * ==================== НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ВИД ДОКУМЕНТА ======================
 */
$('#organization__card_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});




/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
// function organization_load_records() {
//     alert('Работает!');
//     var data = {
//             action: 'load_organization',
//             fbrief_name : $('#organisation_ref__fbriefname').val().trim(),
//             ffull_name: $('#organisation_ref__ffullname').val().trim(),
//             fboss : $('#organisation_ref__fboss').val().trim(),
//             femail : $('#organisation_ref__femail').val().trim(),
//             fstate: $('#organisation_ref__fstate').val()
//     };

//     jQuery.post(MainData.ajaxurl, data, function (result) {
//         var records = JSON.parse(result);
//         organization_update_reference(records);
//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         var size = { width: 500, height: 200 };
//         var message = 'Во время удаления записи произошла ошибка ' + textStatus + ' ' + errorThrown;
//         reference.show_notification('#organization_ref', 'Ошибка', size, message);
//     });

// }

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function organization_common_search(value) {
    // Делаем ajax - запрос
    var data = {
        action: 'search_organization',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        organization_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#organization_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function organization_extended_search() {
    size = { width: 500, height: 200 };
    prefix = '#organization_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'organization_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#organization_ref', 'Ошибка', size, message);
    });
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
$('#organization_search__button_OK').on('click', function () {
    var data = {
        action: 'search_organization_extended',
        name: $('#organization__search_name').val(),
        state: $('#organization__search_state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        organization_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#organization_ref', 'Ошибка', size, message);
    });

})

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена =============
*/
$('#organization_search__button_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});



/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#organization_ref__create').on('click', function () {
    organization_create_record();

});

/** 
 * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
 * */
$('#organization_ref__select').on('click', function (e) {
    organization_select_record(e);
});

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#organization_ref__edit').on('click', function () {
    organization_edit_record()

});

/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ===========================
 */
$('#organization_ref__copy').on('click', function () {
    rows = $('.organization_table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 700, height: 650 };
    // Открываем карточку в режиме создания новой записи
    reference.open_card('#organization_ref', 'Карточка Вид документа', size, OpenMode.Copy, id);
})

/** 
 * ======================= ВЫГРУЗКА ОРГАНИЗАЦИЙ В ТАБЛИЦУ EXCEL =====================
 */
async function organization_to_excel(data){

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Организации');
    const letr = ['A','B','C','D','E','F','G','H','I','J','K','L','M'];
    
    // Шрифт для заголовка
    const font = { 
        name: 'Arial', 
        size: 12, 
        bold: true
    };
    // Границы ячеек 
    const border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
    }

    // Настраиаем колонки
    worksheet.columns = [
        {header: '№', key : 'number', width: 10, style : {alignment:{vertical: 'middle', horizontal: 'center'}}},
        {header: 'ИД', key : 'id', width: 10, style : {alignment:{vertical: 'middle', horizontal: 'center'}}},
        {header: 'Полное наименование', key : 'fullname', width: 50, style : {alignment :{vertical: 'middle', horizontal: 'left', wrapText: true}}},
        {header: 'Краткое наименование', key : 'briefname', width: 50},
        {header: 'ИНН', key : 'inn', width: 13, style : {alignment:{vertical: 'middle', horizontal: 'center'}}},
        {header: 'ОКПО', key : 'okpo', width: 13, style : {alignment:{vertical: 'middle', horizontal: 'center'}}},
        {header: 'КПП', key : 'kpp', width: 13, style : {alignment:{vertical: 'middle', horizontal: 'center'}}},
        {header: 'ОГРН', key : 'ogrn', width: 13, style : {alignment:{vertical: 'middle', horizontal: 'center'}}},
        {header: 'Почтовый адрес', key : 'postAddress', width: 50, style : {alignment :{vertical: 'middle', horizontal: 'left', wrapText: true}}},
        {header: 'Юридический Адрес', key : 'legalAddress', width: 50, style : {alignment :{vertical: 'middle', horizontal: 'left', wrapText: true}}},
        {header: 'email', key : 'email', width: 30, style : {alignment:{vertical: 'middle', horizontal: 'center'}}},
        {header: 'Руководитель', key : 'boss', width: 40, style : {alignment:{vertical: 'middle', horizontal: 'center'}}},
        {header: 'Статус', key : 'state', width: 20, style : {alignment:{vertical: 'middle', horizontal: 'center'}}}
    ]       
    worksheet.getRow(1).font = font;
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Устанавливаем границы ячеек заголовков таблицы
    letr.forEach((value) => {
        worksheet.getCell(value + '1').border = border;
    })

    // Добавляем значения в таблицу
    data.forEach((organization, ind) => {
        worksheet.getCell('A'+(ind+2)).value = ind+1;
        worksheet.getCell('B'+(ind+2)).value = organization['id'];
        worksheet.getCell('C'+(ind+2)).value = organization['fullname'];
        worksheet.getCell('D'+(ind+2)).value = organization['briefname'];
        worksheet.getCell('E'+(ind+2)).value = organization['inn'];
        worksheet.getCell('F'+(ind+2)).value = organization['okpo'];
        worksheet.getCell('G'+(ind+2)).value = organization['kpp'];
        worksheet.getCell('H'+(ind+2)).value = organization['ogrn'];
        worksheet.getCell('I'+(ind+2)).value = organization['postAddress'];
        worksheet.getCell('J'+(ind+2)).value = organization['legalAddress'];
        worksheet.getCell('K'+(ind+2)).value = organization['email'];
        worksheet.getCell('L'+(ind+2)).value = organization['boss'];
        worksheet.getCell('M'+(ind+2)).value = reference.get_state(organization['state']);

        // Устанавливаем границы ячеек строки
        letr.forEach((value) => {
            worksheet.getCell(value + (ind+2)).border = border;
        })
    })

    saveToExcel(workbook, 'Организации');

}


/**
 * ========================= НАЖАТИЕ КНОПКИ ЭЛ. ТАБ. ===========================
 */
$('#organization_excel').on('click', function () {
    // Выводим данные из базы данных
    var data = {
        action: 'load_organization'
    };
    jQuery.post(MainData.ajaxurl, data, function (result) {
        let organizations = JSON.parse(result);
        organization_to_excel(organizations);
    });

})



function organization_create_record() {
    var size = { width: 700, height: 650 };
    reference.open_card('#organization_ref', 'Карточка организации', size, OpenMode.Create, 0);
}


/**
 * ======================= ОРГАНИЗАЦИЯ. ВЫБОР ЗАПИСИ =========================
 */
function organization_select_record(e) {
    rows = $('.organization_ref__table_row.highlight');
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
$('#organization_ref__copy').on('click', function () {
    organization_copy_record()
})

/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#organization_delete').on('click', function () {
    organization_delete_record()
});


/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
async function card_organization_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при режимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#organization_card__id').text(''); break;
        case OpenMode.Edit: $('#organization_card__id').text(cardData[0].id); break;
        case OpenMode.Copy: $('#organization_card__id').text(''); break;
    }
    if (openMode == OpenMode.Copy) {
        $('#organization_card__fullName').val(cardData[0].fullname + ' - Копия');
    }
    else {
        $('#organization_card__fullName').val(cardData[0].fullname.replace(/\\"/g, '"'));
    }
    $('#organization_card__briefName').val(cardData[0].briefname.replace(/\\"/g, '"'));
    $('#organization_card__boss').val(cardData[0].boss);
    $('#organization_card__inn').val(cardData[0].inn);
    $('#organization_card__kpp').val(cardData[0].kpp);
    $('#organization_card__ogrn').val(cardData[0].ogrn);
    $('#organization_card__okpo').val(cardData[0].okpo);
    $('#organization_card__postAddress').val(cardData[0].postAddress.replace(/\\"/g, '"'));
    $('#organization_card__legalAddress').val(cardData[0].legalAddress.replace(/\\"/g, '"'));
    $('#organization_card__email').val(cardData[0].email);
    $('#organization_card__state').val(cardData[0].state);
}

// /**
//  *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА 1===========================
//  * @param {Object} records 
//  */
// function organization_update_reference(records) {
//     var ind = 1;
//     $('#organization_ref__table tbody tr').remove();
//     records.forEach(record => {
//         $('#organization_table tbody').append(
//             $("<tr class='organization_table_row'>")
//                 .append($("<td class='id hide'>").text(record["id"]))
//                 .append($("<td>").text(ind++))
//                 .append($("<td>").text(record["name"].replace("\\","")))
//                 .append($("<td>").text(reference.get_state(record["state"])))
//         ).on('click', function (e) {
//             reference.highlight(e);
//         })
//     });
// }


// /** 
// * ====================== КОНТЕКТНОЕ МЕНЮ - РЕДАКТИРОВАТЬ ========================= 
// * */
// $('#organization_ref__context_edit').on('click', function () {
//     rows = $('.organization_ref__table_row.highlight');
//     if (rows.length > 0) {
//         var id = rows[0].children.item(0).textContent;
//         //Загружаем карточку
//         textStatus = id;
//         var size = { width: 400, height: 200 };
//         reference.show_notification('#organization_ref', 'Уведомление', size, textStatus)
//     } else {
//         var size = { width: 400, height: 200 };
//         message = 'Вы не выбрали запись';
//         reference.show_notification('#organization_ref', 'Предупреждение', size, message);
//     }
// })
/**
 * Организации. Редактирование ЗАПИСИ
 */
function organization_edit_record() {
    rows = $('.organization_ref__table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1000, height: 800 };
        reference.open_card('#organization_ref', 'Карточка Организации', size, OpenMode.Edit, id);
    }
    $('#organization_ref__context').css('display', 'none');
}

/**
 * ОРГАНИЗАЦИЯ. КОПИРОВАНИЕ ЗАПИСИ
 */
function organization_copy_record() {
    rows = $('.organization_ref__table_row.highlight')
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        var size = { width: 1400, height: 800 };
        // Открываем карточку в режиме копирования записи
        reference.open_card('#organization_ref', 'Карточка Организации', size, OpenMode.Copy, id);
    }
    $('#organization_ref__context').css('display', 'none');
}



/**
 * Организации. УДАЛЕНИЕ ЗАПИСИ
 */
function organization_delete_record() {
    rows = $('.organization_ref__table_row.highlight');
    if (rows.length > 0) {
        reference.delete_record('#organization_ref', rows, 'delete_organization');
    }
    $('#organization_ref__context').css('display', 'none');
}

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К СПРАВОЧНИКУ ОРГАНИЗАЦИИ ============ 
 */
function organization_ref_binding_events() {

    $('#organization_ref__table tbody tr').on('click', function (e) {
        reference.highlight(e);
    });

    /** ===================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ====================== */
    $('#organization_ref__create').on('click', function (e) {
        organization_create_record();
    })

    /** ===================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ====================== */
    $('#organization_ref__select').on('click', function (e) {
        organization_select_record(e);
    })
    /** ===================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ====================== */
    $('#organization_ref__edit').on('click', function (e) {
        organization_edit_record(e);
    })
    /** ===================== НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ====================== */
    $('#organization_ref__copy').on('click', function () {
        organization_copy_record();
    });
    /** ===================== НАЖАТИЕ КНОПКИ УДАЛИТЬ ====================== */
    $('#organization_ref__delete').on('click', function () {
        organization_delete_record();
    });

    $('#organization_ref__update').on('click', function () {
        organization_load_records();
    });

    $('.organization_filter').on('keyup',function(event){
        if (event.key === 'Enter'){
            organization_load_records();
        }
    })
}
/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ОРГАНИЗАЦИИ ===============================
 */
function organization_card_binding_events() {
    /** ==============Карточка Организации: НАЖАТИЕ КНОПКИ OK ============= */
    $('#organization_card__OK ').on('click', function (e) {
        organization_card_press_OK(e.target);
        //$(e.target).parents('.appdialog').css('display', 'none');
    });
    /** ==============Карточка Организации: НАЖАТИЕ КНОПКИ Отмена ============= */
    $('#organization_card__Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    });

}

/**
 * ==================== ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ РАСШИРЕННОГО ПОИСКА =====================
 */
function organization_search_binding_events() {

    $('#organization_search__button_OK').on('click', function (e) {
        organization_extended_search_OK(e);
    })
    /** ======================== НАЖАТИЕ КНОПКИ ОТМЕНА  ======================= */
    $('#organization_search__button_Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    })


}


/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ОРГАНИЗАЦИИ (   Проверка на заполнение обязательных полей) =========================
 */
function organization_card_press_OK(sender) {
    if (organization_card__check_fields() == true) {
        //alert($('#organization_card__fullName').val())
        record = {
            id: $('#organization_card__id').text(),
            fullname: $('#organization_card__fullName').val(),
            briefname: $('#organization_card__briefName').val(),
            boss: $('#organization_card__boss').val(),
            inn: $('#organization_card__inn').val(),
            kpp: $('#organization_card__kpp').val(),
            ogrn: $('#organization_card__ogrn').val(),
            okpo: $('#organization_card__okpo').val(),
            postAddress: $('#organization_card__postAddress').val(),
            legalAddress: $('#organization_card__legalAddress').val(),
            email: $('#organization_card__email').val(),
            state: $('#organization_card__state').val(),
        }
        if ($('#organization_card__id').text() == '') {
            // ДОБАВЛЯЕМ значение в базу
            var data = {
                action: 'add_organization',
                record: record
            };
            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                organization_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произошла ошибка';
                reference.show_notification('organization_ref', 'Ошибка', size, message);
            })
        } else {
            // ОБНОВЛЯЕМ значение в базе данных
            var data = {
                action: 'update_organization',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                organization_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время обновления записи произощла ошибка';
                reference.show_notification('organization_ref', 'Ошибка', size, message);
            })
        }
        $(sender).parents('.appdialog:first').css('display', 'none');
    }
}

function organization_card__check_fields() {
    var message = '';
    // // Карточка Организации. Поле Полное наименование
    if ($('#organization_card__fullName').val().trim() == '') {
        $('#organization_card__fullName').addClass('red_border');
        message += "Не заполнено обязательное поле: Полное наименование <br \/>";
    }
    else {
        $('#organization_card__fullName').removeClass('red_border');
    }
    if ($('#organization_card__briefName').val().trim() == '') {
        $('#organization_card__briefName').addClass('red_border');
        message += "Не заполнено обязательное поле: Краткое наименование  <br \/>";
    }
    else {
        $('#organization_card__briefName').removeClass('red_border');
    }
    if ($('#organization_card__email').val().trim() == '') {
        $('#organization_card__email').addClass('red_border');
        message += " Не заполнено обязательное поле: email <br \/>";
    }
    else {
        $('#organization_card__email').removeClass('red_border');
    }

    if (message == '') {
        return true;
    }
    else {

        // Отправляем уведомление
        var size = { width: 400, height: 200 };

        reference.show_notification('#organization_ref', 'Предупреждение', size, message);
        return false;
    }
}
function organization_load_records(textStatus = '') {
    var data = {
        fbriefname : $('#organisation_ref__fbriefname').val().trim(),
        ffullname: $('#organisation_ref__ffullname').val().trim(),
        fboss : $('#organisation_ref__fboss').val().trim(),
        femail : $('#organisation_ref__femail').val().trim(),
        fstate: $('#organisation_ref__fstate').val(),
        action: 'load_organization',
    };
    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var size = { width: 500, height: 200 };
        organization_update_reference(records);
        if (textStatus != '') {
            reference.show_notification('#organization_ref', 'Уведомления', size, textStatus)
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время обновления списка записей произошла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#organization_ref', 'Ошибка', size, message);
    });

}
/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ОРГАНИЗАЦИИ ===========================
 * @param {Object} records 
 */
function organization_update_reference(records) {
    var ind = 1;
    $('#organization_ref__table tbody tr').remove();
    records.forEach(record => {
        $('#organization_ref__table tbody').append(
            $("<tr class='organization_ref__table_row'>")
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
            organization_edit_record();
        })
    });
}
/**
 * ============================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ =============================
 */
$('#organization_ref__update').on('click', function () {
    organization_load_records();
})

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function organization_common_search(value) {
    // Делаем ajax - запрос
    var data = {
        action: 'search_organization',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        console.log(records);
        organization_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#organization_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function organization_extended_search() {
    size = { width: 600, height: 500 };
    prefix = '#organization_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'organization_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);
        organization_search_binding_events();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#organization_ref', 'Ошибка', size, message);
    });
}



/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена =============
*/
$('#organization_search__button_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
function organization_extended_search_OK(e) {
    var data = {
        action: 'search_organization_extended',
        fullname: $('#organization__search_fullname').val(),
        briefname: $('#organization__search_briefname').val(),
        boss: $('#organization__search_boss').val(),
        email: $('#organization__search_email').val(),
        inn: $('#organization__search_inn').val(),
        okpo: $('#organization__search_okpo').val(),
        kpp: $('#organization__search_kpp').val(),
        kpp: $('#organization__search_kpp').val(),
        ogrn: $('#organization__search_ogrn').val(),
        postAddress: $('#organization__search_postAddress').val(),
        LegalAddress: $('#organization__search_LegalAddress').val(),
        state: $('#organization__search_state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        organization_update_reference(records);
        $(e.target).parents('.appdialog').css('display', 'none');

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_kind_ref', 'Ошибка', size, message);
    });
}

$('.organization_filter').on('keyup',function(event){
    if (event.key === 'Enter'){
        organization_load_records();
    }
    
})




