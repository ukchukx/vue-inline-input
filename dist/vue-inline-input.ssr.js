'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'InlineInput',
  props: {
    value: {
      type: [Number, String],
      default: function () { return ''; } 
    },
    type: {
      type: String,
      default: function () { return 'text'; }
    },
    emitOnBlur: {
      type: Boolean,
      default: function () { return false; }
    },
    placeholder: {
      type: String,
      default: function () { return ''; }
    },
    labelClasses: {
      type: String,
      default: function () { return ''; }
    },
    inputClasses: {
      type: String,
      default: function () { return ''; }
    },
    rows: {
      type: Number,
      default: function () { return 2; }
    },
    cols: {
      type: Number,
      default: function () { return 20; }
    },
    options: {
      type: Array,
      default: function () { return []; }
    }
  },
  data: function data() {
    return {
      editing: false
    };
  },
  computed: {
    isText: function isText() {
      return this.type === 'text';
    },
    isNumber: function isNumber() {
      return this.type === 'number';
    },
    isTextArea: function isTextArea() {
      return this.type === 'textarea';
    },
    isSelect: function isSelect() {
      return this.type === 'select';
    },
    label: function label() {
      var this$1 = this;

      if (this.isNumber) { return this.value === '' ? this.placeholder : this.value; }
      if (this.isText || this.isTextArea) { return this.value ? this.value : this.placeholder; }
      // Select
      return this.options
        .reduce(function (currLabel, ref) {
          var label = ref.label;
          var value = ref.value;

          return this$1.value === value ? label : currLabel;
      }, this.value);
    }
  },
  methods: {
  	toggle: function toggle() {
      var this$1 = this;

      this.editing = !this.editing;
      
      if (this.editing) {
        this.$nextTick(function () {
          this$1.$refs.inputEl.focus();
        });
      }
    },
    handleEnter: function handleEnter() {
      this.$refs.inputEl.blur();
    },
    handleBlur: function handleBlur() {
      this.toggle();
      this.emitValue();
    },
    handleInput: function handleInput() {
      if (!this.emitOnBlur) { this.emitValue(); }
    },
    handleChange: function handleChange() {
      this.emitValue();
    },
    emitValue: function emitValue() {
      this.$emit('input', this.isNumber ? parseFloat(this.$refs.inputEl.value) : this.$refs.inputEl.value);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.editing && (_vm.isText || _vm.isNumber))?_c('input',{ref:"inputEl",class:_vm.inputClasses,attrs:{"type":_vm.type,"placeholder":_vm.placeholder},domProps:{"value":_vm.value},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handleEnter($event)},"input":_vm.handleInput,"blur":_vm.handleBlur}}):(_vm.editing && _vm.isTextArea)?_c('textarea',{ref:"inputEl",class:_vm.inputClasses,attrs:{"placeholder":_vm.placeholder,"rows":_vm.rows,"cols":_vm.cols},domProps:{"value":_vm.value},on:{"input":_vm.handleInput,"blur":_vm.handleBlur}},[]):(_vm.editing && _vm.isSelect)?_c('select',{ref:"inputEl",class:_vm.inputClasses,domProps:{"value":_vm.value},on:{"change":_vm.handleChange,"blur":_vm.handleBlur}},[_vm._ssrNode(((_vm.placeholder)?("<option disabled=\"disabled\" value>"+_vm._ssrEscape(_vm._s(_vm.placeholder))+"</option>"):"<!---->")+" "+(_vm._ssrList((_vm.options),function(o,i){return ("<option"+(_vm._ssrAttr("value",o.value))+">"+_vm._ssrEscape("\n    "+_vm._s(o.label)+"\n  ")+"</option>")})))]):_c('span',{class:_vm.labelClasses,on:{"click":function($event){return _vm.toggle()}}},[_vm._ssrNode(_vm._ssrEscape("\n  "+_vm._s(_vm.label)+"\n  ")),_vm._t("selectCaret",[(_vm.isSelect)?_c('span',[_vm._v("▼")]):_vm._e()])],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-8c5cefb8";
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }

  install.installed = true;
  Vue.component('InlineInput', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = { install: install };

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
__vue_component__.install = install;exports.default=__vue_component__;