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
  ?uri rdf:type imas:Idol.
  bind(replace(STR(?uri), "https://sparql.crssnky.xyz/imasrdf/RDFs/detail/", "") as ?about).
  optional { ?uri rdfs:label ?label. }.
  optional { ?uri schema:name ?name. FILTER (lang(?name) = 'ja') }.
  optional { ?uri schema:alternateName ?alternateName. FILTER (lang(?alternateName) = 'ja') }.
  optional { ?uri schema:height ?height. }.
  optional { ?uri schema:weight ?weight. }.
  optional { ?uri schema:birthPlace ?birthPlace. }.
  optional { ?uri schema:gender ?gender. }.
  optional { ?uri imas:Attribute ?attribute. }.
  optional { ?uri imas:BloodType ?bloodType. }.
  optional { ?uri imas:Bust ?bust. }.
  optional { ?uri imas:Category ?category. }.
  optional { ?uri imas:Color ?color. }.
  optional { ?uri imas:Division ?division. }.
  optional { ?uri imas:Handedness ?handedness. }.
  optional { ?uri imas:Hip ?hip. }.
  optional { ?uri imas:ShoeSize ?shoeSize. }.
  optional { ?uri imas:Type ?type. }.
  optional { ?uri imas:Waist ?waist. }.
  optional { ?uri imas:constellation ?constellation. }.
  optional { ?uri imas:familyNameKana ?familyNameKana. }.
  optional { ?uri imas:givenNameKana ?givenNameKana. }.
  optional { ?uri imas:nameKana ?nameKana. }.
  optional { ?uri schema:birthDate ?birthDate. }.
  optional { ?uri schema:birthPlace ?birthPlace. }.
  optional { ?uri schema:familyName ?familyName. FILTER (lang(?familyName) = 'ja') }.
  optional { ?uri schema:gender ?gender. }.
  optional { ?uri schema:givenName ?givenName. FILTER (lang(?givenName) = 'ja') }.
  optional { ?uri schema:height ?height. }.
  optional { ?uri schema:weight ?weight. }.
  optional { ?uri foaf:age ?age. }.
  optional {
    SELECT ?uri (group_concat(distinct ?hobby ; separator = ", ") AS ?hobbies)
    WHERE { ?uri imas:Hobby ?hobby .  }
    GROUP BY ?uri
  }.
   optional {
    SELECT ?uri (group_concat(distinct ?talent ; separator = ", ") AS ?talents)
    WHERE { ?uri imas:Talent ?talent .  }
    GROUP BY ?uri
  }.
  optional {
  SELECT ?uri (group_concat(distinct ?favorite ; separator = ", ") AS ?favorites)
  WHERE { ?uri imas:Favorite ?favorite . }
  GROUP BY ?uri
  }.
}
order by asc(?uri)
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
