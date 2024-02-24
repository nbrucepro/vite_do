<script setup>
import LayoutAuthenticated from '@/layout/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue';
import BaseButton from '@/components/BaseButton.vue'
import ProfilePic from '@/components/ProfilePic.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiSearchWeb,
  mdiChartPie
} from '@mdi/js'

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Overview" main>
        <main class="flex justify-around">
          <BaseButton
          href=""
          target="_blank"
          :icon="mdiSearchWeb"
          label="Search"
          color="contrast"
          rounded-full
          small
        />
        <ProfilePic/>
        </main>
      </SectionTitleLineWithButton>
      <div class="p-4">
        <!-- Hello  -->
        <KanbanBoard/>
			</div>
      <!-- <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="512"
          label="Clients"
        />
        <CardBoxWidget
        trend="12%"
        trend-type="up"
        color="text-emerald-500"
        :icon="mdiAccountMultiple"
        :number="512"
        label="Clients"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="7770"
          prefix="$"
          label="Sales"
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix="%"
          label="Performance"
        />
      </div> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
