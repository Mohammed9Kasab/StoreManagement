<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Validator;


class PurchaseController extends BaseController
{
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'vendor' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $createPurchase = [
            'vendor-id' => $input['vendor'],
        ];
        $purchase = new Purchase($createPurchase);
        if ($purchase->save())
        return response()->json(['purchase' => $purchase, 'message' => 'successfully']);
    }
}
