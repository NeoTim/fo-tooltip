(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Tooltip = require('./tooltip');

module.exports = angular.module('foTooltip.directive', []).directive('foTooltip', foTooltip);

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
    link: function link(scope, element, attr) {
      var tooltip = new Tooltip($templateCache, element, attr);

      appendToBody(tooltip.element);
      compileToScope(tooltip.element, scope);

      scope.closeTooltip = tooltip.close;

      element.on('mouseover', function (e) {
        angular.element(document.querySelector('.fo-tooltip')).removeClass('open');
        tooltip.open();
      });

      element.on('mouseleave', function (e) {
        $timeout(function () {
          if (!tooltip.element.hasClass('tooltip-hover')) {
            tooltip.close();
          }
        }, 200);
      });

      tooltip.element.on('mouseenter', function (e) {
        tooltip.element.addClass('tooltip-hover');
        tooltip.open();
      });

      tooltip.element.on('mouseleave', function (e) {
        tooltip.element.removeClass('tooltip-hover');
        tooltip.close();
      });

      element.on('click', function (e) {
        tooltip.close();
      });
    }
  };
}

},{"./tooltip":4}],2:[function(require,module,exports){
'use strict';

var foTooltipDirective = require('./fo-tooltip.directive');

module.exports = angular.module('foTooltip', [foTooltipDirective.name]);

},{"./fo-tooltip.directive":1}],3:[function(require,module,exports){
'use strict';

module.exports = {
  //top
  top_center: '0 -10px',
  top_left: '0 -10px',
  top_right: '0 -10px',

  // bottom
  bottom_center: '0 10px',
  bottom_left: '0 10px',
  bottom_right: '0 10px',

  // left
  left_center: '-10px 0',
  left_top: '-10px 0',
  left_bottom: '-10px 0',

  // right
  right_center: '10px 0',
  right_top: '10px 0',
  right_bottom: '10px 0'
};

},{}],4:[function(require,module,exports){
'use strict';

var offset = require('./offset');

module.exports = function ($templateCache, element, attr) {

  function createTooltipElement() {
    var templateString = attr.tooltipTemplateStr ? attr.tooltipTemplateStr : $templateCache.get(attr.tooltipTemplateUrl);
    var positionClass = attr.tooltipPosition.split(' ').join('-');
    var $wrapper = angular.element('<div class="fo-tooltip"></div>');

    if (attr.tooltipId) {
      $wrapper[0].id = attr.tooltipId;
    }

    $wrapper.addClass(attr.tooltipClass);
    $wrapper.addClass(positionClass);
    return angular.element($wrapper).append(templateString);
  }

  function placeToolitp(tooltipElement) {
    var besideOption = {
      me: element[0],
      you: tooltipElement[0],
      where: 'bottom center',
      offset: '0 0'
    };

    var position = attr.tooltipPosition.split(' ').join('_');

    besideOption = angular.extend(besideOption, { offset: offset[position] });

    besideOption = angular.extend(besideOption, {
      where: attr.tooltipPosition
    });

    beside.init(besideOption);
  }

  this.element = createTooltipElement();

  this.isOpened = (function () {
    return this.element.hasClass('open');
  }).bind(this);

  this.open = (function () {
    this.element.addClass('open');
    placeToolitp(this.element);
  }).bind(this);

  this.close = (function () {
    this.element.removeClass('open');
  }).bind(this);
};

},{"./offset":3}]},{},[2]);
