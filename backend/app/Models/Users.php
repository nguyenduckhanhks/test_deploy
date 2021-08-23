<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Users extends Authenticatable
{
    use HasApiTokens, Notifiable;

    const COMMON = 1;
    const ADMIN = 2;

    protected $fillable = [
        'username',
        'profile_title',
        'description',
        'avatar',
        'cover_image',
        'email',
        'email_verified_at',
        'password',
        'type',
        'theme',
        'count',
        'is_delete',
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];
}
