<?php

namespace App\Http\Controllers;

use App\Models\Origin;
use Illuminate\Http\Request;
use Validator;

class OriginController extends BaseController
{
    public function index()
    {
        $org_id = auth()->user()->id;
        $origins = Origin::all();
        if (is_null($origins)) {
            return $this->sendError("Couldn't find origins", ['error' => 'No origins found']);
        }
        return $this->sendResponse($origins, 'Origins retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'origin_name' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $org_id = auth()->user()->id;
        $createOrigin = ['name' => $input['origin_name'],
            'organization_id' => $org_id,
        ];
        $origin = new Origin($createOrigin);
        $origin->save();
        return $this->sendResponse($origin, 'Origin created successfully.');
    }
    public function edit($id){
        $origin=Origin::find($id);
        return $origin;
    }
    public function update(Request $request,$id){
        $origin=Origin::find($id);
        $origin->name=$request->update_origin_name;
        $origin->save();
    }
    public function destroy($origin_id)
    {
        $origin = Origin::find($origin_id);
        $origin->delete();
        return $this->sendResponse($origin, 'Origin deleted successfully.');
    }
}
