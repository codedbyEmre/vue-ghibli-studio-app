<template>
  <router-view/>
</template>

<script>
export default {
  name: "App",
  created(){
    this.$store.dispatch('getMoviesAction')
  }
}
</script>

<style>
</style>
