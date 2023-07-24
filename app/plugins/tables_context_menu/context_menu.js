/*=============================== КОНТЕКСТНОЕ МЕНЮ ТАБЛИЦ ==============================*/
var Context = {
    /** Состояние контекстного меню
     * 0 - не отображено
     * 1 - отображено
     */
    menuState: 0,
    // Cписок всех контекстных меню приложения
    menus: ['#is_card__general_admins_context',
            '#is_card__general_developpers_context',
            '#is_card__document_context',
            ],
    contextMenuActive : 'context-menu--active',
    menu : '',
    menuPosition:[0,0],
    menuPositionX:0,
    menuPositionY:0,
    menuWidth: 0,
    menuHeight:0,
    htmlPaddingRight : parseInt($("html").css('padding-right')),
    bodyPaddingRight : parseInt($("body").css('padding-right')),
    wrapperPaddingRight : parseInt($(".wrapper").css('padding-right')),
    htmlPaddingTop : parseInt($("html").css('padding-top')),
    bodyPaddingTop : parseInt($("body").css('padding-top')),
    wrapperPaddingTop : parseInt($(".wrapper").css('padding-top')),

    /**
     * is_card__administrators_table_row -- #is_card__general_admins_context
     * is_card__developpers_table_row    -- #is_card__general_developpers_context
     * attacments                        -- #is_card__documents_context'
         * attacments__name_item
     */


    /**
     * Инициализация контекстного меню
     */
    init(){     
        /*=========== Привязка событий =============*/      
        $("body").on("contextmenu", function(e) {
            /*Context.hideAllMenus();*/
            if (Context.clickInsideElement(e)) { 
                e.preventDefault();
                Context.toggleMenuOff();
                Context.toggleMenuOn();
                Context.positionMenu(e);
            } else{
                Context.toggleMenuOff();
            }
                   
        });
        $("body").on("click", function(e){
            el = Context.clickInsideElement(e);
            // Скрываем все контекстные меню
            
            switch(el.id){
                case 'is_card__documents_open_card': Context.document_open_card(); break;
            }
            var button = e.which || e.button;
            if ( button === 1 ) {
                Context.toggleMenuOff();
            }
        });
        $("body").on("keyup", function(e){
            if ( e.key === 'Escape' ) {
                Context.toggleMenuOff();
                }
        })
        $(window).on("resize",function(){
            Context.toggleMenuOff();
        })
    }, 

    /**
     * Отобразить контекстное меню
     */
    toggleMenuOn() {
        if ( Context.menuState !== 1 ) {
            Context.menuState = 1;
            // Context.menus.forEach(element => {
            //     $(element).css('display','none');
            // });
            Context.menu.css('display','block');
            //Context.menu.addClass(contextMenuActive);   
        }
    },

    /**
     * Скрыть контекстное меню
     */
    toggleMenuOff() {
        if ( Context.menuState !== 0 ) {
            Context.menuState = 0;
            Context.menus.forEach(element => {
                $(element).css('display','none');
            });
        }
    },
    /**
     * Определить элемент для которого вызвано контекстное меню 
     * @param {Событие} e 
     * @returns {элемент}
     */
    clickInsideElement(e) {
            var src_el = e.srcElement || e.target;
            const classNames =[
                'is_table_row', 
                'is_card__administrators_table_row',
                'is_card__developpers_table_row',
                'attacments__item',
                'context-menu__item'
            ];
            var result = false;
            $.each(classNames,function(index, className) {
                el = src_el;
                if ( el.classList.contains(className) ) {
                    Context.selectContext(className)
                    result = el;
                } else {
                    while ( el = el.parentNode ) {
                        if ( el.classList && el.classList.contains(className) ) {                 
                            Context.selectContext(className)
                            result =  el;
                        }
                    }
                }
            });
            return result;
        },
    

    /**
     * Выбрать контекстное меню для элемента
     * @param {Имя класса для которого вызывается контекстное меню} className 
     */
    selectContext(className){
        switch (className){
            case 'is_table_row' : Context.menu = $('#is_table_context');break;
            case 'is_card__administrators_table_row': Context.menu = $('#is_card__general_admins_context'); break;
            case 'is_card__developpers_table_row' : Context.menu = $('#is_card__general_developpers_context'); break;
            case 'attacments__item' : Context.menu = $('#is_card__document_context');break;
            /*case 'attacments' : Context.menu = $('#is_card__documents_context'); break;*/
        }
    },

    /**
     * Скрыть все меню
     */
    hideAllMenus(){
        const menus = [
            '#is_table_context',
            '#is_card__general_admins_context',
            '#is_card__general_developpers_context',
            '#is_card__document_context',

        ] 
        $.each(menus,function(index,element){
            $(element).css('display','none');
        })
    },

    /**
     * Получить координаты курсора
     * @param {Событие} e 
     * @returns {Координаты курсора (x,y)}
     */
    getPosition(e) {
        var posx = 0;
        var posy = 0;
        
        if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + $('body').scrollLeft +
            $('html').scrollLeft;
            posy = e.clientY + $('body').scrollTop +
            $('html').scrollTop;
        }
        
        return {
            x: posx,
            y: posy
        }
    },

    /**
     * Определить координаты курсора мыши
     * @param {Событие} e 
     */
    positionMenu(e) {
        var clickCoords = Context.getPosition(e);
        var clickCoordsX = clickCoords.x;
        var clickCoordsY = clickCoords.y;
        
        var menuWidth = Math.ceil(Context.menu.outerWidth());
        var menuHeight = Math.ceil(Context.menu.outerHeight());

        var windowWidth = $(window).innerWidth();
        var windowHeight = $(window).innerHeight();

        if ( (windowWidth - clickCoordsX) < menuWidth ) {
            //menu.style.left = windowWidth - menuWidth + "px";

        var left = windowWidth - menuWidth - Context.htmlPaddingRight - 
                Context.bodyPaddingRight - Context.wrapperPaddingRight - 9;
        Context.menu.css('left', left+ "px")
        } else {
            //menu.style.left = clickCoordsX + "px";
            Context.menu.css('left', clickCoordsX)
        }
            
        if ( (windowHeight - clickCoordsY) < menuHeight ) {
            //menu.style.top = windowHeight - menuHeight + "px";
            var top = windowHeight - menuHeight - Context.htmlPaddingTop - 
            Context.bodyPaddingTop - Context.wrapperPaddingTop;

            Context.menu.css('top', top + "px");
        } else {
            //menu.style.top = clickCoordsY + "px";
            Context.menu.css('top', clickCoordsY)
        }
    },
    /** ФУНКЦИИ ДЛЯ РАБОТЫ С ПУНКТАМИ КОНТЕКСТНОГО МЕНЮ ДОКУМЕНТА */
    document_open_card : function(){
        $('#is_card__document_card').load("document_card.html");
        $("#is_card__document_card").css('z-index',++z_index);
       
    }



}