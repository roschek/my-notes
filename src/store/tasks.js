import firebase from 'firebase/app'

import Task from './task_help'

export default {
    state: {
        tasks: []
    },
    mutations: {
        loadTasks(state, payload) {
            state.tasks = payload
        },
        newTask(state, payload) {
            state.tasks.push(payload)
        }
    },
    actions: {
        async loadTasks({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                // const newTask = new Task(payload.title, payload.description, payload.whatIsIt, payload.editing, payload.completed, payload.tags, getters.get_user.id)
                const task = await firebase.database().ref('tasks').once('value')
                const tasks = task.val()
                const tasksArray = []
                Object.keys(tasks).forEach(key => {
                    const t = tasks[key]
                    tasksArray.push(new Task(
                        t.title,
                        t.description,
                        t.whatIsIt,
                        t.editing,
                        t.completed,
                        t.tags,
                        t.user,
                        key
                    ))
                })
                commit('loadTasks', tasksArray)

            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }

        },
        async newTask({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const newTask = new Task(payload.title, payload.description, payload.whatIsIt, payload.editing, payload.completed, payload.tags, getters.get_user.id)
                const task = await firebase.database().ref('tasks').push(newTask)
                commit('newTask', {...newTask, id: task.key })
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }

        },
        async deleteCard({ commit }, id) {
            commit('clearError')
            commit('setLoading', true)
            try {
                await firebase.database().ref('tasks').child(id).remove()
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        }
    },
    getters: {
        tasks(state, getters) {
            return state.tasks.filter(task => {
                return task.user === getters.get_user.id
            })
        }
    }
}