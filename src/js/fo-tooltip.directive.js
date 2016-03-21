let Tooltip = require('./tooltip');

module.exports = angular
  .module('foTooltip.directive', [])
  .directive('foTooltip', foTooltip);

foTooltip.$inject = ['$timeout', '$templateCache', '$document', '$compile'];

function foTooltip($timeout, $templateCache, $document, $compile) {

  function appendToBody(tooltipElement) {
    $document.find('body').append(tooltipElement);
  }

  function compileToScope(toolitpElement, scope) {
    $compile(toolitpElement)(scope);
  }

  return {

    restrict: 'A',
    scope: true,
    link: function(scope, element, attr) {
      var tooltip = new Tooltip($templateCache, element, attr);
      var delay = attr.tooltipDelay ? parseInt(attr.tooltipDelay) : 400;

      appendToBody(tooltip.element);
      compileToScope(tooltip.element, scope);

      scope.closeTooltip = tooltip.close;

      element.on('mouseenter', function(e) {
        tooltip.elementHover = true;
        angular.element(document.querySelectorAll('.fo-tooltip ')).removeClass('open');
        tooltip.open(attr);
      });

      element.on('mouseleave', function(e) {
        tooltip.elementHover = false;

        $timeout(function() {
          if (!tooltip.tooltipHover && !tooltip.elementHover) {
            tooltip.close();
          }
        }, delay);

      });

      tooltip.element.on('mouseenter', function(e) {
        tooltip.tooltipHover = true;
      });

      tooltip.element.on('mouseleave', function(e) {
        tooltip.tooltipHover = false;

        $timeout(function() {
          if (!tooltip.tooltipHover && !tooltip.elementHover) {
            tooltip.close();
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
