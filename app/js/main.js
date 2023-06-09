$(function () {

    /** ДИАЛОГИ */

    administratorCard_dialog = $('#administrator_card').dialog({
        autoOpen: false,
        height: 800,
        width: 800,
        modal: true,
        open: function(){
            $('#administrator_card').load('administrator_card.html');
        }
    })


    $('#IS_table tr').slice(1).on('click', function(){
        $("<a>").prop({
            target: "_blank",
            href: "card.html"
        })[0].click();
    })

    /** Выбор вкладок на карточке ИС */
    $('.main_tabs__item').on('click',function(){
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

    /** Клик на таблицу Администраторы ИС */
    $('#card_is__administrators tbody tr').on('click', function(){
        
        })

        dialog.dialog("open");
    })

    /** Клик на строку в таблице Организации */
    $('#card_is__developpers tbody tr').on('click', function(){
        $('#organisation_card').load("organisation_card.html")
    })


    /** Клик на строку в таблице Контракты */
    $('#CONTRACT_table tbody tr').on('click', function(){
        administratorCard_dialog.dialog("open");
    })    


    /** СПРАВОЧНИК ОРГАНИЗАЦИИ */
    $('#organisations_table tbody tr').on('click', function(){
        $('#organisation_card').load('organisation_card.html');
    })


    /** Клик на кнопку закрыть */
    $('.card__header_closeLink').on('click', function(e){
        e.preventDefault();
        // Получаем саму карточку
        card=$(this).parent().parent().parent();
        card.addClass('hide');
    })

    $('.button_cancel').on('click', function(){
        $('.dialog').removeClass('hide');
    })


    $('.refRecord__button').on('click', function(){
        id = $(this).parent().attr('id');
        reference = "";
        var references = ["organisation"]
        $.each(references , function(index, val) {
            if (id.search(val) > 1){
                reference = val;
            } 
            switch(reference) {
                case "organisation":
                $('#organisation_reference').load("organisations.html") 
                 break;
            }
        })
    })
})