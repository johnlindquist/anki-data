const jsonfile = require("jsonfile")
const { modify, elems } = require("partial.lenses")

const file = jsonfile.readFileSync("./db.json")

//give the cards ids
let i = 0
const withCardIds = modify(
  ["decks", elems, "cards", elems],
  card => ({ ...card, id: i++ })
)(file)

console.log(withCardIds.decks[0])

jsonfile.writeFileSync("./withCardIds.json", withCardIds)
