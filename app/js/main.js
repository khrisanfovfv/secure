// var informationSystem = {
//     prefix : '#is_card',
//     cardPath : 'inc/administrator/administrator_card.html'
// }



/** Инициализация */
z_index=1;


//Получаем URL сайта
var data = {
    action: 'get_site_url',
};


jQuery.post( MainData.ajaxurl, data, function( response ){
    host = response + '/';
} );



$(function () {
    /** Инициализация контекстного меню */
    var context = Object.create(Context);
    context.init();

    // Получаем идентификатор страницы
    var page_id = $('#page_id').text();

    /** ================ ВЫБОР ПУНКТА МЕНЮ =============== */
    $('.submenu__item').on('click', function(e){
        e.preventDefault();
        href = $(this).children().attr('href');
        switch (href){

            case 'sm_references__information_system': open_page('information_system'); break;
            case 'sm_references__administrators': open_page('administrator'); break;
            case 'sm_references__organizations': open_page('organization'); break;
            case 'sm_references__departments' : open_page('department'); break;
            case 'sm_references__document_kind': open_page('document_kind'); break;
            case 'sm_references__contract': open_page('contract'); break;
            case 'sm_references__employees': open_page('employee'); break;
            case 'sm_references__documents' : open_page('document'); break;
            case 'sm_help__about' : {
                $('#is_card__notif').css('display','flex');
                $('#is_card__notif').css('z-index', ++z_index);
                $('#is_card__notif_content').load(host+'inc/about/about_card.html');
                $('.appdialog__header_title').text('О программе')

            }; break;
        }
    })

    /**
     * ============================ ОТКРЫВАЕТ ВКЛАДКУ СО СПРАВОЧНИКОМ ===========================
     * @param {string} reference 
     */
    function open_page(reference){
        $("<a>").prop({
            target: "_blank",
            href: host + reference
        })[0].click();
    }


    /**
     * ==================== НАЖАТИЕ ENTER В СТРОКЕ ПОИСКА ======================
     */
    $('#search__text').on('keyup', function(e){
        if (e.key == "Enter"){
            var value = $('#search__text').val().trim();
            switch(page_id){
                case 'document_kind' :  document_kind_common_search(value); break;
                case 'document' : document_common_search(value); break; 
                case 'department' : department_common_search(value); break; 
                case 'administrator' : administrator_common_search(value); break;
                case 'organization' : organization_common_search(value); break;
                case 'information_system' : information_system_common_search(value); break;
                case 'employee' : employee_common_search(value); break;
            }
            
        }
    })

    /**
     * ================== НАЖАТИЕ КНОПКИ РАСШИРЕННЫЙ ПОИСК ======================
     */
    $('#search_button').on('click', function(){
        switch(page_id){
            case 'document_kind' : document_kind_extended_search(); break;
            case 'document' : document_extended_search(); break;
            case 'department' : department_extended_search(); break;
            case 'administrator' : administrator_extended_search(); break;
            case 'information_system' : information_system_extended_search();break;
            case 'organization' : organization_extended_search();break;
            case 'employee' : employee_extended_search(); break;
        }
    })

    $('#IS_table tr').on('click', function(e){
        if (e.button == 1){
            $('#is_table_context').css('display', 'none');
        }
    });




    

    

   /*  $('.is_card__developpers_table_row').on('dblclick', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
        $('#is_card__dialog_window').css('width','800px');
        $('#is_card__dialog_title').text('Карточка организации')
        $('#is_card__dialog_content').load(host+'inc/organization/organization_card.html');
    }) */


    /** Одиночный клик на таблицу Администраторы ИС */
    $('#is_card__administrators_table tbody tr').on('click', function(){
        reference.highlight($(this));
    });

    /** Двойной клик на таблицу Администраторы ИС */
    $('#is_card__administrators_table tbody tr').on('dblclick', function(){
        var rows = '#is_card__administrators_table tbody tr';
        var title = 'Карточка администратора';
        var size ={ width : 800, height : 600 }  
        reference.editRecord(informationSystem.prefix, rows, title, informationSystem.cardPath, size);  
    })

    /* $('#is_card__organization_btn').on('click', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
        $('#is_card__dialog_window').css('width','800px');
        $('#is_card__dialog_title').text('Карточка организации')
        $('#is_card__dialog_content').load(host+'inc/organization/organization_card.html')
    }) */

    // /** Одиночный клик на таблицу разработчики */
    // $('#is_card__developpers_table tbody tr').on('click', function(){
    //     reference.highlight($(this));
    // });


    // /** Двойной клик на строку в таблице Организации */
    // $('#is_card__developpers_table tbody tr').on('dblclick', function(){
    //     var rows = '#is_card__developpers_table tbody tr';
    //     var title = 'Карточка организации';
    //     var cardPath = 'inc/organization/organization_card.html';
    //     var size ={ width : 800, height : 600 }

    //     reference.editRecord(informationSystem.prefix, rows, title, cardPath, size);
    //     /*$('#is_card__dialog').css('display','flex');
    //     $('#is_card__dialog').css('z-index', ++z_index);
    //     $('#is_card__dialog_window').css('width','800px');
    //     $('#is_card__dialog_title').text('Карточка организации')
    //     $('#is_card__dialog_content').load(host+'inc/organization/organization_card.html')*/
    // })

    /** Одиночный клик на таблицу Контракты */
    $('#is_card__contracts_table tbody tr').on('click', function(){
        reference.highlight($(this));
    })

    /** Клик на строку в таблице Контракты */
    $('#is_card__contracts_table tbody tr').on('dblclick', function(){
        $('#is_card__dialog').css('display','flex');
        $('#is_card__dialog').css('z-index', ++z_index);
        $('#is_card__dialog_window').css('width','1200px');
        $('#is_card__dialog_title').text('Карточка контракта')
        $('#is_card__dialog_content').load(host+'inc/contract/contract_card.html')
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
    
    // /** Кнопки ОК, Отмена */
    // $('.appdialog__finish_button').on('click', function(){
    //     var dlg_window = $(this).parent().parent().parent().parent();
    //     dlg_window.css('display','none');
    //     //z_index--;
    // })

    

    

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

    // /** Кнопка Начать аттестацию */
    // $('#start_certification_button').on('click', function(){
    //     $('#is_card__dialog').css('display','flex');
    //     $('#is_card__dialog').css('z-index', ++z_index);
    //    // $('#is_card__dialog_window').css('width','1200px');
    //     $('#is_card__dialog_content').empty();
    //     $('#is_card__dialog_content').append("<p class='appdialog__content_text'>Вы действительно хотите начать новую аттестацию?</p>");
    //     $('#is_card__dialog_title').text('Начать аттестацию')
    //     //newItem.text('')
    // })

    // /** Таблица Администраторы. Кнопка Создать */
    // $('#is_card__administrator_create').on('click', function(){
    //     var title = 'Карточка администратора'; 
    //     reference.createRecord(informationSystem.prefix, title, informationSystem.cardPath);
    // })

    // /** Таблица Администраторы. Кнопка Редактировать */
    // $('#is_card__administrator_edit').on('click', function(){
    //     var rows = '#is_card__administrators_table tbody tr';
    //     var title = 'Карточка администратора';
    //     var size ={ width : 800, height : 600 }
    //     reference.editRecord(informationSystem.prefix, rows, title, informationSystem.cardPath, size);
    // })

    $('.appdialog__notify_button').on('click', function(){
        $(this).parents('.appdialog').css('display', 'none');
    });

    /**
     * ================== ВЫХОД ИЗ АККАУНТА =====================
     */
    $('#user__context_exit').on('click', function(){
        ;var data = {
            action: 'exit'
        };
        
        jQuery.post(MainData.ajaxurl, data, function (textStatus) {
            window.location.replace(textStatus);
        }).fail(function(jqXHR, textStatus, errorThrown){
            alert('Во время выхода из профиля произошла ошибка ' + errorThrown)
                
        });
    })

    /** 
     * ================ ПОКАЗЫВАЕМ ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ ================
    */
    $('#user__context_profile').on('click', function(){
        let size = {width:600, height:400};
        let data ={
            action: 'get_current_user_id',
        }
        jQuery.post(MainData.ajaxurl, data, function(id){
            reference.open_card('#footer_ref', 'Профиль пользователя', size, OpenMode.Edit, id, '#user_profile');
        })
        
    })

    /**
     * ================= ПОКАЗЫВАЕМ ДИАЛОГ СМЕНЫ ПАРОЛЯ =================
     */
    $('#user__context_password').on('click', function(){
        let size = {width: 400, height:200};
        let data ={
            action: 'get_current_user_id',
        }
        jQuery.post(MainData.ajaxurl, data, function(id){
            reference.open_card('#footer_ref', 'Смена пароля', size, OpenMode.Edit, id, '#change_password');
        })
       
    })

});