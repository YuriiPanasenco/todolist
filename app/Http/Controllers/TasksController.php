<?php

namespace App\Http\Controllers;

use App\Model\Task;
use App\User;
use App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{

    public function index(Request $request)
    {
        if ($request->ajax()) {
            $user = User::find(Auth::id());
            $tasks = $user->tasks()->with('status')->get()->toJson();
            return response($tasks, 200);
        } else {
            return response("not found", 404);
        }
    }

    public function add(Request $request)
    {
        if ($request->ajax()) {
            $json = json_decode($request->getContent(), true);
            $task = new Task;
            $task->name = $json['name'];
            $task->description = $json['description'];
            $task->user()->associate(User::find(Auth::id()));
            $task->status()->associate(App\Model\Status::find($json['status']['id']));
            $task->save();
            return response($task, 200);
        } else {
            return response("not found", 404);
        }
    }

    public function update(Request $request)
    {
        if ($request->ajax()) {
            $json = json_decode($request->getContent(), true);
            $task = App\Model\Task::find($json['id']);
            $task->status()->associate(App\Model\Status::find($json['status']['id']));
            $task->name = $json['name'];
            $task->description = $json['description'];
            $task->description = $json['description'];
            $task->save();
            return response($task, 200);
        } else {
            return response("not found", 404);
        }
    }

    public function share(Request $request, $taskId, $userId)
    {
        if ($request->ajax()) {
            $user = User::find(Auth::id());

            $task = $user->tasks()->where('id', $taskId)->get()[0];

            $task->shareUsers()->save(User::find($userId));
            $task->save();
            return response($task->shareusers, 200);
        } else {
            return response("not found", 404);
        }
    }

    public function availables(Request $request)
    {
        if ($request->ajax()) {
            $user = User::find(Auth::id());
            $tasks = $user->shareTasks()->with('user')->with('status')->get()->toJson();

            return response($tasks, 200);
        } else {
            return response("not found", 404);
        }
    }

    public function delete(Request $request, $id)
    {
        if ($request->ajax()) {
            $task = Task::find($id);
            $task->shareUsers()->detach($task->shareUsers);
            $task->delete();
            return response("true", 200);
        } else {
            return response("not found", 404);
        }
    }
}
