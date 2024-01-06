/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#department_ref__table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#department_ref__table tbody tr').on('dblclick', function () {
    rows = $('.department_ref__table_row.highlight')
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
        department_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#department_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ ОТКРЫТИЕ КАРТОЧКИ РАСШИРЕННЫЙ ПОИСК =============================
 */
function department_extended_search() {
    size = { width: 600, height: 250 };
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
        department_search_binding_events();

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#department_ref', 'Ошибка', size, message);
    });
}







/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#department_ref__create').on('click', function () {
    department_create_record();
});

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ===========================
 */
$('#department_ref__edit').on('click', function () {
    department_edit_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ =============================
 */
$('#department_ref__copy').on('click', function () {
    department_copy_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ =========================
 */
$('#department_ref__delete').on('click', function () {
    department_delete_record();
});

/** 
 * ========================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ ===============================
 */
$('#department_ref__update').on('click', function(){
    department_load_records()
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ =================================
 */
$('#department_ref__context_edit').on('click', function(){
    department_edit_record();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ КОПИРОВАТЬ =================================
 */
$('#department_ref__context_copy').on('click', function(){
    department_copy_record();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ УДАЛИТЬ =================================
 */
$('#department_ref__context_delete').on('click', function(){
    department_delete_record();
})

/**================================================================================= 
* ==================================== ДЕЙСТВИЯ ==================================== 
* ==================================================================================*/

/**
 * ================================ ОТДЕЛ. СОЗДАТЬ =================================
 */
function department_create_record(){
    var size = { width: 600, height: 250 };
    reference.open_card('#department_ref', 'Карточка Отдела', size, OpenMode.Create, 0);
}

/**
 * ================================ ОТДЕЛ. РЕДАКТИРОВАТЬ =================================
 */
function department_edit_record(){
    rows = $('.department_ref__table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 250 };
    reference.open_card('#department_ref', 'Карточка Отдела', size, OpenMode.Edit, id);
}

/**
 * ================================ ОТДЕЛ. КОПИРОВАТЬ =================================
 */
function department_copy_record(){
    rows = $('.department_ref__table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 250 };
    // Открываем карточку в режиме создания новой записи
    reference.open_card('#department_ref', 'Карточка Отдела', size, OpenMode.Copy, id);
}

/**
 * ================================ ОТДЕЛ. УДАЛИТЬ =================================
 */
function department_delete_record(){
    rows = $('.department_ref__table_row.highlight');
    reference.delete_record('#department_ref', rows, 'delete_department');
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
function department_extended_search_OK() {
    var data = {
        action: 'search_department_extended',
        name: $('#department__search_name').val(),
        organization_id: $('#department_search__organization').find('.id').text(),
        boss : $('#department__search_boss').val(),
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
}




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
function department_update_reference(records) 
{
    var ind = 1;
    $('#department_ref__table tbody tr').remove();
    records.forEach(record => {
        $('#department_ref__table tbody').append(
            $("<tr class='department_ref__table_row'>")
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

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ПОИСКА ===============================
 */
function department_search_binding_events(){

    /** ============== ВЫБОР ИЗ СПРАВОЧНИКА ОРГАНИЗАЦИИ ==================== */
    $('#department_search__organization').on('click', function(e){
        reference.open_reference(e,'#department_search','Справочник Оргранизации')
    })

    /** ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОK ================= */
    $('#department_search__button_OK').on('click', function(e){
        department_extended_search_OK();
    })

    /** ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена ============= */
    $('#department_search__button_Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    });

}




