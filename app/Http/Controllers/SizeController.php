<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;
use Validator;

class SizeController extends BaseController
{
    public function index()
    {
        $org_id = auth()->user()->id;
        $sizes = Size::all();
        if (is_null($sizes)) {
            return $this->sendError("Couldn't find sizes", ['error' => 'No sizes found']);
        }
        return $this->sendResponse($sizes, 'Sizes retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'size_name' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $org_id = auth()->user()->id;
        $createSize = ['name' => $input['size_name'],
            'organization_id' => $org_id,
        ];
        $size = new Size($createSize);
        $size->save();
        return $this->sendResponse($size, 'Size created successfully.');
    }
    public function edit($id){
        $size=Size::find($id);
        return $size;
    }
    public function update(Request $request,$id){
        $size=Size::find($id);
        $size->name=$request->update_size_name;
        $size->save();
    }
    public function destroy($size_id)
    {
        $size = Size::find($size_id);
        $size->delete();
        return $this->sendResponse($size, 'Size deleted successfully.');
    }
}
