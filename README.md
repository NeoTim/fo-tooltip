# fo-tooltip
A nice tooltip

[Demo](http://fo.tooltip.mipinr.com  )

### Install

```
bower install fo-tooltip --save
```

#### Require

[Tether](https://github.com/HubSpot/tether)

### Usage

``` html
<link rel="stylesheet" href="bower_components/fo-tooltip/dist/css/fo-tooltip.css" />

<script src="bower_components/tether/dist/js/tether.js"></script>
<script src="bower_components/fo-tooltip/dist/js/fo-tooltip.js"></script>

```

```js
angular.module('app', ['foTooltip']);
```

``` html

<button
  class="btn btn-danger"
  fo-tooltip
  tooltip-class="tooltip"
  tooltip-id="tooltip"
  tooltip-offset="-10px 0"
  tooltip-position="bottom middle"
  tooltip-template="tooltip.html"
>hello</button>

<script id="tooltip.html" type="text/ng-template">
  <button class="btn btn-primary" ng-click="yes()">Yes</button>
  <button class="btn btn-default" ng-click="closeTooltip()">close</button>
</script>

```
