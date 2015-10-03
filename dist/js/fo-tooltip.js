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
        var positionClass = attr.tooltipPosition.split(' ').join('-');
        $wrapper[0].id = attr.tooltipId;
        $wrapper.addClass(attr.tooltipClass);
        $wrapper.addClass(positionClass);

        var $tooltip = angular.element($wrapper).append(templateString);

        element.after($tooltip);

        var tooltipType = attr.tooltipPosition.split(' ').join('_');

        // default config
        var tooltip = {

          type: {
            // top
            top_middle: {
              offset: '10px 0',
              attachment: 'bottom middle',
              targetAttachment: 'top middle'
            },
            top_left: {
              offset: '10px 0',
              attachment: 'bottom left',
              targetAttachment: 'top left'
            },
            top_right: {
              offset: '10px 0',
              attachment: 'bottom right',
              targetAttachment: 'top right'
            },

            // bottom
            bottom_middle: {
              offset: '-10px 0',
              attachment: 'top middle',
              targetAttachment: 'bottom middle'
            },
            bottom_left: {
              offset: '-10px 0',
              attachment: 'top left',
              targetAttachment: 'bottom left'
            },
            bottom_right: {
              offset: '-10px 0',
              attachment: 'top right',
              targetAttachment: 'bottom right'
            },

            // left
            left_middle: {
              offset: '0 10px',
              attachment: 'middle right',
              targetAttachment: 'middle left'
            },
            left_top: {
              offset: '0 10px',
              attachment: 'top right',
              targetAttachment: 'top left'
            },
            left_bottom: {
              offset: '0 10px',
              attachment: 'bottom right',
              targetAttachment: 'bottom left'
            },

            // right
            right_middle: {
              offset: '0 -10px',
              attachment: 'middle left',
              targetAttachment: 'middle right'
            },
            right_top: {
              offset: '0 -10px',
              attachment: 'top left',
              targetAttachment: 'top right'
            },
            right_bottom: {
              offset: '0 -10px',
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

            tetherOption = angular.extend(tetherOption, tooltip.type[tooltipType]);

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
