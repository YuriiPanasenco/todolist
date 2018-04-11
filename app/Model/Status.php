<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    public function tasks(){
        return $this->hasMany('App\Model\Task');
    }
}
