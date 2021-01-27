<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'quantity',
        'organization_id',
        'category_id',
        'origin_id',
        'choice_id',
        'size_id',
        'image_path'
    ];
    public function category() {
        return $this->hasOne(Category::class);
    }
    public function origin() {
        return $this->hasOne(Origin::class);
    }
    public function choice() {
        return $this->hasOne(Choice::class);
    }
    public function size() {
        return $this->hasOne(Size::class);
    }
}
