<template>
  <div id="app">
    <div v-if="isUserLoggedIn() === false">
      <Cloudflare/>
    </div >
    <div v-if="isUserLoggedIn() === true">
      <MainMenu/>
    </div >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cloudflare from './components/tutorial/CloudflareAPIKey.vue';
import MainMenu from './components/MainMenu.vue';
import CloudflareApi from './cloudflare/api/CloudflareApi';
import AutoUpdateTask from './core/AutoUpdateTask';
@Component({
  components: {
    Cloudflare,
    MainMenu
  }
})
export default class App extends Vue {

  isUserLoggedIn():boolean{
    const cf = new CloudflareApi();
    const result = cf.isLoggedIn();
    console.log('CF: Logged in: '+result);
    return result;
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
