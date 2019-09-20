<template>
  <div>
    <h3>Currently logged in as: {{ConfigManager.config.cloudflareEmail}}</h3>
    <h3>Select default IPv4 api</h3>
    <input type="text"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ConfigManager from '../config/ConfigManager';

@Component
export default class Settings extends Vue {
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
