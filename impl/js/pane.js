(function() {
    'use strict';

    function Pane($element) {
        $element.addClass('pane');

        var closeButton = $('<div class="pane-close">' +
            '<div class="pane-close-content">' +
                '<i class="fa fa-times"></i>' +
            '</div>' +
        '</div>');

        $element.append(closeButton);
    }

    $(document).on('click', '.pane-close', function() {
        $(this).parent().hide();
    });

    window.Pane = Pane;
})();