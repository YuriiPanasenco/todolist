require('./bootstrap');

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'

Vue.use(VueResource)
Vue.use(VueForm);

Vue.http.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;


var app = new Vue({
    el: '#app',
    
    data:{
        page:'my' //my || available
    },
    
    components: {
        'myTaskList': require('./components/TaskList.vue'),
        'availableTaskList': require('./components/AvailableTaskList.vue'),
    },
});



