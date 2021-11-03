<template>
  <Header />
  <Movies />
</template>

<script>
import Header from '../components/Header.vue'
import Movies from '../components/Movies.vue'

export default {
  name: 'Home',
  components: {Header, Movies}
}
</script>