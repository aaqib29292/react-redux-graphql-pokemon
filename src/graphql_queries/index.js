import { gql } from 'apollo-boost';

export const getDataQuery = gql`query GetData($first: Int!) {
                                  pokemons(first: $first) {
                                    id
                                    number
                                    name
                                    types
                                    image
                                    classification
                                  }
                                }`

export const getPokemonDetails = gql`query getPokemonDetails($id: String) {
                                       pokemon(id: $id) {
                                         number
                                         name
                                         types
                                         weaknesses
                                         image
                                         evolutions {
                                           id
                                           name
                                           image
                                           number
                                         }
                                       }
                                     }`
