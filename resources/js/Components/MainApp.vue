<template>
  <div id="main">
    <HeaderApp/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import HeaderApp from "./Header.vue";

export default {
  name: 'main-app',
  components: {HeaderApp}
}
</script>