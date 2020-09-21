<template>
  <div class="mb-4">
    <label v-if="label" class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>
    <Input
      :placeholder="placeholder"
      :autofocus="autofocus"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from './components/Input.vue';

export default defineComponent({
  name: 'DInput',
  components: { Input },
  props: {
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    modelValue: { type: String },
    autofocus: { type: Boolean, default: false }
  }
});
</script>
