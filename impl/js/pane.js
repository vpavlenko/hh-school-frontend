(function() {
    'use strict';

    var positionClasses = {
        'bottom': 'pane-position-bottom',
        'left': 'pane-position-left',
        'right': 'pane-position-right'
    };

    function Pane($element, options) {
        this.$element = $element;

        $element.addClass('pane');

        this.options = {
            attachTo: $('body'),
            position: 'bottom'
        };

        this.setOptions(options);

        var closeButton = $('<div class="pane-close">' +
            '<div class="pane-close-content">' +
                '<i class="fa fa-times"></i>' +
            '</div>' +
        '</div>');

        $element.append(closeButton);
    }

    Pane.prototype.setOptions = function(options) {
        for (var key in options) {
            this.options[key] = options[key];
        }

        this.processOptions();
    };

    Pane.prototype.processOptions = function() {
        var position = this.options.position;
        if (!(position in positionClasses)) {
            throw new Error('Position \'' + position + '\' is not supported.' +
                            'Supported positions: ' + JSON.stringify(Object.keys(positionClasses)));
        }

        for (var key in positionClasses) {
            this.$element.removeClass(positionClasses[key]);
        }

        this.$element.addClass('pane-position-' + position);
    };

    $(document).on('click', '.pane-close', function() {
        $(this).parent().hide();
    });

    window.Pane = Pane;
})();