<template>
    home
</template>
<script setup lang="ts">
import auth from '~/middleware/auth';

definePageMeta({
  middleware: [auth]
})
</script>