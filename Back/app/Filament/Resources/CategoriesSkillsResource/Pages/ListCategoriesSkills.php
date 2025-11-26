<?php

namespace App\Filament\Resources\CategoriesSkillsResource\Pages;

use App\Filament\Resources\CategoriesSkillsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCategoriesSkills extends ListRecords
{
    protected static string $resource = CategoriesSkillsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
