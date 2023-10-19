<template>
  <main>
    <SettingsMenu ref="settings_menu"/>
    <RouterView />
    <FooterView />
  </main>
</template>

<script>
import { RouterView } from 'vue-router'
import FooterView from '@/components/FooterView.vue'
import SettingsMenu from '@/components/SettingsMenu.vue';

export default {
  components: {
    RouterView,
    FooterView,
    SettingsMenu
  },
  methods: {
    openSettings() {
      this.$refs.settings_menu.toggleSettings()
    }
  }
}
</script>

<style scoped>
main {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
