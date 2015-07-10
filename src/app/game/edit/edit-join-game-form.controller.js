/**
 * @ngdoc controller
 * @name subrosa.game.EditJoinGameFormController
 *
 * @requires $scope
 * @requires _
 * @requires i18n
 * @requires Address
 * @requires Image
 *
 * @description
 *  Handles the editing of game options.
 */
angular.module('subrosa.game').controller('EditJoinGameFormController', function ($scope, _, i18n, Address, Image) {
    'use strict';

    $scope.field = {};
    $scope.fieldTypes = [
        {type: 'address', label: i18n('Address')},
        {type: 'image', label: i18n('Image')},
        {type: 'text', label: i18n('Text')}
    ];

    $scope.dragControlListeners = {
        orderChanged: function (event) {
            var success, error;

            success = function () {
                $scope.saving = false;
                $scope.fieldNotifications = [{type: 'success', message: i18n('Field Order Saved.')}];
            };

            error = function (response) {
                $scope.saving = false;
                $scope.fieldNotifications = response.data.notifications;
                event.dest.sortableScope.removeItem(event.dest.index);
                event.source.itemScope.sortableScope.insertItem(event.source.index, event.source.itemScope.task);
            };

            $scope.saving = true;
            $scope.game.$update(success, error);
        }
    };

    $scope.addField = function (field) {
        $scope.game.playerInfo.push(field);
    };

    $scope.editField = function (field) {
        $scope.field = field;
    };

    $scope.saveField = function () {
        var success, error;

        success = function () {
            $scope.saving = false;
            $scope.saveFieldNotifications = [{type: 'success', message: i18n('Field Saved.')}];
            $scope.field = {};
            $scope.saveFieldForm.$setPristine();
        };

        error = function (response) {
            $scope.saving = false;
            $scope.saveFieldNotifications = response.data.notifications;
        };

        $scope.saving = true;
        $scope.game.$update(success, error);
    };

    $scope.removeField = function (field) {
        var success, error, playerInfo = angular.copy($scope.game.playerInfo);

        $scope.game.playerInfo = _.filter($scope.game.playerInfo, function (info) {
            return info !== field;
        });

        success = function () {
            $scope.fieldNotifications = [{type: 'success', message: i18n('Field Removed.')}];
        };

        error = function (response) {
            $scope.fieldNotifications = response.data.notifications;
            $scope.game.playerInfo = playerInfo;
        };

        $scope.game.$update(success, error);
    };

    Address.query(function (response) {
        $scope.addresses = response.results;
    });

    Image.query(function (response) {
        $scope.images = response.results;
    });
});


