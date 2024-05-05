// Режим редактирования карточки
OpenMode ={
    Create : 0,
    Edit : 1,
    Copy : 2
}



var reference = {
    /**
     * Выделить строку таблицы
     * @param {Object} event 
     */
    highlight(e) {
        var js_elem = e.target.parentNode;
        $('*').removeClass('highlight');
        js_elem.classList.add('highlight');
        $('.reference__button').attr('disabled', false);
    },

    /**
     * ОТКРЫТИЕ СПРАВОЧНИКА
     * @param {Event} e 
     * @param {string} prefix
     * @param {string} reference_title
     * @param {string} reference_name ярлык вызываемого справочника если e пустой 
     * @param {object} source элемент-источник Если e пустой (jQuery object);
     */
    open_reference(e, prefix, reference_title, reference_name = '', source = null){
        let el;
        if (e){
            //получаем jQuery-объект ref_record
            el = $(e.target.parentNode);
            reference_name = el.children('.name_reference').text();
        } else{
            el = source;
        }
        
        // Заносим элемент с помощью которого вызвали справочник в стэк
        stack.push(el);
        var size = { width: 1500, height: 700 };
        reference.show_dialog(prefix, size, reference_title);

        var data = {
            action: 'load_reference',
            reference: reference_name 
        };
    jQuery.post(MainData.ajaxurl, data, function (textStatus) {
        $(prefix + '__dialog_content').empty();
        $(prefix + '__dialog_content').html(textStatus);
        reference.binding_event_reference(reference_name);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var size = { width: 500, height: 200 };
        message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
        reference.show_notification(prefix, 'Ошибка', size, message);
    });
    },


    /**
     * ========================= ОТКРЫТИЕ КАРТОЧКИ ========================= 
     * @param {string} prefix 
     * @param {string} title 
     * @param {string} cardPath 
     * @param {Object} size 
     * @param {boolean} openMode
     * @param {number} id 
     */
    open_card(prefix, title, size, openMode, id, detail = '') {
        // Показываем диалоговое окно
        reference.show_dialog(prefix,size,title);
        let card;
        //1.  Загружаем карточку
        if (detail == ''){
            card = reference.get_card_name(prefix);
        } else{
            card = reference.get_card_name(detail);
        }
        var data = {
                action: 'load_card',
                cache: false,
                card: card
            };
        jQuery.post(MainData.ajaxurl, data, function (textStatus) {
            $(prefix + '__dialog_content').empty();
            $(prefix + '__dialog_content').html(textStatus);
            // Привязываем события к элементам карточки
            reference.binding_event_card(prefix, detail);
            switch (openMode){
                // Режим создания
                case OpenMode.Create : reference.initialization_card(detail); break;
                // Режим редактирования
                case OpenMode.Edit : reference.load_card_data(prefix,id,OpenMode.Edit, detail); break;
                // Режим копирования
                case OpenMode.Copy : reference.load_card_data(prefix,id,OpenMode.Copy, detail); break;
                // При режиме создания не делаем ничего
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var size = { width: 500, height: 200 };
            message = 'Во время загрузки карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
            reference.show_notification(prefix, 'Ошибка', size, message);
        });
    },

     /**
     * ============================= ВОЗВРАЩАЕТ ТИП КАРТОЧКИ ==============================
     * @param {string} card 
     */
    // Получаем имя карточки для запроса
    get_card_name(prefix) {
        var card = 'Карточка не определена';
        switch (prefix) {
            // КАРТОЧКИ СПРАВОЧНИКА
            case '#document_kind_ref': card = 'document_kind_card'; break;
            case '#document_ref' : card = 'document_card'; break;
            case '#department_ref': card = 'department_card'; break;
            case '#information_system_ref': card = 'information_system_card'; break;
            case '#administrator_ref' : card = 'administrator_card'; break;
            case '#organization_ref' : card = 'organization_card' ; break;
            case '#document_card__version_list' : card = 'document_version_card'; break;
            case '#information_system_card__documents' : card = 'document_card'; break;
            case '#information_system_card__contracts' : card = 'contract_card'; break;
            case '#contract_ref' : card = 'contract_card'; break;
            case '#footer_ref' : card = 'employee_card'; break;
            case '#employee_ref' : card = 'employee_card' ; break;
            case '#employee_card__photo' : card = 'load_file_form'; break;

            // КАРТОЧКИ ПОИСКА
            case '#document_kind_ref_search' : card = 'document_kind_search'; break;
            case '#information_system_ref_search' : card = 'information_system_search'; break;
            case 'adminitrator_ref_search' : card = 'administrator_search'; break;
        }
        return card;
    },

    /**
     * ========================== ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ ==========================
     * @param {string} prefix 
     */
    binding_event_card(prefix, detail = ''){
        if (detail == ''){
            switch (prefix){
                case '#information_system_ref' : information_system_card_binging_events(); break;
                case '#department_ref' : department_card_binging_events(); break;
                case '#administrator_ref' : adminisrator_card_binding_events(); break;
                case '#organization_ref' : organization_card_binding_events(); break
                case '#document_ref' : document_card_binging_events(); break;
                case '#document_kind_ref' : document_kind_card_binging_events(); break;
                case '#contract_ref' : contract_card_binding_events(); break;
                case '#employee_ref' : employee_card_binging_events(); break;
            }
        } else {
            switch(detail){
                case '#document_card__version_list' : document_version_card_binding_events();break;
                case '#information_system_card__documents' : document_card_binging_events(); break;
            }
        }
    },

    /**
     * ПРИВЯЗКА СОБЫТИЙ К СПРАВОЧНИКУ
     * @param {string} prefix 
     */
    binding_event_reference(reference_name){
        switch(reference_name){
            case 'organization' : organization_ref_binding_events();
            case 'department' : department_ref_binding_events();
            case 'document_kind' : document_kind_ref_binding_events();
            case 'document' : document_ref_binding_events();
            case 'contract' : contract_ref_binding_events();
        }
        
    },

    /**
     * Инициализация карточки
     * @param {string} prefix 
     */
    initialization_card(prefix){
        switch (prefix){
            case '#document_card__version_list' : document_version_initialize(); break;
        }
    },


    /**
     * ==================== ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ====================
     * @param {string} prefix 
     * @param {number} id 
     * @param {Object} openMode 
     */
    load_card_data(prefix, id, openMode, detail = ''){
        // Загружаем запись справочника или запись детального раздела 
        let section = prefix;
        if (detail !=''){
            section = detail;
        } 
        var data = {
            action: 'load_card_data',
            card: reference.get_card_name(section),
            id: id
        }
        
        jQuery.post(MainData.ajaxurl, data, function (result) {
                // Вызываем функцию для соответствующего вида справочника

                switch (section) {
                    case '#document_kind_ref': card_document_kind_load_data(result, openMode); break;
                    case '#document_ref': card_document_load_data(result, openMode); break;
                    case '#department_ref': card_department_load_data(result, openMode); break;
                    case '#information_system_ref': card_information_system_load_data(result, openMode); break;
                    case '#administrator_ref': card_administrator_load_data(result, openMode); break;
                    case '#organization_ref': card_organization_load_data(result, openMode); break;
                    case '#contract_ref': card_contract_load_data(result, openMode); break;
                    case '#employee_ref' : card_employee_load_data(result, openMode); break;
                    // Детальные разделы
                    case '#information_system_card__documents' : card_document_load_data(result, openMode); break;
                    case '#information_system_card__contracts' : card_contract_load_data(result, openMode); break;
                    case '#document_card__version_list' : card_document_version_load_data(result, openMode); break; 
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var size = { width: 500, height: 200 };
                message = 'Во время загрузки данных карточки ' + data.card + ' произошла ошибка' + textStatus + ' ' + errorThrown;
                reference.show_notification(prefix, 'Ошибка', size, message);
            });
    },


   


    /**
     *  ========================= ОТОБРАЖЕНИЕ УВЕДОМЛЕНИЯ ===========================
     * @param {string} prefix - Заголовок уведомления
     * @param {string} title 
     * @param {Object} size 
     * @param {string} message 
     */
    show_notification(prefix, title, size, message) {

        $(prefix + '__notif').css("display", "flex");
        $(prefix + '__notif').css('z-index', ++z_index);
        $(prefix + '__notif_window').css('width', size.width + 'px');
        $(prefix + '__notif_window').css('height', size.height + 'px');
        $(prefix + '__notif_content').empty();
        $(prefix + '__notif_content').append("<p class='appdialog__content_text'>" + message + "</p>");
        $(prefix + '__notif__header_title').text(title);
    },

    /**
    * =========================== ПОЛУЧИТЬ СОСТОЯНИЕ ПОЛЯ ==============================
    * @param {string} state 
    * @returns Состояние поля
    */
    get_state(state) {
        switch (state) {
            case 'Active': return 'Действующая'; break;
            case 'Inactive': return 'Не действующая'; break;
            default: '';
        }
    },

    /**
     * ============================ ЗАМЕНА 1/0 НА Да/Нет ================================
     * @param {number} value 
     * @returns Да/Нет
     */
    get_boolean_value(value){
        switch(value){
            case '1': return 'Да'; break;
            case '0': return 'Нет'; break;
            default: '';
        }
    },

    /**
     * ====================== ЗАМЕНА НУЛЕВОЙ ДАТЫ НА ПУСТОЕ ЗНАЧЕНИЕ
     * @param {string} value 
     * @returns значение даты
     */
    get_date_value(value){
        if (value === '0000-00-00'){
            return '';
        } else{
            return value;
        }
    },

    /**
     * ============================== УДАЛЯЕТ ЗАПИСИ СПРАВОЧНИКА ============================
     * @param {string} prefix 
     * @param {Object} rows 
     */
    delete_record(prefix ,rows, action){
        // Проверяем есть ли выделенные записи
        if (rows.length > 0) {
            var id = rows[0].children.item(0).textContent;

            // Формируем запрос на удаление записи
            var data = {
                action: action,
                card: reference.get_card_name(prefix),
                id: id
            };
            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                var size = { width: 500, height: 200 };
                switch(prefix){
                    case '#document_kind_ref': document_kind_load_records(); break;
                    case '#document_ref' : document_load_records(textStatus);
                    case '#information_system_ref': information_system_load_records(); break;
                    case '#administrator_ref' : administrator_load_records(); break;
                    case '#department_ref' : department_load_records(); break;
                    case '#organization_ref' : organization_load_records(textStatus); break;
                }
                
                
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var size = { width: 500, height: 200 };
                message = 'Во время удаления записи произошла ошибка ' + textStatus + ' ' + errorThrown;
                reference.show_notification(prefix, 'Ошибка', size, message);
            })
        } else {
            var size = { width: 400, height: 200 };
            message = 'Вы не выбрали запись';
            reference.show_notification(prefix, 'Предупреждение', size, message);
        }
    },

    /**
     * ===================== ОТОБРАЖАЕТ ДИАЛОГОВОЕ ОКНО ========================
     * @param {string} prefix 
     * @param {Object} size 
     * @param {string} title 
     */
    show_dialog(prefix, size, title){
        $(prefix + '__dialog_content').empty();
        $(prefix + '__dialog').css('display', 'flex');
        $(prefix + '__dialog').css('z-index', ++z_index);
        $(prefix + '__dialog_window').css('width', size.width + 'px');
        $(prefix + '__dialog_window').css('height', size.height + 'px');
        $(prefix + '__dialog_title').text(title );
        $('.appdialog__header_close').on('click', function(e){
            $(e.target).parents('.appdialog:first').css('display', 'none');
        })
    },

    /**
     * ========================= СКРЫВАЕТ ДИАЛОГОВОЕ ОКНО ========================
     * @param {event} e 
     */
    hide_dialog(e){
        el = e.target
        while ( el = el.parentNode ) {
            if ( el.classList && el.classList.contains('appdialog') ) {                
                el.style.display = 'none';
            }
        }
    },
    // Проверяем не является ли поле пустым
    check_empty_field(field_id, field_name, message ){
        if ($('#'+ field_id).val().trim() == '') {
            $('#'+ field_id).addClass('red_border');
            message += 'Не заполнено обязательное поле '+ field_name + '<br \/>';
        } else {
            $('#'+field_id).removeClass('red_border');
        }
        return message
    }


}    