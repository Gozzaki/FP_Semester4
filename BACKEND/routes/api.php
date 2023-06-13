<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaslonController;
use App\Http\Controllers\VoteController;

Route::post('/register', [UserController::class, 'register']); //done
Route::post('/login', [UserController::class, 'login']); //done

Route::middleware("user.api")->group(function () {
    Route::get('/paslons', [UserController::class, 'get_data_paslon']); //done
    Route::get('/paslons/{id}', [UserController::class, 'get_paslon_by_id']); //done
    Route::post('/vote/{paslonId}', [VoteController::class, 'vote']); //done
    Route::get('/vote', [VoteController::class, 'getUserVotes']); //done
    // Route::get('/votes/count', [VoteController::class, 'getTotalVotes']); 
    Route::get('/votes/count', [VoteController::class, 'get_all_vote']);  //done
    Route::get('/paslons', [UserController::class, 'get_data_paslon']);  //done 
    Route::get('/paslons/{id}', [UserController::class, 'get_paslon_by_id']); 
});
// =====user


// ===admin
Route::middleware("admin.api")->group(function () {
    Route::post('/tambah/paslons', [UserController::class, 'post_data_paslon']); //done
    Route::post('/edit/paslons/{id}', [UserController::class, 'update_data_paslon_by_id']);//done
    Route::delete('/hapus/paslons/{id}', [UserController::class, 'delete_paslon']); //done
    Route::get('/admin/paslons', [UserController::class, 'get_data_paslon']); //done
    Route::get('/admin/votes/count', [VoteController::class, 'get_all_vote']);  //done
    Route::get('/admin/get-users', [UserController::class, 'get_all_user']); //done
    Route::get('/admin/get-users-by-id/{id}', [UserController::class, 'get_user_by_id']); //done
    Route::put('/update-users/{id}', [UserController::class, 'update_user']);
    Route::delete('/hapus-users/{id}', [UserController::class, 'delete_user']);
});

// =====belom di ganti
