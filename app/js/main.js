$(function () {
    $('.content__is-table tr').slice(1).on('click', function(){
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
            $('#card__'+ item).addClass('hide_tab');
        });
        /* Показываем выбранную */
        tab=$(this).children().attr('href');
        $(tab).removeClass('hide_tab');
    })


    /** Клик на строку в таблице Контракты */
    $('.card__contracts_table tbody tr').on('click',function(){
        $('.contract').removeClass('hide_tab');
    })
})