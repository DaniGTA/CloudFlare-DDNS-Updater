<template>
  <div class="hello">
    <h1>A</h1>
    <router-link to="/settings" append>Settings</router-link>
  </div>
</template>
<template>
 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
})
export default class MainMenu extends Vue {
 
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
