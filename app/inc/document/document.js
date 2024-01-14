/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#document_ref__table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#document_ref__table tbody tr').on('dblclick', function () {
    document_edit_record();
    /*rows = $('.document_ref__table_row.highlight')
    var size = { width: 600, height: 200 };
    reference.editRecord('#document_ref', rows, 'Карточка Вид документа', size);*/
})

/**
 * =========== ВЫБОР ВКЛАДОК НА КАРТОЧКЕ ДОКУМЕНТ =====================
 * */
function document__chose_tab(e){
    e.preventDefault();
    var el = $(e.target)
    // Если щелкнули на элементе внутри .tabs__item
    if (!el.hasClass('tabs__item')){
        el = el.parents('.tabs__item');
    }
    // Список имеющихся вкладок
    var card_tabs = ['general','send_list'];

    // Устанавливаем класс tabs__highlighted у выбранной вкладки
    $('.tabs__item').removeClass('tabs__highlighted');
    $(el).addClass('tabs__highlighted');
    
    /* Скрываем все вкладки */
    card_tabs.forEach(item => {
        $('.document_card__'+ item).addClass('hide');
    });
    /* Показываем выбранную */
    tab=$(el).children().attr('href');
    $(tab).removeClass('hide');
}

/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ДОКУМЕНТА =========================
 */
function document_card_press_OK(sender) {
    if ($('#document_card__name').val().trim() == '') {
        $('#document_card__name').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#document_ref', 'Предупреждение', size, message);
    } else {
        $('#document_card__name').removeClass('red_border');
        // Формируем запись для запроса
        record = {
            id: $('#document_card__id').text(),
            name: $('#document_card__name').val(),
            organization_id : $('#document_card__organization').find('.id').text(),
            boss : $('#document_card__boss').val(),
            state: $('#document_card__state').val()
        }
        if ($('#document_card__id').text() == '') {

            // ДОБАВЛЯЕМ значение в базу
            var data = {
                action: 'add_document',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                document_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произошла ошибка';
                reference.show_notification('document_ref', 'Ошибка', size, message);
            })
        } else {
            // ОБНОВЛЯЕМ значение в базе данных
            var data = {
                action: 'update_document',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                document_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время обновления записи произошла ошибка';
                reference.show_notification('document_ref', 'Ошибка', size, message);
            })
        }
        $(sender).parents('.appdialog').css('display', 'none');
    }
}

/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function document_load_records() {
    var data = {
        action: 'load_document',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        document_update_reference(records);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время удаления записи произошла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_ref', 'Ошибка', size, message);
    });

}

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function document_common_search(value) {
    // Делаем ajax - запрос
    var data = {
        action: 'search_document',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        document_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_ref', 'Ошибка', size, message);
    });
}

/**
 * ============================ ОТКРЫТИЕ КАРТОЧКИ РАСШИРЕННЫЙ ПОИСК =============================
 */
function document_extended_search() {
    size = { width: 600, height: 500 };
    prefix = '#document_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'document_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);
        document_search_binding_events();

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_ref', 'Ошибка', size, message);
    });
}

/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#document_ref__create').on('click', function () {
    document_create_record();
});

/**
 * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
 */
$('#document_ref__select').on('click', function(){
    document_select_record(e);
})

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ===========================
 */
$('#document_ref__edit').on('click', function (e) {
    document_edit_record(e);
})


/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ =============================
 */
$('#document_ref__copy').on('click', function () {
    document_copy_record();
})


/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ =========================
 */
$('#document_ref__delete').on('click', function () {
    document_delete_record();
});

/** 
 * ========================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ ===============================
 */
$('#document_ref__update').on('click', function(){
    document_load_records();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ =================================
 */
$('#document_ref__context_edit').on('click', function(){
    document_edit_record();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ КОПИРОВАТЬ =================================
 */
$('#document_ref__context_copy').on('click', function(){
    document_copy_record();
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ УДАЛИТЬ =================================
 */
$('#document_ref__context_delete').on('click', function(){
    document_delete_record();
})

/**================================================================================= 
* ==================================== ДЕЙСТВИЯ ==================================== 
* ==================================================================================*/

/**
 * ================================ ДОКУМЕНТ. СОЗДАТЬ =================================
 */
function document_create_record(){
    var size = { width: 1000, height: 600 };
    reference.open_card('#document_ref', 'Карточка Документа', size, OpenMode.Create, 0);
}

/**
 * ======================= ДОКУМЕНТ. ВЫБРАТЬ ЗАПИСЬ =========================
 */
function document_select_record(e){
    rows = $('.document_ref__table_row.highlight');
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
 * ================================ ДОКУМЕНТ. РЕДАКТИРОВАТЬ =================================
 */
function document_edit_record(){
    rows = $('.document_ref__table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 1000, height: 600 };
    reference.open_card('#document_ref', 'Карточка Отдела', size, OpenMode.Edit, id);
}

/**
 * ================================ ДОКУМЕНТ. КОПИРОВАТЬ =================================
 */
function document_copy_record(){
    rows = $('.document_ref__table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 1000, height: 600 };
    // Открываем карточку в режиме создания новой записи
    reference.open_card('#document_ref', 'Карточка Отдела', size, OpenMode.Copy, id);
}

/**
 * ================================ ДОКУМЕНТ. УДАЛИТЬ =================================
 */
function document_delete_record(){
    rows = $('.document_ref__table_row.highlight');
    reference.delete_record('#document_ref', rows, 'delete_document');
}

/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
function document_extended_search_OK() {
    var data = {
        action: 'search_document_extended',
        number: $('#document_search__number').val(),
        documentdate : $('#document_search__documentdate').val(),
        name : $('#document_search__name').val(),

        kind_id: $('#document_search__kind').find('.id').text(),
        type : $('#document_search__type').val(),
        sender_id : $('#document_search__sender').find('.id').text(),
        sendreceive : $('#document_search__sendreceive').val(),
        signer : $('#document_search__signer').val(),
        signed : $('#document_search__signed').val(),
        state: $('#document_search__state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        document_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#document_ref', 'Ошибка', size, message);
    });
}




/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
async function card_document_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при редимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#document_card__id').text(''); break;
        case OpenMode.Edit: $('#document_card__id').text(cardData[0].id); break;
        case OpenMode.Copy: $('#document_card__id').text(''); break;
    }
    $('#document_card__name').val(cardData[0].name);
    $('#document_card__organization').find('.id').text(cardData[0].organization_id);
    $('#document_card__organization').find('.fullname').val(cardData[0].organization_name);
    $('#document_card__boss').val(cardData[0].boss)
    $('#document_card__state').val(cardData[0].state);
}

/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ===========================
 * @param {Object} records 
 */
function document_update_reference(records) 
{
    var ind = 1;
    $('#document_ref__table tbody tr').remove();
    records.forEach(record => {
        $('#document_ref__table tbody').append(
            $("<tr class='document_ref__table_row'>")
                .append($("<td class='id hide'>").text(record["id"]))
                .append($("<td>").text(ind++))
                .append($("<td>").text(record["number"]))
                .append($("<td>").text(record["documentdate"]))
                .append($("<td style='text-align: left;'>").text(record["name"]))
                .append($("<td>").text(record["document_kind"]))
                .append($("<td>").text(reference.get_state(record["state"])))
        ).on('click', function (e) {
            reference.highlight(e);
        })
    });
}

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ДОКУМЕНТА ============ 
 */
function document_card_binging_events() {
    $('#document_card__OK').on('click', function () {
        document_card_press_OK(this);
    });

    /** ============ НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ВИД ДОКУМЕНТА ============ */
    $('#document_card__Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    });

    /** ======== НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА В ПОЛЕ ОРГАНИЗАЦИЯ ========= */
    $('#document_card__organization_btn').on('click', function(e){
        reference.open_reference(e,'#document_card', 'Справочник организации');
    })

    /** ===================== ВЫБОР ВКЛАДКИ НА КАРТОЧКЕ ДОКУМЕНТА ================ */
    $('.document__tabs_item').on('click',function(e){
        document__chose_tab(e);
    })



}

/**
 * ================== ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ СПРАВОЧНИКА ===================
 */
function document_ref_binding_events(){
    $('#document_ref_select').on('click', function(e){
        document_select_record(e)
    })

    $('#department_ref__table tbody tr').on('dblclick', function(e){
        document_edit_record();
    })
}

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ПОИСКА ===============================
 */
function document_search_binding_events(){

    /** ============== ВЫБОР ИЗ СПРАВОЧНИКА ВИДЫ ДОКУМЕНТОВ ==================== */
    $('#document_search__kind').on('click', function(e){
        reference.open_reference(e,'#document_search','Справочник Виды документов');
    })

    $('#document_search__sender').on('click', function(e){
        reference.open_reference(e, '#document_search', 'Справочник Организации');
    })

    /** ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОK ================= */
    $('#document_search__button_OK').on('click', function(e){
        document_extended_search_OK();
    })

    /** ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена ============= */
    $('#document_search__button_Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    });

}




