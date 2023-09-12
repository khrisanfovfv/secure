
//document_kind_load_records();

/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#doc_kind_table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#doc_kind_table tbody tr').on('dblclick', function () {
    rows = $('.doc_kind_table_row.highlight')
    var size = { width: 600, height: 200 };
    reference.editRecord('#doc_kind_ref', rows, 'Карточка Вид документа', size);
})

/**
 * ======================= НАЖАТИЕ КНОПКИ ОК В ДИАЛОГОВОМ ОКНЕ =========================
 */
$('#document_kind__dialog_OK').on('click', function () {
    if ($('#document_kind_card__name').val().trim() == '') {
        $('#document_kind_card__name').addClass('red_border');

        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        var message = 'Не заполнено обязательное поле';
        reference.show_notification('#doc_kind_ref', 'Предупреждение', size, message);
    } else {
        $('#document_kind_card__name').removeClass('red_border');
        // Формируем запись для запроса
        record = {
            id : $('#document_kind_card__id').text(),
            name : $('#document_kind_card__name').val(),
            state :  $('#document_kind_card__state').val()
        } 
        if ($('#document_kind_card__id').text() == ''){
            
            // ДОБАВЛЯЕМ значение в базу
            var data = {
                action: 'add_document_kind',
                record: record 
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                document_kind_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время добавления записи произощла ошибка';
                reference.show_notification('doc_kind_ref', 'Ошибка', size, message);
        })
        } else{
            // ОБНОВЛЯЕМ значение в базе данных
            var data = {
                action: 'update_document_kind',
                record: record
            };

            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                document_kind_load_records();
            }).fail(function () {
                var size = { width: 500, height: 200 };
                var message = 'Во время обновления записи произощла ошибка';
                reference.show_notification('doc_kind_ref', 'Ошибка', size, message);
        })
        }
        $(this).parents('.appdialog').css('display', 'none');
    }

});

/**
 * ==================== НАЖАТИЕ КНОПКИ ОТМЕНА В ДИАЛОГОВОМ ОКНЕ ======================
 */
$('#document_kind__dialog_Cancel').on('click', function () {
    $(this).parents('.appdialog').css('display', 'none');
});

/** 
 * ====================== КОНТЕКТНОЕ МЕНЮ - РЕДАКТИРОВАТЬ ========================= 
 * */
$('#document_kind_ref__context_edit').on('click', function () {
    rows = $('.doc_kind_table_row.highlight');
    if (rows.length > 0) {
        var id = rows[0].children.item(0).textContent;
        //Загружаем карточку
        textStatus = id;
        var size = { width: 400, height: 200 };
        reference.show_notification('#doc_kind_ref', 'Уведомление', size, textStatus)
    } else {
        var size = { width: 400, height: 200 };
        message = 'Вы не выбрали запись';
        reference.show_notification('#doc_kind_ref', 'Предупреждение', size, message);
    }
})


/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function document_kind_load_records() {
    var data = {
        action: 'load_document_kind',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        $('#doc_kind_table tbody tr').remove();
        records.forEach(record => {

            var tr = $('#doc_kind_table tbody').append(
                "<tr class='doc_kind_table_row'>" +
                "<td class='id hide'>" + record["id"] + "</td>" +
                "<td>" + (ind++) + "</td>" +
                "<td>" + record["name"] + "</td>" +
                "<td>" + reference.get_state(record["state"]) + "</td>" +
                "</tr>");
            tr.on('click', function (e) {
                reference.highlight(e);
            })
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время удаления записи произощла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#doc_kind_ref', 'Ошибка', size, message);
    });

}


/** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#document_kind_create').on('click', function () {
    var size = { width: 600, height: 250 };
    reference.open_card('#doc_kind_ref', 'Карточка Вид документа', size, 0);
});

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ========================
 */
$('#document_kind_edit').on('click', function () {
    rows = $('.doc_kind_table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 600, height: 200 };
    reference.open_card('#doc_kind_ref', 'Карточка Вид документа', size, id);
})

/**
 * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ ==========================
 */
$('#document_kind_delete').on('click', function () {
    rows = $('.doc_kind_table_row.highlight');
    reference.delete_record('#document_kind',rows);
});


/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 */
async function card_document_kind_load_data(data){
    var cardData = JSON.parse(data);
    $('#document_kind_card__id').text(cardData[0].id)
    $('#document_kind_card__name').val(cardData[0].name);
    $('#document_kind_card__state').val(cardData[0].state);
}








