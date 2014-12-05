/**
 * @ngdoc service
 * @name  subrosa.player.player-selection
 *
 * @description
 *  Displays a player selection and creation interface.
 */
angular.module('subrosa.player').directive('selectPlayer', function () {
    return {
        restrict: 'AE',
        templateUrl: '/app/player/views/select-player.html',
        scope: {
            players: '=selectPlayer',
            setPlayerCallback: '&setPlayer'
        },
        controller: 'SelectPlayerDirectiveController'
    };
});
