/** Инициализация */
z_index=1;
host='http://localhost:3000/'

$(function () {
    /** Инициализация контекстного меню */
    var context = Object.create(Context);
    context.init();


    // Уровень текущего открытого окна
    //var 

    /** ================ МЕНЮ =================== */

    $('.submenu__item').on('click', function(e){
        e.preventDefault();
        href = $(this).children().attr('href');
        switch (href){
            case 'is_ref__menu_administrators': {
                $("<a>").prop({
                    target: "_blank",
                    href: host + "inc/administrator/administrator_ref.html"
                })[0].click();
            }
            case 'is_ref__menu_organisations': {
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/organisation/organisation_ref.html"
                })[0].click();
            }; break
            case 'is_ref__menu_departments' : {
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/department/department_ref.html"
                })[0].click();
            }; break
            case 'is_ref__menu_document_kind':{
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/document_kind/document_kind_ref.html"
                })[0].click();
            }
            case 'is_ref__menu_contract':{
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/contract/contract_ref.html"
                })[0].click();
            }
            case 'is_ref__menu_employeers':{
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/employeer/employeer_ref.html"
                })[0].click();
            }
        }
    })

    


    $('#IS_table tr').on('click', function(e){
        if (e.button == 1){
            $('#is_table_context').css('display', 'none');
        }
    });

    /** ======= Таблица Информационные системы. ======== */

    /** Одинарный щелчок  */
    $('#IS_table tbody tr').on('click', function(){
        $('#IS_table tbody tr').removeClass('bg_blue');
        $(this).addClass('bg_blue');
    })

    /** Двойной щелчок */
    $('#IS_table tbody tr').on('dblclick', function(){
        $("<a>").prop({
            target: "_blank",
            href: "card.html"
        })[0].click();
    })

    /** Кнопка Создать */
    $('#IS_create').on('click', function(){
        $("<a>").prop({
            target: "_blank",
            href: "card.html"
        })[0].click();
    })

    /** Кнопка Редактировать */
    $('#IS_edit').on('click', function(){
        $('#IS_table tbody tr').each(function(index,element){
            if ($(this).hasClass('bg_blue')){
                $("<a>").prop({
                    target: "_blank",
                    href: "card.html"
                })[0].click();
            }
        })
    })

    /** Кнопка копировать */
    $('#IS_copy').on('click', function(){
        $('#IS_table tbody tr').each(function(index,element){
            if ($(this).hasClass('bg_blue')){
                $("<a>").prop({
                    target: "_blank",
                    href: "card.html"
                })[0].click();
            }
        })
    })



    /**=========== Выбор вкладок на карточке ИС =====================*/
    $('.is_card__tabs_item').on('click',function(){
        // Список имеющихся вкладок
        var card_tabs = ['general','remarks','contracts','archive'];

        // Устанавливаем класс main_tabs__highlighted у выбранной вкладки
        $('.main_tabs__item').removeClass('main_tabs__highlighted');
        $('.main_tabs__item').css('z-index',1);
        $(this).addClass('main_tabs__highlighted');
        $(this).css('z-index',2);

        
        /* Скрываем все вкладки */
        card_tabs.forEach(item => {
            $('#is_card__'+ item).addClass('hide');
        });
        /* Показываем выбранную */
        tab=$(this).children().attr('href');
        $(tab).removeClass('hide');
    })

    /**=========== Выбор вкладок на карточке Документ =====================*/
    $('.document__tabs_item').on('click',function(){
        // Список имеющихся вкладок
        var card_tabs = ['general','send_list'];

        // Устанавливаем класс main_tabs__highlighted у выбранной вкладки
        $('.main_tabs__item').removeClass('main_tabs__highlighted');
        $(this).addClass('main_tabs__highlighted');
        
        /* Скрываем все вкладки */
        card_tabs.forEach(item => {
            $('#document_card__'+ item).addClass('hide');
        });
        /* Показываем выбранную */
        tab=$(this).children().attr('href');
        $(tab).removeClass('hide');
    })

    /** Одиночный клик на таблицу Администраторы ИС */
    $('#is_card__administrators_table tbody tr').on('click', function(){
        $('#is_card__administrators_table tbody tr').removeClass('bg_blue');
        $(this).addClass('bg_blue');
    });

    /** Двойной клик на таблицу Администраторы ИС */
    $('#is_card__administrators_table tbody tr').on('dblclick', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
        $('#is_card__dialog_content').load(host+'inc/administrator/administrator_card.html')      
    })



    /** Двойной клик на строку в таблице Организации */
    $('#is_card__developpers_table tbody tr').on('dblclick', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
        $('#is_card__dialog_window').css('width','800px');
        $('#is_card__dialog_content').load(host+'inc/organisation/organisation_card.html')
    })

    /** Одиночный клик на таблицу Контракты */
    $('#is_card__contracts_table tbody tr').on('click', function(){
        $('#is_card__contracts_table tbody tr').removeClass('bg_blue');
        $(this).addClass('bg_blue');
    })

    /** Клик на строку в таблице Контракты */
    $('#is_card__contracts_table tbody tr').on('dblclick', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
        $('#is_card__dialog_window').css('width','1200px');
        $('#is_card__dialog_content').load(host+'inc/contract/contract_card.html')
    })    


    /** СПРАВОЧНИК ОРГАНИЗАЦИИ */


    $('#organisations_table tbody tr').on('click', function(){
        $('#organisations_table tbody tr').removeClass('bg_blue');
        $(this).addClass('bg_blue');
    })


    /** Клик на кнопку закрыть */
    $('.modal__header_close').on('click', function(e){
        e.preventDefault();
        z_index--;
        // Получаем саму карточку
        card=$(this).parent().parent().parent();
        card.addClass('hide');
    })

    /** СПРАВОЧНИК ОТДЕЛЫ */
    // /** Одиночный клик на таблицу Отделы */
    // $('#department_ref_table tbody tr').on('click', function(){
    //     $('#department_ref_table tbody tr').removeClass('bg_blue');
    //     $(this).addClass('bg_blue');
    // })

    // /** Двойной клик на таблицу Отделы */
    // $('#department_ref_table tbody tr').on('dblclick',function(){
    //     alert('Работает!')
    //     $('#department_ref__department_card').load("department_card.html");
    //     $("#department_ref__department_card").css('z-index',++z_index); 
    // })


    /** Карточка Администратор. Нажатие на кнопку выбора в поле Организация */
    $('#administrator__organisation').on('click',function(){
            $('#administrator__organisation_dlg').load("organisation_ref.html")
            $('#administrator__organisation_dlg').css('z-index',++z_index)
    })

    /** Карточка Администратор. Нажатие на кнопку выбора в поле Подразделение*/
    $('#administrator__department').on('click', function(){
        $('#administrator__department_dlg').load("department_ref.html")
        $('#administrator__department_dlg').css('z-index',++z_index)
    })

    /** Кнопки ОК/Cancel */
    /*$('.modal__finish_button').on('click', function(){
        z_index--;
        card = $(this).parent().parent().parent().parent();
        card.addClass('hide');
    })*/

    /** ================== APPDIALOG ================== */
    /** finish_button */

    /** Кнопка закрыть */
    $('.appdialog__header_close').on('click', function(){
        var dlg_window = $(this).parent().parent().parent();
        dlg_window.css('display','none');
        //z_index--;
    })
    

    $('.appdialog__finish_button').on('click', function(){
        var dlg_window = $(this).parent().parent().parent().parent();
        dlg_window.css('display','none');
        //z_index--;
    })
    

})