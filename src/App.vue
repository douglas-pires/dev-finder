<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="Search">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { DefaultApolloClient } from '@vue/apollo-composable';
import { defineComponent, provide } from 'vue';
import apolloClient from './apollo';

export default defineComponent({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  }
});
</script>

<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
