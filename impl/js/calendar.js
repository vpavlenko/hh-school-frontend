$(document).ready(function() {
    "use strict";

    moment.lang("ru");

    var events;
    var currentMonth;

    function mockEvents() {
        var mocks = [{title: "Митинг победителей",
                      date: new Date(2013, 8, 9),
                      participants: ["Леонид Волков", "Алексей Навальный"],
                      description: "Митинг сторонников Навального на Болотной площади"
                     }
                    ];
        events = mocks;
    }

    function datesEqual(x, y) {
        return x.year() == y.year() && x.month() == y.month() && x.date() == y.date();
    }

    function drawGrid(startDate, endDate) {
        var table = $('<table>');
        var tr;
        var first_week = true;

        for (var date = startDate; !datesEqual(date, endDate); date.add('day', 1)) {
            if (date.day() === 1) {
                tr = $('<tr>');
            }

            var title = (first_week ? (date.format('dddd') + ', ') : '') + date.format('D');
            tr.append($('<td>').html($('<span class="cell-title">').text(capitalizeFirstLetter(title))));

            if (date.day() === 0) {
                table.append(tr);
                first_week = false;
            }
        }
        $('#month-div').html(table);
    }

    function gotoMonth(day) {
        currentMonth = day;

        $('#month').text(capitalizeFirstLetter(currentMonth.format("MMMM YYYY")));

        var firstDateOfMonth = currentMonth.clone().date(1);
        var lastDateOfMonth = currentMonth.clone().add('months', 1).date(0);

        var startDate;
        var endDate;

        // calendar will represent dates in range [startDate; endDate)

        if (firstDateOfMonth.day() === 0) {
            startDate = firstDateOfMonth.clone().day(-6);
        } else {
            startDate = firstDateOfMonth.clone().day(1);
        }

        if (lastDateOfMonth.day() === 0) {
            endDate = lastDateOfMonth.clone().add('day', 1);
        } else {
            endDate = lastDateOfMonth.clone().day(7).add('day', 1);
        }

        drawGrid(startDate, endDate);
    }

    function gotoToday() {
        gotoMonth(moment());
    }

    function init() {
        mockEvents();

        $('#button-refresh').click(function() {
            window.location.reload();
        });

        $('#button-prev-month').click(function() {
            gotoMonth(currentMonth.clone().add('month', -1));
        });

        $('#button-next-month').click(function() {
            gotoMonth(currentMonth.clone().add('month', 1));
        });

        $('#button-today').click(function() {
            gotoToday();
        });

        gotoToday();
    }

    init();
});