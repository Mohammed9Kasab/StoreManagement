<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Validator;

class CategoryController extends BaseController
{
    public function index()
    {
        $org_id = auth()->user()->id;
        $categories = Category::all();
        if (is_null($categories)) {
            return $this->sendError("Couldn't find categories", ['error' => 'No categories found']);
        }
        return $this->sendResponse($categories, 'Categories retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'category_name' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $org_id = auth()->user()->id;
        $createCategory = ['name' => $input['category_name'],
            'organization_id' => $org_id,
        ];
        $category = new Category($createCategory);
        $category->save();
        return $this->sendResponse($category, 'Category created successfully.');
    }
    public function edit($id){
        $category=Category::find($id);
        return $category;
    }
    public function update(Request $request,$id){
        $category=Category::find($id);
        $category->name=$request->update_category_name;
        $category->save();
    }
    public function destroy($category_id)
    {
        $category = Category::find($category_id);
        $category->delete();
        return $this->sendResponse($category, 'Category deleted successfully.');
    }
}
