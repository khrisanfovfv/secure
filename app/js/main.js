/** Инициализация */
z_index=3;
host='http://192.168.1.13:3000/'

$(function () {
    /** Инициализация контекстного меню */
    var context = Object.create(Context);
    context.init();

    /** ================ ВЫБОР ПУНКТА МЕНЮ =============== */
    $('.submenu__item').on('click', function(e){
        e.preventDefault();
        href = $(this).children().attr('href');
        switch (href){
            case 'sm_references__administrators': {
                $("<a>").prop({
                    target: "_blank",
                    href: host + "inc/administrator/administrator_ref.html"
                })[0].click();
            }; break;
            case 'sm_references__organisations': {
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/organisation/organisation_ref.html"
                })[0].click();
            }; break;
            case 'sm_references__departments' : {
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/department/department_ref.html"
                })[0].click();
            }; break;
            case 'sm_references__document_kind':{
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/document_kind/document_kind_ref.html"
                })[0].click();
            }; break;
            case 'sm_references__contract':{
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/contract/contract_ref.html"
                })[0].click();
            }; break;
            case 'sm_references__employeers':{
                $("<a>").prop({
                    target: "_blank",
                    href:host + "inc/employeer/employeer_ref.html"
                })[0].click();
            }; break;
            case 'sm_help__about' : {
                $('#is_card__notif').css('display','flex');
                $('#is_card__notif').css('z-index', ++z_index);
                $('#is_card__notif_content').load(host+'inc/about/about_card.html');
                $('.appdialog__header_title').text('О программе')

            }; break;
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
        $('#is_card__dialog_title').text('Карточка администратора');
        $('#is_card__dialog_content').load(host+'inc/administrator/administrator_card.html')      
    })



    /** Двойной клик на строку в таблице Организации */
    $('#is_card__developpers_table tbody tr').on('dblclick', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
        $('#is_card__dialog_window').css('width','800px');
        $('#is_card__dialog_title').text('Карточка организации')
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
        $('#is_card__dialog_title').text('Карточка контракта')
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

    /** ================== APPDIALOG ================== */
    /** finish_button */

    /** Кнопка закрыть */
    $('.appdialog__header_close').on('click', function(){
        var dlg_window = $(this).parent().parent().parent();
        dlg_window.css('display','none');
        //z_index--;
    })
    
    /** Кнопки ОК, Отмена */
    $('.appdialog__finish_button').on('click', function(){
        var dlg_window = $(this).parent().parent().parent().parent();
        dlg_window.css('display','none');
        //z_index--;
    })

    /** Перемещение APPDIALOG */
    var dialogMove = {
        clickedLeft : false,
        prevX : 0,
        prevY : 0,
        X : 0,
        Y : 0
    }

    /** Нажатие кнопки мыши */
    $('.appdialog__header').on('mousedown', function(e){
        if (e.button === 0){
            dialogMove.prevX = e.screenX;
            dialogMove.prevY = e.screenY;
            dialogMove.X = $(this).parent().position().left;
            dialogMove.Y = $(this).parent().position().top;
            dialogMove.clickedLeft = true;
        }
    })

    /** Отпускаем кнопку мыши */
    $('.appdialog__header').on('mouseup', function(e){
        if (e.button === 0) {
            dialogMove.clickedLeft = false;
        }
    });

    /** Мышь выходит за границы элемента */
    $('.appdialog__header').on('mouseleave', function(){
        dialogMove.clickedLeft = false;
    })

    /** Перемещаем мышь */
    $('.appdialog__header').on('mousemove', function(e){
        if (e.button === 0 && dialogMove.clickedLeft == true){
            var dX = e.screenX - dialogMove.prevX;
            var dY = e.screenY - dialogMove.prevY;
            
            dialogMove.X = dialogMove.X + dX;
            dialogMove.Y = dialogMove.Y + dY;

            dialogMove.prevX = e.screenX;
            dialogMove.prevY = e.screenY;

            $(this).parent().css('left', dialogMove.X + 'px');
            $(this).parent().css('top', dialogMove.Y + 'px');
        }
    })

    /** Кнопка Начать аттестацию */
    $('#start_certification_button').on('click', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
       // $('#is_card__dialog_window').css('width','1200px');
        $('#is_card__dialog_title').text('Начать аттестацию')
        $('#is_card__dialog_content p').text('Вы действительно хотите начать новую аттестацию?')
        //newItem.text('')
    })

    /** Таблица Администраторы. Кнопка Создать */
    $('#is_card__administrator_create').on('click', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
        $('#is_card__dialog_title').text('Карточка администратора')
        $('#is_card__dialog_content').load(host+'inc/administrator/administrator_card.html')
    })

    /** Таблица Администраторы. Кнопка Редактировать */
    $('#is_card__administrator_edit').on('click', function(){
        var adminisrator_list = $('.is_card__administrators_table_row').hasClass('bg_blue');
        if (adminisrator_list.count > 0) {
            $('#is_card__dialog').css('display','flex');
            $('#is_card__dialog').css('z-index', ++z_index);
            $('#is_card__dialog_title').text('Карточка администратора')
            $('#is_card__dialog_content').load(host+'inc/administrator/administrator_card.html')
        } else{
            alert('У вас не выделена запись для редактирования!')
        }
        
    })

})