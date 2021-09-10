<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Counselor extends Model
{
    // use HasFactory;
    protected $collection = 'counselor';
    protected $primaryKey = '_id';
    protected $fillable = [
        'id_number',
        'title',
        'last_name',
        'first_name',
        'middle_name',
        'address',
        'gender',
        'degree',
        'hei',
        'designation',
        'contact',
        'email',
        'online'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'counselor_id', '_id');
    }

    public function appointment()
    {
        return $this->hasMany(Appointment::class, 'counselor_id', '_id');
    }

    public function webinar()
    {
        return $this->hasMany(Webinar::class, 'counselor_id', '_id');
    }

    public function availability()
    {
        return $this->hasMany(Availability::class, 'counselor_id', '_id');
    }

    public function college()
    {
        return $this->belongsTo(Partner::class, 'college_id');
    }
}
