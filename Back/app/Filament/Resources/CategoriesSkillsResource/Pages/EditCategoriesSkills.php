<?php

namespace App\Filament\Resources\CategoriesSkillsResource\Pages;

use App\Filament\Resources\CategoriesSkillsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCategoriesSkills extends EditRecord
{
    protected static string $resource = CategoriesSkillsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
