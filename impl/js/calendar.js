$(function() {
    'use strict';

    moment.locale('ru');

    /**
    * We assume that there's only one event per day.
    * So the 'events' list should have only one entry per day.
    */
    var events = [];

    var currentMonth;

    function mockEvents() {
        events = [
            {
                title: 'Митинг победителей',
                date: moment({year: 2015, month: 0, day: 9}),
                participants: 'Леонид Волков, Алексей Навальный',
                description: 'Митинг сторонников Навального на Болотной площади'
            },
            {
                title: 'Дедлайн по вступительной в HH',
                date: moment({year: 2015, month: 0, day: 15}),
                participants: ['Виталий Павленко'],
                description: 'Задание тут: http://school.hh.ru/#form'
            },
            {
                title: 'Hallowe\'en',
                date: moment({year: 2015, month: 0, day: 31}),
                participants: 'Ghosts, vampires',
                description: 'Может, в этом году таки отметить?'
            }
        ];
    }

    function saveToLocalStorage() {
        localStorage.setItem('events', JSON.stringify(events));
    }

    function restoreFromLocalStorage() {
        events = JSON.parse(localStorage.getItem('events'));
        for (var event of events) {
            event.date = moment(event.date);
        }
        return events !== null;
    }

    function getEventByDate(date) {
        for (var i in events) {
            if (events[i].date.isSame(date, 'day')) {
                return events[i];
            }
        }

        return undefined;
    }

    function getTableEntryByEvent(event) {
        return $('<div class="table-event">')
            .append($('<div class="table-event-title">').text(event.title))
            .append($('<div class="table-event-participants">').text(event.participants));
    }

    function drawGrid(startDate, endDate) {
        var table = $('<table>');
        var tr;
        var firstWeek = true;
        var today = moment();

        for (var date = startDate; !date.isSame(endDate, 'day'); date.add(1, 'day')) {
            if (date.day() === 1) {
                tr = $('<tr>');
            }

            var title = (firstWeek ? (date.format('dddd') + ', ') : '') + date.format('D');

            if (date.isSame(today, 'day')) {
                title = 'Сегодня, ' + title;
            }

            var td = $('<td>')
                .html($('<div class="cell-title">').text(title))
                .data('date', date.clone());

            if (date.isSame(today, 'day')) {
                td.addClass('today');
            }

            var currentDateEvent = getEventByDate(date);
            if (currentDateEvent !== undefined) {
                td.append(getTableEntryByEvent(currentDateEvent));
                td.addClass('has-event');
            }

            tr.append(td);

            if (date.day() === 0) {
                table.append(tr);
                firstWeek = false;
            }
        }
        $('#month-div').html(table);
    }

    function gotoMonth(day) {
        currentMonth = day;

        $('#month-title').text(currentMonth.format('MMMM YYYY'));

        var firstDateOfMonth = currentMonth.clone().date(1);
        var lastDateOfMonth = currentMonth.clone().add(1, 'months').date(0);

        var startDate;
        var endDate;

        // Calendar represents dates in range [startDate; endDate).

        if (firstDateOfMonth.day() === 0) {
            startDate = firstDateOfMonth.clone().day(-6);
        } else {
            startDate = firstDateOfMonth.clone().day(1);
        }

        if (lastDateOfMonth.day() === 0) {
            endDate = lastDateOfMonth.clone().add(1, 'day');
        } else {
            endDate = lastDateOfMonth.clone().day(7).add(1, 'day');
        }

        drawGrid(startDate, endDate);
    }

    function gotoToday() {
        gotoMonth(moment());
    }

    function addEvent(date, title) {
        var newEvent = {
            date: date,
            title: title,
            participants: '',
            description: ''
        };

        var found = false;
        for (var i in events) {
            if (events[i].date.isSame(date, 'day')) {
                events[i] = newEvent;
                found = true;
            }
        }

        if (!found) {
            events.push(newEvent);
        }

        saveToLocalStorage();
    }

    function editEvent(date) {
        // TODO: implement
    }

    function addQuickEvent(text) {
        var parts = text.split(',').map($.trim);

        if (parts.length === 0) {
            return;
        }
        if (parts.length === 1) {
            parts.push('');
        }
        if (parts.length > 2) {
            parts[1] = parts.slice(1, parts.length).join(', ');
            parts.length = 2;
        }

        var date = moment(parts[0], 'DD MMMM');
        date.year(moment().year());

        addEvent(date, parts[1]);
        gotoMonth(date);
        editEvent(date);
    }

    function init() {
        new Pane($('#quick-add'), {
            attachTo: $('#button-add'),
            position: 'bottom'
        });

        var eventEditPane = new Pane($('#event-edit'));

        if (!restoreFromLocalStorage()) {
            mockEvents();
        }

        $('#button-add').click(function() {
            $('#quick-add').toggle();
        });

        $('#button-refresh').click(function() {
            window.location.reload();
        });

        $('#button-prev-month').click(function() {
            gotoMonth(currentMonth.clone().add(-1, 'month'));
        });

        $('#button-next-month').click(function() {
            gotoMonth(currentMonth.clone().add(1, 'month'));
        });

        $('#button-today').click(function() {
            gotoToday();
        });

        $('#quick-add-button').click(function() {
            $('#quick-add').toggle();
            addQuickEvent($('#quick-add-text').val());
        });

        $(document).on('click', '.has-event', function() {
            eventEditPane.setOptions({
                attachTo: $(this),
                position: $(this).data('date').weekday() < 4 ? 'right' : 'left'
            });
            $('#event-edit').toggle();
        });

        gotoToday();
    }

    init();
});
