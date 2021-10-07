<template>
  <div id="blog" class="my-4">
    <div class="container">
      <div class="row">
        <div v-for="(row,index) in blogs" class="col-lg-4 col-md-4 col-sm-6">
          <Molecule-card :blog="row"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    blogs: []
  }),
  methods: {

    async fetchBlogs() {

      return await this.$axios.get('blogs/index')
        .then((response) => {
          this.blogs = response.data.blogs;
        })
        .catch((error) => {

        })
    },


  },
  created() {
    this.fetchBlogs()
  }
}
</script>

<style scoped>
#blog {

}
</style>
