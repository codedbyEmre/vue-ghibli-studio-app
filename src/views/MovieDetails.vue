<template>
  <Header />
  <div class="container-md my-5">
    <div v-for="movie in $store.state.movies" :key="movie.id">
        <div v-if="movie.id == $route.params.id">
            <div class="row">
                <div class="col-md-6">
                    <img :src="movie.movie_banner" :alt="movie.title" class="img-fluid img-thumbnail h-100 w-100">
                </div>
                <div class="col-md-6">
                    <h1 class="mb-4 mt-md-0 mt-4">{{movie.title}}</h1>
                    <p class="my-2"><b>Original Title: </b>{{movie.original_title}}</p>
                    <p class="my-2"><b>Romanised Title: </b>{{movie.original_title_romanised}}</p>
                    <p class="my-2"><b>Score: </b>
                        <span class="score" :class="{
                            highScore: movie.rt_score <= 100,
                            avgScore: movie.rt_score < 90,
                            lowScore: movie.rt_score < 70,
                        }">
                            {{movie.rt_score}}
                        </span> 
                    </p>
                    <p class="my-2"><b>Director: </b>{{movie.director}}</p>
                    <p class="my-2"><b>Producer: </b>{{movie.producer}}</p>
                    <p class="my-2"><b>Release Date: </b>{{movie.release_date}}</p>
                    <p class="my-2"><b>Running Time: </b>{{movie.running_time}} minutes</p>
                    <h3 class="mt-4 mb-2">Description</h3>
                    <p>{{movie.description}}</p>
                    <router-link to="/" class="text-white text-decoration-none">
                        <button class="btn btn-secondary mt-md-4 mt-3">
                            <i class="fas fa-arrow-left mx-1"></i>
                            Back
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },

}
</script>

