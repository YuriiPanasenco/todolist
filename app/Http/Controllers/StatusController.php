<?php

namespace App\Http\Controllers;

use App\Model\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $statuses = Status::all();
            return response($statuses, 200);
        } else {
            return response("not found", 404);
        }
    }
}
