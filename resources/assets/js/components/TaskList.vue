<template>
    <div>
        <modal v-show='showDeleteModal'>
            <yesNo @yes='deleteTaskSuccess'
                   @no='deleteTaskBreak'>
                Вы действиетельно хотите удали задачу: {{currenttask.name}}?
            </yesNo>
        </modal>

        <shareTask v-show='showShareTaskModel'
                   :task="currenttask"
                   @close="showShareTaskModel=false">
        </shareTask>

        <editTask v-show='showEditForm'
                  :task="currenttask"
                  :statuses="statuses"
                  @break="editTaskBreak"
                  @save="saveTask">
        </editTask>


        <div class='block'>
            <button v-if="isMyTask" class='btn-add-task' @click='showEditForm=true' :class="{'search-s-all':isMyTask}" >add</button>
            <input class='search' type="text" placeholder="Search.." v-model='search' >
        </div>
        <div class='block'>
            <ul>
                <li v-for="task in filteredTasks ">
                    {{task.name}}
                    <div class="rigth-block">
                        <a v-if="isMyTask" @click='shareTask(task)'><i class="far fa-share-square"></i></a>
                        <a @click='editTask(task)'><i class="far fa-edit"></i></a>
                        <a v-if="isMyTask" @click='deleteTask(task)'><i class="far fa-trash-alt"></i></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>

    import Status from '../model/Status';
    import Task from '../model/Task';

    export default {
        props: ['type'], //type is srting variable. (my|available)
        data(){
            return {
                showDeleteModal: false,
                showEditForm: false,
                search: '',
                currenttask: new Task(),
                tasks: [],
                showShareTaskModel: false,
                statuses: [],
            };
        },
        components: {
            'modal': require('./modal/Modal.vue'),
            'yesNo': require('./modal/YesOrNo.vue'),
            'shareTask': require('./modal/ModalShareTask.vue'),
            'editTask': require('./modal/ModalEditTodo.vue'),
        },
        computed: {
            isMyTask(){
                return this.type === 'my';
            },
            isSearch(){
                return this.search.length > 0;
            },
            filteredTasks: function () {
                var articles_array = this.tasks,
                        searchString = this.search;

                if (!searchString) {
                    return articles_array;
                }

                searchString = searchString.trim().toLowerCase();

                articles_array = articles_array.filter(function (item) {
                    if (item.name.toLowerCase().indexOf(searchString) !== -1) {
                        return item;
                    }
                })

                // Возвращает массив с отфильтрованными данными.
                return articles_array;
                ;
            }
        },
        created() {
            this.statuses = this.$store.getters.statuses;
            this.loadTasks();
        },
        methods: {
            loadTasks() {
                let requestPath = '/tasks';
                if (this.isMyTask) {
                    requestPath = '/tasks';
                }else{
                    requestPath = '/tasks/availables';
                }
                this.$http.get(requestPath).then(
                        function (responce) {
                            for (let i = 0; i < responce.data.length; i++) {
                                let task = Task.buildFromJson(responce.data[i]);
                                task.status = Status.buildFromJson(responce.data[i].status);
                                this.tasks.push(task);
                            }
                        }, function (error) {
                            //todo: error of getting all task from the server
                        }
                );
            },

            saveTask() {
                if (this.currenttask.isNew()) {
                    this.$http.post('/tasks/add', JSON.stringify(this.currenttask)).then(
                            function (responce) {
                                this.currenttask.id = responce.body.id;
                                this.tasks.push(this.currenttask);
                                this.currenttask = new Task();
                            }, function () {
                                //todo : error add task on the server
                            }
                    );
                } else {
                    this.$http.post('/tasks/update', JSON.stringify(this.currenttask)).then(
                            function () {
                                for (let i = 0; i < this.tasks.length; i++) {
                                    if (this.tasks[i].id == this.currenttask.id) {
                                        this.$set(this.tasks, i, this.currenttask);
                                        this.currenttask = new Task();
                                        break;
                                    }
                                }
                            }, function () {
                                //todo : error add task on the server
                            }
                    );
                }
                this.showEditForm = false;
            },
            shareTask(task){
                this.currenttask = task;
                this.showShareTaskModel = true;
            },
            deleteTask(task){
                this.currenttask = task;
                this.showDeleteModal = true;
            },
            deleteTaskSuccess(){
                this.$http.get('tasks/delete/' + this.currenttask.id).then(
                        function () {
                            for (let i = 0; i < this.tasks.length; i++) {
                                if (this.tasks[i].id == this.currenttask.id) {
                                    this.$delete(this.tasks, i);
                                    break;
                                }
                            }
                        }, function (error) {
                            //todo: error of deleting the task from the server
                            console.log(error);
                        }
                );
                this.showDeleteModal = false;
            },
            deleteTaskBreak(){
                this.showDeleteModal = false;
                this.currenttask = new Task();
            },
            editTask(task){
                this.currenttask = task.copy();
                this.showEditForm = true;
            },
            editTaskBreak(){
                this.showEditForm = false;
                this.currenttask = new Task();
            },
        },
    }
</script>
<style scoped>
    ul {
        padding: 0px;
    }

    .rigth-block {
        position: absolute;
        right: 2%;
        top: 20%;
    }

    .rigth-block a {
        margin: 3px;
    }

    li {
        width: 100%;
        margin: 10px 0px;
        background-color: #d4ebff7a;
        border-radius: 5px;
        padding: 10px;
        list-style: none;
        position: relative;
        transition-duration: 0.2s;
    }

    li:hover {
        background-color: #fff4cc;
        transform: scale(1.03);
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

    }

    button {
        float: right;
        margin: 0px 3px;
    }

    .btn-add-task {
        width: 15%;
        border: none;
        border-radius: 5px;
        height: 35px;
        background-color: #addeac;
        color: #000000;
    }

    .btn-add-task:hover {
        background-color: #64c162;
        color: #000;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
        transform: scale(1.1);
        backface-visibility: hidden;
        transition: 0.2s;
    }

    .block {
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 15px;
        padding: 10px;
        text-align: left;
    }

    .search {
        width: 130px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: white;
        background-image: url('./searchicon.png');
        background-position: 10px 10px;
        background-size: 25px;
        background-repeat: no-repeat;
        padding: 12px 20px 12px 40px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
    }

    .search:focus, .search-s {
        width: 80%;
    }
</style>