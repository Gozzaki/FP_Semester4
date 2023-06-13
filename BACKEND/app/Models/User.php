<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nama',
        'nis',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
    ];

    public static function rules()
    {
        return [
            'nama' => 'required|string',
            'nis' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'string|in:user,admin',
        ];
    }
}

