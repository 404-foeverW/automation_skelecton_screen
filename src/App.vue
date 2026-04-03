<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>  -->
  <UserInfo></UserInfo>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import UserInfo from './components/UserInfo.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    UserInfo
  },
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  },
}
</script>

<style>
@import url(./style/sk.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
