# vue-inline-input

> An inline editable input component for Vue.

Displays as text and becomes editable by clicking or tapping.

## Installation

```js
npm install vue-inline-input
```

### Browser

```html
<script type="text/javascript" src="https://unpkg.com/vue"></script>
<script type="text/javascript" src="https://unpkg.com/vue-inline-input"></script>
<script type="text/javascript">
  Vue.use(InlineInput);
</script>
```

### Module

```js
import InlineInput from 'vue-inline-input';
```

## Usage

Once installed, it can be used in a template as:

```html
<inline-input v-model="amount" />
```

See the props table below for the available options.

### Props

| Property | Type | Description | Default |
|:--|:--|:--|:--|
| type | string | The input type. Could be text, number, textarea or select | text |
| placeholder | string | Text to be shown as a placeholder while there is no input |  empty string |
| label-classes | string | CSS classes for the label element | empty string |
| input-classes | string | CSS classes for the input element | empty string |
| rows | integer | Textarea rows | 2 |
| cols | integer | Textarea columns | 20 |
| options | array | Provides the options for selects. Each object should have the format `{label: x, value: x}` | [] |

## Contribution
Install dependencies
```
npm install
```
When you're done, build the dist files
```
npm run build
```

## License

[MIT](http://opensource.org/licenses/MIT)