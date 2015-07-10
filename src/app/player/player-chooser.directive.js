/**
 * @ngdoc directive
 * @name subrosa.player:playerChooser
 *
 * @requires i18n
 * @requires Player
 *
 * @description
 *   A directive to allow choosing an player.
 */
angular.module('subrosa.player').directive('playerChooser', function (i18n, Player) {
    'use strict';

    return {
        restrict: 'AE',
        controller: 'ChooserDirectiveController',
        templateUrl: '/app/player/views/player-chooser.html',
        scope: {
            items: '=playerChooser',
            onEdit: '&',
            onDelete: '&',
            onDeleteError: '&',
            onSave: '&',
            onSaveError: '&',
            onSelect: '&'
        },
        link: function (scope, element, attributes, ChooserController) {
            ChooserController.setAutoSelectDefault(false);

            scope.chooserFormNotifications = [];
            scope.selectedItem = {};

            scope.setPlayerImage = function (response) {
                scope.selectedItem.imageId = response.id;
            };

            scope.saveResource = function (player) {
                var response, success, error;

                success = function () {
                    var notification = {type: 'success', message: i18n('Your player has been created')};
                    scope.chooserFormNotifications.push(notification);
                };

                error = function (response) {
                    scope.selectedItem.edit = true;
                    scope.chooserFormNotifications = response.data.notifications;
                };

                if (player.hasOwnProperty('id')) {
                    response = Player.update(player, success, error);
                } else {
                    response = Player.save(player, success, error);
                }

                return response;
            };

            scope.deleteResource = function (player) {
                var success, error;

                success = function () {
                    var notification = {type: 'success', message: i18n('Your player has been removed')};
                    scope.chooserFormNotifications.push(notification);
                };

                error = function (response) {
                    scope.chooserFormNotifications = response.data.notifications;
                };

                return Player.delete({id: player.id}, success, error);
            };
        }
    };
});
