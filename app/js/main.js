$(function () {
    /** Инициализация контекстного меню */
    var context = Object.create(Context);
    context.init();


    // Уровень текущего открытого окна
    var z_index=1;

    /** ================ МЕНЮ =================== */
    $('.submenu__item').on('click', function(e){
        e.preventDefault();
        href = $(this).children().attr('href');
        switch (href){
            case 'sm_referrenses_organisations': {
                $('#is_organisation_reference').load('organisation_ref.html');
                $('#is_organisation_reference').css('z-index',++z_index);
            }; break
            case 'sm_referrenses_departments' : {
                $('#is_department_ref').load('organisation_ref.html');
                $('#is_department_ref').css('z-index',++z_index);
            }; break
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
    $('.card_is__tabs_item').on('click',function(){
        // Список имеющихся вкладок
        var card_tabs = ['general','remarks','contracts','archive'];

        // Устанавливаем класс main_tabs__highlighted у выбранной вкладки
        $('.main_tabs__item').removeClass('main_tabs__highlighted');
        $(this).addClass('main_tabs__highlighted');
        
        /* Скрываем все вкладки */
        card_tabs.forEach(item => {
            $('#card_is__'+ item).addClass('hide');
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
    $('#card_is__administrators_table tbody tr').on('click', function(){
        $('#card_is__administrators_table tbody tr').removeClass('bg_blue');
        $(this).addClass('bg_blue');
    });

    /** Двойной клик на таблицу Администраторы ИС */
    $('#card_is__administrators_table tbody tr').on('dblclick', function(){
        $('#administrator_card').load("administrator_card.html");
        $("#administrator_card").css('z-index',++z_index);      
    })



    /** Двойной клик на строку в таблице Организации */
    $('#card_is__developpers_table tbody tr').on('dblclick', function(){
        $('#card_is__developper_card').load("organisation_card.html")
        $("#card_is__developper_card").css('z-index',++z_index);
    })


    /** Клик на строку в таблице Контракты */
    $('#card_is_contract_table tbody tr').on('dblclick', function(){
        $('#card_is__contract_card').load("contract_card.html");
        $("#card_is__contract_card").css('z-index',++z_index);
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
    /** Одиночный клик на таблицу Отделы */
    $('#department_ref_table tbody tr').on('click', function(){
        $('#department_ref_table tbody tr').removeClass('bg_blue');
        $(this).addClass('bg_blue');
    })

    /** Двойной клик на таблицу Отделы */
    $('#department_ref_table tbody tr').on('dblclick',function(){
        alert('Работает!')
        $('#department_ref__department_card').load("department_card.html");
        $("#department_ref__department_card").css('z-index',++z_index); 
    })


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
    $('.modal__finish_button').on('click', function(){
        z_index--;
        card = $(this).parent().parent().parent().parent();
        card.addClass('hide');
    })


    
})