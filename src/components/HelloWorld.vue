<template>
  <div class="hello">
    <table class="table is-striped is-fullwidth">
      <thead>
        <th>名前</th>
        <th>年齢</th>
        <th>身長</th>
        <th>体重</th>
        <th>出身地</th>
      </thead>
      <tbody>
        <tr v-for="idol in idols" :key="idol.idol">
          <td>{{ idol.name || idol.alternateName }}</td>
          <td>{{ idol.age }}</td>
          <td>{{ idol.height }}</td>
          <td>{{ idol.weight }}</td>
          <td>{{ idol.birthPlace }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      idols: []
    }
  },
  created () {
    const fetch = require('isomorphic-fetch')
    const SparqlHttp = require('sparql-http-client')

    SparqlHttp.fetch = fetch

    // SPARQLエンドポイントを指定
    const endpoint = new SparqlHttp({ endpointUrl: 'https://sparql.crssnky.xyz/spql/imas' })

    // SPARQLクエリを記述
    const query = `
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT *
WHERE {
  ?idol rdf:type imas:Idol.
  optional { ?idol schema:name ?name. FILTER (lang(?name) = 'ja') }.
  optional { ?idol schema:alternateName ?alternateName. FILTER (lang(?alternateName) = 'ja') }.
  optional { ?idol schema:height ?height. }.
  optional { ?idol schema:weight ?weight. }.
  optional { ?idol schema:birthPlace ?birthPlace. }.
  optional { ?idol schema:gender ?gender. }.
  optional { ?idol imas:Attribute ?attribute. }.
  optional { ?idol imas:BloodType ?bloodType. }.
  optional { ?idol imas:Bust ?bust. }.
  optional { ?idol imas:Category ?category. }.
  optional { ?idol imas:Color ?color. }.
  optional { ?idol imas:Division ?division. }.
  optional { ?idol imas:Handedness ?handedness. }.
  optional { ?idol imas:Hip ?hip. }.
  optional { ?idol imas:ShoeSize ?shoeSize. }.
  optional { ?idol imas:Type ?type. }.
  optional { ?idol imas:Waist ?waist. }.
  optional { ?idol imas:constellation ?constellation. }.
  optional { ?idol imas:familyNameKana ?familyNameKana. }.
  optional { ?idol imas:givenNameKana ?givenNameKana. }.
  optional { ?idol imas:nameKana ?nameKana. }.
  optional { ?idol schema:birthDate ?birthDate. }.
  optional { ?idol schema:birthPlace ?birthPlace. }.
  optional { ?idol schema:familyName ?familyName. FILTER (lang(?familyName) = 'ja') }.
  optional { ?idol schema:gender ?gender. }.
  optional { ?idol schema:givenName ?givenName. FILTER (lang(?givenName) = 'ja') }.
  optional { ?idol schema:height ?height. }.
  optional { ?idol schema:weight ?weight. }.
  optional { ?idol foaf:age ?age. }.
  optional {
    SELECT ?idol (group_concat(distinct ?hobby ; separator = ", ") AS ?hobbies)
    WHERE { ?idol imas:Hobby ?hobby .  }
    GROUP BY ?idol
  }.
   optional {
    SELECT ?idol (group_concat(distinct ?talent ; separator = ", ") AS ?talents)
    WHERE { ?idol imas:Talent ?talent .  }
    GROUP BY ?idol
  }.
  optional {
  SELECT ?idol (group_concat(distinct ?favorite ; separator = ", ") AS ?favorites)
  WHERE { ?idol imas:Favorite ?favorite . }
  GROUP BY ?idol
  }.
}
order by asc(?idol)
`

    // Promise形式でデータを取得
    endpoint.selectQuery(query)
      .then(res => res.text())
      .then(body => {
        const result = JSON.parse(body).results.bindings.map(idol => {
          return Object.entries(idol).reduce(function (hash, field) {
            hash[field[0]] = field[1].value
            return hash
          }, {})
        })
        this.idols = result
      }).catch(err => console.error(err))
  }
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
