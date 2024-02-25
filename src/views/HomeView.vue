<script setup>
import LayoutAuthenticated from '@/layout/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue';
import KanbanBoard from '@/components/KanbanBoard.vue'

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <KanbanBoard />
    </SectionMain>
  </LayoutAuthenticated>
</template>
