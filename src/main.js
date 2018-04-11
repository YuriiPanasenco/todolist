import Vue from 'vue'
import VueResource from 'vue-resource'


Vue.use(VueResource)


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

import TaskList from './components/TaskList.vue'


var app = new Vue({
	el: '#app',
	components:{
		'task-list':TaskList,
	},
})
