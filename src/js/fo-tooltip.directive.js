let Tooltip = require('./tooltip');

module.exports = angular
  .module('foTooltip.directive', [])
  .directive('foTooltip', foTooltip);

foTooltip.$inject = ['$timeout', '$templateCache', '$document', '$compile'];

function foTooltip($timeout, $templateCache, $document, $compile) {
  return {

    restrict: 'A',
    scope: {
      tooltipPosition: '@',
      tooltipTemplateUrl: '@',
      tooltipTemplateStr: '@',
      tooltipOffset: '@',
      tooltipDelay: '@',
      clickHide: '@',
      tooltipClass: '@',
      tooltipId: '@',
      tooltipOnclose: '&'
    },
    link: function(scope, element, attr) {
      var tooltip = new Tooltip($templateCache, element, attr, $document);
      var delay = attr.tooltipDelay ? parseInt(attr.tooltipDelay) : 400;

      scope.closeTooltip = tooltip.close;

      var delayedTooltipTmplStrUpdate = false;
      scope.$watch('tooltipTemplateStr', function(newVal, oldVal) {
        if (typeof(newVal) === 'undefiend' || newVal === null) {
          return;
        }

        if (newVal && newVal !== oldVal) {
          if (!delayedTooltipTmplStrUpdate) {
            tooltip.element.text(newVal);
            tooltip.updateToolitpPosition(attr);
          }
        }
      });

      element.on('mouseenter', function(e) {
        delayedTooltipTmplStrUpdate = false;
        tooltip.elementHover = true;
        angular.element($document[0].querySelectorAll('.fo-tooltip')).removeClass('open');
        tooltip.open(attr);
      });

      element.on('mouseleave', function(e) {
        delayedTooltipTmplStrUpdate = true;
        tooltip.elementHover = false;

        scope.$apply(function () {
          scope.tooltipOnclose();
        });
        $timeout(function() {
          if (!tooltip.tooltipHover && !tooltip.elementHover) {
            tooltip.close();
            if (delayedTooltipTmplStrUpdate) {
              tooltip.element.text(scope.tooltipTemplateStr);
            }
          }
        }, delay);

      });

      tooltip.element.on('mouseenter', function(e) {
        delayedTooltipTmplStrUpdate = false;
        tooltip.tooltipHover = true;
      });

      tooltip.element.on('mouseleave', function(e) {
        delayedTooltipTmplStrUpdate = true;
        tooltip.tooltipHover = false;

        scope.$apply(function () {
          scope.tooltipOnclose();
        });
        $timeout(function() {
          if (!tooltip.tooltipHover && !tooltip.elementHover) {
            tooltip.close();
            if (delayedTooltipTmplStrUpdate) {
              tooltip.element.text(scope.tooltipTemplateStr);
            }
          }
        }, delay);
      });

      element.on('click', function(e) {
        if (attr.clickHide) {
          tooltip.close();
        }
      });

    },
  };
}
