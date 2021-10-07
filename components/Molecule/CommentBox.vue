<template>

  <div>

    <form @submit.prevent="commentSubmit()">

      <!--      {{ token }}-->
      <textarea v-model="text" class="form-control" placeholder="Write a comment..." id="comment"
                cols="30"
                rows="2" required></textarea>

      <button style="float: right" type="submit" class="btn btn-info mt-1">Submit</button>
    </form>

  </div>


</template>

<script>
import {mapActions} from "vuex";

import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  name: "CommentBox",
  data: () => ({
    text: ''
  }),

  props: ['blogId', 'comments_id'],

  methods: {

    ...mapActions({
      fetchBLogComment: "blog/fetchBLogComment"
    }),
    commentSubmit() {

      if (!localStorage.getItem('token')) {
        Toast.fire({
          icon: 'info',
          title: 'Please login first'
        });

        this.$router.push('/login');
        return false;
      }

      return this.$axios.post('comment/store', {
        blog_id: this.blogId,
        comments_id: this.comments_id,
        text: this.text,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {


          this.fetchBLogComment(this.blogId)

          this.text = '';

          Toast.fire({
            icon: 'success',
            title: response.data.message
          });


        })
        .catch((error) => {
          Toast.fire({
            icon: 'error',
            title: 'something went to wrong'
          });

        })

    }
  }
}
</script>

<style scoped>

</style>
