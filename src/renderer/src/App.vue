<script setup lang="ts">
import Versions from './components/Versions.vue'
const ipcHandle2 = (): void => window.electron.ipcRenderer.send('createTabView', {
  url: 'https://www.facebook.com/messages/t/lanhai/',
  name: "senlg-https://www.facebook.com/messages/t/lanhai/"
})

const ipcHandle3 = () => {
  window.electron.ipcRenderer.send('test', { a: "测试" })
}
const ipcHandle4 = () => {
  window.electron.ipcRenderer.send('showView', { name: "senlg-https://www.facebook.com/messages/t/lanhai/" })
}
const ipcHandle5 = () => {
  window.electron.ipcRenderer.send('showWindow')
}
</script>
<style lang="less" scoped>
.appbar {
  app-region: drag;

  .action {
    app-region: no-drag;
  }
}
</style>
<template>
  <div class="w-100%  appbar top-0px pos-fixed" style="background-color: white;">
    <div class="actions p-0">
      <div class="action">
        <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
      </div>
      <div class="action">
        <a target="_blank" rel="noreferrer" @click="ipcHandle2">Create View</a>
      </div>
      <div class="action test-1">
        <a target="_blank" rel="noreferrer" @click="ipcHandle3">Test</a>
      </div>
      <div class="action test-1">
        <a target="_blank" rel="noreferrer" @click="ipcHandle4">showView</a>
      </div>
      <div class="action test-1">
        <a target="_blank" rel="noreferrer" @click="ipcHandle5">showWindow</a>
      </div>
    </div>
  </div>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>

  <Versions />
</template>
