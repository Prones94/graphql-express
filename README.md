## Challenge 1
  - Make an Array of objects.Each object should have at least three properties

## Challenge 2
  - Make a Type in your schema for your objects

## Challenge 3
  - Make a Query type that will return all of the things
  - Write a resolver for your query

## Challenge 4
  - Test your work in Graphiql

## Challenge 5
  - Add a query that returns a thing at an index

## Challenge 6
  - Add a new resolver. The parameters from the query will be received in resolver function

## Challenge 7
  - Test your work, write a query in Graphiql

## Challenge 8
  - Write a query that gets the last item and the first item from the collection

## Challenge 9
  - Write a resolver that gets the time and returns an object with the properties: hour, minute, second

## Challenge 10
  - Write a query type and resolver that makes the GraphQL query below function
  {
    getRandom(range: 100)
  }

  {
    "data": {
      "getRandom": 77
    }
  }

## Challenge 11
  - Create a type that represents a die roll. It should take the number of dice and the number of sides on each die. It should return the total of all dice rolls, sides, and an array of the rolls

## Challenge 12
  - Add a query that returns the count of elements in your collection. Will need to add a query and a resolver

## Challenge 13
  - Add a query that returns some of your collection in a range
  {
  petsInRange(start: 0, count: 2) {
    name
  }
}


## Challenge 14
  - Get things by one of their features

## Challenge 15
  - Choose a field. This query should return a ll of these values that exist in the things in yyou list. Works best for a field with a fixed or limited set of values, like a field that uses an enum as its type
