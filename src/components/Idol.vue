<template>
  <section>
    <h1>{{ idol.name }}</h1>
    <div class="columns">
      <div class="column">{{ idol.hobbies }}</div>
      <div class="column">{{ idol.talents }}</div>
      <div class="column">{{ idol.birthPlace }}</div>
      <div class="column">{{ idol.birthDate }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Idol',
  props: {
    idols: Array,
    label: String
  },
  computed: {
    idol: function () {
      return this.idols.find((i) => { return i.label === this.label })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
