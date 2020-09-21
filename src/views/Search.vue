<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <DSearchBar
      @incoming-result="setResults"
      :class="{ 'min-h-full': !users.length, 'h-64': users.length }"
      :cursor="cursor"
    />
    <DPagination
      @next="next"
      @previous="previous"
      :total="total"
      v-if="users.length"
    />
    <transition name="fade">
      <div v-if="users.length">
        <DUserCard v-for="(user, index) in users" :key="index" :user="user" />
      </div>
    </transition>
    <DPagination
      @next="next"
      @previous="previous"
      :total="total"
      v-if="users.length"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DSearchBar from '@/components/DSearchBar/DSearchBar.vue';
import DUserCard from '@/components/DUserCard/DUserCard.vue';
import DPagination from '@/components/DPagination/DPagination.vue';

export default defineComponent({
  name: 'Search',
  components: {
    DSearchBar,
    DUserCard,
    DPagination
  },
  setup() {
    const users = ref({});
    const total = ref(0);
    const afterCursor = ref<string | null>('');
    const previousCursor = ref<string | null>('');
    const cursor = ref<string | null>(null);

    const next = () => {
      previousCursor.value = cursor.value;
      cursor.value = afterCursor.value;
    };

    const previous = () => {
      cursor.value = previousCursor.value;
    };

    const setResults = (result: any) => {
      const {
        data: {
          search: { edges, userCount }
        }
      } = result;
      total.value = userCount;
      afterCursor.value = edges.pop().cursor;
      users.value = edges
        .filter(
          (edge: { node: { __typename: string } }) =>
            edge.node.__typename !== 'Organization'
        )
        .map((edge: { node: any }) => edge.node);
    };

    return {
      setResults,
      users,
      total,
      cursor,
      next,
      previous
    };
  }
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
