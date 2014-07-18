'use strict';

$(document).ready(function () {
    $(document).click(function (event) {
        var popoverSelector = '.env-plate .info .name span';
        if ($(event.target).is('button') === false) {
            $(popoverSelector).popover('hide').next('.popover').remove();
        } else {
            var buttonParent = $(event.target).parent();
            if (buttonParent.hasClass('custom-popover') === false) {
                return;
            }
            $(popoverSelector).not(buttonParent).popover('hide').next('.popover').remove();
        }

    });

    $('button.allow-notify').on('click', function () {
        if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {

                // Whatever the user answers, we make sure we store the information
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }

            });
        } else {
            $(this).unbind('click').remove();
        }
        if (Notification.permission === 'granted') {
            $(this).unbind('click').remove();
        }
    });
});

