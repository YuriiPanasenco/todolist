@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <a v-on:click="page='my'">My todo list</a>
                        <a v-on:click="page='available'">Available me todos</a>
                    </div>

                    <div class="panel-body">
                        @if (session('status'))
                            <div class="alert alert-success">
                                {{ session('status') }}
                            </div>
                        @endif

                        <my-task-list v-if="page=='my'"></my-task-list>
                        <available-task-list v-if="page=='available'"></available-task-list>
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection
