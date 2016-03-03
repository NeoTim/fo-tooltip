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

      element.on('mouseover', function(e) {
        angular.element(document.querySelector('.fo-tooltip')).removeClass('open');
        tooltip.open();
      });

      element.on('mouseleave', function(e) {
        $timeout(function() {
          if ((!tooltip.element.hasClass('tooltip-hover')) && (!tooltip.element.hasClass('tooltip-editing'))) {
            tooltip.close();
          }
        }, 200);
      });

      tooltip.element.on('mouseenter', function(e) {
        tooltip.element.addClass('tooltip-hover');
        tooltip.open();
      });

      tooltip.element.on('mouseleave', function(e) {
        tooltip.element.removeClass('tooltip-hover');
        tooltip.close();
      });

      element.on('click', function(e) {
        tooltip.close();
      });

    },
  };
}
