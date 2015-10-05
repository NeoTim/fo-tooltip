(function(window, angular, undefined) {
  'use strict';

  angular.module('foTooltip', [])

  // @ngInject
  .directive('foTooltip', foTooltip);

  foTooltip.$inject = ['$timeout', '$templateCache', '$document', '$compile'];

  function foTooltip($timeout, $templateCache, $document, $compile) {
    return {

      restrict: 'A',
      scope: true,
      link: function(scope, element, attr) {

        var $tooltip = createTooltipElement();

        var tooltip = {
          element: createTooltipElement(),

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
            }

          },

          isOpened: function() {
            return tooltip.element.hasClass('open');
          },

          open: function() {
            var tetherOption = {
              element: tooltip.element[0],
              target: element[0],
              attachment: 'bottom middle',
              targetAttachment: 'top middle',
              offset: attr.tooltipOffset
            };
            var tooltipType = attr.tooltipPosition.split(' ').join('_');

            tetherOption = angular.extend(tetherOption, tooltip.type[tooltipType]);
            tooltip.element.addClass('open');
            new Tether(tetherOption);
          },

          close: function() {
            tooltip.element.removeClass('open');
          }
        };


        element.after(tooltip.element);

        $compile(tooltip.element)(scope);

        scope.closeTooltip = tooltip.close;

        element.on('mouseenter', function(e) {
          tooltip.open();
        });

        element.on('mouseleave', function(e) {
          $timeout(function() {
            if (!tooltip.element.hasClass('tooltip-hover')) {
              tooltip.close();
            }
          }, 200)
        });

        tooltip.element.on('mouseenter', function(e) {
          tooltip.element.addClass('tooltip-hover');
          tooltip.open();
        });

        tooltip.element.on('mouseleave', function(e) {
          tooltip.element.removeClass('tooltip-hover');
          tooltip.close();
        });

        /////////////////////////////////////////////
        function createTooltipElement() {
          var templateString = $templateCache.get(attr.tooltipTemplate);
          var positionClass = attr.tooltipPosition.split(' ').join('-');
          var $wrapper = angular.element('<div class="fo-tooltip"></div>');
          $wrapper[0].id = attr.tooltipId;
          $wrapper.addClass(attr.tooltipClass);
          $wrapper.addClass(positionClass);
          return angular.element($wrapper).append(templateString);
        }

      }
    };
  }

})(window, window.angular);
