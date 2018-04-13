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

        <modal v-show='showEditForm'>
            <vue-form :state="formstate" @submit.prevent="saveTask">

                <validate tag="label">
                    <span>Name *</span>
                    <input class="input-text" v-model="currenttask.name" required name="name"/>

                    <field-messages name="name">
                        <div class="success">Success!</div>
                        <div slot="required" class="error">Name is a required field</div>
                    </field-messages>
                </validate>
                <validate tag="label">
                    <span>Description *</span>
                    <textarea class="input-text" v-model="currenttask.description" required
                              name="description"></textarea>

                    <field-messages name="description">
                        <div class="success">Success!</div>
                        <div slot="required" class="error">Description is a required field</div>
                    </field-messages>
                </validate>

                <validate tag="label">
                    <span>Status *</span>

                    <select required name="status" v-model="currenttask.status">
                        <option v-for="status in statuses" :value="status">
                            {{status.name}}
                        </option>
                    </select>
                    <field-messages name="status">
                        <div class="success">Success!</div>
                        <div slot="required" class="error">Status is a required field</div>
                    </field-messages>
                </validate>

                <button type="submit">Submit</button>
                <button @click.prevent="editTaskBreak">Cancle</button>

            </vue-form>
        </modal>

        <div class='block'>
            <button class='btn-add-task' @click='showEditForm=true'>add</button>
            <input class='search' type="text" placeholder="Search.." v-model='search' :class="{'search-s':isSearch}">
        </div>
        <div class='block'>
            <ul>
                <taskItem v-for="task in filteredTasks "
                          :key="task.id"
                          :task="task"
                          @deleteTask="deleteTask"
                          @editTask="editTask"
                          @shareTask="shareTask">
                </taskItem>
            </ul>
        </div>
    </div>

</template>

<script>

    import Status from '../model/Status';
    import Task from '../model/Task';

    export default {
        data(){
            return {
                showDeleteModal: false,
                showEditForm: false,
                search: '',
                currenttask: new Task(),
                tasks: [],
                showShareTaskModel: false,
                statuses: [],
                formstate: {}, //need for vue-for this is used for form validation
            };
        },
        components: {
            'modal': require('./modal/Modal.vue'),
            'yesNo': require('./modal/YesOrNo.vue'),
            'taskItem': require('./Tasktem.vue'),
            'shareTask': require('./ModalShareTask.vue'),
        },
        computed: {
            formCheck(){
                return this.formstate.$invalid;
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
        created (){
            this.loadTasks();
            this.loadStatuses();
        },

        methods: {
            loadTasks(){
                this.$http.get('/tasks').then(
                        function (responce) {
                            for (let i = 0; i < responce.data.length; i++) {
                                let task = Task.buildFromJson(responce.data[i]);
                                task.status = Status.buildFromJson(responce.data[i].status);
                                this.tasks.push(task);
                            }
                            this.loadStatuses();
                        }, function (error) {
                            //todo: error of getting all task from the server
                        }
                );
            },
            loadStatuses(){
                this.$http.get('/statuses').then(
                        function (responce) {
                            for (let i = 0; i < responce.data.length; i++) {
                                let status = Status.buildFromJson(responce.data[i]);
                                this.statuses.push(status);
                            }
                        }, function (error) {
                            //todo: error of getting all statuses from the server
                        }
                );
            },
            saveTask(){
                if (this.formstate.$invalid) {
                    return;
                }
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
    .success {
        color: #5a804d;
    }

    .error {
        color: #ff8786;
    }

    select {
        width: 100%;
        background-color: white;
        border: none;
        border-bottom: 1px solid;
        height: 30px;
    }

    label {
        width: 100%;
    }

    textarea {
        width: 100%;
        border-radius: 5px;
    }

    .input-text {
        width: 100%;
        border-radius: 5px;
        line-height: 30px;
    }

    ul {
        padding: 0px;
    }

    .btn-add-task {
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
        width: calc(100% - 55px);
    }
</style>