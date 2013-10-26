/*
 * angular-directive v0.0.1
 * (c) 2013 niceilm http://niceilm.net
 * License: MIT
 */
'use strict';

angular.module('nangular.directive', []).
    directive('loadingComplete', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (attr.loadingComplete == 'hide') {
                    element.hide();
                } else {
                    element.show();
                }
            }
        }
    }]).
    directive('stopDefault', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var eventType = attr.stopDefault || 'click';
                element.bind(eventType, function (event) {
                    event.preventDefault();
                });
            }
        }
    }]).
    directive('tpFocus', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var el = element.get(0);
                try {
                    if (el && typeof el.focus == "function") {
                        el.focus();
                    }
                } catch (me) {
                }
            }
        }
    }]).
    directive('tpKeydownThanBlur', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.keydown(function ($event) {
                    if ($event.keyCode !== 13) {
                        return;
                    }
                    $event.preventDefault();
                    $event.stopPropagation();
                    $event.target.blur();
                });
            }
        }
    }]);