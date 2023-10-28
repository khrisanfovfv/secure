// Режим редактирования карточки
var OpenMode ={
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
     * ========================= ОТКРЫТИЕ КАРТОЧКИ ========================= 
     * @param {string} prefix 
     * @param {string} title 
     * @param {string} cardPath 
     * @param {Object} size 
     * @param {boolean} openMode
     * @param {number} id 
     */
    open_card(prefix, title, size, openMode, id) {
        // Показываем диалоговое окно
        reference.show_dialog(prefix,size,title);
        //1.  Загружаем карточку
        var data = {
            action: 'load_card',
            card: reference.get_card_name(prefix)
        };
        jQuery.post(MainData.ajaxurl, data, function (textStatus) {
            $(prefix + '__dialog_content').empty();
            $(prefix + '__dialog_content').html(textStatus);
            switch (openMode){
                // Режим редактирования
                case OpenMode.Edit : reference.load_card_data(prefix,id,OpenMode.Edit); break;
                // Режим копирования
                case OpenMode.Copy : reference.load_card_data(prefix,id,OpenMode.Copy); break;
                // При режиме создания не делаем ничего
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var size = { width: 500, height: 200 };
            message = 'Во время загрузки карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
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
            case '#information_system_ref': card = 'information_system_card'; break;

            // КАРТОЧКИ ПОИСКА
            case '#document_kind_ref_search' : card = 'document_kind_search'; break;
            case '#information_system_ref_search' : card = 'information_system_search'; break;
        }
        return card;
    },


    /**
     * ==================== ЗАГРУЗКА ДАННЫХ КАРТОЧКИ ====================
     * @param {string} prefix 
     * @param {number} id 
     * @param {Object} openMode 
     */
    load_card_data(prefix, id, openMode){
        var data = {
            action: 'load_card_data',
            card: reference.get_card_name(prefix),
            id: id
        }
        
        jQuery.post(MainData.ajaxurl, data, function (result) {
                // Вызываем функцию для соответствующего вида справочника
                switch (prefix) {
                    case '#document_kind_ref': card_document_kind_load_data(result, openMode); break;
                    case '#information_system_ref': card_information_system_load_data(result, openMode); break;
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var size = { width: 500, height: 200 };
                message = 'Во время загрузки данных карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
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
    delete_record(prefix ,rows){
        // Проверяем есть ли выделенные записи
        if (rows.length > 0) {
            var id = rows[0].children.item(0).textContent;

            // Формируем запрос на удаление записи
            var data = {
                action: 'delete_record',
                card: reference.get_card_name(prefix),
                id: id
            };
    
            jQuery.post(MainData.ajaxurl, data, function (textStatus) {
                var size = { width: 500, height: 200 };
                switch(prefix){
                    case '#document_kind_ref': document_kind_load_records(); break;
                    case '#information_system_ref': information_system_load_records(); break;
                }
                
                
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var size = { width: 500, height: 200 };
                message = 'Во время удаления записи произощла ошибка ' + textStatus + ' ' + errorThrown;
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
    }
}