<script setup lang="ts">
import { Ref, ref } from 'vue'
import jaw from './components/jaw.vue'

const loadingRef: Ref<null | {loading: Ref<any>}> = ref(null);
</script>

<template>

    <main class="container">
        <jaw key="canvasBox" ref="loadingRef"/>
    </main>
</template>

<style lang="scss">
@import "./styles/app.scss";
</style>