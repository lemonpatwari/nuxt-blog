<template>
  <b-card
    :title="blog.name"
    :img-src="blog.banner_url"
    :img-alt="blog.name"
    img-top
    class="mb-2"
  >
    <b-card-text v-html="blog.blog_body.substr(0,50)"></b-card-text>

    <b-button :to="`blog-details/${blog.slug}`" variant="primary">Details</b-button>

  </b-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Card",
  props: {
    blog: {
      type: Object
    }
  },
  methods: {
    ...mapActions({
      fetchBLogDetails: "blog/fetchBLogDetails"
    }),
  },
  created() {
    this.fetchBLogDetails()
  }
}
</script>

<style scoped>

</style>
