<template>
    <div id="reviews" class="page-background container-fluid">
        <nav-bar/>
        <div id="page-content">
    
            <h2>Reviews</h2>
            <div v-for="review in reviews" :key="review.id">
                {{review.content}} - <i>{{ review.postedBy}}</i>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'reviews',
    data() {
        return {
            reviews: []
        }
    },
    mounted(){
        this.fetchReviews()
    },
    methods:{
        fetchReviews: async function(){
            const response = await this.$server().get('api/reviews')
            console.log(response)
            this.reviews = response.data
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
