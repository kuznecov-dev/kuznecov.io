import { buildSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { skills, timeline, projects } from './data'

export const typeDefs = `
  type Skill {
    title: String,
    hash: String,
    progress: Int,
    text: String,
  }
  
  type Range {
    title: String,
    date: String,
    status: String,
    text: String,
  }
  
  type Project {
    id: Int,
    title: String,
    tag: String,
    url: String,
    text: String,
  }

  type Query {
    skills: [Skill],
    timeline: [Range],
    projects: [Project]
  } 
`

export const resolvers = {
    Query: {
        skills: () => skills,
        timeline: () => timeline,
        projects: () => projects
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})