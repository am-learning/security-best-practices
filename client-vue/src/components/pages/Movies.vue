<template>
    <div id="movies" class="page-background container-fluid">
        <nav-bar/>
        <div id="page-content">

            <h2>Movies</h2>
            <h4>{{serverMessage}}. here are your favorite movies</h4>
            <div v-for="(m,key) in theater.movies" :key="key">
                {{key }}: {{m.title}} - <i>{{ m.genre}}</i>
            </div>
            
        </div>
    </div>
</template>


<script>
export default {
    name: 'movies',
    data() {
        return {
            theater: [
                {
                    id: 1,
                    name:'UA DENVER PAVILIONS STADIUM 15 & RPX',
                    address: '500 16th St., Denver, CO 80202',
                    coordinates: [39.743124,-104.990702],
                    movies: [
                        {title: 'Hunter Killer', genre: 'Thriller, Action, Suspense', year: 2018},
                        {title: 'Indivisible', genre: 'Drama, War', year: 2018},
                        {title: 'Lord of The Rings: The house of elrond', genre: 'Fantacy', year: 2001}
                    ]
                }
            ],
            serverMessage: ''
        }
    },
    mounted(){
        this.fetchMovies()
    },
    methods:{
        fetchMovies: async function(){
            const response = await this.$server().get('public/movies')
            console.log(response)
            this.serverMessage  = response.data.message
            this.theater.movies = response.data.movies    
        }
    }
    
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
