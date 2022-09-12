(function ($) {
    'use strict';

    var $constrom_window = $(window);
    var reen_window = $(window);

   
    if ($.fn.owlCarousel) {
        var clientArea = $('.clint-area');
        clientArea.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            margin: 30,
            autoplayTimeout: 5000,
            nav: true,
            navText: ["<i class='fas fa-chevron-left font26'</i>", "<i class='fas fa-chevron-right font26'</i>"],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                }
            }
        });
    }
})(jQuery)