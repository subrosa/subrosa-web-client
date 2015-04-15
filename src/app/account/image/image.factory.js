/**
 * @ngdoc factory
 * @name subrosa.account.Image
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for image(s).
 */
angular.module('subrosa.account').factory('Image', function ($resource) {
    return $resource('/subrosa/v1/user/image/:id', {id: '@id'}, {
        query: {method: 'GET', isArray: false},
        update: {method: 'PUT'}
    });
});
