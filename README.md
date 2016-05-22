# fo-tooltip
A nice tooltip

[Demo](http://forsigner.com/fo-tooltip)

### Install

``` bash
$ bower install fo-tooltip --save
```

#### Require

[Beside](https://github.com/forsigner/beside)

```bash
$ bower install beside --save
```

### Usage

``` html
<link rel="stylesheet" href="bower_components/fo-tooltip/dist/css/fo-tooltip.css" />

<script src="bower_components/beside/dist/js/beside.js"></script>
<script src="bower_components/fo-tooltip/dist/js/fo-tooltip.js"></script>

```

```js
angular.module('app', ['foTooltip']);
```

#### Template-url

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

#### Template-str

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
### Options

- `tooltip-position` set tooltip position
  - top left
  - top center
  - top center
  - top left
  - top right
  - bottom center
  - bottom left
  - bottom right
  - left center
  - left top
  - left bottom
  - right center
  - right top
  - right bottom
- `tooltip-template-url` use template content
- `tooltip-template-str` use string content
- `tooltip-offset` offset base on tooltip
- `tooltip-delay` delay after leave target or tooltip
- `click-hide` click target to hide tooltip
- `tooltip-class` class for tooltip element
- `tooltip-id` id for tooltip element
