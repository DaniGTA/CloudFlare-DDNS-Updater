<template>
  <div class="hello">
    <h1>Cloudflare API Setup</h1>
    <form>
        <h3>Cloudflare Email</h3>
        <input type="email" v-model="cloudflareApiEmail" id="email" name="api-email" placeholder="Cloudflare Email">
        <h3>Cloudflare API Key</h3>
        <input :type="cloudflareApiKeyVision"  v-model="cloudflareApiKey" id="key" name="api-key" value="Cloudflare Global API Key: XXXX">
        <button type="button" v-on:click="switchKeyVision()">👁</button>
        <div>
          <button type="button" v-on:click="login(cloudflareApiEmail,cloudflareApiKey)">login</button>
        </div>
    </form>
    <div :v-if="success">
      LOGGED IN
    </div>
     <div :v-if="!success">
      NOT LOGGED IN
    </div>
  
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CloudflareApi from '../../cloudflare/api/CloudflareApi';

@Component
export default class HelloWorld extends Vue {
    private cloudflareApiEmail = "";
    private cloudflareApiKey = "";
    private cloudflareApiKeyVision = "password";
    private loading = false;
    private success = false;

    protected login(email:string,key:string){
        this.checkLogin(email,key);
    }

    private async checkLogin(email:string,key:string){
      try{
        console.log('logging in...');
        this.loading = true;
        const success = await new CloudflareApi().checkLogin(email,key);
        if(success){
          console.log('Logged in');
          this.$router.push('main')
        }else{
          console.log('Log in failed');
        }
        this.loading = false;
      }catch(err){
        console.log(err);
      }

    }
    protected switchKeyVision(){
        if(this.cloudflareApiKeyVision == "password"){
            this.cloudflareApiKeyVision = "text";
        }else{
            this.cloudflareApiKeyVision = "password";
        }
    }
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
