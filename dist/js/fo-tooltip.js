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

};

},{}],4:[function(require,module,exports){
'use strict';

var positions = require('./positions');

module.exports = function ($templateCache, element, attr) {

  function createTooltipElement() {
    var templateString = attr.tooltipTemplateStr ? attr.tooltipTemplateStr : $templateCache.get(attr.tooltipTemplateUrl);
    var positionClass = attr.tooltipPosition.split(' ').join('-');
    var $wrapper = angular.element('<div class="fo-tooltip"></div>');
    $wrapper[0].id = attr.tooltipId;
    $wrapper.addClass(attr.tooltipClass);
    $wrapper.addClass(positionClass);
    return angular.element($wrapper).append(templateString);
  }

  function placeToolitp(tooltipElement) {
    var tetherOption = {
      element: tooltipElement[0],
      target: element[0],
      attachment: 'bottom middle',
      targetAttachment: 'top middle',
      offset: attr.tooltipOffset
    };

    var currentPosition = getCurrentPosition();
    tetherOption = angular.extend(tetherOption, currentPosition);
    new Tether(tetherOption);
  }

  function getCurrentPosition() {
    var that = {};
    that.positions = angular.copy(positions);
    var position = attr.tooltipPosition.split(' ').join('_');
    if (attr.tooltipOffset) {
      return angular.extend(that.positions[position], { offset: attr.tooltipOffset });
    }
    return that.positions[position];
  };

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

},{"./positions":3}]},{},[2]);
