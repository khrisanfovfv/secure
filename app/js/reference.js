var reference = {
    /**
     * Выделить строку таблицы
     * @param {Object} element 
     */
    highlight(element){
        $('*').removeClass('highlight');
        element.addClass('highlight');
    },

    /**
     * Создание новой записи
     * @param {string} prefix 
     * @param {string} title 
     * @param {string} cardPath 
     * @param {Object} size
     */
    createRecord(prefix, title, cardPath, size){
        $(prefix + '__dialog').css('display','flex');
        $(prefix + '__dialog').css('z-index', ++z_index);
        $(prefix + '__dialog_window').css('width',size.width +'px');
        $(prefix + '__dialog_window').css('height',size.height +'px');
        $(prefix + '__dialog_title').text(title)
        $(prefix + '__dialog_content').load(host + cardPath)
    },

    /**
     * Редактирование записи
     * @param {string} prefix
     * @param {string} rows 
     * @param {string} title 
     * @param {string} cardPath 
     */
    editRecord(prefix, rows, title, cardPath, size){
        var id = 0;
        var hasElement = false;
        $(rows).each(function(index, element){
            if (element.classList.contains('highlight')){
                id = element.children.item(0).textContent;
                hasElement = true;
                return false
            };
        })
        
        if (hasElement) {
            $(prefix + '__dialog').css('display','flex');
            $(prefix + '__dialog').css('z-index', ++z_index);
            $(prefix + '__dialog_window').css('width',size.width +'px');
            $(prefix + '__dialog_window').css('height',size.height +'px');
            $(prefix + '__dialog_title').text(title + ' ' + id)
            $(prefix + '__dialog_content').load(host + cardPath)
        } else{
            $(prefix + '__notif').css('display','flex');
            $(prefix + '__notif').css('z-index', ++z_index);
            $(prefix + '__notif_content').empty();
            $(prefix + '__notif_content').append("<p class='appdialog__content_text'>Вы не выделили запись</p>")
            $(prefix + '__dialog_title').text('Предупреждение');
        }
    }
}