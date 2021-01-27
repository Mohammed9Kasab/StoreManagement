<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class CartController extends BaseController
{
    public function index()
    {
        $customer_id = auth()->user()->id;
        $query = "SELECT  items.id as item_id ,items.name as name,categories.name as category_name,
                  choices.name as choice_name,origins.name as origin_name,sizes.name as size_name,
                  carts.quantity,carts.id as cart_id,image_path
                FROM items
                INNER JOIN categories  on items.category_id = categories.id
                INNER JOIN choices  on items.choice_id = choices.id
                INNER JOIN origins  on items.origin_id = origins.id
                INNER JOIN sizes  on items.size_id = sizes.id
                INNER JOIN users  on users.id = $customer_id
                INNER JOIN carts  on carts.item_id = items.id";
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
        $customer_id = auth()->user()->id;
        $createCart = [
            'item_id' => $input['item_id'],
            'quantity' => $input['qty'],
            'customer_id' => $customer_id,
        ];
        $cartExist_id=Cart::where('item_id',$input['item_id'])->where('customer_id',$customer_id)->get()->first();
        if($cartExist_id){
                $cart=Cart::find($cartExist_id);
                $x=$cart[0]->quantity;
            $cart[0]->quantity =$input['qty']+$x;
            $cart[0]->save();
        }
        elseif ($cartExist_id==null) {
            $cart = new Cart($createCart);
            $cart->save();
            return $this->sendResponse($cart, 'Cart created successfully.');
        }
    }
    public function edit($id){
        $cart=Cart::find($id);
        return $cart;
    }
    public function update(Request $request,$id){
        $cart=Cart::find($id);
        $cart->quantity=$request->quantity;
        $cart->save();
    }
    public function destroy($cart_id)
    {
        $cart = Cart::find($cart_id);
        $cart->delete();
        return $this->sendResponse($cart, 'Cart deleted successfully.');
    }
}
