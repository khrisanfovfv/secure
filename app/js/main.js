$(function () {
    $('.content__is-table tr').slice(1).on('click', function(){
        $("<a>").prop({
            target: "_blank",
            href: "card.html"
        })[0].click();
    })
})