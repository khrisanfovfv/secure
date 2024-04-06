/*=============================== КОНТЕКСТНОЕ МЕНЮ ТАБЛИЦ ==============================*/
var Context = {
    /** Состояние контекстного меню
     * 0 - не отображено
     * 1 - отображено
     */
    menuState: 0,
    // Cписок всех контекстных меню приложения
    menus: ['#information_system_card__general_admins_context',
        '#information_system_card__general_developpers_context',
        '#information_system_card__remarks_context',
        '#information_system_card_developpers__out_context',
        '#information_system_card_remarks__out_context',
        '#information_system_card_administrators__out_context',
        '#information_system_card__contracts_context',
        '#information_system_card__document_context',
        '#information_system_card__documents_out_context',
        '#information_system_ref__context',
        '#information_system_ref__out_context',
        '#administrator_ref__context',
        '#administrator_ref__out_context',
        '#administrator_card__remarks_context',
        '#organization_ref__context',
        '#organization_ref__out_context',
        '#department_ref__context',
        '#department_ref__out_context',
        '#document_kind_ref__context',
        '#contract_ref__context',
        '#employeer_ref__context',
        '#document_ref__context',
        '#document_ref__out_context',
        '#document_card__version_out_context',
        '#document_card__send_list_context',
        '#document_card_send_list__out_context',
        '#employee_ref__context',
        '#employee_ref__out_context',
        '#employee_card__photo_context',
        '#sm_references',
        '#sm_help',
        '#user__context'
    ],
    contextMenuActive: 'context-menu--active',
    menu: '',
    menuPosition: [0, 0],
    menuPositionX: 0,
    menuPositionY: 0,
    menuWidth: 0,
    menuHeight: 0,
    htmlPaddingRight: parseInt($("html").css('padding-right')),
    bodyPaddingRight: parseInt($("body").css('padding-right')),
    wrapperPaddingRight: parseInt($(".wrapper").css('padding-right')),
    htmlPaddingTop: parseInt($("html").css('padding-top')),
    bodyPaddingTop: parseInt($("body").css('padding-top')),
    wrapperPaddingTop: parseInt($(".wrapper").css('padding-top')),

    /**
     * ИНИЦИАЛИЗАЦИЯ КОНТЕКСТНОГО МЕНЮ
     */
    init() {
        /*=========== Привязка событий =============*/
        $("body").on("contextmenu", function (e) {
            if (Context.clickInsideElement(e)) {
                e.preventDefault();
                Context.toggleMenuOff();
                Context.toggleMenuOn();
                Context.positionMenu(e);
            } else {
                Context.toggleMenuOff();
            }

        });
        $("body").on("click", function (e) {
            el = Context.clickInsideElement(e);
            // Скрываем предыдущее контекстные меню
            Context.toggleMenuOff();
            // Открываем контекстное меню соответствующего элемента
            switch (el.id) {
                case 'administrator_ref__out_context_create' : administrator_create_record(); break;
                case 'administrator_ref__out_context_update' : administrator_load_records(); break;

                case 'document_kind_ref__context_edit' : document_kind_edit_record(); break;
                case 'document_kind_ref__context_copy' : document_kind_copy_record(); break;
                case 'document_kind_ref__context_delete' : document_kind_delete_record(); break;

                case 'information_system_ref__out_context_create': information_system_create_record(); break;
                case 'information_system_ref__out_context_update': information_system_load_records(); break;
                case 'information_system_ref__context_edit': information_system_edit_record(); break;
                case 'information_system_ref__context_copy': information_system_copy_record(); break;
                case 'information_system_ref__context_delete': information_system_delete_record(); break;
                
                case 'information_system_card_remarks__out_context_create': information_system_remark_create_record(); break;
                case 'information_system_card_remarks__out_context_update': information_system_remark_update_records(); break;
                case 'information_system_card_administrators__out_context_create' : information_system_card__administrator_create_record(); break;
                case 'information_system_card_administrators__out_context_update' : information_system_card__administrator_update_record(); break;

                case 'department_ref__out_context_create' : department_create_record(); break;
                case 'department_ref__out_context_update' : department_load_records(); break;

                case 'document_ref__out_context_update' : document_load_records(); break; 
                case 'documents_card__version_out_context-create' : document_card_create_version(); break; 
                case 'document_card_send_list__out_context_create' : document_card__send_list_create_record(); break
                case 'document_card_send_list__out_context_update' : document_card_send_list_load_records(); break;
                case 'document_card__send_list_context_copy' : document_card_send_list_copy_record(); break;
                case 'document_card__send_list_context_delete' : document_card_send_list_delete_record(); break;

                case 'organization_ref__context_edit': organization_edit_record(); break;
                case 'organization_ref__context_delete' : organization_delete_record(); break;
                case 'organization_ref__context_copy' : organization_copy_record(); break;
                case 'organization_ref__out_context_create' : oraganization_create_record(); break;
                case 'organization_ref__out_context_update' : organization_load_records(); break;

                case 'information_system_card__documents_open_card': Context.document_open_card(); break;
                case 'information_system_card__documents_create_version': Context.document_open_version_card(); break;
                case 'main_menu__references': Context.show_menu_references(); break;
                case 'main_menu__help': Context.show_menu_help(); break;



                default: {
                    var button = e.which || e.button;
                    if (button === 1) {
                        Context.toggleMenuOff();
                    }
                }
            }
            el = null;
        });
        $("body").on("keyup", function (e) {
            if (e.key === 'Escape') {
                Context.toggleMenuOff();
            }
        })
        $(window).on("resize", function () {
            Context.toggleMenuOff();
        })
    },

    /**
     * Отобразить контекстное меню
     */
    toggleMenuOn() {
        if (Context.menuState !== 1) {
            Context.menuState = 1;
            Context.menu.css('display', 'block');
        }
    },

    /**
     * Скрыть контекстное меню
     */
    toggleMenuOff() {
        if (Context.menuState !== 0) {
            Context.menuState = 0;
            Context.menus.forEach(element => {
                $(element).css('display', 'none');
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
        const classNames = [
            'information_system_table_row',
            'information_system_card__administrators_table_row',
            'information_system_card__developpers_table_num',
            'information_system_card__contracts_table_row',
            'information_system_card__remarks_table_num',
            'information_system_card__administrators_table_num',
            'document__item',
            'administrator_ref__table_row',
            'administrator_card__information_systems_table_num',
            'document_card__send_list_table_num',
            'organization_ref__table_row',
            'department_ref__table_row',
            'document_kind_ref__table_row',
            'contract_ref_table_row',
            'employee_ref__table_row',
            'employee_card__photo',
            'document_ref__table_row',
            'main_menu__item',
            'document__item',
            'context-menu__item',
            'user'
        ];

        var result = false;

        $.each(classNames, function (index, className) {
            el = src_el;
            if (el.classList.contains(className)) {
                Context.selectContext(className)
                result = el;
            } else {
                while (el = el.parentNode) {
                    if (el.classList && el.classList.contains(className)) {
                        Context.selectContext(className)
                        result = el;
                    }
                }
            }
        });
        // Если найденный элемент - строка таблицы выделяем ее
        if (result.nodeName != null) {
            if ((result.nodeName === 'TR') ||
                (result.classList.contains('information_system_card__developpers_table_num'))||
                (result.classList.contains('information_system_card__remarks_table_num'))||
                (result.classList.contains('administrator_card__information_systems_table_num'))||
                (result.classList.contains('information_system_card__administrators_table_num'))||
                (result.classList.contains('document_card__send_list_table_num'))){
                    reference.highlight(e);
            }
        }

        // Проверяем щелкнули ли в пустом месте табицы
        if (!result) {
            result = Context.createContext(src_el);
        }
        return result;
    },


    /**
     * Выбрать контекстное меню для элемента
     * @param {Имя класса для которого вызывается контекстное меню} className 
     */
    selectContext(className) {
        switch (className) {
            case 'information_system_table_row': Context.menu = $('#information_system_ref__context'); break;
            case 'information_system_card__administrators_table_row': Context.menu = $('#information_system_card__general_admins_context'); break;
            case 'information_system_card__developpers_table_num': Context.menu = $('#information_system_card__general_developpers_context'); break;
            case 'information_system_card__contracts_table_row': Context.menu = $('#information_system_card__contracts_context'); break;
            case 'information_system_card__remarks_table_num': Context.menu = $('#information_system_card__remarks_context'); break;
            case 'document__item': Context.menu = $('#information_system_card__document_context'); break;
            case 'administrator_ref__table_row': Context.menu = $('#administrator_ref__context'); break;
            case 'administrator_card__information_systems_table_num' : Context.menu = $('#administrator_card__remarks_context'); break;
            case 'organization_ref__table_row': Context.menu = $('#organization_ref__context'); break;
            case 'department_ref__table_row': Context.menu = $('#department_ref__context'); break;
            case 'document_kind_ref__table_row': Context.menu = $('#document_kind_ref__context'); break;
            case 'contract_ref_table_row': Context.menu = $('#contract_ref__context'); break;
            case 'employee_ref__table_row': Context.menu = $('#employee_ref__context'); break;
            case 'employee_card__photo' : Context.menu = $('#employee_card__photo_context'); break;
            case 'document_card__send_list_table_num': Context.menu = $('#document_card__send_list_context'); break;
            case 'user': Context.menu = $('#user__context'); break;
            case 'document__item': Context.menu = $('#is_card__document_context'); break;
            default: Context.menu = '';
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

        if ((windowWidth - clickCoordsX) < menuWidth) {
            //menu.style.left = windowWidth - menuWidth + "px";

            var left = windowWidth - menuWidth - Context.htmlPaddingRight -
                Context.bodyPaddingRight - Context.wrapperPaddingRight - 9;
            Context.menu.css('left', left + "px")
        } else {
            var left = clickCoordsX;
        }

        if ((windowHeight - clickCoordsY) < menuHeight) {
            //menu.style.top = windowHeight - menuHeight + "px";
            var top = windowHeight - menuHeight - Context.htmlPaddingTop -
                Context.bodyPaddingTop - Context.wrapperPaddingTop;

            Context.menu.css('top', top + "px");
        } else {
            var top = clickCoordsY;
        }
        Context.menu.offset({top:top, left: left})
    },
    /** ФУНКЦИИ ДЛЯ РАБОТЫ С ПУНКТАМИ ГЛАВНОГО МЕНЮ */

    /** Показать меню справочники */
    show_menu_references: function () {
        Context.menuState = 1;
        $('#sm_references').css('display', 'flex');
    },
    show_menu_help() {
        Context.menuState = 1;
        $('#sm_help').css('display', 'flex');
    },
    /** ФУНКЦИИ ДЛЯ РАБОТЫ С ПУНКТАМИ КОНТЕКСТНОГО МЕНЮ ДОКУМЕНТА */
    document_open_card: function () {
        var id = $("#information_system_card__id").text();
        var size = { width: 1000, height: 600 };
        reference.open_card('#information_system_card', 'Карточка Документа', size, 
            OpenMode.Edit, id,'#information_system_card__documents');
    },



    document_open_version_card: function () {
        $('#information_system_card__dialog').css('display', 'flex');
        $('#information_system_card__dialog').css('z-index', z_index);
        //$('#information_system_card__dialog_content').load(host + 'inc/version/version_card.html');

    },

    createContext: function (src_el) {
        switch (src_el.className) {
            case 'information_system__reference_container': Context.menu = $('#information_system_ref__out_context'); break;
            case 'attachments__list information_system_card__documents' : Context.menu = $('#information_system_card__documents_out_context'); break;
            case 'information_system_card__remarks_container' : Context.menu = $('#information_system_card_remarks__out_context'); break;
            case 'information_system_card__developpers_container' : Context.menu = $('#information_system_card_developpers__out_context'); break;
            case 'information_system_card__administrators_container' : Context.menu = $('#information_system_card_administrators__out_context'); break;
            case 'administrator_ref__container': Context.menu = $('#administrator_ref__out_context'); break;
            case 'department_ref__container' : Context.menu = $('#department_ref__out_context'); break;
            case 'document_ref__container' : Context.menu = $('#document_ref__out_context'); break;
            case 'document_card__send_list_container' : Context.menu = $('#document_card_send_list__out_context'); break;
            case 'attachments__list' : Context.menu = $('#document_card__version_out_context'); break;
            case 'organization_ref__container' : Context.menu = $('#organization_ref__out_context'); break;
            case 'employee_ref__container' : Context.menu = $('#employee_ref__out_context'); break;
            default: return false;
        }
        return src_el;
    }
}