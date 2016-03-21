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
      var delay = attr.tooltipDelay ? parseInt(attr.tooltipDelay) : 400;

      appendToBody(tooltip.element);
      compileToScope(tooltip.element, scope);

      scope.closeTooltip = tooltip.close;

      element.on('mouseenter', function (e) {
        tooltip.elementHover = true;
        angular.element(document.querySelectorAll('.fo-tooltip ')).removeClass('open');
        tooltip.open(attr);
      });

      element.on('mouseleave', function (e) {
        tooltip.elementHover = false;

        $timeout(function () {
          if (!tooltip.tooltipHover && !tooltip.elementHover) {
            tooltip.close();
          }
        }, delay);
      });

      tooltip.element.on('mouseenter', function (e) {
        tooltip.tooltipHover = true;
      });

      tooltip.element.on('mouseleave', function (e) {
        tooltip.tooltipHover = false;

        $timeout(function () {
          if (!tooltip.tooltipHover && !tooltip.elementHover) {
            tooltip.close();
          }
        }, delay);
      });

      element.on('click', function (e) {
        if (attr.clickHide) {
          tooltip.close();
        }
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
  top_center: '0 -6px',
  top_left: '0 -6px',
  top_right: '0 -6px',

  // bottom
  bottom_center: '0 6px',
  bottom_left: '0 6px',
  bottom_right: '0 6px',

  // left
  left_center: '-6px 0',
  left_top: '-6px 0',
  left_bottom: '-6px 0',

  // right
  right_center: '6px 0',
  right_top: '6px 0',
  right_bottom: '6px 0'
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

  function placeToolitp(tooltipElement, attr) {
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

    if (attr.tooltipOffset) {
      var tooltipOffset = attr.tooltipOffset.split(' ');
      var defaultOffset = offset[position].split(' ');
      var offsetX = parseInt(tooltipOffset[0], 10) + parseInt(defaultOffset[0], 10);
      var offsetY = parseInt(tooltipOffset[1], 10) + parseInt(defaultOffset[1], 10);
      var newOffset = offsetX + 'px ' + offsetY + 'px';

      besideOption = angular.extend(besideOption, {
        offset: newOffset
      });
    }

    beside.init(besideOption);
  }

  this.element = createTooltipElement();

  this.isOpened = (function () {
    return this.element.hasClass('open');
  }).bind(this);

  this.open = (function (attr) {
    this.element.addClass('open');
    placeToolitp(this.element, attr);
  }).bind(this);

  this.close = (function () {
    this.element.removeClass('open');
  }).bind(this);

  this.tooltipHover = false;

  this.elementHover = false;
};

},{"./offset":3}]},{},[2]);
