<?php

namespace App\Models;

use Jenssegers\Mongodb\Auth\User as Authenticatable;

class User extends Authenticatable
{
    // use HasFactory, Notifiable;
    protected $primaryKey = '_id';
    protected $collection = 'users';

    protected $fillable = [
        'username',
        'password',
        'type'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function counselor()
    {
        return $this->belongsTo(Counselor::class, 'counselor_id');
    }
}
