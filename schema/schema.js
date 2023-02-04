const graphql = require('graphql');
const Movie = require('../models/movieModel');
const Actor = require('../models/actorModel');
const Author = require('../models/authorModel');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    location: { type: GraphQLString },
    actor: {
      type: ActorType,
      resolve(parent, args) {
        return Actor.findByPk(parent.actorId);
      },
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findByPk(parent.authorId);
      },
    },
  }),
});

const ActorType = new GraphQLObjectType({
  name: 'Actor',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.findOne({ where: { actorId: parent.id } });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.findOne({ where: { authorId: parent.id } });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findByPk(args.id);
      },
    },
    actor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Actor.findByPk(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findByPk(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.findAll({});
      },
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return Actor.findAll({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.findAll({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addActor: {
      type: ActorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let actor = new Actor({
          name: args.name,
          age: args.age,
        });
        return actor.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        actorId: { type: new GraphQLNonNull(GraphQLID) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let movie = new Movie({
          title: args.title,
          genre: args.genre,
          location: args.location,
          actorId: args.actorId,
          authorId: args.authorId,
        });
        return movie.save();
      },
    },
    deleteAuthor: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const author = await Author.findOne({ where: { id: args.id } });
        if (author) {
          return Author.destroy({ where: { id: args.id } });
        } else {
          throw new Error('No Author found with that id');
        }
      },
    },
    deleteActor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const actor = await Actor.findOne({ where: { id: args.id } });
        if (actor) {
          return Actor.destroy({ where: { id: args.id } });
        } else {
          throw new Error('No Actor found with that id');
        }
      },
    },
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const movie = await Movie.findOne({ where: { id: args.id } });
        if (movie) {
          return Movie.destroy({ where: { id: args.id } });
        } else {
          throw new Error('No Movie found with that id');
        }
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const actor = await Movie.findOne({ where: { id: args.id } });
        if (actor) {
          const { title, genre, location } = args;
          await Movie.update(args, { where: { id: args.id } });
          return args;
        } else {
          throw new Error('No movie found with that id');
        }
      },
    },
    updateActor: {
      type: ActorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const actor = await Actor.findOne({ where: { id: args.id } });
        if (actor) {
          const { name, age } = args;
          await Actor.update(args, { where: { id: args.id } });
          return args;
        } else {
          throw new Error('No Actor found with that id');
        }
      },
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const author = await Author.findOne({ where: { id: args.id } });
        if (author) {
          const { name, age } = args;
          await Author.update(args, { where: { id: args.id } });
          return args;
        } else {
          throw new Error('No Author found with that id');
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
