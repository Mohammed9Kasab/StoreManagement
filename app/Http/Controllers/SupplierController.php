<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Validator;

class SupplierController extends BaseController
{
    public function index()
    {
        $org_id = auth()->user()->id;
        $suppliers = Supplier::where('organization_id', $org_id)->get();
        if (is_null($suppliers)) {
            return $this->sendError("Couldn't find suppliers", ['error' => 'No suppliers found']);
        }
        return $this->sendResponse($suppliers, 'Suppliers retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required',
            'address' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $user_id = auth()->user()->id;
        $createSupplier = [
            'name' => $input['name'],
            'email' => $input['email'],
            'address' => $input['address'],
            'organization_id' => $user_id,
        ];
        $supplier = new Supplier($createSupplier);
        $supplier->save();
        return $this->sendResponse($supplier, 'Supplier created successfully.');
    }
    public function edit($id){
        $supplier=Supplier::find($id);
        return $supplier;
    }
    public function update(Request $request,$id){
        $supplier=Supplier::find($id);
        $supplier->name=$request->name;
        $supplier->email=$request->email;
        $supplier->address=$request->address;
        $supplier->save();
    }
    public function destroy($supplier_id)
    {
        $supplier = Supplier::find($supplier_id);
        $supplier->delete();
        return $this->sendResponse($supplier, 'Supplier deleted successfully.');
    }
}
