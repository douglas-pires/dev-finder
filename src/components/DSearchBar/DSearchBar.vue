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
    const { loading, refetch, onResult, variables } = useQuery(
      searchQuery,
      () => ({
        type: 'USER',
        query: inputValue.value,
        first: 100,
        after: null as null | string
      }),
      () => ({ enabled: enabled.value, fetchPolicy: 'no-cache' })
    );

    const search = async () => {
      enabled.value = true;

      variables.value.query = inputValue.value;

      await refetch();
    };

    onResult(res => {
      emit('incoming-result', res);
      enabled.value = false;
    });

    watch(
      () => props.cursor,
      async () => {
        loading.value = true;
        enabled.value = true;
        variables.value.after = props.cursor;
        await refetch();
      }
    );

    return { search, loading, inputValue };
  }
});
</script>
