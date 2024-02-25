<script setup>
import { mdiCog, mdiMenu, mdiDotsVertical } from '@mdi/js'
import BaseIcon from '@/components/BaseIcon.vue'

defineProps({
  number: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: null
  },
  prefix: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  trend: {
    type: String,
    default: null
  },
  trendType: {
    type: String,
    default: null
  }
})
</script>
<template>
    <!-- <div class="w-full p-3 rounded-2xl my-1">
      <img class="w-full h-[11rem] rounded-md" src="../../images/dummage.jpg" alt="Sunset in the mountains">
    </div> -->
    <div class="mb-2 px-6 py-4 flex justify-between">
      <h1 class="font-bold text-xl ">{{ label.split(' ', 3).join(' ') }}</h1>
      <span class="cursor-pointer">
        <BaseIcon :path="mdiDotsVertical" :size="24"/>
      </span>
    </div>
    <div class="px-6 cursor-move">
    <p class="text-gray-700 text-base">
      {{ label }}
    </p>
    <div class="pt-4 pb-2 flex justify-between">
      <h1 class="font-bold text-xl ">{{ label.split(' ', 3).join(' ') }}</h1>
      <span class="cursor-pointer">
        <BaseIcon :path="mdiDotsVertical" :size="24"/>
      </span>
    </div>
  </div>
</template>
