# Page Inject

> A script to inject html content into a host page

Injects html content into a host page, well treating script elements along the way (if you just do `innerHTML` scripts display as text nodes). Operates on elements with `data-page-inject` attribute. Just drop it like this:

```html
<div data-page-inject="path/to/some.html"></div>
<script src="page-inject.js"></script>
```

## Install

```bash
yarn add page-inject
# or
npm i -S page-inject
```

## Usage

Host page:

```html
<div data-page-inject="path/to/some.html"></div>
<script src="page-inject.js"></script>
```

Injected page(`some.html`):

```html
<div class="some-class">
  some page content
</div>
<script src="some.js"></script>
```

Result (`some.js` will be executed):

```html
<div data-page-inject="path/to/some.html">
  <div class="some-class">
    some page content
  </div>
  <script src="some.js"></script>
</div>
<script src="page-inject.js"></script>
```
