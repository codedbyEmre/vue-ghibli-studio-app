import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    movies: []
  },
  mutations: {
    getMovies(state, movies){
      state.movies = movies
    }
  },
  actions: {
    getMoviesAction({commit}){
      axios('https://ghibliapi.herokuapp.com/films/').then(res => {
        // console.log(res.data);
        commit('getMovies', res.data)
      })
    }
  },
  modules: {
  }
})
