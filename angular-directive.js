/*
 * angular-directive v0.0.1
 * (c) 2013 niceilm http://niceilm.net
 * License: MIT
 */
'use strict';

angular.module('nangular.directive', []).
  directive('naLoadingComplete', [function() {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        if(attr.loadingComplete == 'hide') {
          element.hide();
        } else {
          element.show();
        }
      }
    }
  }]).
  directive('naStopDefault', [function() {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var eventType = attr.stopDefault || 'click';
        element.bind(eventType, function(event) {
          event.preventDefault();
        });
      }
    }
  }]).
  directive('naFocus', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var el = element.get(0);
        try {
          if(el && typeof el.focus == "function") {
            $timeout(function() {
              el.blur();
              $timeout(function() {
                el.focus();
              });
            });
          }
        } catch(me) {
        }
      }
    }
  }]).
  directive('naWhenActive', ['$location', function($location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        if($location.path() === attrs.naWhenActive) {
          element.addClass("active");
        } else {

          element.removeClass("active");
        }
      }
    }
  }]).
  directive('naRedirect', function($window, $location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if(attrs.naRedirect) {
          var currentUrl = $location.url();
          $window.location.href = attrs.naRedirect + currentUrl;
        }
      }
    };
  }).
  directive('naLinkByLocation', function($window) {
    return {
      scope: {remotes: "@"},
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //  Mobile Safari in standalone mode
        if(("standalone" in $window.navigator) && $window.navigator.standalone) {
          element.click(function(event) {
            if('href' in attrs && attrs.href.indexOf('http') !== -1 && (attrs.href.indexOf($window.location.host) !== -1 || scope.remotes)) {
              event.preventDefault();
              $window.location.href = attrs.href;
            }
          });
        }
      }
    };
  }).
  directive('naKeydownThanBlur', [function() {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        element.keydown(function($event) {
          if($event.keyCode !== 13) {
            return;
          }
          $event.preventDefault();
          $event.stopPropagation();
          $event.target.blur();
        });
      }
    }
  }]);