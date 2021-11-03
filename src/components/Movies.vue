<template>
  <!-- Filter Movies -->
  <div class="container-md mt-5">
      <div class="row">
          <div class="col-md-6">
            <div class="searchForm">
                <div class="input-group mb-3 shadow-sm">
                    <span class="input-group-text bg-white" id="basic-addon1">
                        <i class="fas fa-search"></i>
                    </span>
                    <input type="text" class="form-control py-2" placeholder="Search for a movie..." aria-label="Search" aria-describedby="basic-addon1" v-model="searchMovie">
                </div>
            </div>
          </div>
          <div class="col-md-3">
              <select class="form-select py-2 shadow-sm" v-model="filterByDirector">
                  <option value="">All Directors</option>
                  <option :value="director" v-for="director in eliminateDuplicatedDirectors($store.state.movies)" :key="director">
                      {{director}}
                  </option>
              </select>
          </div>
          <div class="col-md-3 mt-md-0 mt-3">
              <select class="form-select py-2 shadow-sm" v-model="filterByProducer">
                  <option value="">All Producers</option>
                  <option :value="producer" v-for="producer in eliminateDuplicatedProducers($store.state.movies)" :key="producer">
                      {{(producer)}}
                  </option>
              </select>
          </div>
      </div>
  </div>
  <!-- Matching # of movies -->
  <div v-if="matchingMovies" class="container-md fs-5 mt-md-0 mt-3">
      <p v-if="filterMovies.length == 0">No movies for 
          <div class="badge rounded-pill bg-secondary mx-1" v-if="searchMovie">{{searchMovie}}</div>
          <div class="badge rounded-pill bg-secondary mx-1" v-if="filterByDirector">{{filterByDirector}}</div>
          <div class="badge rounded-pill bg-secondary mx-1" v-if="filterByProducer">{{filterByProducer}}</div>
      </p>
      <p v-else>{{filterMovies.length}} movie(s) found for 
          <div class="badge rounded-pill bg-secondary mx-1" v-if="searchMovie">{{searchMovie}}</div>
          <div class="badge rounded-pill bg-secondary mx-1" v-if="filterByDirector">{{filterByDirector}}</div>
          <div class="badge rounded-pill bg-secondary mx-1" v-if="filterByProducer">{{filterByProducer}}</div>
      </p>
  </div>
  <!-- Movies -->
  <div class="container-md d-flex flex-wrap justify-content-between my-5">
    <div class="card mb-4 shadow-sm" v-for="movie in filterMovies" :key="movie.id">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="movie.image" class="img-fluid rounded-start" :alt="movie.title">
            </div>
            <div class="col-md-8">
                <div class="card-body mx-sm-2 mx-0">
                    <h4 class="card-title mb-4">{{movie.title}}</h4>
                    <p class="my-2"><b>Release Date: </b>{{movie.release_date}}</p>
                    <p class="my-2"><b>Running Time: </b>{{movie.running_time}} minutes</p>
                    <p class="my-2"><b>Score: </b>
                        <span class="score" :class="{
                            highScore: movie.rt_score <= 100,
                            avgScore: movie.rt_score < 90,
                            lowScore: movie.rt_score < 70,
                        }">
                            {{movie.rt_score}}
                        </span> 
                    </p>
                    <router-link :to="'/movie/' + movie.id" class="text-decoration-none text-white">
                        <button class="btn btn-secondary btn-sm mt-md-5 mt-4 d-flex align-items-center">
                            See More
                            <i class="fas fa-angle-double-right mx-1"></i>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Movies",
    data(){
        return{
            searchMovie: '',
            matchingMovies: false,
            filterByDirector: '',
            filterByProducer: ''
        }
    },
    computed: {
        filterMovies() {
            return this.$store.state.movies.filter(movie => {
                if(this.searchMovie || this.filterByDirector || this.filterByProducer){
                    this.matchingMovies = true
                }else if(this.searchMovie == ''){
                    this.matchingMovies = false
                }
                return movie.title.toLowerCase().includes(this.searchMovie.toLowerCase()) && 
                       movie.director.toLowerCase().includes(this.filterByDirector.toLowerCase()) &&
                       movie.producer.toLowerCase().includes(this.filterByProducer.toLowerCase()) 
            })
        }
    },
    methods:{
        eliminateDuplicatedDirectors(directors){
            let arr = []

            directors.forEach(item => {
                arr.push(item.director)
            })

            return [...new Set(arr)];
        },
        eliminateDuplicatedProducers(producers){
            let arr = []

            producers.forEach(item => {
                arr.push(item.producer)
            })

            return [...new Set(arr)];
        }
    }
}
</script>

<style>
    .card{
        max-width: 37rem;
    }
    .card img{
        width: 100%;
    }
    .score{
        height: 1rem;
        width: 1rem;
        padding: 0.35rem;
        border-radius: 50%;
        font-weight: bold;
        font-size: 0.8rem;
    }
    .highScore{
        background-color: rgb(0, 148, 0);
        color: #fff;
    }
    .avgScore{
        background-color: rgb(255, 255, 0);
        color: grey;
    }
    .lowScore{
        background-color: #f00;
        color: #fff;
    }
</style>