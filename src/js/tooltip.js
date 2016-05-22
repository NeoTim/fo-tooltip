let offset = require('./offset');

module.exports = function($templateCache, element, attr, $document) {

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

  var destroyBeside;
  function placeToolitp(tooltipElement, attr) {
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

    if (attr.tooltipOffset) {
      var tooltipOffset = attr.tooltipOffset.split(' ');
      var defaultOffset = offset[position].split(' ');
      var offsetX = parseInt(tooltipOffset[0], 10) + parseInt(defaultOffset[0], 10);
      var offsetY = parseInt(tooltipOffset[1], 10) + parseInt(defaultOffset[1], 10);
      var newOffset = offsetX + 'px ' + offsetY + 'px';

      besideOption = angular.extend(besideOption, {
        offset: newOffset,
      });
    }

    destroyBeside = beside.init(besideOption);
  }

  this.element = createTooltipElement();

  this.isOpened = function() {
    return this.element.hasClass('open');
  }.bind(this);

  this.open = function(attr) {
    this.element.addClass('open');
    placeToolitp(this.element, attr);
  }.bind(this);

  this.close = function() {
    this.element.removeClass('open');
    if (destroyBeside) {
      destroyBeside();
    }
  }.bind(this);

  this.tooltipHover = false;

  this.elementHover = false;

};
