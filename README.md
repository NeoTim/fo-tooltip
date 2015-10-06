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
<div
  class="tooltip-demo"
  tooltip-position="top left"
  tooltip-template="tooltip-top-left.html"
  fo-tooltip
>
Top Left
</div>
<script id="tooltip-top-left.html" type="text/ng-template">
  Top Left
</script>
```
