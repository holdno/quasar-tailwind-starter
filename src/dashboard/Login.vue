<template>
  <section class="tw-bg-white md:tw-h-screen">
    <div
      class="tw-mx-auto tw-flex tw-justify-center tw-h-full tw-flex-col lg:tw-flex-row"
    >
      <div
        id="login"
        class="tw-w-full lg:tw-w-1/2 tw-flex tw-justify-center tw-bg-white"
      >
        <div
          class="tw-w-full sm:tw-w-4/6 md:tw-w-3/6 lg:tw-w-2/3 tw-text-gray-800 tw-mb-12 sm:tw-mb-0 tw-flex tw-flex-col tw-justify-center tw-px-2 sm:tw-px-0 tw-relative"
        >
          <div
            class="tw-w-1/3 tw-mx-auto tw-px-2 tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-12 lg:tw-pt-0"
          >
            <img src="favicon.ico" alt="logo" />
            <!-- <div style="margin-top: -20px" class="tw-text-gray-600 tw-text-lg">
              elec.fun
            </div> -->
          </div>
          <div class="tw-mt-8 tw-w-full tw-px-2 sm:tw-px-6">
            <q-form @submit="login">
              <div>
                <label
                  id="email"
                  class="tw-block tw-text-lg tw-mb-2 tw-font-semibold tw-leading-tight"
                  >账号</label
                >
                <q-input v-model="account" dense type="text" square filled />
              </div>
              <div class="tw-mt-6 tw-w-full">
                <label
                  id="pass"
                  class="tw-block tw-text-lg tw-mb-2 tw-font-semibold tw-leading-tight"
                  >密码</label
                >
                <q-input
                  v-model="password"
                  dense
                  type="password"
                  square
                  filled
                />
              </div>
              <div class="tw-pt-6 tw-w-full tw-flex tw-justify-between">
                <div class="tw-flex tw-items-center">
                  <input
                    id="rememberme"
                    name="rememberme"
                    class="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-3 focus:tw-ring-primary tw-w-3 tw-h-3 tw-mr-2"
                    type="checkbox"
                  />
                  <label for="rememberme" class="tw-text-xs"
                    >保存登录状态</label
                  >
                </div>
                <a
                  class="tw-text-xs tw-text-primary focus:tw-underline focus:tw-text-secondary focus:tw-outline-none hover:tw-text-secondary"
                  href="javascript:%20void(0)"
                  >忘记密码?</a
                >
              </div>
              <div class="tw-mt-8 sm:tw-mb-8">
                <q-btn
                  color="primary"
                  type="submit"
                  label="登录"
                  text-color="white"
                  :loading="loading"
                  class="tw-w-1/2 tw-transition tw-duration-150 tw-ease-in-out tw-rounded tw-text-white tw-px-8 tw-py-3 tw-text-sm"
                />
                <p class="tw-mt-6 tw-text-xs">
                  还没有账号？
                  <a
                    class="focus:tw-underline hover:tw-text-secondary focus:tw-outline-none tw-text-primary"
                    href="javascript:%20void(0)"
                    >立即注册</a
                  >
                </p>
              </div>
            </q-form>
          </div>
        </div>
      </div>
      <div
        class="tw-w-full lg:tw-w-1/2 tw-bg-primary tw-px-2 tw-py-40 sm:tw-py-48 sm:tw-px-12 tw-flex tw-flex-col tw-justify-center tw-relative tw-bg-no-repeat tw-bg-center tw-bg-cover tw-h-full tw-opacity-80"
      >
        <video
          id="background_video"
          muted
          loop
          class="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-cover"
        ></video>
        <div
          class="tw-absolute tw-top-0 tw-right-0 tw-pt-3 tw-pr-3 tw-text-white"
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/half_page_with_image-svg2.svg"
            alt="pattern"
          />
        </div>
        <div
          class="tw-flex tw-relative tw-z-30 tw-flex-col tw-justify-center tw-pl-4 md:tw-pr-12 xl:tw-pr-12 md:tw-pl-24"
        >
          <h3
            class="tw-text-4xl tw-font-extrabold tw-leading-tight tw-text-white"
          >
            Quasar + Vite + Pinia <br />
            项目模板
          </h3>
          <p
            class="tw-text-xl tw-text-white tw-leading-normal tw-pt-3 xl:tw-w-10/12"
          ></p>
        </div>
        <div
          class="tw-z-20 tw-absolute tw-bottom-0 tw-left-0 tw-pb-3 tw-pl-3 tw-text-white"
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/half_page_with_image-svg3.svg"
            alt="pattern"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import store from "@/store/pinia";

const loading = ref(false);
const router = useRouter();

const userInfo = computed(() => {
  return store.user.getUser;
});
if (userInfo.value) {
  router.push("index");
}

const account = ref("");
const password = ref("");

async function login() {
  loading.value = true;
  try {
    store.user.login({ account: account.value, password: password.value });
    router.push("index");
  } catch (e) {
    console.log(e);
  }
  loading.value = false;
}
</script>
