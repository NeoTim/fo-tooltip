let offset = require('./offset');

module.exports = function($templateCache, element, attr) {

  function createTooltipElement() {
    let templateString = attr.tooltipTemplateStr ? (attr.tooltipTemplateStr) : $templateCache.get(attr.tooltipTemplateUrl);
    let positionClass = attr.tooltipPosition.split(' ').join('-');
    let $wrapper = angular.element('<div class="fo-tooltip"></div>');

    if (attr.tooltipId) {
      $wrapper[0].id = attr.tooltipId;
    }

    $wrapper.addClass(attr.tooltipClass);
    $wrapper.addClass(positionClass);
    return angular.element($wrapper).append(templateString);
  }

  function placeToolitp(tooltipElement) {
    let besideOption = {
      me: element[0],
      you: tooltipElement[0],
      where: 'bottom center',
      offset: '0 0'
    };

    let position = attr.tooltipPosition.split(' ').join('_');

    besideOption = angular.extend(besideOption, {offset: offset[position]});

    besideOption = angular.extend(besideOption, {
      where: attr.tooltipPosition
    });

    beside.init(besideOption);
  }

  this.element = createTooltipElement();

  this.isOpened = function() {
    return this.element.hasClass('open');
  }.bind(this);

  this.open = function() {
    this.element.addClass('open');
    placeToolitp(this.element);
  }.bind(this);

  this.close = function() {
    this.element.removeClass('open');
  }.bind(this);
};
