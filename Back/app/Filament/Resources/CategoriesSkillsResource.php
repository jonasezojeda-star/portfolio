<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoriesSkillsResource\Pages;
use App\Filament\Resources\CategoriesSkillsResource\RelationManagers;
use App\Models\CategoriesSkills;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CategoriesSkillsResource extends Resource
{
    protected static ?string $model = CategoriesSkills::class;

    protected static ?string $navigationIcon = 'phosphor-graph-fill';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title'),
                FileUpload::make('icon')
                    ->disk(env('FILESYSTEM_DISK'))
                    ->directory('categories-skills'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('icon'),
                TextColumn::make('title'),

            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCategoriesSkills::route('/'),
            'create' => Pages\CreateCategoriesSkills::route('/create'),
            'edit' => Pages\EditCategoriesSkills::route('/{record}/edit'),
        ];
    }
}
