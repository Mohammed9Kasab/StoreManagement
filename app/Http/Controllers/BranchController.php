<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class BranchController extends BaseController
{
    public function index()
    {
        $org_id = auth()->user()->id;
        $branches = Branch::where('organization_id', $org_id)->get();
        if (is_null($branches)) {
            return $this->sendError("Couldn't find branches", ['error' => 'No branches found']);
        }
        return $this->sendResponse($branches, 'Branches retrieved successfully.');
    }
    public function getAllBranches()
    {
        $org_id = auth()->user()->id;
        $query = "SELECT  branches.id, branches.name,branches.address, branches.user_id,users.name as manager_name
                FROM users
                INNER JOIN branches  on users.id = branches.user_id
                WHERE branches.organization_id=$org_id";
        $branches = DB::Select($query);
        if (is_null($branches)) {
            return $this->sendError("Couldn't find organization Branch ", ['error' => 'No branches found']);
        }
        return $this->sendResponse($branches, 'Branches retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'address' => 'required',
            'manager_id'=>'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $user_id = auth()->user()->id;
        $createBranch = ['name' => $input['name'],
            'address' => $input['address'],
            'organization_id' => $user_id,
            'user_id'=>$input['manager_id'],
        ];
        $branch = new Branch($createBranch);
        $branch->save();
        return $this->sendResponse($branch, 'Branch created successfully.');
    }
    public function edit($id){
        $branch=Branch::find($id);
        return $branch;
    }
    public function update(Request $request,$id){
        $branch=Branch::find($id);
        $branch->name=$request->name;
        $branch->address=$request->address;
        $branch->user_id=$request->manager_id;
        $branch->save();
    }
    public function destroy($branch_id)
    {
        $branch = Branch::find($branch_id);
        $branch->delete();
        return $this->sendResponse($branch, 'Branch deleted successfully.');
    }
    public function getBranchByManagerId($id)
    {
        $query = "SELECT  name
                FROM branches
                WHERE user_id=$id";
        $branch_name = DB::Select($query);
        if (is_null($branch_name)) {
            return $this->sendError("Couldn't find Branch Name for this Manager ", ['error' => 'No Branch name found']);
        }
        return $this->sendResponse($branch_name, 'Branch Name retrieved successfully.');
    }
}
