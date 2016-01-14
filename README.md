# fo-tooltip
A nice tooltip

[Demo](http://fo.tooltip.mipinr.com  )

### Install

```
bower install fo-tooltip --save
```

#### Require

[Beside](https://github.com/forsigner/beside)

### Usage

``` html
<link rel="stylesheet" href="bower_components/fo-tooltip/dist/css/fo-tooltip.css" />

<script src="bower_components/beside/dist/js/beside.js"></script>
<script src="bower_components/fo-tooltip/dist/js/fo-tooltip.js"></script>

```

```js
angular.module('app', ['foTooltip']);
```

#### template-url
``` html
<div
  class="tooltip-demo"
  tooltip-position="top left"
  tooltip-class="hello"
  tooltip-template-url="tooltip-top-left.html"
  fo-tooltip
>
Top Left
</div>
<script id="tooltip-top-left.html" type="text/ng-template">
  Top Left
</script>
```
#### template-str
``` html
<div
  class="tooltip-demo"
  tooltip-position="top left"
  tooltip-class="hello"
  tooltip-template-str="tooltip show me"
  fo-tooltip
>
Top Left
</div>

```
