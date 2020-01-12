<template>
  <input 
    v-if="editing && (isText || isNumber)"
    :class="inputClasses"
    :type="type" 
    :value="value" 
    :placeholder="placeholder"
    ref="inputEl"
    v-on:keyup.enter="handleEnter"
    @input="handleInput"
    @blur="handleBlur">

  <textarea 
    v-else-if="editing && isTextArea"
    :class="inputClasses"
    :value="value"
    :placeholder="placeholder"
    ref="inputEl"
    :rows="rows"
    :cols="cols"
    @input="handleInput"
    @blur="handleBlur">
  </textarea>

  <span :class="labelClasses" v-else @click="toggle()">
    {{ label }}
  </span>
</template>
<script>
export default {
  name: 'InlineInput',
  props: {
    value: {
      type: [Number, String],
      default: () => '' 
    },
    type: {
      type: String,
      default: () => 'text'
    },
    emitOnBlur: {
      type: Boolean,
      default: () => false
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    labelClasses: {
      type: String,
      default: () => ''
    },
    inputClasses: {
      type: String,
      default: () => ''
    },
    rows: {
      type: Number,
      default: () => 2
    },
    cols: {
      type: Number,
      default: () => 20
    }
  },
  data() {
    return {
      editing: false
    };
  },
  computed: {
    isText() {
      return this.type === 'text';
    },
    isNumber() {
      return this.type === 'number';
    },
    isTextArea() {
      return this.type === 'textarea';
    },
    label() {
      if (this.isNumber) return this.value === '' ? this.placeholder : this.value;
      if (this.isText || this.isTextArea) return this.value ? this.value : this.placeholder;
    }
  },
  methods: {
  	toggle() {
      this.editing = !this.editing;
      
      if (this.editing) {
        this.$nextTick(() => {
          this.$refs.inputEl.focus();
        });
      }
    },
    handleEnter() {
      this.$refs.inputEl.blur();
    },
    handleBlur() {
      this.toggle();
      this.emitValue();
    },
    handleInput() {
      if (!this.emitOnBlur) this.emitValue();
    },
    handleChange() {
      this.emitValue();
    },
    emitValue() {
      this.$emit('input', this.isNumber ? parseFloat(this.$refs.inputEl.value) : this.$refs.inputEl.value);
    }
  }
};
</script>
