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
        if (typeof Notification === 'undefined') {
            return $(this).unbind('click').text('Notifications are not supported.').addClass('notify-error');
        }
        if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {

                // Whatever the user answers, we make sure we store the information
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }

            });
        } else {
            $(this).unbind('click').text('Notifications are denied.').addClass('notify-error');
        }
        if (Notification.permission === 'granted') {
            $(this).unbind('click').text('Notifications works fine!').addClass('notify-success');
        }
    });
});

