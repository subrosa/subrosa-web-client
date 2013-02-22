var SpinnerController, spinner,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

spinner = angular.module("spinner", []);

spinner.value("pendingRequests", {
    counter: 0,
    increment: function() {
        return this.counter += 1;
    },
    decrement: function() {
        if (this.isPending()) {
            return this.counter -= 1;
        }
    },
    isPending: function() {
        return this.counter > 0;
    }
});

spinner.factory("pendingRequestsInterceptor", [
    "$injector", "$q", "pendingRequests", function($injector, $q, pendingRequests) {
        return function(promise) {
            var $http, onError, onSuccess;
            $http = $injector.get("$http");
            onSuccess = function(response) {
                pendingRequests.decrement();
                return response;
            };
            onError = function(response) {
                pendingRequests.decrement();
                return $q.reject(response);
            };
            return promise.then(onSuccess, onError);
        };
    }
]);

spinner.config([
    "$httpProvider", "pendingRequestsProvider", function($httpProvider, pendingRequestsProvider) {
        var pendingRequests;
        pendingRequests = pendingRequestsProvider.$get();
        $httpProvider.defaults.transformRequest.push(function(data) {
            pendingRequests.increment();
            return data;
        });
        return $httpProvider.responseInterceptors.push("pendingRequestsInterceptor");
    }
]);

SpinnerController = (function() {

    SpinnerController.$inject = ["$scope", "pendingRequests"];

    function SpinnerController($scope, pendingRequests) {
        this.$scope = $scope;
        this.pendingRequests = pendingRequests;
        this.showSpinner = __bind(this.showSpinner, this);

        this.$scope.showSpinner = this.showSpinner;
    }

    SpinnerController.prototype.showSpinner = function() {
        return this.pendingRequests.isPending();
    };

    return SpinnerController;

})();

spinner.controller("spinner", SpinnerController);

spinner.directive("spinner", function() {
    return {
        replace: true,
        template: '<div id="spinner" ng-show="showSpinner()" alt="Loading..."></div>',
        controller: "spinner",
        link: function (scope, element, attributes) {
            raphael_spinner("spinner", 20, 20, 8, 12, "#8c050c");
        }
    };
});

function raphael_spinner(holderid, R1, R2, count, stroke_width, colour) {
    var sectorsCount = count || 12,
        color = colour || "#fff",
        width = stroke_width || 15,
        r1 = Math.min(R1, R2) || 35,
        r2 = Math.max(R1, R2) || 60,
        cx = r2 + width,
        cy = r2 + width,
        r = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2),

        sectors = [],
        opacity = [],
        beta = 2 * Math.PI / sectorsCount,

        pathParams = {stroke: color, "stroke-width": width, "stroke-linecap": "round"};
    Raphael.getColor.reset();
    for (var i = 0; i < sectorsCount; i++) {
        var alpha = beta * i - Math.PI / 2,
            cos = Math.cos(alpha),
            sin = Math.sin(alpha);
        opacity[i] = 1 / sectorsCount * i;
        sectors[i] = r.path([
            ["M", cx + r1 * cos, cy + r1 * sin],
            ["L", cx + r2 * cos, cy + r2 * sin]
        ]).attr(pathParams);
        if (color == "rainbow") {
            sectors[i].attr("stroke", Raphael.getColor());
        }
    }
    var tick;
    (function ticker() {
        opacity.unshift(opacity.pop());
        for (var i = 0; i < sectorsCount; i++) {
            sectors[i].attr("opacity", opacity[i]);
        }
        r.safari();
        tick = setTimeout(ticker, 1000 / sectorsCount);
    })();
    return function () {
        clearTimeout(tick);
        r.remove();
    };
}