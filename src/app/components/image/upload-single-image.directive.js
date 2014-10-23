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
    const UPLOAD_URL = '/subrosa/v1/user/image';
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: '/app/components/image/views/upload-single-image.html',
        scope: {
            target: '=uploadSingleImage'
        },
        link: function (scope) {
            scope.uploadUrl = scope.target;
            if (!scope.uploadUrl) {
                scope.uploadUrl = UPLOAD_URL;
            }
        }
    };
});
