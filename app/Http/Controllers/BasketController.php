<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class BasketController extends BaseController
{
    public function GetPurchaseItems()
    {
        $org_id = auth()->user()->id;
        $query = "SELECT  items.id as item_id ,items.name as name,categories.name as category_name,
                  choices.name as choice_name,origins.name as origin_name,sizes.name as size_name,
                  baskets.quantity,baskets.id as basket_id,image_path
                FROM items
                INNER JOIN categories  on items.category_id = categories.id
                INNER JOIN choices  on items.choice_id = choices.id
                INNER JOIN origins  on items.origin_id = origins.id
                INNER JOIN sizes  on items.size_id = sizes.id
                INNER JOIN baskets  on baskets.item_id = items.id and baskets.organization_id=$org_id
                                ";
        $items = DB::Select($query);
        if (is_null($items)) {
            return $this->sendError("Couldn't find organization Items ", ['error' => 'No items found']);
        }
        return $this->sendResponse($items, 'Items retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'item_id' => 'required',
            'qty' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $org_id = auth()->user()->id;
        $createPurchaseCart = [
            'item_id' => $input['item_id'],
            'quantity' => $input['qty'],
            'organization_id' => $org_id,
        ];
        $purchaseCartExist_id = Basket::where('item_id', $input['item_id'])->where('organization_id', $org_id)->get()->first();
        if ($purchaseCartExist_id) {
            $purchaseCart = Basket::find($purchaseCartExist_id);
            $x = $purchaseCart[0]->quantity;
            $purchaseCart[0]->quantity = $input['qty'] + $x;
            $purchaseCart[0]->save();
            return $this->sendResponse($purchaseCart[0], 'Purchase Cart created successfully.');
        } elseif ($purchaseCartExist_id == null) {
            $purchaseCart = new Basket($createPurchaseCart);
            $purchaseCart->save();
            return $this->sendResponse($purchaseCart, 'Purchase Cart created successfully.');
        }
    }
    public function edit($id){
        $basket=Basket::find($id);
        return $basket;
    }
    public function update(Request $request,$id){
        $basket=Basket::find($id);
        $basket->quantity=$request->quantity;
        $basket->save();
    }
    public function destroy($basket_id)
    {
        $basket = Basket::find($basket_id);
        $basket->delete();
        return $this->sendResponse($basket, 'Basket deleted successfully.');
    }
}


