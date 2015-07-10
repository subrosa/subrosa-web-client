describe('Directive: playerChooser', function () {
    'use strict';

    var $scope, $compile, element, elementScope, Player, player;

    beforeEach(module(
        'subrosa.player',
        '/app/player/views/player-chooser.html',
        '/app/components/chooser/views/chooser.html',
        '/app/player/views/avatar.html',
        '/app/components/form/views/form-feedback.html',
        '/app/components/form/views/form-group-feedback.html',
        '/app/components/form/views/input-messages.html',
        '/app/components/image/views/upload-single-image.html'
    ));

    beforeEach(module(function ($provide) {
        var handler = function (player, success, error) {
            if (!this.failed) {
                success();
            } else {
                error({data: {notifications: [1]}});
            }
        };

        Player = {
            failed: false,
            save: handler,
            delete: handler,
            update: function () {}
        };

        player = {name: 'walden'};

        $provide.value('Player', Player);
    }));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        var html = '<div player-chooser="players"></div>';

        element = angular.element(html);

        $scope.players = [1, 2, 3];
        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("initializes empty notification list", function () {
        expect(elementScope.chooserFormNotifications).toEqual([]);
    });

    it("allows the setting of an image.", function () {
        var image = {id: 123};
        $scope.$digest();
        elementScope.setPlayerImage(image);
        expect(elementScope.selectedItem.imageId).toBe(image.id);
    });

    describe("can save the player resource", function () {
        beforeEach(function () {
            spyOn(Player, 'save').and.callThrough();
        });

        it("and succeed.", function () {
            elementScope.saveResource(player);

            expect(Player.save).toHaveBeenCalledWith(player, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
            expect(elementScope.chooserFormNotifications[0].type).toBe('success');
        });

        it("and fail.", function () {
            Player.failed = true;

            elementScope.saveResource(player);

            expect(Player.save).toHaveBeenCalledWith(player, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
            expect(elementScope.selectedItem.edit).toBe(true);
        });

        it("and update the player if it already exists", function () {
            spyOn(Player, 'update');

            player.id = 1;
            elementScope.saveResource(player);

            expect(Player.update).toHaveBeenCalledWith(player, jasmine.any(Function), jasmine.any(Function));
            expect(Player.save).not.toHaveBeenCalled();
        });
    });

    describe("can delete the player resource", function () {
        var expectedDelete = {id: 1};
        beforeEach(function () {
            spyOn(Player, 'delete').and.callThrough();
            player.id = 1;
        });

        it("and succeed.", function () {
            elementScope.deleteResource(player);

            expect(Player.delete).toHaveBeenCalledWith(expectedDelete, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
            expect(elementScope.chooserFormNotifications[0].type).toBe('success');
        });

        it("and fail.", function () {
            Player.failed = true;

            elementScope.deleteResource(player);

            expect(Player.delete).toHaveBeenCalledWith(expectedDelete, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
        });
    });
});
