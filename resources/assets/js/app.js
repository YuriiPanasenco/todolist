require('./bootstrap');

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'

Vue.use(VueResource)
Vue.use(VueForm);

Vue.http.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;


var app = new Vue({
    el: '#app',
    components: {
        'tasklist': require('./components/TaskList.vue'),
    },
});



