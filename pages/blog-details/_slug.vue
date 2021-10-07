<template>
  <div class="container my-4">
    <div v-if="blog" class="col-lg-8 col-md-8 col-sm-12 offset-lg-2 offset-md-2">
      <b-card
        :title="blog.name"
        :img-src="blog.banner_url"
        :img-alt="blog.name"
        img-top
        class="mb-2"
      >
        <b-card-text v-html="blog.blog_body"></b-card-text>

        <b-card-text>
          <h4>Categories: </h4>

          <b-badge class="mx-1" v-for="(category,index) in blog.categories">{{ category.title }}</b-badge>


          <h4 class="mt-2">Tags:</h4>

          <b-badge class="mx-1" v-for="(tag,index) in blog.tags">{{ tag.title }}</b-badge>

        </b-card-text>


        <div>
          <p>Comments:
          <p/>
          <b-list-group>
            <b-list-group-item v-for="(row,index) in blogComments" :key="index" class="align-items-center">
              <span class="text-info">{{ row.user.name }}</span>

              <br>

              <span>
               {{ row.text }}

              </span>

              <span>
                <molecule-comment-box :blogId="row.blog_id" :comments_id="row.id"/>
              </span>


              <b-list-group-item v-for="(innerRow,index) in row.comments" :key="index" class="align-items-center mt-5">
                <span class="text-info">{{ innerRow.user.name }}</span>

                <br>

                <span>
               {{ innerRow.text }}

              </span>

              </b-list-group-item>




            </b-list-group-item>

          </b-list-group>
        </div>

      </b-card>


      <Molecule-comment-box :blogId="blog.id"/>

    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Details-Page",
  computed: {
    ...mapState({
      blog: state => state.blog.singleBlog,
      blogComments: state => state.blog.blogComments,
    }),
  },
  methods: {
    ...mapActions({
      fetchBLogDetails: "blog/fetchBLogDetails",
      fetchBLogComment: "blog/fetchBLogComment"
    }),
  },
  created() {
    this.fetchBLogDetails(this.$route.params.slug).then((res) => {

      this.fetchBLogComment(res.id)

    })
  }
}
</script>

<style scoped>

</style>
