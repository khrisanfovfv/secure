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
    rows = $('.organization_ref__table_row.highlight')
    var size = { width: 600, height: 200 };
    reference.editRecord('#organization_ref', rows, 'Карточка Вид документа', size);
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
function organization_common_search(value){
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
function organization_extended_search(){
    size = {width : 500, height : 200};
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
$('#organization_search__button_OK').on('click', function(){
    var data = {
        action: 'search_organization_extended',
        name : $('#organization__search_name').val(),
        state : $('#organization__search_state').val()
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
$('#organization_search__button_Cancel').on('click', function(){
    $(this).parents('.appdialog').css('display', 'none');
});



/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#organization_ref__create').on('click', function () { 
    var size = { width: 700, height: 650 };
    reference.open_card('#organization_ref', 'Карточка организации', size, OpenMode.Create, 0);
});

/** 
 * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
 * */
$('#organization_ref__select').on('click', function(e){
    organization_select_record(e);
})

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#organization_ref__edit').on('click', function () {
    rows = $('.organization_table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 700, height: 650 };
    reference.open_card('#organization_ref', 'Карточка Вид документа', size, OpenMode.Edit, id);
})


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
 * ======================= ОРГАНИЗАЦИЯ. ВЫБОР ЗАПИСИ =========================
 */
function organization_select_record(e){
    rows = $('.organization_ref__table_row.highlight');
    if (rows.length > 0){
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
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#organization_delete').on('click', function () {
    rows = $('.organization_ref__table_row.highlight');
    reference.delete_record('#organization_ref', rows);
});


/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
async function card_organization_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при редимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#organization_card__id').text(''); break;
        case OpenMode.Edit: $('#organization_card__id').text(cardData[0].id); break;
        case OpenMode.Copy: $('#organization_card__id').text(''); break;
    }
    $('#organization_card__name').val(cardData[0].name);
    $('#organization_card__state').val(cardData[0].state);
}

/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ===========================
 * @param {Object} records 
 */
function organization_update_reference(records) {
    var ind = 1;
    $('#organization_ref__table tbody tr').remove();
    records.forEach(record => {
        $('#organization_table tbody').append(
            $("<tr class='organization_table_row'>")
                .append($("<td class='id hide'>").text(record["id"]))
                .append($("<td>").text(ind++))
                .append($("<td>").text(record["name"]))
                .append($("<td>").text(reference.get_state(record["state"])))
        ).on('click', function (e) {
            reference.highlight(e);
        })
    });


    /** 
 * ====================== КОНТЕКТНОЕ МЕНЮ - РЕДАКТИРОВАТЬ ========================= 
 * */
$('#organization_ref__context_edit').on('click', function () {
    rows = $('.organizatio_ref__table_row.highlight');
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        //Загружаем карточку
        textStatus = id;
        var size = { width: 400, height: 200 };
        reference.show_notification('#organization_ref', 'Уведомление', size, textStatus)
    } else {
        var size = { width: 400, height: 200 };
        message = 'Вы не выбрали запись';
        reference.show_notification('#organization_ref', 'Предупреждение', size, message);
    }
})
}

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К СПРАВОЧНИКУ ОРГАНИЗАЦИИ ============ 
 */
function organization_ref_binding_events(){

    $('#organization_ref__table tbody tr').on('click', function(e){
        reference.highlight(e);
    });

    $('#organization_ref__select').on('click', function(e){
        organization_select_record(e);
    })
}
/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ОРГАНИЗАЦИИ ===============================
 */
function organization_card_binding_events(){
        /** ==============Карточка Организации: НАЖАТИЕ КНОПКИ OK ============= */
        $('#organization_card__OK ').on('click', function () {
            organization_card_press_OK(this);
        });
     /** ==============Карточка Организации: НАЖАТИЕ КНОПКИ Отмена ============= */
     $('#organization_card__Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    });

}
/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ОРГАНИЗАЦИИ (   Проверка на заполнение обязательных полей) =========================
 */
function organization_card_press_OK(sender) {
    // var message = '';
    // // Карточка Организации. Поле Полное наименование
    // if ($('#organization_card__fullName').val().trim() == '') {
    //     message += 'Не заполнено поле Полное наименование\n';
    //     $('#organization_card__fullName').addClass('red_border');
    // }

    // // Таблица информационные системы
    // var rows = $('#administrator_card__information_systems_table tbody tr');
    // var has_empty = false;
    // rows.each(function (i, row) {
    //     // Поле Информационная система
    //     if ($(row.cells[2]).find('.fullname').val().trim() == '') {
    //         $(row.cells[2]).addClass('red_border');
    //         has_empty = true
    //     } else {
    //         $(row.cells[2]).removeClass('red_border');
    //     }
    //     // Поле Дата назначения
    //     if ($(row.cells[3]).children().val().trim() == '') {
    //         $(row.cells[3]).addClass('red_border');
    //         has_empty = true
    //     } else {
    //         $(row.cells[3]).removeClass('red_border');
    //     }
    // })

    // if (has_empty == true) {
    //     message += 'Таблица Замечания по аттестации имеет незаполненные обязательные поля';
    // }


    // if (message == '') {
    //     return true;
    // } else {
    //     // Отправляем уведомление
    //     var size = { width: 400, height: 200 };
    //     reference.show_notification('#administrator_ref', 'Предупреждение', size, message);
    //     return false;
    // }

    if ($('#organization_card__fullName').val().trim() == '') {
        $('#organization_card__fullName').addClass('red_border');

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
            organization_id : $('#organization_card__organization').find('.id').text(),
            boss : $('#organization_card__boss').val(),
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
        $(sender).parents('.appdialog').css('display', 'none');
    }
    if ($('#organization_card__briefName').val().trim() == '') {
        $('#organization_card__briefName').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#organization_ref', 'Предупреждение', size, message);
    }
    if ($('#organization_card__boss').val().trim() == '') {
        $('#organization_card__boss').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#organization_ref', 'Предупреждение', size, message);
    } 
    if ($('#organization_card__email').val().trim() == '') {
        $('#organization_card__email').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#organization_ref', 'Предупреждение', size, message);
    } 
    if ($('#organization_card__state').val().trim() == '') {
        $('#organization_card__state').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#organization_ref', 'Предупреждение', size, message);
    } 
    
}