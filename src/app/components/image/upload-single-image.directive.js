/**
 * @ngdoc directive
 * @name subrosa.image
 *
 * @description
 *   Directive that allows the upload of a single image.
 *
 * @example
 *   <div upload-single-image></div>
 */
angular.module('subrosa.components.image').directive('uploadSingleImage', function () {
    'use strict';

    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: '/app/components/image/views/upload-single-image.html',
        scope: {
            afterUpload: '='
        },
        link: function (scope) {
            scope.fileSuccess = function ($flow) {
                // this approach is necessary because flow does not fire the flow-file-success event
                // if testChunks is set to false.  See https://github.com/flowjs/ng-flow/issues/60
                var chunks = $flow.files[0].chunks,
                    lastChunk = chunks[chunks.length - 1],
                    response = angular.fromJson(lastChunk.xhr.responseText);

                if (scope.afterUpload) {
                    scope.afterUpload(response);
                }
            };
        }
    };
});
