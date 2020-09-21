<template>
  <div class="w-4/12 flex flex-col justify-center items-center">
    <DInput
      placeholder="Type the technology"
      v-model="inputValue"
      class="w-full"
      @keyup.enter="search"
      autofocus
    />
    <DButton
      :disabled="!inputValue"
      @click="() => search(chips)"
      :loading="loading"
      >Search</DButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import DInput from '@/components/DInput/DInput.vue';
import DButton from '@/components/DButton/DButton.vue';
import { useQuery } from '@vue/apollo-composable';
import searchQuery from '@/apollo/queries/search';

export default defineComponent({
  name: 'DSearchBar',
  emits: ['incoming-result'],
  props: {
    cursor: { type: String, default: null }
  },
  components: {
    DInput,
    DButton
  },
  setup(props, { emit }) {
    const enabled = ref(false);
    const inputValue = ref('');
    const { loading, refetch, onResult } = useQuery(
      searchQuery,
      () => ({
        type: 'USER',
        query: inputValue.value,
        first: 100,
        after: null
      }),
      () => ({ enabled: enabled.value, fetchPolicy: 'no-cache' })
    );

    const search = () => {
      enabled.value = true;

      refetch({
        type: 'USER',
        query: inputValue.value,
        first: 100,
        after: null
      });
    };

    onResult(res => {
      emit('incoming-result', res);
    });

    watch(
      () => props.cursor,
      async () => {
        loading.value = true;
        await refetch({
          type: 'USER',
          query: inputValue.value,
          first: 100,
          after: props.cursor as any
        });
        loading.value = false;
      }
    );

    return { search, loading, inputValue };
  }
});
</script>
