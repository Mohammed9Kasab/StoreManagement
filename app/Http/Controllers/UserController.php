<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class UserController extends BaseController
{
    public function getAllCustomers()
    {
        $admin_id = auth()->user()->id;
        $query = "SELECT  users.id, name,address, email , role, organization_id
                FROM users
                INNER JOIN roles r on users.id = r.user_id
                WHERE (role = 'customer') AND r.organization_id=$admin_id
                ORDER BY user_id";
        $customers = DB::Select($query);
        if (is_null($customers)) {
            return $this->sendError("Couldn't find organization Customer ", ['error' => 'No customers found']);
        }
        return $this->sendResponse($customers, 'Customers retrieved successfully.');
    }
    public function getAllManagers()
    {
        $admin_id = auth()->user()->id;
        $query = "SELECT  users.id, name,address, email , role, organization_id
                FROM users
                INNER JOIN roles r on users.id = r.user_id
                WHERE (role = 'moderator') AND r.organization_id=$admin_id
                ORDER BY user_id";
        $managers = DB::Select($query);
        if (is_null($managers)) {
            return $this->sendError("Couldn't find organization Managers ", ['error' => 'No managers found']);
        }
        return $this->sendResponse($managers, 'Managers retrieved successfully.');
    }
    public function getAllMembers()
    {
        $admin_id = auth()->user()->id;
        $query = "SELECT  users.id, name,address, email , role, organization_id
                FROM users
                INNER JOIN roles r on users.id = r.user_id
                WHERE (role = 'member') AND r.organization_id=$admin_id
                ORDER BY user_id";
        $members = DB::Select($query);
        if (is_null($members)) {
            return $this->sendError("Couldn't find organization Members ", ['error' => 'No members found']);
        }
        return $this->sendResponse($members, 'Members retrieved successfully.');
    }
    public function AddCustomer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'address' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = new User($input);
        $user->save();
        $success['name'] = $user->name;
        $success['user_id'] = $user->id;
        $user_id = $user->id;
        $admin_id = auth()->user()->id;
        $createRole = ['user_id' => $user_id, 'role' => 'customer', 'organization_id' => $admin_id];
        $role = new Role($createRole);
        $role->save();
        $success['role'] = $role->role;
        return $this->sendResponse($success, 'Customer registered successfully.');
    }
    public function AddManager(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'address' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = new User($input);
        $user->save();
        $success['name'] = $user->name;
        $success['user_id'] = $user->id;
        $user_id = $user->id;
        $admin_id = auth()->user()->id;
        $createRole = ['user_id' => $user_id, 'role' => 'moderator', 'organization_id' => $admin_id];
        $role = new Role($createRole);
        $role->save();
        $success['role'] = $role->role;
        return $this->sendResponse($success, 'Manager registered successfully.');
    }
    public function AddMember(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'address' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = new User($input);
        $user->save();
        $success['name'] = $user->name;
        $success['user_id'] = $user->id;
        $user_id = $user->id;
        $admin_id = auth()->user()->id;
        $createRole = ['user_id' => $user_id, 'role' => 'member', 'organization_id' => $admin_id];
        $role = new Role($createRole);
        $role->save();
        $success['role'] = $role->role;
        return $this->sendResponse($success, 'Member registered successfully.');
    }
    public function edit($id)
    {
        $customer = User::find($id);
        return $customer;
    }
    public function update(Request $request, $id)
    {
        $customer = User::find($id);
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->save();
    }
    public function destroy($customer_id)
    {
        $customer = User::find($customer_id);
        $customer->delete();
        return $this->sendResponse($customer, 'Customer deleted successfully.');
    }
    public function findVendorById($id)
    {
        $query = "SELECT   address,email
                FROM users
                WHERE  id=$id";
        $vendors = DB::Select($query);
        if (is_null($vendors)) {
            return $this->sendError("Couldn't find organization vendors ", ['error' => 'No vendors found']);
        }
        return $this->sendResponse($vendors, 'Vendors retrieved successfully.');
    }
    public function showCustomerChart(){
        $admin_id = auth()->user()->id;
        $data=DB::table('orders')
            ->join('roles','orders.customer_id','=','roles.user_id')
            ->join('users','roles.user_id','=','users.id')
            ->where('roles.organization_id','=',$admin_id)
            ->select(
                DB::raw('users.name as customer_name'),
                DB::raw('count(orders.id)as OrdersCount')
            )
            ->groupBy('customer_name')
            ->get();
        $array[]=['customer_name','OrdersCount'];
        foreach ($data as $key =>$value)
        {
            $array[++$key]=[$value->customer_name,intval($value->OrdersCount)];
        }
        return response()->json(['status'=>1 ,'err'=>0,'result'=>$array]);
    }
}
