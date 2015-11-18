let positions = require('./positions');

module.exports = function($templateCache, element, attr) {

  function createTooltipElement() {
    let templateString = $templateCache.get(attr.tooltipTemplate);
    let positionClass = attr.tooltipPosition.split(' ').join('-');
    let $wrapper = angular.element('<div class="fo-tooltip"></div>');
    $wrapper[0].id = attr.tooltipId;
    $wrapper.addClass(attr.tooltipClass);
    $wrapper.addClass(positionClass);
    return angular.element($wrapper).append(templateString);
  }

  function placeToolitp(tooltipElement) {
    let tetherOption = {
      element: tooltipElement[0],
      target: element[0],
      attachment: 'bottom middle',
      targetAttachment: 'top middle',
      offset: attr.tooltipOffset
    };

    let currentPosition = getCurrentPosition();
    tetherOption = angular.extend(tetherOption, currentPosition);
    new Tether(tetherOption);
  }

  function getCurrentPosition() {
    var that = {};
    that.positions = angular.copy(positions);
    let position = attr.tooltipPosition.split(' ').join('_');
    if (attr.tooltipOffset) {
      return angular.extend(that.positions[position], {offset: attr.tooltipOffset});
    }
    return that.positions[position];
  };

  this.element = createTooltipElement();

  this.isOpened = function() {
    return this.element.hasClass('open');
  }.bind(this);

  this.open = function() {
    this.element.addClass('open');
    placeToolitp(this.element)
  }.bind(this);

  this.close = function() {
    this.element.removeClass('open');
  }.bind(this);

};
