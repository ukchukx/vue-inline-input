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

  <select 
    v-else-if="editing && isSelect"
    :class="inputClasses"
    :value="value"
    ref="inputEl" 
    @change="handleChange"
    @blur="handleBlur">
    <option v-if="placeholder" disabled value>{{ placeholder }}</option>
    <option 
      :key="i"
      v-for="(o, i) in options" 
      :value="o.value">
      {{ o.label }}
    </option>
  </select>

  <span v-else :class="labelClasses" @click="toggle()">
    {{ label }}
    <slot name="selectCaret">
      <span v-if="isSelect">&#9660;</span>
    </slot>
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
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editing: false,
      selectedIndex: this.options.findIndex(o => o.value === this.value)
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
    isSelect() {
      return this.type === 'select';
    },
    label() {
      if (this.isNumber) return this.value === '' ? this.placeholder : this.value;
      if (this.isText || this.isTextArea) return this.value ? this.value : this.placeholder;
      // Select
      return this.selectedIndex === -1 ? this.placeholder : this.options[this.selectedIndex].label;
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
      this.$emit('blur', this.getValue());
    },
    handleInput() {
      this.emitValue();
    },
    handleChange(e) {
      this.selectedIndex = this.placeholder ? e.target.selectedIndex - 1 : e.target.selectedIndex;
      this.emitValue();
    },
    emitValue() {
      this.$emit('input', this.getValue());
    },
    getValue() {
      return this.isNumber ? +this.$refs.inputEl.value : this.$refs.inputEl.value;
    }
  }
};
</script>
