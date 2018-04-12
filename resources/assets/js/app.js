require('./bootstrap');

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueForm from 'vue-form'

Vue.use(VueResource)
Vue.use(VueForm);

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
    el: '#app',
    
    data:{
        page:'my' //my || available
    },
    
    components: {
        'myTaskList': require('./components/TaskList.vue'),
        'availableTaskList': require('./components/AvailableTaskList.vue'),
    },
});



