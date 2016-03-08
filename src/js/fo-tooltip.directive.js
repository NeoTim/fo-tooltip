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

      appendToBody(tooltip.element);
      compileToScope(tooltip.element, scope);

      scope.closeTooltip = tooltip.close;

      element.on('mouseenter', function(e) {
        tooltip.elementHover = true;
        tooltip.open();
      });

      element.on('mouseleave', function(e) {
        tooltip.elementHover = false;

        $timeout(function() {
          if (!tooltip.tooltipHover && !tooltip.elementHover) {
            tooltip.close();
          }
        }, 500);

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
        }, 500);
      });

      element.on('click', function(e) {
        if (attr.clickHide) {
          tooltip.close();
        }
      });

    },
  };
}
