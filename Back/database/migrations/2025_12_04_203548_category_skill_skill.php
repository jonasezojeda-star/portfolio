<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_skill_skill', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_skill_id')->constrained('categories_skills');
            $table->foreignId('skill_id')->constrained('skills');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_skill_skill');
    }
};
