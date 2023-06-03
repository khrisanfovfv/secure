$(function () {
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
            $('#card__'+ item).addClass('hide');
        });
        /* Показываем выбранную */
        tab=$(this).children().attr('href');
        $(tab).removeClass('hide');
    })


    /** Клик на строку в таблице Контракты */
    $('#CONTRACT_table tbody tr').on('click', function(){
        $('.contract').removeClass('hide');
    })    

    /** Клик на кнопку закрыть */
    $('.card__header_closeLink').on('click', function(){
        // Получаем саму карточку
        card=$(this).parent().parent().parent();
        card.addClass('hide');
    })

    $('.button_cancel').on('click', function(){
        $('.dialog').removeClass('hide');
    })
})