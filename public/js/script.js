/**
 * Created by dev on 05.04.18.
 */



Vue.component(
    'todo-item',
    {
        props: ['task'],
        template: '<li>{{task.name}}</li>',
    }
);

var app2 = new Vue({
    el: '#app2',
    data: {
        newTask:new Task(),
        showFormAddTask:false,
        task_list: []
    },
    methods: {
        addTask: function () {
            Task.save(this.$data.newTask, function (request) {
                // app2.$data.showFormAddTask=false;
                console.log(request);
            });
        },
    },
});

Task.loadTask(function (tasklist) {
    app2.$data.task_list = tasklist;
});




