<template>
  <button
    :disabled="disabled"
    :class="[
      'text-white font-bold py-2 px-4 rounded w-24 flex justify-center',
      {
        'bg-gray-400 border-b-4 border-gray-500 hover:border-gray-500': disabled,
        'hover:bg-blue-400 bg-blue-500 border-b-4 border-blue-700 hover:border-blue-500': !disabled
      }
    ]"
  >
    <slot v-if="!loading" />
    <div
      v-else
      :class="{
        'loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6': loading
      }"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DButton',
  props: {
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  }
});
</script>

<style lang="scss">
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
