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
        // Загружаем карточку
        var data = {
            action: 'load_card',
            card: reference.get_card_name(prefix)
        };
        jQuery.post(MainData.ajaxurl, data, function (textStatus) {
            $(prefix + '__dialog_content').html(textStatus);

            // Параметры запроса
            var data = {
                action: 'load_card_data',
                card: reference.get_card_name(prefix),
                id: id
            }
            switch (openMode){
                // Режим редактирования
                case OpenMode.Edit : {
                    jQuery.post(MainData.ajaxurl, data, function (result) {
                        switch (prefix) {
                            case '#doc_kind_ref': card_document_kind_load_data(result, OpenMode.Edit); break;
                        }
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        var size = { width: 500, height: 200 };
                        message = 'Во время загрузки данных карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
                        reference.show_notification('#doc_kind_ref', 'Ошибка', size, message);
                    });
                }; break
                // Режим копирования
                case OpenMode.Copy : {
                    jQuery.post(MainData.ajaxurl, data, function (result) {
                        switch (prefix) {
                            case '#doc_kind_ref': card_document_kind_load_data(result, OpenMode.Copy); break;
                        }
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        var size = { width: 500, height: 200 };
                        message = 'Во время загрузки данных карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
                        reference.show_notification('#doc_kind_ref', 'Ошибка', size, message);
                    });
                }; break
                // При режиме создания не делаем ничего
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var size = { width: 500, height: 200 };
            message = 'Во время загрузки карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
            reference.show_notification('#doc_kind_ref', 'Ошибка', size, message);
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
            // Одно из двух нужно исправить
            case '#doc_kind_ref': card = 'document_kind_card'; break;
            case '#document_kind': card = 'document_kind_card'; break;
            case '#doc_kind_ref_search' : card = 'document_kind_search'; break;
        }
        return card;
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
        $(prefix + '__notif_window').css('width', size.width + 'px');
        $(prefix + '__notif_window').css('height', size.height + 'px');
        $(prefix + '__notif_content').empty();
        $(prefix + '__notif_content').append("<p class='appdialog__content_text'>" + message + "</p>");
        $(prefix + '__notif__header_title').text(title);
    },

    /**
    * Получить состояние поля
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
                document_kind_load_records();
                //reference.show_notification('#doc_kind_ref', 'Уведомление', size, textStatus)
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var size = { width: 500, height: 200 };
                message = 'Во время удаления записи произощла ошибка ' + textStatus + ' ' + errorThrown;
                reference.show_notification('#doc_kind_ref', 'Ошибка', size, message);
            })
        } else {
            var size = { width: 400, height: 200 };
            message = 'Вы не выбрали запись';
            reference.show_notification('#doc_kind_ref', 'Предупреждение', size, message);
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
    }
}