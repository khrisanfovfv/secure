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
            //case 'sm_reports__expiring_is' : load_expiring_systems_report(e); break;
            case 'sm_reports__full_complect' : load_full_complect_report(); break;
            case 'sm_reports__not_full_complect' : load_not_full_complect_report(); break;
            case 'sm_references__information_system': open_page('information_system'); break;
            case 'sm_references__administrators': open_page('administrator'); break;
            case 'sm_references__organizations': open_page('organization'); break;
            case 'sm_references__departments' : open_page('department'); break;
            case 'sm_references__document_kind': open_page('document_kind'); break;
            case 'sm_references__contract': open_page('contract'); break;
            case 'sm_references__employees': open_page('employee'); break;
            case 'sm_references__documents' : open_page('document'); break;
            case 'sm_help__help' : open_user_help(); break;
            case 'sm_help__about' : {
                let size = {width : 500, height : 230};
                reference.open_card('#footer_ref', 'О программе', size, OpenMode.Create, 0, '#about');
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

/** ============ ПРИВЯЗКА СОБЫТИЙ К КАРТОЧКЕ О ПРОГРАММЕ ============= */
function about_binding_events(){
    $('#about_card_OK').on('click', function(e){
        $(e.target).parents('.appdialog').css('display', 'none');
    })
}

/**
 * ============== ВЫГРУЗКА В ФАЙЛ EXCEL ==================
 * @param {Object} workbook книга Excel 
 * @param {*} file_name справочник
 */
async function saveToExcel(workbook, file_name){
    const bytes = await workbook.xlsx.writeBuffer();
    const mydata = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(mydata);
    link.download = file_name + ".xlsx";
    link.click();
    URL.revokeObjectURL(link.href);
}

/**
 * ============ НАЖАТИЕ НА КНОПКУ НАСТРОЙКИ =============
 */
$('#main_menu__settings').on('click', function(){
    let size = {width: 600, height:200};
        reference.open_card('#footer_ref', 'Настройки', size, OpenMode.Edit, 0, '#settings_card');
})

/** 
 * ============= ЗАГРУЖАЕМ ИНСТРУКЦИЮ ПОЛЬЗОВАТЕЛЯ
 */
function open_user_help(){
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', MainData.ajaxurl + '?action=load_user_instruction', true); // URL обработчика
    type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    xhr.responseType = 'blob';
    xhr.onload = function() {
        if (xhr.status === 200) {          
            var blob = xhr.response;
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([blob], {type : type}));
            link.download = 'Инструкция пользователя.docx'; // Имя файла, которое будет предложено пользователю
            link.click();
            URL.revokeObjectURL(link.href);
        } else{
            alert('Ошибка при загрузке файла');
        }
    }
    xhr.send();
}

/**
 * ПАНЕЛЬ НАСТРОЕК. КНОПКА ЗАКРЫТЬ
 */
$('#setting_card__button_close').on('click', function(){
    $(e.target).parents('.appdialog').css('display', 'none');
})

// function load_expiring_systems_report(e){
//     let data = {
//         action : 'load_expiring_systems'
//     }

//     jQuery.post( MainData.ajaxurl, data, function( result ){
//         let information_systems = JSON.parse(result);
//         //information_systems_to_excel(information_systems);
//     });



//}