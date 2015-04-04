/**
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 * The MIT License
 *
 * Copyright (c) 2013 William L. Bunselmeyer. https://github.com/wmluke/angular-blocks
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @ngdoc directive
 * @name subrosa.utils:extendTemplate
 *
 * @requires $templateCache
 * @requires $compile
 * @requires $http
 * @requires $q
 * @requires $log
 *
 * @description
 *   Allow the extension of templates by replacing template blocks.
 */
angular.module('subrosa.utils').directive('extendTemplate', function ($templateCache, $compile, $http, $q, $log) {
    function warnMissingBlock(name, src) {
        $log.warn('The block ' + name + ' was not found in ' + src);
    }

    return {
        restrict: 'AE',
        compile: function (tElement, tAttrs) {
            var src = tAttrs.extendTemplate,
                $clone = angular.element(tElement.clone()),
                loadTemplate, success, error;

            // Clear element
            tElement.html('');

            success = function (response) {
                var replace, $template = angular.element(document.createElement('div')).html(response.data);

                replace = function (newBlock) {
                    var name = newBlock[0].getAttribute('data-block'),
                        container = angular.element($template[0].querySelectorAll('[data-extend-template]')),
                        originalBlock = angular.element($template[0].querySelectorAll('[data-block="' + name + '"]'));

                    originalBlock.replaceWith(newBlock);
                    container.append(newBlock);

                    if (originalBlock.length === 0 && container.length === 0) {
                        warnMissingBlock(name, src);
                    }
                };

                angular.forEach($clone.children(), function (el) {
                    var $el = angular.element(el);

                    if (el.hasAttribute('data-block')) {
                        replace($el);
                    }
                });

                return $template;
            };

            error = function () {
                var msg = 'Failed to load template: ' + src;
                $log.error(msg);
                return $q.reject(msg);
            };

            loadTemplate = $http.get(src, {cache: $templateCache}).then(success, error);

            return function (scope, element) {
                loadTemplate.then(function ($template) {
                    element.html($template.html());
                    $compile(element.contents())(scope);
                });
            };
        }
    };
});
