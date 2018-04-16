require('./bootstrap');

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'
import VueRouter from 'vue-router';
import Vuex from 'vuex'

Vue.use(VueResource)
Vue.use(VueForm)
Vue.use(VueRouter)
Vue.use(Vuex)

import Available from './components/AvailableTaskList.vue';
import TaskList from './components/TaskList.vue';
import Status from './model/Status';

Vue.http.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

const store = new Vuex.Store({
    state: {
        statuses: []
    },
    mutations: {
        ADD_STATUS(state, status) {
            state.statuses.push(status);
        }
    },
    actions: {
        loadStatuses({commit},obj) {
            if(this.state.statuses.length==0){
                obj.$http.get('/statuses').then(
                    function (responce) {
                        this.statuses = [];
                        for (let i = 0; i < responce.data.length; i++) {
                            let status = Status.buildFromJson(responce.data[i]);
                            commit('ADD_STATUS', status);
                        }
                    }, function (error) {
                        //todo: error of getting all statuses from the server
                    }
                );
            }
        }
    },
    getters:{
        statuses(state) {
            return state.statuses;
        }
    }
})


var app = new Vue({
    store,
    created(){
        this.$store.dispatch('loadStatuses',this);
    },
    router: new VueRouter({
        routes: [
            {path: '/', component: TaskList},
            {path: '/available', component: Available}
        ],
    }),

}).$mount('#app');



