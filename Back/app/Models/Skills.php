<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skills extends Model
{
    use HasFactory;
    protected $table = 'skills';
    protected $fillable = [
        'name',
    ];

    //Relaciones
    public function categories()
    {
        return $this->belongsToMany(CategoriesSkills::class, 'category_skill_skill', 'skill_id', 'category_skill_id');
    }
}
