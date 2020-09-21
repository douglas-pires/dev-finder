<template>
  <div v-if="!loading" class="flex flex-col">
    <section
      class="relative bg-gray-300 h-screen flex justify-center items-center"
    >
      <div class="container px-4">
        <div
          class="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg my-auto mt-24"
        >
          <div class="px-6">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-4/12 px-4 lg:order-2 flex justify-center">
                <img
                  :src="user?.avatarUrl"
                  class="shadow-xl rounded-full h-auto align-middle border-none absolute -mt-16"
                  style="max-width: 150px;"
                />
              </div>
              <div
                class="w-full lg:w-4/12 lg:order-3 lg:text-right lg:self-center sm:mt-24 md:mt-24 lg:mt-0 flex justify-center"
              >
                <div class="py-6 px-3 mt-32 sm:mt-0">
                  <a
                    class="bg-gray-800 active:bg-gray-800 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 cursor-pointer mr-1"
                    style="transition: all 0.15s ease 0s;"
                    :src="user?.url"
                  >
                    Github
                  </a>
                  <a
                    v-if="user?.websiteUrl"
                    class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 cursor-pointer mr-1"
                    style="transition: all 0.15s ease 0s;"
                    :src="user?.websiteUrl"
                    target="_blank"
                  >
                    Website
                  </a>
                  <a
                    v-if="user?.twitterUsername"
                    class="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 cursor-pointer"
                    style="transition: all 0.15s ease 0s;"
                    :src="`https://twitter.com/${user?.websiteUrl}`"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
                <div class="flex justify-center py-4 lg:pt-4 pt-8">
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                      >{{ user?.projects.totalCount }}</span
                    ><span class="text-sm text-gray-500">Projects</span>
                  </div>
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                      >{{ user?.followers.totalCount }}</span
                    ><span class="text-sm text-gray-500">Followers</span>
                  </div>
                  <div class="lg:mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                      >{{ user?.repositories.totalCount }}</span
                    ><span class="text-sm text-gray-500">Repositories</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-12">
              <div v-if="user?.isHireable" class="flex justify-center">
                <p
                  class="text-gray-700 text-base bg-orange-200 w-24 text-center rounded text-orange-600 mb-2"
                >
                  Hireable
                </p>
              </div>
              <h3
                class="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
              >
                {{ user?.name }}
              </h3>
              <h4
                class="text-3xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
              >
                {{ login }}
              </h4>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase"
              >
                <i class="mr-2 text-lg text-gray-500" />
                {{ user?.location }}
              </div>
              <div v-if="user?.company" class="mb-2 text-gray-700 mt-10">
                <i class="mr-2 text-lg text-gray-500" />
                {{ user.company }}
              </div>
              <div v-if="user?.email" class="mb-2 text-gray-700">
                <i class="mr-2 text-lg text-gray-500" />
                {{ user.email }}
              </div>
            </div>
            <div
              v-if="user?.bio"
              class="mt-10 py-10 border-t border-gray-300 text-center"
            >
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-9/12 px-4">
                  <p class="mb-4 text-lg leading-relaxed text-gray-800">
                    {{ user.bio }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import searchQuery from '@/apollo/queries/search';

export default defineComponent({
  name: 'Profile',
  setup() {
    const {
      params: { login, user }
    } = useRoute();
    const cLogin = ref(login);
    const cUser = ref<any>(user);
    const enabled = ref(false);
    const { loading, refetch, onResult } = useQuery(
      searchQuery,
      () => ({
        type: 'USER',
        query: '',
        first: 1
      }),
      () => ({ enabled: enabled.value, fetchPolicy: 'no-cache' })
    );

    onResult((result: any) => {
      const {
        data: {
          search: { edges }
        }
      } = result;

      cUser.value = edges[0].node;
    });

    if (user) {
      return {
        login,
        loading,
        user: user && JSON.parse(user as string)
      };
    }

    if (cLogin.value && !cUser.value) {
      enabled.value = true;

      refetch({
        type: 'USER',
        query: login as string,
        first: 1
      });
    }

    return {
      login,
      loading,
      user: cUser
    };
  }
});
</script>
