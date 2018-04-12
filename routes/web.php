<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/tasks', 'TasksController@index')->middleware('auth')->name('tasks');
Route::post('/tasks/add', 'TasksController@add')->middleware('auth')->name('tasks.add');
Route::post('/tasks/update', 'TasksController@update')->middleware('auth')->name('tasks.update');
Route::get('/tasks/delete/{id}', 'TasksController@delete')->middleware('auth')->name('tasks.delete');
Route::get('/tasks/share/{taskid}/{userid}', 'TasksController@share')->middleware('auth')->name('tasks.share');

Route::get('/statuses', 'StatusController@index')->middleware('auth')->name('statuses');


Route::get('/users/search/{search}', 'UsersController@search')->middleware('auth')->name('users.search');