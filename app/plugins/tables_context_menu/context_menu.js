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
            '#is_card__contracts_context',
            '#is_card__document_context',
            '#administrator_ref__context',
            '#organisation_ref__context',
            '#department_ref__context',
            '#document_kind_ref__context',
            '#contract_ref__context',
            '#employeer_ref__context',
            '#document_ref__context',
            '#sm_references',
            '#sm_help',
            '#user__context'
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
     * Инициализация контекстного меню
     */
    init(){     
        /*=========== Привязка событий =============*/      
        $("body").on("contextmenu", function(e) {
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
            // Скрываем предыдущее контекстные меню
            Context.toggleMenuOff();
            // Открываем контекстное меню соответствующего элемента
            switch(el.id){
                case 'is_card__documents_open_card': Context.document_open_card(); break;
                case 'is_card__documents_create_version' : Context.document_open_version_card(); break; 
                case 'main_menu__references' : Context.show_menu_references();
                break;
                case 'main_menu__help' : Context.show_menu_help(); break;
                default :{
                    var button = e.which || e.button;
                    if ( button === 1 ) {
                        Context.toggleMenuOff();
                    }
                }
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
            Context.menu.css('display','block'); 
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
                'is_card__contracts_table_row',
                'administrator_ref__table_row',
                'organisation_ref_table_row',
                'department_ref_table_row',
                'doc_kind_table_row',
                'contract_ref_table_row',
                'employeer_ref_table_row',
                'document_ref__table_row',
                'main_menu__item',
                'document__item',
                'context-menu__item',
                'user'
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
            case 'is_card__contracts_table_row' : Context.menu = $('#is_card__contracts_context'); break;
            case 'administrator_ref__table_row' : Context.menu = $('#administrator_ref__context'); break;
            case 'organisation_ref_table_row' : Context.menu = $('#organisation_ref__context'); break;
            case 'department_ref_table_row' : Context.menu = $('#department_ref__context'); break;
            case 'doc_kind_table_row' : Context.menu = $('#document_kind_ref__context'); break;
            case 'contract_ref_table_row' : Context.menu = $ ('#contract_ref__context'); break;
            case 'employeer_ref_table_row' : Context.menu = $('#employeer_ref__context'); break;
            case 'document_ref__table_row' : Context.menu = $('#document_ref__context'); break;
            case 'user' : Context.menu = $('#user__context'); break;
            case 'document__item' : Context.menu = $
            ('#is_card__document_context'); break;
            default : Context.menu = '';
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
    /** ФУНКЦИИ ДЛЯ РАБОТЫ С ПУНКТАМИ ГЛАВНОГО МЕНЮ */
    /** Показать меню справочники */
    show_menu_references : function(){
        Context.menuState = 1;
        $('#sm_references').css('display', 'flex');
    },
    show_menu_help(){
        Context.menuState = 1;
        $('#sm_help').css('display', 'flex');
    },
    /** ФУНКЦИИ ДЛЯ РАБОТЫ С ПУНКТАМИ КОНТЕКСТНОГО МЕНЮ ДОКУМЕНТА */
    document_open_card : function(){
        $('#is_card__dialog').css('display', 'flex');
        $('#is_card__dialog').css('z-index', z_index);
        $('#is_card__dialog_content').load(host + 'inc/document/document_card.html');
    },

    document_open_version_card : function(){
        $('#is_card__dialog').css('display', 'flex');
        $('#is_card__dialog').css('z-index', z_index);
        $('#is_card__dialog_content').load(host + 'inc/version/version_card.html');

    }
}