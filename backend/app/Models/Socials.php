<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Socials extends Authenticatable
{
    const ARR_SOCIALS = [
        'user_id',
        'email',
        'count_email',
        'facebook',
        'count_facebook',
        'twitter',
        'count_twitter',
        'instagram',
        'count_instagram',
        'linkedin',
        'count_linkedin',
        'youtube',
        'count_youtube',
        'tiktok',
        'count_tiktok',
    ];
    
    protected $fillable = [
        'user_id',
        'email',
        'count_email',
        'facebook',
        'count_facebook',
        'twitter',
        'count_twitter',
        'instagram',
        'count_instagram',
        'linkedin',
        'count_linkedin',
        'youtube',
        'count_youtube',
        'tiktok',
        'count_tiktok',
    ];
}
