<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <div class="min-h-dvh h-dvh">
    <div class="w-full flex gap-4 min-h-dvh h-dvh">
      <Sidebar />
      <NuxtPage />
    </div>
  </div>
</template>
<style lang="css">
</style>