describe('Factory: AuthRetryQueue', function () {
    var $http, deferred, AuthRetryQueue;

    beforeEach(module('subrosa.security'));

    beforeEach(function () {
        deferred = {
            resolve: function () {},
            reject: function () {}
        };
    });

    beforeEach(module(function ($provide) {
        $http = function (config) {
            var http = this;
            this.config = config;

            return {then: function (successCallback, errorCallback) {
                if (http.config.success) {
                    successCallback(config);
                } else {
                    errorCallback(config);
                }
            }};
        };

        $provide.value('$http', $http);
    }));

    beforeEach(inject(function (_AuthRetryQueue_) {
        AuthRetryQueue = _AuthRetryQueue_;
    }));

    it('can return the request queue', function () {
        var queue = AuthRetryQueue.getQueue();
        expect(queue.length).toBe(0);
    });

    it('can append HTTP requests', function () {
        var queue;
        AuthRetryQueue.append('config', deferred);
        queue = AuthRetryQueue.getQueue();
        expect(queue.length).toBe(1);
        expect(queue[0].config).toBe('config');
        expect(queue[0].deferred).toBe(deferred);
    });

    describe("can perform actions on an existing queue", function () {
        var config;

        beforeEach(function () {
            config = {success: true};
            AuthRetryQueue.append(config, deferred);
            AuthRetryQueue.append(config, deferred);
            AuthRetryQueue.append(config, deferred);
        });

        it('by transforming all requests', function () {
            AuthRetryQueue.transform(function () {
                return {config: 'newValue', deferred: deferred};
            });

            angular.forEach(AuthRetryQueue.getQueue(), function (item) {
                expect(item.config).toBe('newValue');
            });
        });

        it('by rejecting all requests with a reason', function () {
            spyOn(deferred, 'reject');
            AuthRetryQueue.rejectAll('invalid');
            expect(deferred.reject).toHaveBeenCalledWith('invalid');
            expect(deferred.reject.callCount).toBe(3);
            expect(AuthRetryQueue.getQueue().length).toBe(0);
        });

        it('by rejecting all requests without a reason', function () {
            spyOn(deferred, 'reject');
            AuthRetryQueue.rejectAll();
            expect(deferred.reject).not.toHaveBeenCalled();
            expect(AuthRetryQueue.getQueue().length).toBe(0);
        });

        it('by retrying all requests and updating them', function () {
            var newConfig = {success: true, blah: 'blah'},
                updater = function () { return newConfig; };

            spyOn(deferred, 'resolve');
            AuthRetryQueue.retryAll(updater);
            expect(deferred.resolve).toHaveBeenCalledWith(newConfig);
            expect(deferred.resolve.callCount).toBe(3);
            expect(AuthRetryQueue.getQueue().length).toBe(0);
        });

        it('by retrying all requests and not updating them', function () {
            spyOn(deferred, 'resolve');
            AuthRetryQueue.retryAll();
            expect(deferred.resolve).toHaveBeenCalledWith(config);
            expect(deferred.resolve.callCount).toBe(3);
            expect(AuthRetryQueue.getQueue().length).toBe(0);
        });
    });

    it('by retying all requests and encountering an error', function () {
        var config = {success: false};
        AuthRetryQueue.append(config, deferred);
        spyOn(deferred, 'reject');
        AuthRetryQueue.retryAll();
        expect(deferred.reject).toHaveBeenCalledWith(config);
        expect(deferred.reject.callCount).toBe(1);
        expect(AuthRetryQueue.getQueue().length).toBe(0);
    });
});