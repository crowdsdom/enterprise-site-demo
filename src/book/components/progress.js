'use strict';

angular.module('myApp.progress', [])

    .service('progressService', function () {
        this.progress = 1;
    })

    .directive('progress', function (progressService) {
        return {
            restrict: 'A',
            link: function ($scope, $elm, $attrs) {
                var progress = parseInt($attrs.progress);
                $elm = $($elm);

                $scope.$watch(function () {
                    return progressService.progress;
                }, update);

                function update() {
                    $elm.removeClass('done');
                    $elm.removeClass('active');
                    $elm.prev('.bar').removeClass('active')

                    if (progressService.progress == progress) {
                        $elm.addClass('active');
                        $elm.prev('.bar').addClass('active')
                    } else if (progressService.progress > progress) {
                        $elm.addClass('done');
                        $elm.prev('.bar').addClass('active')
                    }
                }
            }
        };
    });
