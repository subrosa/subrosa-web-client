/**
 * @ngdoc module
 * @name subrosa.components.image
 *
 * @description
 *  Module for common image functionality.
 */
angular.module('subrosa.components.image', [
    'flow',
    'subrosa.config'
]);


/**
 * @ngdoc config
 * @name subrosa.components.image
 *
 * @requires flowFactoryProvider
 * @requires API_CONFIG
 *
 * @description
 *  Set ng-flow configuration.
 */
angular.module('subrosa.components.image').config(function (flowFactoryProvider, API_CONFIG) {
    flowFactoryProvider.defaults = {
        target: API_CONFIG.URL + '/user/image',
        singleFile: true,
        testChunks: false
    };
});
