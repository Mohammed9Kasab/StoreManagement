<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class ItemController extends BaseController
{
    public function getAllItems()
    {
        $org_id = auth()->user()->id;
        $query = "SELECT  items.id as id ,items.name as name,categories.name
 as category_name,choices.name as choice_name,origins.name as origin_name,
 sizes.name as size_name,image_path,items.quantity as quantity
                FROM items
                INNER JOIN categories  on items.category_id = categories.id
                INNER JOIN choices  on items.choice_id = choices.id
                INNER JOIN origins  on items.origin_id = origins.id
                INNER JOIN sizes  on items.size_id = sizes.id
                ";
        $items = DB::Select($query);
        if (is_null($items)) {
            return $this->sendError("Couldn't find organization Items ", ['error' => 'No items found']);
        }
        return $this->sendResponse($items, 'Items retrieved successfully.');
    }
    public function search(Request $request)
    {
        $input = $request->all();
        $word=$input['word'];
        if($word=="")
        {
            $org_id = auth()->user()->id;
            $query = "SELECT  items.id as id ,items.name as name,categories.name
 as category_name,choices.name as choice_name,origins.name as origin_name,
 sizes.name as size_name,image_path,items.quantity as quantity
                FROM items
                INNER JOIN categories  on items.category_id = categories.id
                INNER JOIN choices  on items.choice_id = choices.id
                INNER JOIN origins  on items.origin_id = origins.id
                INNER JOIN sizes  on items.size_id = sizes.id
                ";
            $items = DB::Select($query);
        }
        else{
            $org_id = auth()->user()->id;
            $query = "SELECT  items.id as id ,items.name as name,categories.name
 as category_name,choices.name as choice_name,origins.name as origin_name,
 sizes.name as size_name,image_path,items.quantity as quantity
                FROM items
                INNER JOIN categories  on items.category_id = categories.id
                INNER JOIN choices  on items.choice_id = choices.id
                INNER JOIN origins  on items.origin_id = origins.id
                INNER JOIN sizes  on items.size_id = sizes.id
                where items.name like '%$word%'
                ";
            $items = DB::Select($query);
        }
        if (is_null($items)) {
            return $this->sendError("Couldn't find organization Items ", ['error' => 'No items found']);
        }
        return $this->sendResponse($items, 'Items retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'category_id' => 'required',
            'origin_id' => 'required',
            'choice_id' => 'required',
            'size_id' => 'required',
            'file'=>'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $org_id = auth()->user()->id;
        if ($request->hasFile('file')){
            $file=$request->file('file');
            $name=time().'.'.$file->extension();
            $moving=$file->move(public_path().'/item_images/',$name);
            if ($moving){
                $createItem = ['name' => $input['name'],
                    'quantity' => 0,
                    'organization_id' => $org_id,
                    'category_id' => $input['category_id'],
                    'origin_id' => $input['origin_id'],
                    'choice_id' => $input['choice_id'],
                    'size_id' => $input['size_id'],
                    'image_path'=>$name
                ];
            }
        }
        else {
            $createItem = ['name' => $input['name'],
                'quantity' => 0,
                'organization_id' => $org_id,
                'category_id' => $input['category_id'],
                'origin_id' => $input['origin_id'],
                'choice_id' => $input['choice_id'],
                'size_id' => $input['size_id'],
            ];
        }
        $item = new Item($createItem);
        $item->save();
        return $this->sendResponse($item, 'Item created successfully.');
    }
    public function destroy($item_id)
    {
        $item = Item::find($item_id);
        $item->delete();
        return $this->sendResponse($item, 'Item deleted successfully.');
    }
}
