/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#document_kind_ref__table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#document_kind_ref__table tbody tr').on('dblclick', function () {
    rows = $('.document_kind_ref__table_row.highlight')
    var size = { width: 600, height: 200 };
    reference.editRecord('#document_kind_ref', rows, 'Карточка Вид документа', size);
})

/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ВИД ДОКУМЕНТА =========================
 */
function document_kind_card_press_OK(sender) {
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
        $(sender).parents('.appdialog:first').css('display', 'none');
    }
    
};

/**
 * ==================== НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ВИД ДОКУМЕНТА ======================
 */
$('#document_kind_card__Cancel').on('click', function (e) {
    $(e.target).parents('.appdialog:first').css('display', 'none');
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
$('#document_kind_search__button_OK').on('click', function(e){
    var data = {
        action: 'search_document_kind_extended',
        name : $('#document_kind__search_name').val(),
        state : $('#document_kind__search_state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        document_kind_update_reference(records);
        $(e.target).parents('.appdialog:first').css('display', 'none');

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
    $(this).parents('.appdialog:first').css('display', 'none');
});



/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#document_kind_ref__create').on('click', function () {
    document_kind_create_record();
});
   

/**
 * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
 */
$('#document_kind_ref__select').on('click', function(e){
    document_kind_select_record(e);
});

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#document_kind_ref__edit').on('click', function () {
   document_kind_edit_record();
});


/**
 * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ===========================
 */
$('#document_kind_ref__copy').on('click', function () {
    document_kind_copy_record();
});


/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#document_kind_ref__delete').on('click', function () {
    document_kind_delete_record()
});
/**
 * ========================= НАЖАТИЕ КНОПКИ СОЗДАТЬ ЗАПИСЬ ==========================
 */
function document_kind_create_record(){
    var size = { width: 600, height: 250 };
    reference.open_card('#document_kind_ref', 'Карточка Вид документа', size, OpenMode.Create, 0);
};

/**
 * ======================= ВИД ДОКУМЕНТА. РЕДАКТИРОВАТЬ ЗАПИСЬ =========================
 */
function document_kind_edit_record(e){ 
    rows = $('.document_kind_ref__table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 200 };
    reference.open_card('#document_kind_ref', 'Карточка Вид документа', size, OpenMode.Edit, id);
}
/*** ======================= ВИД ДОКУМЕНТА. КОПИРОВАТЬ ЗАПИСЬ =========================
*/
function document_kind_copy_record(e){
    rows = $('.document_kind_ref__table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 200 };
    // Открываем карточку в режиме создания новой записи
    reference.open_card('#document_kind_ref', 'Карточка Вид документа', size, OpenMode.Copy, id);
}

$('#document_kind_ref__excel').on('click', function(){
    // Выводим данные из базы данных
    var data = {
        action: 'load_document_kind'
    };
    jQuery.post(MainData.ajaxurl, data, function (result) {
        let document_kinds = JSON.parse(result);
        document_kinds_to_excel(document_kinds);
    });
});

function document_kinds_to_excel(data){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Виды документов');
    const letr = ['A','B','C','D'];
    
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
        {header: 'Вид документа', key : 'name', width: 50, style : {alignment :{vertical: 'middle', horizontal: 'left', wrapText: true}}},
        {header: 'Статус', key : 'state', width: 20, style : {alignment:{vertical: 'middle', horizontal: 'center'}}}
    ]       
    worksheet.getRow(1).font = font;
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Устанавливаем границы ячеек заголовков таблицы
    letr.forEach((value) => {
        worksheet.getCell(value + '1').border = border;
    })

    // Добавляем значения в таблицу
    data.forEach((document_kind, ind) => {
        worksheet.getCell('A'+(ind+2)).value = ind+1;
        worksheet.getCell('B'+(ind+2)).value = document_kind['id'];
        worksheet.getCell('C'+(ind+2)).value = document_kind['name'];
        worksheet.getCell('D'+(ind+2)).value = reference.get_state(document_kind['state']);

        // Устанавливаем границы ячеек строки
        letr.forEach((value) => {
            worksheet.getCell(value + (ind+2)).border = border;
        })
    })

    saveToExcel(workbook, 'Виды документов');

}



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
        $(e.target).parents('.appdialog:first').css('display', 'none')
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
        $('#document_kind_card__name').val(cardData[0].name);
    }
    $('#document_kind_card__state').val(cardData[0].state);
}

/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ===========================
 * @param {Object} records 
 */
function document_kind_update_reference(records) {
    var ind = 1;
    $('#document_kind_ref__table tbody tr').remove();
    records.forEach(record => {
        $('#document_kind_ref__table tbody').append(
            $("<tr class='document_kind_ref__table_row'>")
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
    rows = $('.document_kind_ref__table_row.highlight');
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
    if (rows.length > 0) {
        reference.delete_record('#document_kind_ref', rows, 'delete_document_kind');
    }
    $('#document_kind_ref__context').css('display', 'none');
}

/**
 * ================== ПРИВЯЗКА СОБЫТИЙ К СПРАВОЧНИКУ ===================
 */
function document_kind_ref_binding_events(){
    $('#document_kind_ref__table tbody tr').on('click', function(e){
        reference.highlight(e);
    })
     /** ===================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ====================== */
    $('#document_kind_ref__create').on('click', function (e) {
            document_kind_create_record();
        })

     /** ===================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ====================== */
    $('#document_kind_ref__select').on('click', function(e){
        document_kind_select_record(e)
    })

    /** ===================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ====================== */
    $('#document_kind_ref__edit').on('click', function (e) {
        document_kind_edit_record(e);
    })
    /** ===================== НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ====================== */
    $('#document_kind_ref__copy').on('click', function () {
        document_kind_copy_record();
    });
    /** ===================== НАЖАТИЕ КНОПКИ УДАЛИТЬ ====================== */
    $('#document_kind_ref__delete').on('click', function () {
        document_kind_delete_record();
    });

    $('#document_kind_ref__update').on('click', function () {
        document_kind_load_records();
    });

}
/**
 * ================== ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ СПРАВОЧНИКА ===================
 */
function document_kind_card_binging_events (){
    /** ==============Карточка ВИДА ДОКУМЕНТОВ: НАЖАТИЕ КНОПКИ OK ============= */
    $('#document_kind_card__OK').on('click', function (e) {
        document_kind_card_press_OK(e.target);
    });
    /** ==============Карточка ВИДА ДОКУМЕНТОВ: НАЖАТИЕ КНОПКИ Отмена ============= */
    $('#document_kind_card__Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog:first').css('display', 'none');
    });
}
/**
 * НАЖАТИЕ КНОПКИ ENTER В ОКНЕ ФИЛЬТРА
 */
$('.document_kind_filter').on('keyup', function(event){
    if (event.key === 'Enter'){
        document_kind_load_records();
    }
})
