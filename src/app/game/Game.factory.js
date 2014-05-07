/**
 * @ngdoc factory
 * @name subrosa.game.Game
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for game(s).
 */
angular.module('subrosa.game').factory('Game', function ($resource) {
    var game = $resource('/subrosa/v1/game/:url', {url: '@url'}, {
        query: {method: 'GET', isArray: false},
        update: {method: 'PUT'},
        publish: {method: 'POST', url: '/subrosa/v1/game/:url/publish'}
    });

    // Game statuses
    game.prototype.isDraft = function () {
        return this.status === 'DRAFT';
    };

    game.prototype.isPreregistration = function () {
        return this.status === 'PREREGISTRATION';
    };

    game.prototype.isRegistration = function () {
        return this.status === 'REGISTRATION';
    };

    game.prototype.isPostRegistration = function () {
        return this.status === 'POSTREGISTRATION';
    };

    game.prototype.isRunning = function () {
        return this.status === 'RUNNING';
    };

    game.prototype.isArchived = function () {
        return this.status === 'ARCHIVED';
    };

    return game;
});