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

export const state = () => ({
  singleBlog: {},
  blogComments: [],
})


export const getters = {}

export const mutations = {
  singleBlog: (state, payload) => state.singleBlog = payload,
  blogComment: (state, payload) => state.blogComments = payload,
}


export const actions = {

  fetchBLogDetails({commit}, slug) {


    return new Promise((resolve, reject) => {
      this.$axios.get(`blogs/${slug}`)
        .then((response) => {

          commit('singleBlog', response.data.blog);

          resolve(response.data.blog);

        })
        .catch((error) => {
          Toast.fire({
            icon: 'error',
            title: 'something went to wrong'
          });
        })
    })

  },


  fetchBLogComment({commit}, blogId) {

    return this.$axios.get(`comment/${blogId}`)
      .then((response) => {

        commit('blogComment', response.data.data);

      })
      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'something went to wrong'
        });
      })

  },

}
