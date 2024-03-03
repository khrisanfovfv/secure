




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
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ВИД ДОКУМЕНТА =========================
 */
$('#organization__card_OK').on('click', function () {
    if ($('#organization_card__name').val().trim() == '') {
        $('#organization_card__name').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#organization_ref', 'Предупреждение', size, message);
    } else {
        $('#organization_card__name').removeClass('red_border');
        // Формируем запись для запроса
        record = {
            id: $('#organization_card__id').text(),
            name: $('#organization_card__name').val(),
            state: $('#organization_card__state').val()
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
                var message = 'Во время обновления записи произошла ошибка';
                reference.show_notification('organization_ref', 'Ошибка', size, message);
            })
        }
        $(this).parents('.appdialog').css('display', 'none');
    }

});

/**
 * ==================== НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ВИД ДОКУМЕНТА ======================
 */
$('#organization__card_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});




/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function organization_load_records() {
    var data = {
        action: 'load_organization',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        organization_update_reference(records);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время удаления записи произошла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#organization_ref', 'Ошибка', size, message);
    });

}

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
    oraganization_create_record();

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
 * ========================= НАЖАТИЕ КНОПКИ ЭЛ. ТАБ. ===========================
 */
$('#organization_excel').on('click', function(){
    // Выводим данные из базы данных
    var data = {
        action: 'load_organization'
    };
    jQuery.post(MainData.ajaxurl, data, function (result) {
       var workbook = XLSX.utils.book_new();
        var records = JSON.parse(result);
        var organization_list = [
            [{t:'s', v:"№"},"Краткое наименование", "Полное наименование", "Руководитель", "email", "Состояние"]
        ]
        var workbook = new XLSX.Workbook();
        records.forEach((record,ind) => {
            organization_list[ind+1] = [];
            organization_list[ind+1][0] = ind+1;
            organization_list[ind+1][1] = record['briefname'];
            organization_list[ind+1][2] = record['fullname'];
            organization_list[ind+1][3] = record['boss'];
            organization_list[ind+1][4] = record['email'];
            organization_list[ind+1][5] = record['state'];
        })
        var worksheet = XLSX.utils.aoa_to_sheet(organization_list);
        worksheet["A1"].s ={
            font: {
                name: 'Arial',
                sz: 24,
                bold: true,
                color : {rgb: "FFAA00"}
            }
        }
            
        XLSX.utils.book_append_sheet(workbook, worksheet,"Организации");
        XLSX.writeFileXLSX(workbook,"Организации.xlsx");

    });
    
    




    
})
/**
 * ========================= НАЖАТИЕ КНОПКИ Обновить ===========================
 */
$('#organization_ref__update').on('click', function () {
    organization_load_records()
})

function oraganization_create_record() {
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
 * ОРГАНИЗАТОР. КОПИРОВАНИЕ ЗАПИСИ
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

    $('#organization_ref__select').on('click', function (e) {
        organization_select_record(e);
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
        $(sender).parents('.appdialog').css('display', 'none');
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
function organization_extended_search_OK (e){
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




