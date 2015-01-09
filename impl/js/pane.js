(function() {
    'use strict';

    var positionClasses = {
        'bottom': 'pane-position-bottom',
        'left': 'pane-position-left',
        'right': 'pane-position-right'
    };

    var offsetToTarget = 20;

    function Pane($element, options) {
        this.$element = $element;

        $('body').append($element.detach());

        $element.addClass('pane');

        this.setOptions({
            attachTo: $('body'),
            position: 'bottom'
        });

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
            this[key] = options[key];
        }

        this.processOptions();
    };

    Pane.prototype.processOptions = function() {
        if (!(this.position in positionClasses)) {
            throw new Error('Position \'' + this.position + '\' is not supported.' +
                            'Supported positions: ' + JSON.stringify(Object.keys(positionClasses)));
        }

        for (var key in positionClasses) {
            this.$element.removeClass(positionClasses[key]);
        }

        this.$element.addClass(positionClasses[this.position]);


        var top = this.attachTo.offset().top;
        var left = this.attachTo.offset().left;
        switch (this.position) {
            case 'bottom':
                top += this.attachTo.outerHeight() + offsetToTarget;
                break;
            case 'left':
                left -= this.$element.outerWidth() + offsetToTarget;
                break;
            case 'right':
                left += this.attachTo.outerWidth() + offsetToTarget;
                break;
        }
        this.$element.css({
            top: top + 'px',
            left: left + 'px'
        });
    };

    $(document).on('click', '.pane-close', function() {
        $(this).parent().hide();
    });

    window.Pane = Pane;
})();