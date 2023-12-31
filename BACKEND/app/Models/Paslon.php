<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paslon extends Model
{
    use HasFactory;

    public $table = "paslon";

    protected $fillable = [
        'name',
        'photo',
        'vision',
        'mission',
    ];
}

