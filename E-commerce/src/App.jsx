
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


      <Route path='/' element={<UserHome/>}/>
      <Route path='/userproduct/:id' Component={UserProduct}/>
      <Route path='/categoryproducts/:id' element={<CategoryBasedProducts/>}/>
      <Route path='/usersignin' Component={UserSignin}/>
      <Route path='/userlogin' Component={UserLogin}/>
      <Route path='/cart/:id' Component={Cart}/>
      <Route path='/checkout/:id' Component={CheckOut}/>

    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}

async function setData(cmp){
  await new Promise((res)=>setTimeout(res,500))
  return cmp
}

export default App
