const fetch = require('isomorphic-fetch')
const SparqlHttp = require('sparql-http-client')

SparqlHttp.fetch = fetch

// SPARQLエンドポイントを指定（DB Pedia）
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
  optional { ?idol schema:name ?name. }.
  optional { ?idol schema:alternateName ?alternateName. }.
  optional { ?idol schema:height ?height. }.
  optional { ?idol schema:weight ?weight. }.
  optional { ?idol schema:birthPlace ?birthPlace. }.
  optional { ?idol schema:gender ?gender. }.
  optional { ?idol imas:nameKana ?namekana. }.
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
  optional { ?idol schema:alternateName ?nickname. }.
  optional { ?idol schema:birthDate ?birthDate. }.
  optional { ?idol schema:birthPlace ?birthPlace. }.
  optional { ?idol schema:familyName ?familyName. }.
  optional { ?idol schema:gender ?gender. }.
  optional { ?idol schema:givenName ?givenName. }.
  optional { ?idol schema:height ?height. }.
  optional { ?idol schema:name ?name. }.
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
order by desc(?birthDate)
`

// Promise形式でデータを取得
endpoint.selectQuery(query)
  .then(res => res.text())
  .then(body => {
    const result = JSON.parse(body)
    console.log(JSON.stringify(result, null, ' '))
  }).catch(err => console.error(err))
