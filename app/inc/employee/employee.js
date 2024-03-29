// var employee_icons = JSON.parse(MainData.employee_icons);
// var byteArray = [];

/** 
 * ====================== ОДИНОЧНЫЙ КЛИК НА СТРОКУ ТАБЛИЦЫ =======================
*/
$('#employee_ref__table tbody tr').on('click', function (e) {
    reference.highlight(e);
})

// /** 
//  * ======================== ДВОЙНОЙ КЛИК НА СТРОКУ ТАБЛИЦЫ ======================= 
// */
// $('#employee_ref__table tbody tr').on('dblclick', function () {
//     employee_edit_record();
// })

// /**
//  * =========== ВЫБОР ВКЛАДОК НА КАРТОЧКЕ ДОКУМЕНТ =====================
//  * */
// function employee__chose_tab(e) {
//     e.preventDefault();
//     var el = $(e.target)
//     // Если щелкнули на элементе внутри .tabs__item
//     if (!el.hasClass('tabs__item')) {
//         el = el.parents('.tabs__item');
//     }
//     // Список имеющихся вкладок
//     var card_tabs = ['general', 'send_list'];

//     // Устанавливаем класс tabs__highlighted у выбранной вкладки
//     $('.tabs__item').removeClass('tabs__highlighted');
//     $(el).addClass('tabs__highlighted');

//     /* Скрываем все вкладки */
//     card_tabs.forEach(item => {
//         $('.employee_card__' + item).addClass('hide');
//     });
//     /* Показываем выбранную */
//     tab = $(el).children().attr('href');
//     $(tab).removeClass('hide');
// }


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

// function employee_card_press_OK(sender) {
//     if (employee_card__check_fields()) {
        
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
//         $(sender).parents('.appdialog').css('display', 'none');
//     }
// }

// /**
//  * ===================== ПРОВЕРЯЕМ ЗАПОЛНЕННОСТЬ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ КАРТОЧКИ =======================
//  */
// function employee_card__check_fields() {
//     var message = ''
//     if ($('#employee_card__name').val().trim() == '') {
//         $('#employee_card__name').addClass('red_border');
//         message += 'Не заполнено обязательное поле Наименование <br \/>';
//     } else {
//         $('#employee_card__name').removeClass('red_border');
//     }
//     if (message == ''){
//         return true;
//     }else{
//         // Отправляем уведомление
//         var size = { width: 400, height: 200 };
//         reference.show_notification('#employee_ref', 'Предупреждение', size, message);
//         return false;
//     }
// }

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

// /**
//  *  ================================== ОБЩИЙ ПОИСК =======================================
//  * @param {string} value 
//  */
// function employee_common_search(value) {
//     // Делаем ajax - запрос
//     var data = {
//         action: 'search_employee',
//         value: value
//     };

//     jQuery.post(MainData.ajaxurl, data, function (result) {
//         var records = JSON.parse(result);
//         employee_update_reference(records);

//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         var size = { width: 500, height: 200 };
//         message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
//         reference.show_notification('#employee_ref', 'Ошибка', size, message);
//     });
// }

// /**
//  * ============================ ОТКРЫТИЕ КАРТОЧКИ РАСШИРЕННЫЙ ПОИСК =============================
//  */
// function employee_extended_search() {
//     size = { width: 600, height: 500 };
//     prefix = '#employee_ref';
//     title = 'Расширенный поиск';
//     // Загружаем карточку
//     var data = {
//         action: 'load_card',
//         card: 'employee_search'
//     };
//     reference.show_dialog(prefix, size, title);
//     jQuery.post(MainData.ajaxurl, data, function (textStatus) {
//         $(prefix + '__dialog_content').html(textStatus);
//         employee_search_binding_events();

//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         var size = { width: 500, height: 200 };
//         message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
//         reference.show_notification('#employee_ref', 'Ошибка', size, message);
//     });
// }

// /** КНОПКИ НА ПАНЕЛИ ДЕЙСТВИЙ */

// /** 
//  * =========================== НАЖАТИЕ КНОПКИ СОЗДАТЬ ==============================
//  * */
// $('#employee_ref__create').on('click', function () {
//     employee_create_record();
// });

// /**
//  * =========================== НАЖАТИЕ КНОПКИ ВЫБРАТЬ ==============================
//  */
// $('#employee_ref__select').on('click', function () {
//     employee_select_record(e);
// })

// /**
//  * ======================== НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ ===========================
//  */
// $('#employee_ref__edit').on('click', function (e) {
//     employee_edit_record(e);
// })


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



// /** 
//  * ========================= КОНТЕКСТНОЕ МЕНЮ. НАЖАТИЕ КНОПКИ РЕДАКТИРОВАТЬ =================================
//  */
// $('#employee_ref__context_edit').on('click', function () {
//     employee_edit_record();
// })

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

// /**================================================================================= 
// * ==================================== ДЕЙСТВИЯ ==================================== 
// * ==================================================================================*/

// /**
//  * ================================ ДОКУМЕНТ. СОЗДАТЬ =================================
//  */
// function employee_create_record() {
//     var size = { width: 1000, height: 600 };
//     reference.open_card('#employee_ref', 'Карточка Документа', size, OpenMode.Create, 0);
// }

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

// /**
//  * ================================ ДОКУМЕНТ. РЕДАКТИРОВАТЬ =================================
//  */
// function employee_edit_record() {
//     rows = $('.employee_ref__table_row.highlight')
//     var id = rows[0].children.item(0).textContent;
//     var size = { width: 1000, height: 600 };
//     reference.open_card('#employee_ref', 'Карточка Документа', size, OpenMode.Edit, id);
// }

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

// /**
//  * ========================= СПИСОК РАССЫЛКИ. СОЗДАТЬ ===========================
//  */
// function employee_card__send_list_create_record(){
//     var ind = $('#employee_card__send_list_table tbody tr').length + 1;
//     var organization =[];
//     organization['id'] = '';
//     organization['ind'] = ind;
//     organization['organization_id'] = '';
//     organization['organization_name'] = ''
//     organization['send_date']='';
//     organization['is_deleted'] = 0;
//     $('#employee_card__send_list_table tbody').append(
//         employee_card_draw_send_list_row(organization)
//     );
// }


// /**
//  * ========================= СПИСОК РАССЫЛКИ. ОБНОВИТЬ ===========================
//  */
// function employee_card_send_list_load_records() {
//     var employee_id = $('#employee_card__id').text();
//     // Загружаем детальный раздел Замечания по аттестации
//     var data = {
//         action: 'load_employee_send_list',
//         employee_id: employee_id
//     };
//     jQuery.post(MainData.ajaxurl, data, function (result) {
//         var rows = JSON.parse(result);
//         $('#employee_card__send_list_table tbody tr').remove();
//         var ind = 1;

//         rows.forEach(employee => {
//             employee['ind'] = ind++;
//             $('#employee_card__send_list_table tbody').append(
//                 employee_card_draw_send_list_row(employee)
//             );
//         });
//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         var size = { width: 500, height: 200 };
//         message = 'Во время загрузки детального раздела Замечания по аттестации произощла ошибка' + textStatus + ' ' + errorThrown;
//         reference.show_notification('#employee_ref', 'Ошибка', size, message);
//     });
// }

// /**
//  * ================== СПИСОК РАССЫЛКИ. КОПИРОВАТЬ =======================
//  */
// function employee_card_send_list_copy_record(){
//     var rows = $('#employee_card__send_list_table>tbody>tr.highlight')
//     var ind = $('#employee_card__send_list_table tbody tr').length + 1;
//     if (rows.length > 0) {
//         var row = rows[0];
//         var correspondent = []
//         correspondent['id'] = '',
//         correspondent['ind'] = ind++,
//         correspondent['organization_id'] = $(row.cells[2]).find('.id').text(),
//         correspondent['organization_name'] = $(row.cells[2]).find('.fullname').val(),
//         correspondent['send_date'] = $(row.cells[3]).children().val(),
//         correspondent['is_deleted'] = $(row.cells[4]).children().text()
//         $('#employee_card__send_list_table tbody').append(
//             employee_card_draw_send_list_row(correspondent)
//         );
//     }
// }

// /**
//  * ================== СПИСОК РАССЫЛКИ. УДАЛИТЬ =======================
//  * Нам нельзя сразу удалять строку из формы, мы должны сообщить базе что эту строку 
//  * требуется удалить. Поэтому мы ее просто скрываем, а не удаляем. 
//  */
// function employee_card_send_list_delete_record() {
//     var rows = $('#employee_card__send_list_table>tbody>tr.highlight')
//     if (rows.length > 0) {
//         var id = rows[0].children.item(0).textContent;
//         rows[0].children.item(4).textContent = 1;
//         rows[0].classList.add('hide');
//     }
// }




// /**
//  * ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОК =============
// */
// function employee_extended_search_OK() {
//     var data = {
//         action: 'search_employee_extended',
//         number: $('#employee_search__number').val(),
//         employeedate: $('#employee_search__employeedate').val(),
//         name: $('#employee_search__name').val(),

//         kind_id: $('#employee_search__kind').find('.id').text(),
//         type: $('#employee_search__type').val(),
//         sender_id: $('#employee_search__sender').find('.id').text(),
//         sendreceive: $('#employee_search__sendreceive').val(),
//         signer: $('#employee_search__signer').val(),
//         signed: $('#employee_search__signed').val(),
//         state: $('#employee_search__state').val()
//     };

//     jQuery.post(MainData.ajaxurl, data, function (result) {
//         var records = JSON.parse(result);
//         var ind = 1;
//         employee_update_reference(records);

//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         var size = { width: 500, height: 200 };
//         message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
//         reference.show_notification('#employee_ref', 'Ошибка', size, message);
//     });
// }




// /**
//  * ======================== ЗАГРУЗКА ДАННЫХ В КАРТОЧКУ =======================
//  * @param {Object} data 
//  * @param {boolean} openMode
//  */
// async function card_employee_load_data(data, openMode) {
//     var cardData = JSON.parse(data);
//     /** 
//      * Для того чтоб создалась новая карточка при редимах создания и копирования 
//      * обнуляем поле id
//      */
//     switch (openMode) {
//         case OpenMode.Create: $('#employee_card__id').text(''); break;
//         case OpenMode.Edit: $('#employee_card__id').text(cardData[0].id); break;
//         case OpenMode.Copy: $('#employee_card__id').text(''); break;
//     }
//     $('#employee_card__number').val(cardData[0].number);
//     $('#employee_card__employeedate').val(cardData[0].employeedate);
//     $('#employee_card__name').val(cardData[0].name);
//     $('#employee_card__kind').find('.id').text(cardData[0].employee_kind_id);
//     $('#employee_card__kind').find('.fullname').val(cardData[0].employee_kind_name);
//     $('#employee_card__type').val(cardData[0].type);
//     $('#employee_card__sendreceive').val(cardData[0].sendreceive);
//     $('#employee_card__signed').prop('checked', cardData[0].signed);
//     $('#employee_card__signer').val(cardData[0].signer);
//     $('#employee_card__sender').find('.id').text(cardData[0].sender_id);
//     $('#employee_card__sender').find('.fullname').val(cardData[0].sender_name);
//     $('#employee_card__correspondent').find('.id').text(cardData[0].correspondent_id);
//     $('#employee_card__correspondent').find('.fullname').val(cardData[0].correspondent_name);
//     $('#employee_card__state').val(cardData[0].state);

//     // Версии документа
//     var employee_versions = cardData['employee_versions']
//     var ind = 1;
//     employee_versions.forEach(employee_version => {
//         employee_version['ind'] = ind++;
//         employee_version['is_deleted'] = 0;
//         $('#employee_card__version_list').prepend(
//             employee_card_draw_version(employee_version)
//         );
//     });

//     // Список рассылки
//     var send_list = cardData['employee_send_list'];
//     var ind =1 ;
//     send_list.forEach(organization =>{
//         organization['ind'] = ind++;
//         organization['is_deleted'] = 0;
//         $('#employee_card__send_list_table tbody').append(
//             employee_card_draw_send_list_row(organization)
//         );
//     })
// }

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

// /**
//  * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ДОКУМЕНТА ============ 
//  */
// function employee_card_binging_events() {

//     $('#employee_card__OK').on('click', function () {
//         employee_card_press_OK(this);
//     });

//     /** ============ НАЖАТИЕ КНОПКИ ОТМЕНА В КАРТОЧКЕ ВИД ДОКУМЕНТА ============= */
//     $('#employee_card__Cancel').on('click', function (e) {
//         $(e.target).parents('.appdialog').css('display', 'none');
//     });

//     /** ======== НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА В ПОЛЕ ВИД ДОКУМЕНТА ======= */
//     $('#employee_card__kind_btn').on('click', function (e) {
//         reference.open_reference(e, '#employee_card', 'Справочник Виды докуиентов');
//     })

//     /** ======== НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА В ПОЛЕ ОТПРАВИТЕЛЬ ========= */
//     $('#employee_card__sender_btn').on('click', function (e) {
//         reference.open_reference(e, '#employee_card', 'Справочник Организации');
//     })

//     /** ======== НАЖАТИЕ КНОПКИ ВЫБОР ИЗ СПРАВОЧНИКА В ПОЛЕ КОРРЕСПОНДЕНТ ======== */
//     $('#employee_card__correspondent_btn').on('click', function (e) {
//         reference.open_reference(e, '#employee_card', 'Справочник Организации');
//     })

    
//     /** ===================== ВЫБОР ВКЛАДКИ НА КАРТОЧКЕ ДОКУМЕНТА ================ */
//     $('.employee__tabs_item').on('click', function (e) {
//         employee__chose_tab(e);
//     })


//     /** =============== СПИСОК РАССЫЛКИ. НАЖАТИЕ КНОПКИ СОЗДАТЬ ===================*/
//     $('#employee_card__send_list_create').on('click', function(){
//         employee_card__send_list_create_record();
//     })
    
    
//     /** =============== СПИСОК РАССЫЛКИ. НАЖАТИЕ КНОПКИ ОБНОВИТЬ ===================*/
//     $('#employee_card__send_list_update').on('click', function () {
//         employee_card_send_list_load_records();
//     })

//     /** =============== СПИСОК РАССЫЛКИ. НАЖАТИЕ КНОПКИ КОПИРОВАТЬ ==================*/
//     $('#employee_card__send_list_copy').on('click', function () {
//         employee_card_send_list_copy_record();
//     })

//     /** =============== СПИСОК РАССЫЛКИ. НАЖАТИЕ КНОПКИ УДАЛИТЬ ==================*/
//     $('#employee_card__send_list_delete').on('click', function () {
//         employee_card_send_list_delete_record();
//     })




//     /** ================================ ВЫБОР ФАЙЛА ============================== */
//     $('#employee_card__file').on('change', function (e) {
//         var file = $(e.target).prop('files')[0];
        
//         //console.log(fileByteArray);
//         // Находим масимальный номер версии
//         var version_numbers = [];
//         var versions = $('#employee_card__version_list .version__item .version_number');
//         versions.each(function (index, element) {
//             version_numbers[index] = Number($(element).text());
//         })
//         var max_version_number = 0;
//         if (version_numbers.length > 0) {
//             max_version_number = Math.max.apply(null, version_numbers);
//         }
//         var version_number = max_version_number + 1;


//         // Отображаем созданную версию
//         var employee_version = [];
//         employee_version['version_number'] = version_number;
//         employee_version['versiondate'] = file.lastModified;
//         employee_version['type'] = file.type;
//         employee_version['version_title'] = 'Версия ' + version_number;
//         employee_version['is_deleted'] = 0;
//         employee_version['file'] = $(e.target).clone();
//         $('#employee_card__version_list').prepend(
//             employee_card_draw_version(employee_version)
//         );
//     })
// }

// /**
//  * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ВЕРСИИ ДОКУМЕНТА ============ 
//  */
// function employee_version_card_binding_events(){
//     /** ================  НАЖАТИЕ КНОПКИ ОК ================ */
//     $('#employee_version_card__OK').on('click', function(e){
//         $(e.target).parents('.appdialog:first').css('display', 'none');
//     })

//     $('#employee_version_card__Cancel').on('click', function(e){
//         $(e.target).parents('.appdialog:first').css('display', 'none');
//     })

// }

// /*function resolve(ByteArray){
//     bytes = ByteArray
// }*/

// // function getByteArray(file) {
// //     return new Promise(function(resolve, reject) {
// //         fileReader.readAsArrayBuffer(file);
// //         fileReader.onload = function(ev) {
// //             const array = new Uint8Array(ev.target.result);
// //             const fileByteArray = [];
// //             for (let i = 0; i < array.length; i++) {
// //                 fileByteArray.push(array[i]);
// //             }
// //             resolve(array);  // successful
// //         }
// //         fileReader.onerror = reject; // call reject if error
// //     })
// //  }


// /** ================== СОЗДАНИЕ КАРТОЧКИ ВЕРСИИ ДОКУМЕНТА ==================== */
// function employee_card_create_version() {
//    size = { width: 500, height: 250 };
//     reference.open_card('#employee_card', 'Карточка версии документа',size,OpenMode.Create,0,'#employee_version_list');
// }

// /**
//  * ================== ОТОБРАЖАЕМ ВЕРСИЮ ДОКУМЕНТА ===================
//  */
// function employee_card_draw_version(employee_version) {
//     // Подставляем подходящую иконку
//     var icon = employee_icons.other
//     switch (employee_version['type']) {
//         case 'application/vnd.openxmlformats-officeemployee.wordprocessingml.employee':
//             icon = employee_icons.ms_word; break;
//         case 'application/vnd.openxmlformats-officeemployee.spreadsheetml.sheet':
//             icon = employee_icons.ms_excel; break;
//         case 'application/pdf': icon = employee_icons.pdf; break;
//     }
    
   
//     var content_html = $("<li class='attachments__item version__item'>")
//         .append($("<p class='id hide'>").text(employee_version['id']))
//         .append($("<p class='version_number hide'>").text(employee_version['version_number']))
//         .append($("<p class='versiondate hide'>").text(employee_version['versiondate']))
//         .append($("<p class='type hide'>").text(employee_version['type']))
//         .append($("<img class='attachments__ico'>").attr('src', icon))
//         .append($("<p class='attachments__name_item'>").text(employee_version['version_title']))
//         .append($("<p class='is_deleted hide'>").text(employee_version['is_deleted']));
//     if (employee_version['file'] != undefined){
//         content_html.append($("<input class='file hide' type='file'>").prop('files', employee_version['file'].prop('files')))
//     }
//     return content_html;
// }

// /**
//  * ================== ОТОБРАЖАЕМ КОРРЕСПОНДЕНТА В СПИСКЕ РАССЫЛКИ ===================
//  */
// function employee_card_draw_send_list_row(organization){
//     var content_html = $("<tr class = 'employee_card__send_list_table_row'>")
//         .append($("<td class='id hide'>").text(organization['id']))
//         .append($("<td class='employee_card__send_list_table_num'>").text(organization['ind']))
//         .append($("<td>")
//             .append($("<div class='ref_record'>")
//                 .append($("<p class='hide name_reference'>").text('organization'))
//                 .append($("<p class='id hide'>").text(organization['organization_id']))
//                 .append($("<input class='fullname'>").val(organization['organization_name']))
//                 .append($("<div class='ref_record__button'>").text("..."))
//                 .on('click', function (e) {
//                     reference.open_reference(e, '#employee_card', 'Справочник Оргнизации');
//                 })
//             )
//         )
//         .append($("<td>")
//             .append($("<input type='date'>").val(organization['send_date']))
//         )
//         .append($("<td class = 'is_deleted hide'>").text(0))
//     return content_html;
// }

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



// /**
//  * ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ПОИСКА ===============================
//  */
// function employee_search_binding_events() {

//     /** ============== ВЫБОР ИЗ СПРАВОЧНИКА ВИДЫ ДОКУМЕНТОВ ==================== */
//     $('#employee_search__kind').on('click', function (e) {
//         reference.open_reference(e, '#employee_search', 'Справочник Виды документов');
//     })

//     $('#employee_search__sender').on('click', function (e) {
//         reference.open_reference(e, '#employee_search', 'Справочник Организации');
//     })

//     /** ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ ОK ================= */
//     $('#employee_search__button_OK').on('click', function (e) {
//         employee_extended_search_OK();
//     })

//     /** ============== РАСШИРЕННЫЙ ПОИСК НАЖАТИЕ КНОПКИ Отмена ============= */
//     $('#employee_search__button_Cancel').on('click', function (e) {
//         $(e.target).parents('.appdialog').css('display', 'none');
//     });

// }




