import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firebase-messaging'
import 'firebase/storage'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(Uimini)

new Vue({
    router,
    store,
    created() {
        var firebaseConfig = {
            apiKey: "AIzaSyBlH518LPqM4VqHHzgvVUiIVdWbs4iQT6s",
            authDomain: "my-diary-3ce40.firebaseapp.com",
            databaseURL: "https://my-diary-3ce40.firebaseio.com",
            projectId: "my-diary-3ce40",
            storageBucket: "my-diary-3ce40.appspot.com",
            messagingSenderId: "225828937714",
            appId: "1:225828937714:web:e2ce42fd19999f0cb1956b",
            measurementId: "G-Z67NLNE4BT"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('loggedUser', user)
            }
            this.$store.dispatch('loadTasks')
        })
    },
    render: h => h(App)
}).$mount('#app')