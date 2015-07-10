/**
 * @ngdoc directive
 * @name subrosa.account:addressChooser
 *
 * @requires i18n
 * @requires Address
 *
 * @description
 *   A directive to allow choosing an address.
 */
angular.module('subrosa.account').directive('addressChooser', function (i18n, Address) {
    'use strict';

    return {
        restrict: 'AE',
        controller: 'ChooserDirectiveController',
        templateUrl: '/app/account/address/views/address-chooser.html',
        scope: {
            items: '=addressChooser',
            onEdit: '&',
            onDelete: '&',
            onDeleteError: '&',
            onSave: '&',
            onSelect: '&'
        },
        link: function (scope) {
            scope.chooserFormNotifications = [];

            scope.saveResource = function (address) {
                var response, success, error;

                success = function () {
                    var notification = {type: 'success', message: i18n('Your address has been created')};
                    scope.chooserFormNotifications.push(notification);
                };

                error = function (response) {
                    scope.selectedItem.edit = true;
                    scope.chooserFormNotifications = response.data.notifications;
                };

                if (address.hasOwnProperty('id')) {
                    response = Address.update(address, success, error);
                } else {
                    response = Address.save(address, success, error);
                }

                return response;
            };

            scope.deleteResource = function (address) {
                var success, error;

                success = function () {
                    var notification = {type: 'success', message: i18n('Your player has been removed')};
                    scope.chooserFormNotifications.push(notification);
                };

                error = function (response) {
                    scope.chooserFormNotifications = response.data.notifications;
                };

                return Address.delete({id: address.id}, success, error);
            };

        }
    };
});
