<template>
    <li>
        {{task.name}}
        <button @click='deleteTask'>delete task</button>
        <button @click='editTask'>edit task</button>
    </li>
</template>
<script>
    export default{
        props:['task'],
        methods:{
            deleteTask(){
                this.$emit('deleteTask',this.task);
            },
            editTask(){
                this.$emit('editTask',this.task);
            },
        },
    }
</script>
<style scoped>
    li{
        width: 100%;
        margin: 10px 0px;
        background-color: #c9d1db;
        border-radius: 5px;
        padding: 10px;
        list-style: none;

    }
    button{
        float: right;
        margin: 0px 3px;
    }
</style>