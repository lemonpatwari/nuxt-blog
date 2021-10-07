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
  user: {},
  token: '',
})

export const getters = {
  getUser: state => state.user,
  getToken: state => state.token,
}

export const mutations = {

  setUser: (state) => {
    let user = localStorage.getItem('user');
    state.user = JSON.parse(user)
  },

  setToken: (state) => {
    state.token = localStorage.getItem('token')
  }

}


export const actions = {

  userLogin({commit}, {username, password}) {
    return this.$axios.post('v1/login', {
      username: username,
      password: password,
    })
      .then((response) => {

        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        resolve(response.data);

      })
      .catch((error) => {

        /*if (error.response.status = 401){
          Toast.fire({
            icon: 'error',
            title: 'Email or password wrong'
          });
        }*/

      })

  },


}
