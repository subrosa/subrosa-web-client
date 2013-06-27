/*global angular */
'use strict';

/*
 * Parent controller for game controllers.
 * Loads the game and sets up common game related functionality.
 */
angular.module('subrosa.game').controller('GameInitController', function ($rootScope, Game) {

    // Load the game into the root scope.
    $rootScope.game = Game.get();
});