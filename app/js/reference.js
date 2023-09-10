var reference = {
    /**
     * Выделить строку таблицы
     * @param {Object} event 
     */
    highlight(e){
        var js_elem = e.target.parentNode; 
        $('*').removeClass('highlight');
        js_elem.classList.add('highlight');
        $('.reference__button').attr('disabled', false);
    },

    /**
     * ======================== СОЗДАНИЕ НОВОЙ ЗАПИСИ ===========================
     * @param {string} prefix 
     * @param {string} title 
     * @param {string} cardPath 
     * @param {Object} size
     */
    createRecord(prefix, title, cardPath, size){
        var path = 'C:/OpenServer/domains/secure/wp-content/themes/cit_secure/';
       
        $(prefix + '__dialog').css('display','flex');
        $(prefix + '__dialog').css('z-index', ++z_index);
        $(prefix + '__dialog_window').css('width',size.width +'px');
        $(prefix + '__dialog_window').css('height',size.height +'px');
        $(prefix + '__dialog_title').text(title)
        $(prefix + '__dialog_content').load(path + cardPath)
        alert(path + cardPath)
    },

    /**
     * ======================= РЕДАКТИРОВАНИЕ ЗАПИСИ =========================
     * @param {string} prefix
     * @param {Object} rows 
     * @param {string} title 
     * @param {string} card 
     */
    editRecord(prefix, rows, title, size){
        row = rows[0];
        var id = row.children.item(0).textContent;
        // Выполняем запрос к базе данных
        reference.open_card(prefix, title,size, id);
    },

    /**
     * ========================= ОТКРЫТИЕ КАРТОЧКИ ========================= 
     * @param {string} prefix 
     * @param {string} title 
     * @param {string} cardPath 
     * @param {Object} size 
     * @param {number} id 
     */
    open_card(prefix, title, size, id){
        // Показываем диалоговое окно
        $(prefix + '__dialog').css('display','flex');
        $(prefix + '__dialog').css('z-index', ++z_index);
        $(prefix + '__dialog_window').css('width',size.width +'px');
        $(prefix + '__dialog_window').css('height',size.height +'px');
        $(prefix + '__dialog_title').text(title + ' ' + id)

        // Загружаем карточку
        var data = {
            action: 'load_card',
            card: this.get_card_name(prefix)
        };
        jQuery.post( MainData.ajaxurl, data, function(textStatus){
            $(prefix + '__dialog_content').html(textStatus);    
        } ).fail(function(){
            alert('Во время загрузки карточки ' + data.card + ' произощла ошибка');
        })

        
        // Загружаем данные для карточки
        var data = {
            action: 'load_card_data',
            card: this.get_card_name(prefix),
            id: id
        };
        jQuery.post( MainData.ajaxurl, data, function(result){
            switch (prefix){
                case '#doc_kind_ref' : card_document_kind_load_data(result); break;
            }  
        }).fail(function( jqXHR, textStatus, errorThrown){
            var size = {width : 500, height :200};
            message = 'Во время загрузки карточки ' + data.card + ' произощла ошибка' + textStatus + ' ' + errorThrown;
            reference.show_notification('#doc_kind_ref', 'Ошибка', size, message);
        });
    },

    /**
     * ============================= ВОЗВРАЩАЕТ ТИП КАРТОЧКИ ==============================
     * @param {string} card 
     */
    // Получаем имя карточки для запроса
    get_card_name(prefix){
        var card = 'Карточка не определена';
        switch (prefix){
            case '#doc_kind_ref' : card = 'document_kind_card'; break;
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
    show_notification(prefix, title, size, message){
        $(prefix + '__notif').css("display","flex");
        $(prefix + '__notif_window').css('width', size.width + 'px');
        $(prefix + '__notif_window').css('height', size.height + 'px');
        $(prefix + '__notif_content').empty();
        $(prefix + '__notif_content').append("<p class='appdialog__content_text'>" + message +"</p>");
        $(prefix + '__notif__header_title').text(title);
    },

     /**
     * Получить состояние поля
     * @param {string} state 
     * @returns Состояние поля
     */
     get_state(state){
        switch(state){
            case 'Active' : return 'Действующая'; break;
            case 'Inactive' : return 'Не действующая'; break;
            default : '';
        }
    }
}