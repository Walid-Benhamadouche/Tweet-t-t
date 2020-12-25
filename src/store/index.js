import { createStore } from 'vuex'
import { UserModule } from './User'

export default createStore({
  state: {},
  //mutations are functions that effect the state
  mutations: {},
  //actions are function that you call throughout your application that call mutations
  actions: {},
  modules: {
    User: UserModule
  }
})
