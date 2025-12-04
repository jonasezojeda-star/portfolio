<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoriesSkills extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'categories_skills';
    protected $fillable = [
        'title',
        'icon',
    ];

    //Relaciones
    public function skills()
    {
        return $this->belongsToMany(Skills::class, 'category_skill_skill', 'category_skill_id', 'skill_id');
    }
}
