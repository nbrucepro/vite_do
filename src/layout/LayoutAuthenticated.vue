<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import menuAside from '@/menuAside.js'
import menuNavBar from '@/menuNavBar.js'
import { useDarkModeStore } from '@/stores/darkMode.js'
import BaseIcon from '@/components/BaseIcon.vue'
import NavBarItemPlain from '@/components/NavBarItemPlain.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import Navbar from '@/components/Navbar.vue'
import ProfilePic from '@/components/ProfilePic.vue'
import BaseButton from '@/components/BaseButton.vue'
import {
  mdiSearchWeb,
  mdiChevronDown
} from '@mdi/js'
const layoutAsidePadding = 'xl:pl-36'

const darkModeStore = useDarkModeStore()
const router = useRouter()

const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)

router.beforeEach(() => {
  isAsideMobileExpanded.value = false
  isAsideLgActive.value = false
})

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set()
  }

}

const checkScreenWidth = () => {
  const screenWidth = window.innerWidth
  const largeScreenWidth = 1280
  isAsideLgActive.value = screenWidth >= largeScreenWidth ? false : isAsideLgActive.value
}

onMounted(() => {
  window.addEventListener('resize', checkScreenWidth)
  checkScreenWidth()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenWidth)
})

const toggleDarkMode = () => {
  darkModeStore.set(!darkModeStore.isEnabled)
}
</script>

<template>
  <div class='overflow-hidden lg:overflow-visible bg-[#EDF2F5] dark:bg-slate-800'>
    <div :class="[layoutAsidePadding]"
      class="pt-32 h-screen overflow-hidden overflow-y-auto w-screen transition-position lg:w-auto bg-red  dark:bg-slate-800 dark:text-slate-100">
      <Navbar :menu="menuNavBar" :class="[layoutAsidePadding]" @menu-click="menuClick">
        <!-- <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain> -->
        <NavBarItemPlain display="flex xl:hidden" @click.prevent="isAsideLgActive = true">
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <!-- <NavBarItemPlain use-margin>
          Boards
        </NavBarItemPlain> -->
        <!-- <FormControl placeholder="Search (ctrl+k)" ctrl-k-focus transparent borderless /> -->
        <section class="flex items-center w-full justify-between mt-20 ">
          <div class="flex items-center w-full justify-start">
            <div class="w-full mb-2">
              <h1 class="leading-tight text-2xl font-bold mb-4">
                Boards
              </h1>
              <BaseButton href="" target="_blank" :icon="mdiChevronDown" label="Barone LLC." color="contrast" rounded-full
                small />
            </div>
          </div>
          <main class="flex flex-col">
            <div @click="toggleDarkMode" class="flex justify-end mb-4">
              <label
                class="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
                for="light-switch">
                <svg class="w-4 h-4 hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current text-slate-400"
                    d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z" />
                  <path class="fill-current text-slate-500" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
                </svg>
                <svg class="w-4 h-4 dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current text-slate-400"
                    d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z" />
                  <path class="fill-current text-slate-500"
                    d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z" />
                </svg>
                <span class="sr-only">Switch to light / dark version</span>
              </label>
            </div>
            <div class="hidden md:flex">
              <BaseButton href="" target="_blank" :icon="mdiSearchWeb" label="Search" color="contrast" rounded-full
                small />
              <ProfilePic />
            </div>
          </main>
        </section>
      </Navbar>
      <AsideMenu :is-aside-mobile-expanded="isAsideMobileExpanded" :is-aside-lg-active="isAsideLgActive" :menu="menuAside"
        @menu-click="menuClick" @aside-lg-close-click="isAsideLgActive = false" />
      <slot />
    </div>
  </div>
</template>
