/**
 * @ngdoc controller
 * @name subrosa.game.EditGameEnrollmentController
 *
 * @requires $scope
 * @requires _
 * @requires i18n
 *
 * @description
 *  Handles the editing of game options.
 */
angular.module('subrosa.game').controller('EditGameEnrollmentController', function ($scope, _, i18n) {
    $scope.field = {};
    $scope.fieldTypes = [
        {id: 'address', label: i18n('Address')},
        {id: 'image', label: i18n('Image')},
        {id: 'text', label: i18n('Text')}
    ];

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
            $scope.addFieldForm.$setPristine();
        };

        error = function (response) {
            $scope.saving = false;
            $scope.saveFieldNotifications = response.data.notifications;
        };

        $scope.saving = true;
        $scope.game.$update(success, error);
    };

    $scope.removeField = function (field) {
        var success, error, game = $scope.game;

        $scope.game.playerInfo = _.filter($scope.game.playerInfo, function (info) {
            return info !== field;
        });

        success = function () {
            $scope.fieldNotifications = [{type: 'success', message: i18n('Field Removed.')}];
        };

        error = function (response) {
            $scope.fieldNotifications = response.data.notifications;
            $scope.game = game;
        };

        $scope.saving = true;
        $scope.game.$update(success, error);
    };
});


