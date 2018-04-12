<template>
    <div>
        <div class='block'>
            <input class='search' type="text" placeholder="Search.." v-model='search' :class="{'search-s':isSearch}">
        </div>
        <div class='block'>
            <ul>
                <li v-for="task in filteredTasks ">{{task.name}}</li>
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
        },

        methods: {
            loadTasks(){
                this.$http.get('/tasks/availables').then(
                        function (responce) {
                            console.log(responce);
                            for (let i = 0; i < responce.data.length; i++) {
                                let task = new Task(
                                        responce.data[i].id,
                                        responce.data[i].name,
                                        responce.data[i].description);
                                if (responce.data[i].status_id != null) {
                                    task.status = new Status(responce.data[i].status_id, '');
                                }
                                this.tasks.push(task);
                            }
                        }, function (error) {
                            //todo: error of getting all available task
                        }
                );
            },
        },
    }
</script>
<style scoped>

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

    ul {
        padding: 0px;
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
        width: calc(100%);
    }
</style>