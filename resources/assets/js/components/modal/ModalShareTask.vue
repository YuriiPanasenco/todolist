<template>
    <div>
        <modal>
            <h3>Поделиться задачей: {{task.name}}</h3>
            <input list="browsers" v-model='search' @input="performSearch" @change="change"
                   placeholder="Enter username ...">
            <datalist id="browsers">
                <option v-for="user in users" :value="user.name"></option>
            </datalist>
            <div class="footer">
                <button @click="share">share</button>
                <button @click="closeTheWindow">cancle</button>
            </div>
        </modal>
        <modal v-show="showMessage">
            <message @ok="closeTheWindow">
                Вы успешно полелились задачей: {{task.name}}
            </message>
        </modal>
    </div>
</template>
<script>

    import User from '../../model/User';

    export default{
        props: ['task'],

        components: {
            'modal': require('./Modal.vue'),
            'message': require('./Message.vue'),
        },
        data(){
            return {
                search: "",
                users: [],
                user: undefined,
                showMessage: false,
            };
        },
        computed: {
            userSelected(){
                return this.user !== undefined;
            },
            changedUser(){
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].name == this.search) {
                        return this.users[i];
                    }
                }
            },
        },
        methods: {
            change(){
                this.user = this.changedUser;
                console.log(this.user);
            },
            performSearch(){
                this.user = undefined;
                if (this.search != '') {
                    this.loadUsersFromServer();
                }
            },
            loadUsersFromServer(){
                this.$http.get('/users/search/' + this.search).then(
                        function (responce) {
                            this.users = [];
                            for (let i = 0; i < responce.data.length; i++) {
                                let user = new User(
                                        responce.data[i].id,
                                        responce.data[i].name,
                                        responce.data[i].email);
                                this.users.push(user);
                            }
                        }, function (error) {
                            //todo: error of getting all task
                        }
                );
            },

            share(){
                if (!this.userSelected) {
                    console.error('user doesn\'t selected')
                    return;
                }

                this.$http.get('/tasks/share/' + this.task.id + '/' + this.user.id).then(
                        function () {
                            this.showMessage = true;
                        }, function (error) {
                            //todo: error of sharing
                        }
                );
            },
            closeTheWindow(){
                this.search = '';
                this.showMessage = false;
                this.$emit('close');
            }
        }
    }
</script>
<style>

    button {
        background-color: #3d8adc;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 3px 10px;
    }

    .footer {
        width: 100%;
        padding-top: 20px;
    }

    input {
        width: 100%;
        border-radius: 3px;
        line-height: 30px;
        font-size: 16px;
    }
</style>