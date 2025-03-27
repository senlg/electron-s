<script setup lang="ts">
import { TabViewApiSend, WindowApiSend } from './api'
import Versions from './components/Versions.vue'
const ipcHandle2 = () => {
  TabViewApiSend("createTabView", {
    url: 'https://www.facebook.com/messages/t/lanhai/',
    name: "senlg-https://www.facebook.com/messages/t/lanhai/"
  })
}
const ipcHandle3 = () => {
  WindowApiSend("maxWindow",)
}
const ipcHandle4 = () => {
  WindowApiSend("showMainWindow")
}
const ipcHandle5 = () => {
  WindowApiSend('hideWindow')
}
const ipcHandle6 = () => {
  WindowApiSend('miniWindow')
}
</script>
<style lang="less" scoped>
.appbar {
  -webkit-app-region: drag;

  .action {
    -webkit-app-region: no-drag;
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
        <a target="_blank" rel="noreferrer" @click="ipcHandle3">放大window</a>
      </div>
      <div class="action test-1">
        <a target="_blank" rel="noreferrer" @click="ipcHandle4">显示window</a>
      </div>
      <div class="action test-1">
        <a target="_blank" rel="noreferrer" @click="ipcHandle5">隐藏window</a>
      </div>
      <div class="action test-1">
        <a target="_blank" rel="noreferrer" @click="ipcHandle6">缩小window</a>
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
