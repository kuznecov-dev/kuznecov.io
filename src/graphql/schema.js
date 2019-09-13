import { makeExecutableSchema } from 'graphql-tools'
import { skills, timeline, projects, sections } from './data'

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
  
  type Tag {
    title: String
  }
  
  type Section {
    name: String,
    url: String,
    title: String,
    tags: [Tag]
  } 

  type Query {
    skills: [Skill],
    timeline: [Range],
    projects: [Project],
    sections: [Section]
  } 
`

export const resolvers = {
    Query: {
        skills: () => skills,
        timeline: () => timeline,
        sections: () => sections,
        projects: () => projects
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})