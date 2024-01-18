
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import AdminForgot from './Components/Admin/AdminBody/AdminForgot/AdminForgot'
// import AdminHome from './Components/Admin/AdminBody/AdminHome/AdminHome'
import AdminLogin from './Components/Admin/AdminBody/AdminLogin/AdminLogin'
import AdminSignin from './Components/Admin/AdminBody/AdminSignin/AdminSignin'
import AddCategory from './Components/Admin/AddCategory/AddCategory'
import AddProducts from './Components/Admin/AddProducts/AddProducts'
import Loading from './Components/Loading'
import Category from './Components/Admin/AdminBody/Category/Category'
import Product from './Components/Admin/AdminBody/Product/Product'
import CategoryProducts from './Components/Admin/CategoryProducts/CategoryProducts'
import CategoryEdit from './Components/Admin/AdminBody/CategoryEdit/CategoryEdit'
import SingleProduct from './Components/Admin/AdminBody/SingleProduct/SingleProduct'
import ProductEdit from './Components/Admin/AdminBody/ProductEdit/ProductEdit'
// import UserHome from './Components/User/UserBody/UserHome/UserHome'
import UserProduct from './Components/User/UserBody/UserProduct/UserProduct'
// import CategoryBasedProducts from './Components/User/UserBody/CategoryBasedProducts/CategoryBasedProducts'
import UserSignin from './Components/User/UserBody/UserSignin/UserSignin'
import UserLogin from './Components/User/UserBody/UserLogin/UserLogin'
import Cart from './Components/User/UserBody/Cart/Cart'
import CheckOut from './Components/User/CheckOut/CheckOut'
import DirectLogin from './Components/User/UserBody/DirectLogin/DirectLogin'
import DirectSignin from './Components/User/UserBody/DirectSignin/DirectSignin'
import BuyNow from './Components/User/BuyNow/BuyNow'
import WishList from './Components/User/UserBody/WishList/WishList'
import UserProfile from './Components/User/UserBody/UserProfile.jsx/UserProfile'
import Orders from './Components/Admin/AdminBody/Orders/Orders'
import UserForgot from './Components/User/UserBody/UserForgot/UserForgot'

function App() {
  const AdminHome=lazy(()=>setData(import('./Components/Admin/AdminBody/AdminHome/AdminHome')))
  const UserHome=lazy(()=>setData(import('./Components/User/UserBody/UserHome/UserHome')))
  const CategoryBasedProducts=lazy(()=>setData(import('./Components/User/UserBody/CategoryBasedProducts/CategoryBasedProducts')))

  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route path='/admin' element={<AdminHome/>} />
      <Route path='/adminsignin' Component={AdminSignin} />
      <Route path='/adminlogin' Component={AdminLogin} />
      <Route path='/adminforgot' Component={AdminForgot} />
      <Route path='/addCategory' Component={AddCategory} />
      <Route path='/addProduct' Component={AddProducts} />
      <Route path='/category' Component={Category} />
      <Route path='/product' Component={Product} />
      <Route path='/categorybasedproducts/:id' Component={CategoryProducts} />
      <Route path='/categoryedit/:id' Component={CategoryEdit} />
      <Route path='/viewProduct/:id' Component={SingleProduct} />
      <Route path='/editProduct/:id' Component={ProductEdit} />
      <Route path='/orders' Component={Orders} />


      <Route path='/' element={<UserHome/>}/>
      <Route path='/userproduct/:id' Component={UserProduct}/>
      <Route path='/categoryproducts/:id' element={<CategoryBasedProducts/>}/>
      <Route path='/usersignin' Component={UserSignin}/>
      <Route path='/userlogin' Component={UserLogin}/>
      <Route path='/forgot' Component={UserForgot}/>
      <Route path='/userlogindirect' Component={DirectLogin}/>
      <Route path='/usersignindirect' Component={DirectSignin}/>
      <Route path='/cart/:id' Component={Cart}/>
      <Route path='/checkout' Component={CheckOut}/>
      <Route path='/buynow/:id' Component={BuyNow}/>
      <Route path='/wishlist/:userid' Component={WishList}/>
      <Route path='/profile/:userid' Component={UserProfile}/>

    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}

async function setData(cmp){
  await new Promise((res)=>setTimeout(res,1500))
  return cmp
}

export default App
