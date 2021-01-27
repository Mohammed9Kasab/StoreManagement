<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use Illuminate\Http\Request;
use Validator;

class ChoiceController extends BaseController
{
    public function index()
    {
        $org_id = auth()->user()->id;
        $choices = Choice::all();
        if (is_null($choices)) {
            return $this->sendError("Couldn't find choices", ['error' => 'No choices found']);
        }
        return $this->sendResponse($choices, 'Choices retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'choice_name' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $org_id = auth()->user()->id;
        $createChoice = ['name' => $input['choice_name'],
            'organization_id' => $org_id,
        ];
        $choice = new Choice($createChoice);
        $choice->save();
        return $this->sendResponse($choice, 'Choice created successfully.');
    }
    public function edit($id){
        $choice=Choice::find($id);
        return $choice;
    }
    public function update(Request $request,$id){
        $choice=Choice::find($id);
        $choice->name=$request->update_choice_name;
        $choice->save();
    }
    public function destroy($choice_id)
    {
        $choice = Choice::find($choice_id);
        $choice->delete();
        return $this->sendResponse($choice, 'Choice deleted successfully.');
    }
}
