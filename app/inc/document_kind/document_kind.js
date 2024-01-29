/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#document_kind_table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#document_kind_table tbody tr').on('dblclick', function () {
    rows = $('.document_kind_table_row.highlight')
    var size = { width: 600, height: 200 };
    reference.editRecord('#document_kind_ref', rows, 'Карточка Вид документа', size);
})

/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ВИД ДОКУМЕНТА =========================
 */
$('#document_kind__card_OK').on('click', function () {
    if ($('#document_kind_card__name').val().trim() == '') {
        $('#document_kind_card__name').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#document_kind_ref', 'Предупреждение', size, message);
    } else {
        $('#document_kind_card__name').removeClass('red_border');
        // Формируем запись для запроса
        record = {
            id: $('#document_kind_card__id').text(),
            name: $('#document_kind_card__name').val(),
            state: $('#document_kind_card__state').val()
        }
        if ($('#document_kind_card__id').text() == '') {

            // ДОБАВЛЯЕМ значение в базу
            var data = {
                action: 'add_document_kind',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                document_kind_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произошла ошибка';
                reference.show_notification('document_kind_ref', 'Ошибка', size, message);
            })
        } else {
            // ОБНОВЛЯЕМ значение в базе данных
            var data = {
                action: 'update_document_kind',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                document_kind_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время обновления записи произошла ошибка';
                reference.show_notification('document_kind_ref', 'Ошибка', size, message);
            })
        }
        $(this).parents('.appdialog').css('display', 'none');
    }

});

/**
 * ==================== НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ВИД ДОКУМЕНТА ======================
 */
$('#document_kind__card_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});




/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function document_kind_load_records() {
    var data = {
        action: 'load_document_kind',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        document_kind_update_reference(records);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время удаления записи произошла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_kind_ref', 'Ошибка', size, message);
    });

}

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function document_kind_common_search(value){
    // Делаем ajax - запрос
    var data = {
        action: 'search_document_kind',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        document_kind_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_kind_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ КНОПКА РАСШИРЕННЫЙ ПОИСК =============================
 */
function document_kind_extended_search(){
    size = {width : 500, height : 200};
    prefix = '#document_kind_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'document_kind_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);
            
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var size = { width: 500, height: 200 };
            message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
            reference.show_notification('#document_kind_ref', 'Ошибка', size, message);
        });
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
$('#document_kind_search__button_OK').on('click', function(){
    var data = {
        action: 'search_document_kind_extended',
        number : $('#document_kind__search_name').val(),
        state : $('#document_kind__search_state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        document_kind_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_kind_ref', 'Ошибка', size, message);
    });

})

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена =============
*/
$('#document_kind_search__button_Cancel').on('click', function(){
    $(this).parents('.appdialog').css('display', 'none');
});



/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#document_kind_create').on('click', function () {
    var size = { width: 600, height: 250 };
    reference.open_card('#document_kind_ref', 'Карточка Вид документа', size, OpenMode.Create, 0);
});

/**
 * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
 */
$('#document_kind_ref__select').on('click', function(e){
    document_kind_select_record(e);
})

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#document_kind_edit').on('click', function () {
    rows = $('.document_kind_table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 200 };
    reference.open_card('#document_kind_ref', 'Карточка Вид документа', size, OpenMode.Edit, id);
})


/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ===========================
 */
$('#document_kind_copy').on('click', function () {
    rows = $('.document_kind_table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 200 };
    // Открываем карточку в режиме создания новой записи
    reference.open_card('#document_kind_ref', 'Карточка Вид документа', size, OpenMode.Copy, id);
})


/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#document_kind_delete').on('click', function () {
    document_kind_delete_record()
});




/**
 * ======================= ВИД ДОКУМЕНТА. ВЫБОР ЗАПИСИ =========================
 */
function document_kind_select_record(e){
    rows = $('.document_kind_ref__table_row.highlight');
    if (rows.length > 0){
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
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
async function card_document_kind_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при редимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#document_kind_card__id').text(''); break;
        case OpenMode.Edit: $('#document_kind_card__id').text(cardData[0].id); break;
        case OpenMode.Copy: $('#document_kind_card__id').text(''); break;
    }
    if (openMode == OpenMode.Copy) {
        $('#document_kind_card__name').val(cardData[0].name + ' - Копия');
    }
    else {
        $('#organization_card__fullName').val(cardData[0].fullname);
    }
    $('#document_kind_card__state').val(cardData[0].state);
}

/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ===========================
 * @param {Object} records 
 */
function document_kind_update_reference(records) {
    var ind = 1;
    $('#document_kind_table tbody tr').remove();
    records.forEach(record => {
        $('#document_kind_table tbody').append(
            $("<tr class='document_kind_table_row'>")
                .append($("<td class='id hide'>").text(record["id"]))
                .append($("<td>").text(ind++))
                .append($("<td>").text(record["name"]))
                .append($("<td>").text(reference.get_state(record["state"])))
        ).on('click', function (e) {
            reference.highlight(e);
        })
    });
}

/** 
 * ====================== КОНТЕКТНОЕ МЕНЮ - РЕДАКТИРОВАТЬ ========================= 
 * */
$('#document_kind_ref__context_edit').on('click', function () {
    rows = $('.document_kind_table_row.highlight');
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        //Загружаем карточку
        textStatus = id;
        var size = { width: 400, height: 200 };
        reference.show_notification('#document_kind_ref', 'Уведомление', size, textStatus)
    } else {
        var size = { width: 400, height: 200 };
        message = 'Вы не выбрали запись';
        reference.show_notification('#document_kind_ref', 'Предупреждение', size, message);
    }
})

/**
 * Организации. УДАЛЕНИЕ ЗАПИСИ
 */
function document_kind_delete_record() {
    rows = $('.document_kind_ref__table_row.highlight');
    alert(rows.length);
    if (rows.length > 0) {
        reference.delete_record('#document_kind_ref', rows, 'delete_document_kind');
    }
    $('#document_kind_ref__context').css('display', 'none');
}

/**
 * ================== ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ СПРАВОЧНИКА ===================
 */
function document_kind_ref_binding_events(){
    $('#document_kind_ref__table tbody tr').on('click', function(e){
        reference.highlight(e);
    })

    $('#document_kind_ref__select').on('click', function(e){
        document_kind_select_record(e)
    })


}