require('./bootstrap');

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'
import VueRouter from 'vue-router';


Vue.use(VueResource)
Vue.use(VueForm)
Vue.use(VueRouter)

import Available from './components/AvailableTaskList.vue';
import TaskList from './components/TaskList.vue';

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

var app = new Vue({
    router: new VueRouter({
        routes: [
            {path: '/', component: TaskList},
            {path: '/available', component: Available}
        ],
    }),
}).$mount('#app');



