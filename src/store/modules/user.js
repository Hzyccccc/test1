import { login, logout } from '@/api/user'
import { getUser, setUser, removeUser } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  userInfo: getUser() ? JSON.parse(getUser()) : ''// 用户信息
}

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginame, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginame: loginame, password: password }).then(response => {
        const data = response.data.user
        commit('SET_USER_INFO', data)
        setUser(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.userInfo.id).then(() => {
        commit('SET_USER_INFO', '')
        removeUser()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove userInfo
  resetUserInfo({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER_INFO', '')
      removeUser()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

