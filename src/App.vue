<template>
  <div id="app">
    <router-view :idols="idols"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return { idols: [] }
  },
  beforeCreate () {
    const fetch = require('isomorphic-fetch')
    const SparqlHttp = require('sparql-http-client')

    SparqlHttp.fetch = fetch

    // SPARQLエンドポイントを指定
    const endpoint = new SparqlHttp({ endpointUrl: 'https://sparql.crssnky.xyz/spql/imas' })

    // SPARQLクエリを記述
    const query = `
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdaf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
 

SELECT *
WHERE {
  ?idol rdf:type imas:Idol.
  optional { ?idol rdfs:label ?label. }.
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
        this.idols = JSON.parse(body).results.bindings.map(idol => {
          return Object.entries(idol).reduce(function (hash, field) {
            hash[field[0]] = field[1].value
            return hash
          }, {})
        })
      }).catch(err => console.error(err))
  }
}
</script>

<style>
@import "bulma/css/bulma.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
