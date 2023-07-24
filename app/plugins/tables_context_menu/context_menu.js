/*=============================== КОНТЕКСТНОЕ МЕНЮ ТАБЛИЦ ==============================*/
var Context = {
    /** Состояние контекстного меню
     * 0 - не отображено
     * 1 - отображено
     */
    menuState: 0,
    contextMenuActive : 'context-menu--active',
    menu : '',
    menuPosition:[0,0],
    menuPositionX:0,
    menuPositionY:0,

    /**
     * Инициализация контекстного меню
     */
    init(){             
        $("body").on("contextmenu", function(e) {
            if (Context.clickInsideElement(e)) { 
                e.preventDefault();
                Context.toggleMenuOn();
                Context.positionMenu(e);
            } else{
                Context.toggleMenuOff();
            }
                   
        });

        $("body").on('click', function(e){
            Context.toggleMenuOff();
            /*var button =  e.button;
            if ( button === 1 ) {
                Context.toggleMenuOff();
            }*/
        });
    }, 

    /**
     * Отобразить контекстное меню
     */
    toggleMenuOn() {
        if ( Context.menuState !== 1 ) {
            Context.menuState = 1;
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
            Context.menu.css('display','none');
        }
    },
    /**
     * Определить элемент для которого вызвано контекстное меню 
     * @param {Событие} e 
     * @returns {элемент}
     */
    clickInsideElement(e) {
            var el = e.srcElement || e.target;
            var classNames =['is_table_row'];
            var result = false;
            
            classNames.forEach(className => {
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
            case 'is_table_row' : Context.menu = $('#is_table_context');break
        }
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
        Context.menuPosition = Context.getPosition(e);
        Context.menuPositionX = Context.menuPosition.x + "px";
        Context.menuPositionY = Context.menuPosition.y + "px";

        Context.menu.css('left',Context.menuPositionX);
        Context.menu.css('top',Context.menuPositionY);
    }



}