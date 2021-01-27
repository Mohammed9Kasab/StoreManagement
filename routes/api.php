<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BasketController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChoiceController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OriginController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:api', 'role'])->group(function() {

    Route::middleware(['scope:admin'])->get('/posts', [PostController::class, 'index']);
    Route::middleware(['scope:moderator'])->get('/InstructionForManager', [PostController::class, 'getAllInstructionForManager']);
    Route::middleware(['scope:admin'])->post('/post/store', [PostController::class, 'store']);
    Route::middleware(['scope:admin'])->delete('/post/{post_id}',[ PostController::class, 'destroy']);
    Route::middleware(['scope:admin'])->get('/post/edit/{id}', [PostController::class, 'edit']);
    Route::middleware(['scope:admin'])->put('/post/update/{id}', [PostController::class, 'update']);
    Route::middleware(['scope:admin'])->get('/customers', [UserController::class, 'getAllCustomers']);
    Route::middleware(['scope:admin'])->post('/customer/store', [UserController::class, 'AddCustomer']);
    Route::middleware(['scope:admin'])->delete('/customer/{customer_id}',[ UserController::class, 'destroy']);
    Route::middleware(['scope:admin'])->get('/customer/edit/{id}', [UserController::class, 'edit']);
    Route::middleware(['scope:admin'])->put('/customer/update/{id}', [UserController::class, 'update']);
    Route::middleware(['scope:admin'])->get('/managers', [UserController::class, 'getAllManagers']);
    Route::middleware(['scope:admin'])->post('/manager/store', [UserController::class, 'AddManager']);
    Route::middleware(['scope:admin'])->delete('/manager/{manager_id}',[ UserController::class, 'destroy']);
    Route::middleware(['scope:admin'])->get('/manager/edit/{id}', [UserController::class, 'edit']);
    Route::middleware(['scope:admin'])->put('/manager/update/{id}', [UserController::class, 'update']);
    Route::middleware(['scope:admin'])->get('/members', [UserController::class, 'getAllMembers']);
    Route::middleware(['scope:admin'])->post('/member/store', [UserController::class, 'AddMember']);
    Route::middleware(['scope:admin'])->delete('/member/{member_id}',[ UserController::class, 'destroy']);
    Route::middleware(['scope:admin'])->get('/member/edit/{id}', [UserController::class, 'edit']);
    Route::middleware(['scope:admin'])->put('/member/update/{id}', [UserController::class, 'update']);
    Route::middleware(['scope:admin'])->get('/branches', [BranchController::class, 'getAllBranches']);
    Route::middleware(['scope:admin'])->post('/branch/store', [BranchController::class, 'store']);
    Route::middleware(['scope:admin'])->delete('/branch/{branch_id}',[ BranchController::class, 'destroy']);
    Route::middleware(['scope:admin'])->get('/branch/edit/{id}', [BranchController::class, 'edit']);
    Route::middleware(['scope:admin'])->put('/branch/update/{id}', [BranchController::class, 'update']);
    Route::middleware(['scope:admin,moderator,customer'])->get('/items', [ItemController::class, 'getAllItems']);
    Route::middleware(['scope:admin,moderator'])->post('/item/store', [ItemController::class, 'store']);
    Route::middleware(['scope:admin,moderator'])->delete('/item/{item_id}',[ ItemController::class, 'destroy']);
    Route::middleware(['scope:admin,customer,moderator'])->get('/categories', [CategoryController::class, 'index']);
    Route::middleware(['scope:admin,customer,moderator'])->get('/origins', [OriginController::class, 'index']);
    Route::middleware(['scope:admin,customer,moderator'])->get('/choices', [ChoiceController::class, 'index']);
    Route::middleware(['scope:admin,customer,moderator'])->get('/sizes', [SizeController::class, 'index']);
    Route::middleware(['scope:admin,moderator'])->delete('/category/{category_id}',[ CategoryController::class, 'destroy']);
    Route::middleware(['scope:admin,moderator'])->put('/category/update/{id}', [CategoryController::class, 'update']);
    Route::middleware(['scope:admin,moderator'])->get('/category/edit/{id}', [CategoryController::class, 'edit']);
    Route::middleware(['scope:admin,moderator'])->post('/category/store', [CategoryController::class, 'store']);
    Route::middleware(['scope:admin,moderator'])->delete('/origin/{origin_id}',[ OriginController::class, 'destroy']);
    Route::middleware(['scope:admin,moderator'])->put('/origin/update/{id}', [OriginController::class, 'update']);
    Route::middleware(['scope:admin,moderator'])->get('/origin/edit/{id}', [OriginController::class, 'edit']);
    Route::middleware(['scope:admin,moderator'])->post('/origin/store', [OriginController::class, 'store']);
    Route::middleware(['scope:admin,moderator'])->delete('/choice/{choice_id}',[ ChoiceController::class, 'destroy']);
    Route::middleware(['scope:admin,moderator'])->put('/choice/update/{id}', [ChoiceController::class, 'update']);
    Route::middleware(['scope:admin,moderator'])->get('/choice/edit/{id}', [ChoiceController::class, 'edit']);
    Route::middleware(['scope:admin,moderator'])->post('/choice/store', [ChoiceController::class, 'store']);
    Route::middleware(['scope:admin,moderator'])->delete('/size/{size_id}',[ SizeController::class, 'destroy']);
    Route::middleware(['scope:admin,moderator'])->post('/size/store', [SizeController::class, 'store']);
    Route::middleware(['scope:admin,moderator'])->put('/size/update/{id}', [SizeController::class, 'update']);
    Route::middleware(['scope:admin,moderator'])->get('/size/edit/{id}', [SizeController::class, 'edit']);
    Route::middleware(['scope:admin'])->get('/suppliers', [SupplierController::class, 'index']);
    Route::middleware(['scope:admin'])->post('/supplier/store', [SupplierController::class, 'store']);
    Route::middleware(['scope:admin'])->delete('/supplier/{supplier_id}',[ SupplierController::class, 'destroy']);
    Route::middleware(['scope:admin'])->get('/supplier/edit/{id}', [SupplierController::class, 'edit']);
    Route::middleware(['scope:admin'])->put('/supplier/update/{id}', [SupplierController::class, 'update']);
    Route::middleware(['scope:admin'])->post('/searchForItems', [ItemController::class, 'search']);
    Route::middleware(['scope:customer'])->post('/cart/store', [CartController::class, 'store']);
    Route::middleware(['scope:admin'])->post('/basket/store', [BasketController::class, 'store']);
    Route::middleware(['scope:admin'])->post('/purchase/store', [PurchaseController::class, 'store']);
    Route::middleware(['scope:customer'])->get('/carts', [CartController::class, 'index']);
    Route::middleware(['scope:admin'])->get('/purchaseItems', [BasketController::class, 'GetPurchaseItems']);
    Route::middleware(['scope:customer'])->put('/cart/update/{id}', [CartController::class, 'update']);
    Route::middleware(['scope:admin'])->put('/basket/update/{id}', [BasketController::class, 'update']);
    Route::middleware(['scope:customer'])->get('/cart/edit/{id}', [CartController::class, 'edit']);
    Route::middleware(['scope:admin'])->get('/basket/edit/{id}', [BasketController::class, 'edit']);
    Route::middleware(['scope:customer'])->delete('/cart/{cart_id}',[ CartController::class, 'destroy']);
    Route::middleware(['scope:admin'])->delete('/basket/{basket_id}',[ BasketController::class, 'destroy']);
    Route::middleware(['scope:customer'])->post('/order/store', [OrderController::class, 'store']);
    Route::middleware(['scope:customer'])->post('/item_order/store', [OrderController::class, 'ItemOrderStore']);
    Route::middleware(['scope:admin'])->get('/UnreadOrder', [OrderController::class, 'getUnreadOrder']);
    Route::middleware(['scope:admin'])->get('/readOrder', [OrderController::class, 'getReadOrder']);
    Route::middleware(['scope:admin,moderator'])->get('/acceptOrder', [OrderController::class, 'getAcceptOrder']);
    Route::middleware(['scope:admin'])->get('/getUnreadOrdersCount', [OrderController::class, 'getUnreadOrdersCount']);
    Route::middleware(['scope:customer'])->get('/getDoneOrdersCount', [OrderController::class, 'getDoneOrdersCount']);
    Route::middleware(['scope:customer'])->get('/DoneOrder', [OrderController::class, 'getDoneOrder']);
    Route::middleware(['scope:moderator'])->get('/getAcceptedOrdersCount', [OrderController::class, 'getAcceptedOrdersCount']);
    Route::middleware(['scope:moderator'])->get('/acceptOrderAndDone', [OrderController::class, 'acceptOrderAndDone']);
    Route::middleware(['scope:moderator'])->get('/acceptOrderAndRead', [OrderController::class, 'acceptOrderAndRead']);
    Route::middleware(['scope:admin,moderator'])->get('/showOrderById/{order_id}', [OrderController::class, 'showOrderById']);
    Route::middleware(['scope:admin'])->put('/updateOrderStatusToZero/{order_id}', [OrderController::class, 'updateOrderStatusToZero']);
    Route::middleware(['scope:admin'])->put('/updateOrderStatusToOne/{order_id}', [OrderController::class, 'updateOrderStatusToOne']);
    Route::middleware(['scope:admin'])->put('/updateOrderStatusToTwo/{order_id}', [OrderController::class, 'updateOrderStatusToTwo']);
    Route::middleware(['scope:moderator'])->put('/updateAcceptOrders/{order_id}', [OrderController::class, 'updateAcceptOrders']);
    Route::middleware(['scope:moderator'])->put('/updateAcceptOrderToRead/{order_id}', [OrderController::class, 'updateAcceptOrderToRead']);
    Route::middleware(['scope:moderator'])->put('/updateAcceptOrderToDone/{order_id}', [OrderController::class, 'updateAcceptOrderToDone']);
    Route::middleware(['scope:admin'])->get('/findVendorById/{vendor_id}', [UserController::class, 'findVendorById']);
    Route::middleware(['scope:admin'])->get('/customer/chart', [UserController::class, 'showCustomerChart']);
});
