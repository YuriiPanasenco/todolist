@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <a v-on:click="viewMyTodoList">My todo list</a>
                        <a v-on:click="viewAvailableTodoList">Available me todos</a>
                    </div>

                    <div class="panel-body">
                        <task-list v-show="isMyTaskList" :type="'my'"></task-list>
                        <task-list v-show="!isMyTaskList" :type="'available'"></task-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
