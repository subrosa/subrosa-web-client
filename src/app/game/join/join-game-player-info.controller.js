/**
 * @ngdoc controller
 * @name subrosa.game.JoinGamePlayerInfoController
 *
 * @requires $scope
 * @requires _
 * @requires $state
 * @requires $q
 * @requires flash
 * @requires i18n
 * @requires Address
 * @requires Player
 * @requires GamePlayer
 *
 * @description
 *  Controller for the join game form (game admin supplied player info).
 */
angular.module('subrosa.game').controller('JoinGamePlayerInfoController', function ($scope, _, $state, $q, flash, i18n, Address, GamePlayer) {
    'use strict';

    var joinGameError, createAddresses, createGamePlayer;

    joinGameError = function (response) {
        $scope.joining = false;
        $scope.joinGameNotifications = $scope.joinGameNotifications.concat(response.data.notifications);
    };

    createAddresses = function (addressFields) {
        var promises = [], success;

        angular.forEach(addressFields, function (playerInfo) {
            var promise, value = $scope.attributes[playerInfo.fieldId];

            if (value && angular.isString(value)) {
                success = function (response) {
                    $scope.attributes[playerInfo.fieldId] = {id: response.id};
                };

                promise = Address.save({fullAddress: value}, success, joinGameError).$promise;
                promises.push(promise);
            }
        });

        return promises;
    };

    createGamePlayer = function () {
        var success, postData;

        success = function () {
            $scope.joining = false;
            flash.add('success', i18n('Welcome to the game.'));
            $state.go('game');
        };

        postData = {
            attributes: $scope.attributes,
            playerId: $scope.player.id
        };

        $scope.joining = true;

        GamePlayer.save({url: $scope.game.url}, postData, success, joinGameError);
    };

    $scope.attributes = {};
    $scope.joinGameNotifications = [];

    $scope.selectValue = function (field, value) {
        var viewValue;

        if (value && value.hasOwnProperty('id')) {
            viewValue = {id: value.id};
        }

        $scope.joinGameForm[field.fieldId].$setViewValue(viewValue);
    };

    // TODO: is this function necessary?
    $scope.fieldError = function (field, error) {
        $scope.joinGameNotifications = error.data.notifications;
        $scope.joinGameForm[field.fieldId].$setValidity('server', false);
    };

    $scope.joinGame = function () {
        var promises = [], addressFields;
        addressFields = _.filter($scope.game.playerInfo, function (playerInfo) {
            return playerInfo.type === 'address';
        });

        // Create addresses if necessary
        if (addressFields.length > 0) {
            promises = createAddresses(addressFields);
        }

        $q.all(promises).then(createGamePlayer);
    };
});
