<template>
  <div class="mt-5">
    <div class="max-w-lg w-full lg:flex">
      <div
        class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border-b border-l border-gray-400 border-t"
        :style="
          `background-image: url('${user.avatarUrl}');
           background-size: cover;
           background-repeat: no-repeat;
           background-position: center;`
        "
      ></div>
      <div
        class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full"
      >
        <div class="mb-8">
          <p
            v-if="user.isHireable"
            class="text-gray-700 text-base bg-orange-200 w-24 text-center rounded text-orange-600 mb-2"
          >
            Hireable
          </p>
          <p>{{ user.location }}</p>
          <div class="text-gray-900 font-bold text-xl mb-2">
            {{ user.name }}
          </div>
          <div class="text-gray-900 font-bold text-md mb-2">
            {{ user.login }}
          </div>
          <p class="text-gray-700 text-base">
            {{ user.bio }}
          </p>
        </div>

        <div v-if="user.websiteUrl">
          <p>
            Website:
          </p>
          <a class="break-all" :href="user.websiteUrl" target="_blank">
            {{ user.websiteUrl }}
          </a>
        </div>
        <router-link
          :to="{
            name: 'Profile',
            params: { login: user.login, user: JSON.stringify(user) }
          }"
          class="rounded bg-blue-500 text-center mt-2"
          tag="button"
        >
          <p class="text-white cursor-pointer" tag="button">Profile</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DUserCard',
  props: {
    user: { type: Object }
  }
});
</script>
