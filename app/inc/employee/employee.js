// var employee_icons = JSON.parse(MainData.employee_icons);
// var byteArray = [];

/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#employee_ref__table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

/** 
 * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
*/
$('#employee_ref__table tbody tr').on('dblclick', function () {
    employee_edit_record();
})



// async function getAsByteArray(file) {
//     return new Uint8Array(await readFile(file))
// }

// function readFile(file) {
//     return new Promise((resolve, reject) => {
//       // Create file reader
//       let reader = new FileReader()
  
//       // Register event listeners
//       reader.addEventListener("loadend", e => resolve(e.target.result))
//       reader.addEventListener("error", reject)
  
//       // Read file
//       reader.readAsArrayBuffer(file)
//     })
//   }

// /**
//  * ======================= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ ДОКУМЕНТА =========================
//  */

function employee_card_press_OK(sender) {
    if (employee_card__check_fields()) {
        alert('Проверка прошла!')
        
//         // Детальный раздел версии
//         var rows = $('#employee_card__version_list li');
//         var employee_versions = [];
//         var employee_version = {};
       
//         rows.each(function(ind, element){

//             employee_version.id = $(element).children('.id').text();
//             employee_version.version_number = $(element).children('.version_number').text();
//             employee_version.versiondate = $(element).children('.versiondate').text();
//             employee_version.version_title = $(element).children('.attachments__name_item').text();
//             employee_version.type = $(element).children('.type').text();
//             employee_version.is_deleted = $(element).children('.is_deleted').text();
//             /*getAsByteArray($(element).children('.file').prop('files')[0])
//                 .then((dv) => {
//                     employee_version.files = JSON.stringify(dv);
//                 })*/
//             // Копируем обьект в массив
//             employee_versions[ind] = JSON.parse(JSON.stringify(employee_version));
//         })

//         var rows = $('#employee_card__send_list_table tbody tr');
//         var correspondent = {}
//         var send_list = []

//         rows.each(function(ind, row){
//             correspondent.id = $(row.cells[0]).text();
//             correspondent.correspondent_id = $(row.cells[2]).find('.id').text();
//             correspondent.send_date = $(row.cells[3]).children().val();
//             correspondent.is_deleted = $(row.cells[4]).text();
//             // Копируем обьект в массив
//             send_list[ind] = JSON.parse(JSON.stringify(correspondent));
//         })

//         // Формируем запись для запроса
//         record = {
//             id: $('#employee_card__id').text(),
//             number: $('#employee_card__number').val(),
//             employeedate: $('#employee_card__employeedate').val(),
//             name: $('#employee_card__name').val(),
//             kind: $('#employee_card__kind').find('.id').text(),
//             type: $('#employee_card__type').val(),
//             sender: $('#employee_card__sender').find('.id').text(),
//             correspondent: $('#employee_card__correspondent').find('.id').text(),
//             sendreceive: $('#employee_card__sendreceive').val(),
//             signed: $('#employee_card__signed').attr('checked'),
//             signer: $('#employee_card__signer').val(),
//             employee_versions : JSON.stringify(employee_versions),
//             send_list : JSON.stringify(send_list),
//             state: $('#employee_card__state').val()
//         }
//         if ($('#employee_card__id').text() == '') {

//             // ДОБАВЛЯЕМ значение в базу
//             var data = {
//                 action: 'add_employee',
//                 cache: false,
// 			    //contentType: false,
//                 processData: false,
//                 contentType: 'application/octet-stream', // set Content-Type header
// 			    //processData: false,
//                 record: record
//             };

//             jQuery.post(MainData.ajaxurl, data, function (textStatus) {
//                 employee_load_records();
//             }).fail(function () {
//                 var size = { width: 500, height: 200 };
//                 var message = 'Во время добавления записи произошла ошибка';
//                 reference.show_notification('employee_ref', 'Ошибка', size, message);
//             })
//         } else {
//             // ОБНОВЛЯЕМ значение в базе данных
//             var data = {
//                 action: 'update_employee',
//                 processData: false,
//                 contentType: 'application/octet-stream', // set Content-Type header
//                 cache: false,
//                 record: record
//             };

//             jQuery.post(MainData.ajaxurl, data, function (textStatus) {
//                 employee_load_records();
//             }).fail(function () {
//                 var size = { width: 500, height: 200 };
//                 var message = 'Во время обновления записи произошла ошибка';
//                 reference.show_notification('employee_ref', 'Ошибка', size, message);
//             })
//         }
        $(sender).parents('.appdialog').css('display', 'none');
    }
}

/**
 * ===================== ПРОВЕРЯЕМ ЗАПОЛНЕННОСТЬ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ КАРТОЧКИ =======================
 */
function employee_card__check_fields() {
    var message = ''
    message = reference.check_empty_field('employee_card__login','Логин', message);
    message = reference.check_empty_field('employee_card__lastname','Фамилия', message);
    message = reference.check_empty_field('employee_card__firstname','Имя', message);
    if (message == ''){
        return true;
    }else{
        // Отправляем уведомление
        var size = { width: 400, height: 200 };
        reference.show_notification('#employee_ref', 'Предупреждение', size, message);
        return false;
    }
}

/**
 * =========================== ЗАГРУЗКА ЗАПИСЕЙ СПРАВОЧНИКА ===========================
 */
function employee_load_records() {
    var data = {
        action: 'load_employee',
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        employee_update_reference(records);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        var message = 'Во время удаления записи произошла ошибка ' + textStatus + ' ' + errorThrown;
        reference.show_notification('#employee_ref', 'Ошибка', size, message);
    });

}

/**
 *  ================================== ОБЩИЙ ПОИСК =======================================
 * @param {string} value 
 */
function employee_common_search(value) {
    // Делаем ajax - запрос
    var data = {
        action: 'search_employee',
        value: value
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        employee_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#employee_ref', 'Ошибка', size, message);
    });
    
}

/**
 * ============================ ОТКРЫТИЕ КАРТОЧКИ РАСШИРЕННЫЙ ПОИСК =============================
 */
function employee_extended_search() {
    size = { width: 600, height: 500 };
    prefix = '#employee_ref';
    title = 'Расширенный поиск';
    // Загружаем карточку
    var data = {
        action: 'load_card',
        card: 'employee_search'
    };
    reference.show_dialog(prefix, size, title);
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').html(textStatus);
        employee_search_binding_events();

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#employee_ref', 'Ошибка', size, message);
    });
}

// /** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

/** 
 * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
 * */
$('#employee_ref__create').on('click', function () {
    employee_create_record();
});

// /**
//  * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
//  */
// $('#employee_ref__select').on('click', function () {
//     employee_select_record(e);
// })

/**
 * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ===========================
 */
$('#employee_ref__edit').on('click', function (e) {
    employee_edit_record(e);
})


// /**
//  * ========================= НАЖАТИЕ КНОПКИ КОПИРОВАТЬ =============================
//  */
// $('#employee_ref__copy').on('click', function () {
//     employee_copy_record();
// })


// /**
//  * ========================= НАЖАТИЕ КНОПКИ УДАЛИТЬ ЗАПИСЬ =========================
//  */
// $('#employee_ref__delete').on('click', function () {
//     employee_delete_record();
// });

/** 
 * ========================= НАЖАТИЕ КНОПКИ ОБНОВИТЬ ===============================
 */
$('#employee_ref__update').on('click', function () {
    employee_load_records();
})


/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ СОЗДАТЬ =================================
 */
$('#employee_ref__out_context_create').on('click', function(){
    employee_create_record()
})

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ =================================
 */
$('#employee_ref__context_edit').on('click', function () {
    employee_edit_record();
})

// /** 
//  * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ КОПИРОВАТЬ =================================
//  */
// $('#employee_ref__context_copy').on('click', function () {
//     employee_copy_record();
// })

// /** 
//  * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ УДАЛИТЬ =================================
//  */
// $('#employee_ref__context_delete').on('click', function () {
//     employee_delete_record();
// })

/** 
 * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ ОБНОВИТЬ =================================
 */
$('#employee_ref__out_context_update').on('click', function () {
    employee_load_records();
})


// /**================================================================================= 
// * ==================================== ДЕЙСТВИЯ ==================================== 
// * ==================================================================================*/

/**
 * ================================ ДОКУМЕНТ. СОЗДАТЬ =================================
 */
function employee_create_record() {
    var size = { width: 800, height: 400 };
    reference.open_card('#employee_ref', 'Карточка Сотрудника', size, OpenMode.Create, 0);
}

// /**
//  * ======================= ДОКУМЕНТ. ВЫБРАТЬ ЗАПИСЬ =========================
//  */
// function employee_select_record(e) {
//     rows = $('.employee_ref__table_row.highlight');
//     if (rows.length > 0) {
//         id = rows[0].children.item(0).textContent
//         fullname = rows[0].children.item(2).textContent
//         // Извлекаем элемент с помощью которого вызвали справочник из стэка
//         el = stack.pop();
//         // Присваиваем элементу значения выбранного элемента
//         el.children('.id').text(id);
//         el.children('.fullname').val(fullname);
//         // Закрываем окно выбора
//         $(e.target).parents('.appdialog:first').css('display', 'none');
//     }
// }

/**
 * ================================ СОТРУДНИКИ. РЕДАКТИРОВАТЬ =================================
 */
function employee_edit_record() {
    rows = $('.employee_ref__table_row.highlight')
    var id = rows[0].children.item(0).textContent;
    var size = { width: 800, height: 400 };
    reference.open_card('#employee_ref', 'Карточка Сотрудника', size, OpenMode.Edit, id);
}

// /**
//  * ================================ ДОКУМЕНТ. КОПИРОВАТЬ =================================
//  */
// function employee_copy_record() {
//     rows = $('.employee_ref__table_row.highlight')
//     var id = rows[0].children.item(0).textContent;
//     var size = { width: 1000, height: 600 };
//     // Открываем карточку в режиме создания новой записи
//     reference.open_card('#employee_ref', 'Карточка Документв', size, OpenMode.Copy, id);
// }

// /**
//  * ================================ ДОКУМЕНТ. УДАЛИТЬ =================================
//  */
// function employee_delete_record() {
//     rows = $('.employee_ref__table_row.highlight');
//     reference.delete_record('#employee_ref', rows, 'delete_employee');
// }


/**
 * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
*/
function employee_extended_search_OK() {
    var data = {
        action: 'search_employee_extended',
        login: $('#employee_search__login').val(),
        last_name: $('#employee_search__last_name').val(),
        first_name: $('#employee_search__first_name').val(),
        middle_name: $('#employee_search__middle_name').val(),
        organization_id: $('#employee_search__organization').find('.id').text(),
        department_id: $('#employee_search__department').find('.id').text(),
        email: $('#employee_search__email').val(),
        state: $('#employee_search__state').val()
    };

    jQuery.post(MainData.ajaxurl, data, function (result) {
        var records = JSON.parse(result);
        var ind = 1;
        employee_update_reference(records);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification('#employee_ref', 'Ошибка', size, message);
    });
}




/**
 * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
 * @param {Object} data 
 * @param {boolean} openMode
 */
async function card_employee_load_data(data, openMode) {
    var cardData = JSON.parse(data);
    /** 
     * Для того чтоб создалась новая карточка при редимах создания и копирования 
     * обнуляем поле id
     */
    switch (openMode) {
        case OpenMode.Create: $('#employee_card__id').text(''); break;
        case OpenMode.Edit: $('#employee_card__id').text(cardData.id); break;
        case OpenMode.Copy: $('#employee_card__id').text(''); break;
    }
    $('#employee_card__login').val(cardData.login);
    $('#employee_card__lastname').val(cardData.last_name);
    $('#employee_card__firstname').val(cardData.first_name);
    $('#employee_card__middlename').val(cardData.middle_name);
    
    $('#employee_card__organization').find('.id').text(cardData.organization_id);
    $('#employee_card__organization').find('.fullname').val(cardData.organization_name);
    $('#employee_card__department').find('.id').text(cardData.department_id);
    $('#employee_card__department').find('.fullname').val(cardData.department_name);
    $('#employee_card__email').val(cardData.email);
    $('#employee_card__state').val(cardData.state);

}

/**
 *  ========================= ОБНОВЛЕНИЕ СПРАВОЧНИКА ===========================
 * @param {Object} records 
 */
function employee_update_reference(records) {
    var ind = 1;
    $('#employee_ref__table tbody tr').remove();
    records.forEach(record => {
        $('#employee_ref__table tbody').append(
            $("<tr class='employee_ref__table_row'>")
                .append($("<td class='id hide'>").text(record["id"]))
                .append($("<td>").text(ind++))
                .append($("<td>").text(record["login"]))
                .append($("<td>").text(record["last_name"]))
                .append($("<td>").text(record["first_name"]))
                .append($("<td>").text(record["middle_name"]))
                .append($("<td>").text(record["organization_name"]))
                .append($("<td>").text(record["department_name"]))
                .append($("<td>").text(record["email"]))
                .append($("<td>"))
        ).on('click', function (e) {
            reference.highlight(e);
        })
    });
}

/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ СОТРУДНИК ============ 
 */
function employee_card_binging_events() {

    //** ============= НАЖАТИЕ КНОПКИ ОК В КАРТОЧКЕ СОТРУДНИК ================== */
    $('#employee_card__OK').on('click', function () {
        employee_card_press_OK(this);
    });

    /** ============ НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ СОТРУДНИК ============= */
    $('#employee_card__Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    });

    /** ======== НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА В ПОЛЕ ОРГАНИЗАЦИЯ ========= */
    $('#employee_card__organization_btn').on('click', function (e) {
        reference.open_reference(e, '#employee_card', 'Справочник Организации');
    })

    /** ======== НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА В ПОЛЕ ОТДЕЛ ======== */
    $('#employee_card__department_btn').on('click', function (e) {
        reference.open_reference(e, '#employee_card', 'Справочник Отделы');
    })
    
}





// /**
//  * ================== ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ СПРАВОЧНИКА ===================
//  */
// function employee_ref_binding_events() {
//     $('#employee_ref_select').on('click', function (e) {
//         employee_select_record(e)
//     })

//     $('#department_ref__table tbody tr').on('dblclick', function (e) {
//         employee_edit_record();
//     })
// }



/**
 * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ПОИСКА ===============================
 */
function employee_search_binding_events() {

    /** ============== ВЫБОР ИЗ СПРАВОЧНИКА ВИДЫ ДОКУМЕНТОВ ==================== */
    $('#employee_search__department').on('click', function (e) {
        reference.open_reference(e, '#employee_search', 'Справочник Отделы');
    })

    $('#employee_search__organization').on('click', function (e) {
        reference.open_reference(e, '#employee_search', 'Справочник Организации');
    })

    /** ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОK ================= */
    $('#employee_search__button_OK').on('click', function (e) {
        employee_extended_search_OK();
    })

    /** ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена ============= */
    $('#employee_search__button_Cancel').on('click', function (e) {
        $(e.target).parents('.appdialog').css('display', 'none');
    });

}




