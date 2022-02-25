<template>
  <div
    class="tw-w-full tw-h-16 tw-mb-4 tw-items-center tw-flex tw-px-4 tw-text-lg tw-bg-white tw-rounded"
  >
    <div
      class="tw-flex tw-flex-col sm:tw-flex-row md:tw-flex-row lg:tw-flex-row xl:tw-flex-row tw-justify-between tw-items-start tw-box-border tw-overflow-hidden sm:tw-items-center tw-w-full"
    >
      <h2
        tabindex="0"
        class="focus:tw-outline-none tw-text-lg tw-leading-4 tw-font-bold tw-text-primary tw-mb-4 sm:tw-mb-0"
      >
        {{ title }}
      </h2>
      <div class="tw-mt-4 tw--mb-4 sm:tw-hidden tw-relative tw-w-full tw-z-10">
        <div
          class="tw-absolute tw-inset-0 tw-m-auto tw-mr-4 tw-z-0 tw-w-5 tw-h-5"
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/full_width_table_with_tabs-svg1.svg"
            alt="icon"
          />
        </div>
        <select
          aria-label="Selected tab"
          class="tw-form-select tw-block tw-w-full tw-py-2 tw-px-3 tw-border tw-border-gray-300 tw-rounded tw-text-gray-600 tw-appearance-none tw-bg-transparent"
        >
          <option class="tw-text-sm tw-text-gray-600">Inactive</option>
          <option class="tw-text-sm tw-text-gray-600">Inactive</option>
          <option selected class="tw-text-sm tw-text-gray-600">Active</option>
          <option class="tw-text-sm tw-text-gray-600">Inactive</option>
          <option class="tw-text-sm tw-text-gray-600">Inactive</option>
        </select>
      </div>
      <div class="tw-hidden sm:tw-flex tw-items-start sm:tw-items-center">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
  });
</script>
