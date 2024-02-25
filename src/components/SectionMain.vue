<script setup>
import { containerMaxW } from '@/config.js'
</script>

<template>
  <section class="p-1" :class="containerMaxW">
    <slot />
  </section>
</template>
