const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')



// Create a schema
const schema = buildSchema(`
  interface Animal {
    name: String!
  }

  type About {
    message: String!
  }

  type TotalCount {
    totalCount: Int!
  }

  type Time {
    hour: Int!
    minute: Int!
    second: Int!
  }

  type Die {
    total: Int!
    sides: Int!
    rolls: [Int!]!
  }

  enum MealTime {
    breakfast
    lunch
    dinner
  }

  enum Species {
    Dog
    Cat
    Fish
    Lizard
    Spider
    Insect
  }

  type SpeciesType {
    name: Species!
  }

  type PetCollection {
    totalCount: Int!
    petList: [Pet!]!
  }

  type Query {
    getAbout: About
    getMeal(time: MealTime!): Meal
    getPet(index:Int!): Pet
    allPets: [Pet!]!
    countPets: Int!
    firstPet: Pet
    getTime: Time
    getRandom(range: Int!): Int
    getRoll(sides: Int!, rolls: [Int!]!): Die
    getCount: TotalCount
    petCollection: PetCollection
    speciesCollection: SpeciesCollection
    getSpecies: [SpeciesType!]!
    getPetBySpecies(species: Species!): [Pet!]!
  }

  type Meal {
    name: String!
    description: String!
  }

  type Pet implements Animal {
    name: String!
    species: Species!
  }

  type SpeciesCollection {
    species: [Species!]!
  }

`)

// Define resolver
const root = {
  getAbout: () => {
    return { message: 'Hello World'}
  },
  getMeal: ({ time }) => {
    const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza'}
    const meal = allMeals[time]
    return {
      name: 'Pasta a la mode',
      description: meal,
    }
  },
  getPet: ({ index }) => {
    return petList[index]
  },
  firstPet: () => {
    return petList[0]
  },
  allPets: () => {
    return petList
  },
  getTime:() => {
    const today = new Date()
    const hour = today.getHours() - 12
    const minute = today.getMinutes()
    const second = today.getSeconds()
    return { hour, second, minute }
  },
  getRandom:({ range }) => {
    return Math.floor(Math.random() * range)
  },
  getRoll:({ sides, rolls }) => {
    const dice = []
    let total = 0;
    for (let i = 0; i < rolls;i++){
      const num = Math.floor(Math.random() * sides)
      dice.push(num)
      total += num
    }
    console.log(rolls, sides, total)
    return { sides, rolls: dice, total }
  },
  countPets:() => {
    return petList.length
  },
  petCollection: () => {
    return {totalCount: petList.length, petList }
  },
  speciesCollection: () => {
    return ["Dog", "Cat","Fish","Lizard","Spider", "Insect"]
  },
  getSpecies:() => {
    return [
      {name: "Dog"},
      {name: "Cat"},
      {name: "Fish"},
      {name: "Lizard"},
      {name: "Spider"},
      {name: "Insect"}
    ]
  },
  getPetBySpecies:({species}) => {
    // filter by species using filter functio
    return petList.filter(pet => pet.species === species)
  }
}

// Define Pet Database
const petList = [
  { name: 'Fluffy', species: 'Dog'},
  { name: 'Sparkles', species: 'Cat'},
  { name: 'Bowser', species: 'Fish'},
  { name: 'Godzilla', species: 'Lizard'},
  { name: 'Arachne', species: 'Spider'},
]

// Create express app
const app = express()

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// Start this app
const port = 4000
app.listen(port, () =>  console.log(`Running on port ${port}`))