<?php

namespace App\Http\Controllers;

use App\Events\DoneOrderToCustomer;
use App\Events\newOrder;
use App\Events\SendOrderToStore;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class OrderController extends BaseController
{
    public function getUnreadOrdersCount()
    {
        $count = Order::where('status', null)->count();
        return response()->json(['count' => $count]);
    }
    public function getAcceptedOrdersCount()
    {
        $count = Order::where('status', 2)->count();
        return response()->json(['count' => $count]);
    }
    public function getDoneOrdersCount()
    {
        $customer_id=auth()->user()->id;
        $count = Order::where('status', 5)->where('customer_id',$customer_id)->count();
        return response()->json(['count' => $count]);
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'customer' => 'required',
            'state' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $createOrder = [
            'customer_id' => $input['customer'],
            'state' => $input['state'],
        ];
        $order = new Order($createOrder);
        if ($order->save())
            event(new newOrder($order));
        return response()->json(['order' => $order, 'message' => 'successfully']);
    }
    public function ItemOrderStore(Request $request)
    {
        $input = $request->all();
        $customer_id = auth()->user()->id;
        $order_id = $input['order'];
        $item_id = $input['item'];
        $quantity = $input['qty'];
        $state = $input['state'];
        $query = "Insert Into items_orders (order_id,item_id,quantity,state )values ($order_id,$item_id,$quantity,$state)
                ";
        $item_order = DB::Select($query);
        if (is_null($item_order)) {
            return $this->sendError("Couldn't Insert to this table ", ['error' => 'there is error']);
        }
        return $this->sendResponse($item_order, 'item_order created successfully.');
    }
    public function getUnreadOrder()
    {
        $query = "SELECT  orders.id as order_id,users.name as customer_name
                  ,orders.created_at as order_time,users.email as customer_email
                FROM orders
                INNER JOIN users  on users.id = orders.customer_id
                where  status IS NULL or status = 0
                order by order_time desc
                ";
        $order = DB::Select($query);
        if (is_null($order)) {
            return $this->sendError("Couldn't find any order ", ['error' => 'No orders found']);
        }
        return $this->sendResponse($order, 'Order retrieved successfully.');
    }

    public function getAcceptOrder()
    {
        $query = "SELECT  orders.id as order_id,users.name as customer_name,
                  orders.created_at as order_time,users.email as customer_email,orders.status as order_status
                FROM orders
                INNER JOIN users  on users.id = orders.customer_id
                where  status =2 or status=3
                order by order_time desc
                ";
        $order = DB::Select($query);
        if (is_null($order)) {
            return $this->sendError("Couldn't find any order ", ['error' => 'No orders found']);
        }
        return $this->sendResponse($order, 'Order retrieved successfully.');
    }
    public function getDoneOrder()
    {
        $customer_id=auth()->user()->id;
        $query = "SELECT  orders.id as order_id,users.name as customer_name,
                  orders.created_at as order_time,users.email as customer_email,orders.status as order_status
                FROM orders
                INNER JOIN users  on users.id = orders.customer_id
                where  status =5 and users.id=$customer_id
                order by order_id desc
                ";
        $order = DB::Select($query);
        if (is_null($order)) {
            return $this->sendError("Couldn't find any order ", ['error' => 'No orders found']);
        }
        return $this->sendResponse($order, 'Order retrieved successfully.');
    }
    public function showOrderById($id){
        $query = "SELECT  items.id as id ,items.name as name,categories.name
 as category_name,choices.name as choice_name,origins.name as origin_name,
 sizes.name as size_name,image_path,items_orders.quantity as item_quantity
                FROM items_orders
                INNER JOIN items  on items.id = items_orders.item_id
                INNER JOIN orders  on orders.id = items_orders.order_id
                INNER JOIN categories  on items.category_id = categories.id
                INNER JOIN choices  on items.choice_id = choices.id
                INNER JOIN origins  on items.origin_id = origins.id
                INNER JOIN sizes  on items.size_id = sizes.id
                where  orders.id=$id
                ";
        $order = DB::Select($query);
        if (is_null($order)) {
            return $this->sendError("Couldn't find any order ", ['error' => 'No orders found']);
        }
        return $this->sendResponse($order, 'Order retrieved successfully.');
    }
    public function updateOrderStatusToZero(Request $request,$id){
        $order = Order::find($id);
        $order->status = $request->status;
        $order->save();
    }
    public function updateOrderStatusToOne(Request $request,$id){
        $order = Order::find($id);
        $order->status = $request->status;
        $order->save();
    }
    public function updateOrderStatusToTwo(Request $request,$id){
        $order = Order::find($id);
        $order->status = $request->status;
        $order->save();
        event(new SendOrderToStore($order));
    }
    public function updateAcceptOrders(Request $request,$id){
        $order = Order::find($id);
        $order->status = $request->status;
        $order->save();
    }
    public function updateAcceptOrderToRead(Request $request,$id){
        $order = Order::find($id);
        $order->status = $request->status;
        $order->save();
    }
    public function updateAcceptOrderToDone(Request $request,$id){
        $order = Order::find($id);
        $order->status = $request->status;
        $order->save();
        event(new DoneOrderToCustomer($order));
    }
    public function acceptOrderAndRead()
    {
        $query = "SELECT  orders.id as order_id,users.name as customer_name,
                  orders.created_at as order_time,users.email as customer_email,orders.status as order_status
                FROM orders
                INNER JOIN users  on users.id = orders.customer_id
                where  status =4
                order by order_time desc
                ";
        $order = DB::Select($query);
        if (is_null($order)) {
            return $this->sendError("Couldn't find any order ", ['error' => 'No orders found']);
        }
        return $this->sendResponse($order, 'Order retrieved successfully.');
    }
    public function acceptOrderAndDone()
    {
        $query = "SELECT  orders.id as order_id,users.name as customer_name,
                  orders.created_at as order_time,users.email as customer_email,orders.status as order_status
                FROM orders
                INNER JOIN users  on users.id = orders.customer_id
                where  status =5
                order by order_time desc
                ";
        $order = DB::Select($query);
        if (is_null($order)) {
            return $this->sendError("Couldn't find any order ", ['error' => 'No orders found']);
        }
        return $this->sendResponse($order, 'Order retrieved successfully.');
    }
}
