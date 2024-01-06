/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#department_table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#department_table tbody tr').on('dblclick', function () {
    rows = $('.department_table_row.highlight')
    var size = { width: 600, height: 200 };
    reference.editRecord('#department_ref', rows, 'Карточка Вид документа', size);
})

/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ОТДЕЛА =========================
 */
function department_card_press_OK(sender) {
    if ($('#department_card__name').val().trim() == '') {
        $('#department_card__name').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#department_ref', 'Предупреждение', size, message);
    } else {
        $('#department_card__name').removeClass('red_border');
        // Формируем запись для запроса
        record = {
            id: $('#department_card__id').text(),
            name: $('#department_card__name').val(),
            organization_id : $('#department_card__organization').find('.id').text(),
            boss : $('#department_card__boss').val(),
            state: $('#department_card__state').val()
        }
        if ($('#department_card__id').text() == '') {

            // ДОБАВЛЯЕМ значение в базу
            var data = {
                action: 'add_department',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                department_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произошла ошибка';
                reference.show_notification('department_ref', 'Ошибка', size, message);
            })
        } else {
            // ОБНОВЛЯЕМ значение в базе данных
            var data = {
                action: 'update_department',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                department_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время обновления записи произошла ошибка';
                reference.show_notification('department_ref', 'Ошибка', size, message);
            })
        }
        $(sender).parents('.appdialog').css('display', 'none');
    }
}







/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function department_load_records() {
    var data = {
        action: 'load_department',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        department_update_reference(records);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время удаления записи произошла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#department_ref', 'Ошибка', size, message);
    });

}

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function department_common_search(value) {
    // Делаем ajax - запрос
    var data = {
        action: 'search_department',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        department_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#department_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function department_extended_search() {
    size = { width: 500, height: 200 };
    prefix = '#department_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'department_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#department_ref', 'Ошибка', size, message);
    });
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
$('#department_search__button_OK').on('click', function () {
    var data = {
        action: 'search_department_extended',
        name: $('#department__search_name').val(),
        state: $('#department__search_state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        department_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#department_ref', 'Ошибка', size, message);
    });

})

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена =============
*/
$('#department_search__button_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});



/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#department_create').on('click', function () {
    var size = { width: 600, height: 250 };
    reference.open_card('#department_ref', 'Карточка Отдела', size, OpenMode.Create, 0);
});

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#department_edit').on('click', function () {
    rows = $('.department_table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 250 };
    reference.open_card('#department_ref', 'Карточка Отдела', size, OpenMode.Edit, id);
})


/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ===========================
 */
$('#department_copy').on('click', function () {
    rows = $('.department_table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 200 };
    // Открываем карточку в режиме создания новой записи
    reference.open_card('#department_ref', 'Карточка Отдела', size, OpenMode.Copy, id);
})


/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#department_delete').on('click', function () {
    rows = $('.department_table_row.highlight');
    reference.delete_record('#department_ref', rows);
});

/** 
 * ========================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ =================================
 */
$('#department_update').on('click', function(){
    department_load_records()
})


/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
async function card_department_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при редимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#department_card__id').text(''); break;
        case OpenMode.Edit: $('#department_card__id').text(cardData[0].id); break;
        case OpenMode.Copy: $('#department_card__id').text(''); break;
    }
    $('#department_card__name').val(cardData[0].name);
    $('#department_card__organization').find('.id').text(cardData[0].organization_id);
    $('#department_card__organization').find('.fullname').val(cardData[0].organization_name);
    $('#department_card__boss').val(cardData[0].boss)
    $('#department_card__state').val(cardData[0].state);
}

/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ===========================
 * @param {Object} records 
 */
function department_update_reference(records) {
    var ind = 1;
    $('#department_table tbody tr').remove();
    records.forEach(record => {
        $('#department_table tbody').append(
            $("<tr class='department_table_row'>")
                .append($("<td class='id hide'>").text(record["id"]))
                .append($("<td>").text(ind++))
                .append($("<td>").text(record["name"]))
                .append($("<td>").text(record["organization_name"]))
                .append($("<td>").text(record["boss"]))
                .append($("<td>").text(reference.get_state(record["state"])))
        ).on('click', function (e) {
            reference.highlight(e);
        })
    });


    /** 
    * ====================== КОНТЕКТНОЕ МЕНЮ - РЕДАКТИРОВАТЬ ========================= 
    * */
    $('#department_ref__context_edit').on('click', function () {
        rows = $('.department_table_row.highlight');
        if (rows.length > 0) {
            var id = rows[0].children.item(0).textContent;
            //Загружаем карточку
            textStatus = id;
            var size = { width: 400, height: 200 };
            reference.show_notification('#department_ref', 'Уведомление', size, textStatus)
        } else {
            var size = { width: 400, height: 200 };
            message = 'Вы не выбрали запись';
            reference.show_notification('#department_ref', 'Предупреждение', size, message);
        }
    })

}

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ОТДЕЛА ============ 
 */
function department_card_binging_events() {
    $('#department__card_OK').on('click', function () {
        department_card_press_OK(this);
    });

    /** ============ НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ВИД ДОКУМЕНТА ============ */
    $('#department__card_Cancel').on('click', function () {
        $(this).parents('.appdialog').css('display', 'none');
    });

    /** ======== НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА В ПОЛЕ ОРГАНИЗАЦИЯ ========= */
    $('#department_card__organization_btn').on('click', function(e){
        reference.open_reference(e,'#department_card', 'Справочник организации');
    })
}


