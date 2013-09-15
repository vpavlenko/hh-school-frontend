$(document).ready(function() {
    "use strict";

    moment.lang("ru");

    var events;

    function mockEvents() {
        var mocks = [{title: "Митинг победителей",
                      date: new Date(2013, 8, 9),
                      participants: ["Леонид Волков", "Алексей Навальный"],
                      description: "Митинг сторонников Навального на Болотной площади"
                     }
                    ];
        events = mocks;
    }

    function drawGrid() {

    }

    function gotoMonth(month, year) {
        var momentObj = moment({month: month, year: year});
        $('#month').text(capitalizeFirstLetter(momentObj.format("MMMM YYYY")));
    }

    function gotoDay(day) {
        gotoMonth(day.month(), day.year());
    }

    function gotoToday() {
        gotoDay(moment());
    }

    function init() {
        mockEvents();
        gotoToday();
    }

    init();
})