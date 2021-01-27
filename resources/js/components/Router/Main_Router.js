import React, {useState, useContext} from 'react'
import EditPost from "../Admin/EditPost";
import NewPost from "../Admin/NewPost";
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
} from 'react-router-dom';
import Listing from "../Admin/ShowPosts";
import ShowCustomers from "../Customer/ShowCustomers";
import ShowItems from "../Item/ShowItems";
import EmployeePage from "../Admin/EmployeePage";
import Logout from '../Logout';
import SignIn from '../Sign_In';
import Register from '../Register';
import Navbar_BeforeLogin from '../Navbar_BeforeLogin';
import {UserContext} from '../UserContext';
import NavBar_admin from "../Admin/NavBar_Admin";
import NewCustomer from "../Customer/NewCustomer";
import NewManager from "../Admin/NewManager";
import NewMember from "../Admin/NewMember";
import EditCustomer from "../Customer/EditCustomer";
import EditManager from "../Admin/EditManager";
import EditMember from "../Admin/EditMember";
import NewBranch from "../Admin/NewBranch";
import EditBranch from "../Admin/EditBranch";
import NewItem from "../Item/NewItem";
import ShowProducts from "../Item/ShowProducts";
import NavBar_customer from "../Customer/NavBar_Customer";
import ShowCart from "../Item/ShowCart";
import ShowOrders from "../Item/ShowOrders";
import NewPurchase from "../Item/NewPurchase";
import ShowDoneOrder from "../Item/ShowDoneOrder";
import ShowDetailsOrder from "../Item/ShowDetailsOrder";
import ShowSuppliers from "../Supplier/ShowSuppliers";
import NewSupplier from "../Supplier/NewSupplier";
import EditSupplier from "../Supplier/EditSupplier";
import AcceptedOrders from "../StoreManager/AcceptedOrders";
import ShowOrderDetailsInsideStore from "../StoreManager/ShowOrderDetailsInsideStore";
import NavBar_StoreManager from "../StoreManager/NavBar_StoreManager";
import ListingInstruction from "../StoreManager/ShowInstructions";
import ShowPurchaseCart from "../Item/ShowPurchaseCart";
import ShowReports from "../Admin/ShowReports";
export default function Initial() {
    let isloggedin = localStorage.getItem('isloggedin');
    const [user, setUser] = useState(isloggedin);
    console.log('entered router');
    return (
        <Router>
            <UserContext.Provider value={{user, setUser}}>
                <Navbar_BeforeLogin></Navbar_BeforeLogin>
                <Switch>
                    <Route exact path="/login">
                        <SignIn></SignIn>
                    </Route>
                    <Route exact path="/homepage_admin">
                        <NavBar_admin></NavBar_admin>
                    </Route>
                    <Route exact path="/homepage_customer">
                        <NavBar_customer></NavBar_customer>
                    </Route>
                    <Route exact path="/homepage_manager">
                        <NavBar_StoreManager></NavBar_StoreManager>
                    </Route>
                    <Route exact path="/register">
                        <Register> </Register>
                    </Route>
                    <Route exact path="/posts" component={Listing}/>
                    <Route exact path="/instructions" component={ListingInstruction}/>
                    <Route exact path="/customers" component={ShowCustomers}/>
                    <Route exact path="/employees" component={EmployeePage}/>
                    <Route exact path="/items" component={ShowItems}/>
                    <Route exact path="/products" component={ShowProducts}/>
                    <Route exact path="/cart" component={ShowCart}/>
                    <Route exact path="/purchase_cart" component={ShowPurchaseCart}/>
                    <Route exact path="/DoneOrders" component={ShowDoneOrder}/>
                    <Route exact path="/orders" component={ShowOrders}/>
                    <Route exact path="/purchases" component={NewPurchase}/>
                    <Route exact path="/suppliers" component={ShowSuppliers}/>
                    <Route exact path="/AcceptedOrders" component={AcceptedOrders}/>
                    <Route exact path="/reports" component={ShowReports}/>

                    <Route exact path="/createPost" component={NewPost}/>
                    <Route exact path="/createCustomer" component={NewCustomer}/>
                    <Route exact path="/createManager" component={NewManager}/>
                    <Route exact path="/createMember" component={NewMember}/>
                    <Route exact path="/createBranch" component={NewBranch}/>
                    <Route exact path="/createItem" component={NewItem}/>
                    <Route exact path="/createSupplier" component={NewSupplier}/>
                    <Route exact path="/post/edit/:id" component={EditPost} />
                    <Route exact path="/customer/edit/:id" component={EditCustomer} />
                    <Route exact path="/manager/edit/:id" component={EditManager} />
                    <Route exact path="/member/edit/:id" component={EditMember} />
                    <Route exact path="/branch/edit/:id" component={EditBranch} />
                    <Route exact path="/supplier/edit/:id" component={EditSupplier} />
                    <Route exact path="/ShowOrder/:id" component={ShowDetailsOrder} />
                    <Route exact path="/ShowAcceptedOrder/:id" component={ShowOrderDetailsInsideStore} />
                    <Route exact path="/logout">
                        <Logout> </Logout>
                    </Route>
                </Switch>
            </UserContext.Provider>
        </Router>
    )
}
ReactDOM.render(<Initial/>, document.getElementById('root'));

