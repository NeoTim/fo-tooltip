(function(window, angular, undefined) {
  'use strict';

  angular.module('foTooltip', [])

  // @ngInject
  .directive('foTooltip', function($timeout, $templateCache, $document, $compile) {
    return {

      restrict: 'A',
      scope: true,
      link: function(scope, element, attr) {

        var templateString = $templateCache.get(attr.tooltipTemplate);

        var $wrapper = angular.element('<div class="fo-tooltip"></div>');
        $wrapper[0].id = attr.tooltipId;
        $wrapper.addClass(attr.tooltipClass);

        var $tooltip = angular.element($wrapper).append(templateString);

        element.after($tooltip);

        var positionConfig = attr.tooltipPosition.split(' ').join('_');

        // default config
        var tooltip = {

          positions: {
            // top
            top_middle: {
              attachment: 'bottom middle',
              targetAttachment: 'top middle'
            },
            top_left: {
              attachment: 'bottom left',
              targetAttachment: 'top left'
            },
            top_right: {
              attachment: 'bottom right',
              targetAttachment: 'top right'
            },

            // bottom
            bottom_middle: {
              attachment: 'top middle',
              targetAttachment: 'bottom middle'
            },
            bottom_left: {
              attachment: 'top left',
              targetAttachment: 'bottom left'
            },
            bottom_right: {
              attachment: 'top right',
              targetAttachment: 'bottom right'
            },

            // left
            left_middle: {
              attachment: 'middle right',
              targetAttachment: 'middle left'
            },
            left_top: {
              attachment: 'top right',
              targetAttachment: 'top left'
            },
            left_bottom: {
              attachment: 'bottom right',
              targetAttachment: 'bottom left'
            },

            // right
            right_middle: {
              attachment: 'middle left',
              targetAttachment: 'middle right'
            },
            right_top: {
              attachment: 'top left',
              targetAttachment: 'top right'
            },
            right_bottom: {
              attachment: 'bottom left',
              targetAttachment: 'bottom right'
            },

            //diagonal
            top_left_diagonal: {
              attachment: 'bottom right',
              targetAttachment: 'top left'
            },
            top_right_diagonal: {
              attachment: 'bottom left',
              targetAttachment: 'top right'
            },
            bottom_left_diagonal: {
              attachment: 'top right',
              targetAttachment: 'bottom left'
            },
            bottom_right_diagonal: {
              attachment: 'top left',
              targetAttachment: 'bottom right'
            }

          },

          isOpened: function() {
            return $tooltip.hasClass('open');
          },

          open: function() {
            var tetherOption = {
              element: $tooltip[0],
              target: element[0],
              attachment: 'bottom middle',
              targetAttachment: 'top middle',
              offset: attr.tooltipOffset
            };

            tetherOption = angular.extend(tetherOption, tooltip.positions[positionConfig]);

            $tooltip.addClass('open');
            new Tether(tetherOption);
          },

          close: function() {
            $tooltip.removeClass('open');
          }
        };

        $compile($tooltip)(scope);

        scope.closeTooltip = tooltip.close;

        element.on('mouseenter', function(e) {
          tooltip.open();
        });

        element.on('mouseleave', function(e) {
          $timeout(function() {
            if (!$tooltip.hasClass('tooltip-hover')) {
              tooltip.close();
            }
          }, 300)
        });

        $tooltip.on('mouseenter', function(e) {
          $tooltip.addClass('tooltip-hover');
          tooltip.open();
        });

        $tooltip.on('mouseleave', function(e) {
          $tooltip.removeClass('tooltip-hover');
          tooltip.close();
        });


      }
    };
  });

})(window, window.angular);
