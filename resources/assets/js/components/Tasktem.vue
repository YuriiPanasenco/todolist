<template>
    <li>
        {{task.name}}
        <div class="rigth-block">
            <a @click='shareTask'><i  class="far fa-share-square"></i></a>
            <a @click='editTask'><i class="far fa-edit"></i></a>
            <a @click='deleteTask'><i class="far fa-trash-alt"></i></a>
        </div>
    </li>
</template>
<script>
    export default{
        props: ['task'],
        methods: {
            deleteTask(){
                this.$emit('deleteTask', this.task);
            },
            editTask(){
                this.$emit('editTask', this.task);
            },
            shareTask(){
                this.$emit('shareTask', this.task);
            }
        },
    }
</script>
<style scoped>

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
    li:hover{
        background-color: #fff4cc;
        transform: scale(1.03);
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

    }

    button {
        float: right;
        margin: 0px 3px;
    }
</style>