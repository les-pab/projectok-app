<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Partner extends Model
{
    protected $collection = 'partner';
    protected $primaryKey = '_id';

    public function counselor()
    {
        return $this->hasMany(Counselor::class, 'college_id', '_id');
    }
}
