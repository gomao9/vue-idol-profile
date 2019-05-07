<template>
  <div class="hello">
    <table class="table is-striped is-fullwidth">
      <thead>
        <th>名前</th>
        <th>年齢</th>
        <th>身長</th>
        <th>体重</th>
        <th>出身地</th>
        <th>趣味</th>
      </thead>
      <tbody>
        <tr v-for="idol in idols" :key="idol.idol">
          <td><router-link :to="'/idol/' + idol.label" :idol="idol">{{ idol.name || idol.alternateName }}</router-link></td>
          <td>{{ idol.age }}</td>
          <td>{{ idol.height }}</td>
          <td>{{ idol.weight }}</td>
          <td>{{ idol.birthPlace }}</td>
          <td>{{ idol.hobbies }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['idols']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
