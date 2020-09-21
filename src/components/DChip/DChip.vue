<template>
  <div
    class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-yellow-100 bg-yellow-700 border border-yellow-700 "
  >
    <div class="text-xs font-normal leading-none max-w-full flex-initial">
      {{ text }}
    </div>
    <div class="flex flex-auto flex-row-reverse" @click="remove">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x cursor-pointer hover:text-yellow-400 rounded-full w-4 h-4 ml-2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DChip',
  props: {
    text: { type: String },
    key: { type: String }
  },
  setup(props, { emit }) {
    const remove = () => {
      emit('remove', props.key);
    };
    return {
      remove
    };
  }
});
</script>
