import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.config.productionTip = false

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const not = fun => arg => !fun(arg)
const completedTask = task => task.completed

const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    tasks: [
      {
        title: "Make todo list",
        completed: true
      },
      {
        title: "Go skydiving",
        completed: false
      }
    ],
    simple: "test-simple-me"
  },
  mutations: {
    addTask (state, task) {
      state.tasks.push(task);
    },
    toggleTask(state, task) {
      const index = state.tasks.indexOf(task)
      state.tasks[index].completed = !task.completed;
    },
    removeTask (state, index) {
      state.tasks.splice(index, 1);
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter(not(completedTask));
    },
    clearAll(state) {
      state.tasks = []
    }
  },
  getters: {
    allTodos: state => {
      return state.tasks
    },
    doneTodos: state => {
      return state.tasks.filter(completedTask)
    },
    countIncompleteTodos: state => {
      return state.tasks.filter(not(completedTask)).length
    }
  }
});


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
