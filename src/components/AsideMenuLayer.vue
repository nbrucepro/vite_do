<script setup>
import { mdiLogout, mdiClose } from '@mdi/js'
import { computed } from 'vue'
import AsideMenuList from '@/components/AsideMenuList.vue'
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import UserAvatarCurrentUser from './UserAvatarCurrentUser.vue'

defineProps({
  menu: {
    type: Array,
    required: true
  },
  isAsideLgActive: Boolean
})

const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const logoutItem = computed(() => ({
  // label: 'Logout',
  icon: mdiLogout,
  color: 'info',
  isLogout: true
}))

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>

<template>
  <aside id="aside"
    class="xl:py-8 xl:pl-6 w-[7.2rem] fixed flex z-40 top-0 h-screen transition-position overflow-hidden ">
    <div class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900 bg-gray-50">
      <div class="aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900 my-4">
        <div class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
          <!-- <b class="font-black">Onerrr</b> -->
          <img class="w-[4rem] mx-auto h-[4rem] rounded-md" src="../../images/icon-ref.png" alt="Sunset in the mountains">
        </div>
        <button :class="[
          isAsideLgActive ? 'flex left-0' : 'hidden left-0',
        ]" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]">
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul class="flex flex-col items-center">

        <UserAvatarCurrentUser class="w-6 h-6 mr-0 inline-flex" />
        <AsideMenuItem :item="logoutItem" @menu-click="menuClick" />
      </ul>
    </div>
  </aside>
</template>
