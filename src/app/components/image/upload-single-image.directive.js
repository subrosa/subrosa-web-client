/**
 * @ngdoc directive
 * @name subrosa.image
 *
 * @description
 *   Directive that allows the upload of a single image.
 *
 * @example
 *   <div upload-single-image='/upload'></div>
 */
angular.module('subrosa.components.image').directive('uploadSingleImage', function () {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: '/app/components/image/views/upload-single-image.html',
        scope: {
            target: '=uploadSingleImage'
        }
    };
});
