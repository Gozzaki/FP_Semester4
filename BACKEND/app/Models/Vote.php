<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'paslon_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function paslon()
    {
        return $this->belongsTo(Paslon::class);
    }
}

