<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function search(Request $request, $search)
    {
        $users = User::where('name', 'like', '%' . $search . '%')->take(5)->get();
        return response($users, 200);
    }
}
