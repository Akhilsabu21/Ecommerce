
import './App.css'
import AdminForgot from './Components/Admin/AdminBody/AdminForgot/AdminForgot'
// import AdminHome from './Components/Admin/AdminBody/AdminHome/AdminHome'
import AdminLogin from './Components/Admin/AdminBody/AdminLogin/AdminLogin'
import AdminSignin from './Components/Admin/AdminBody/AdminSignin/AdminSignin'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AddCategory from './Components/Admin/AddCategory/AddCategory'
import AddProducts from './Components/Admin/AddProducts/AddProducts'
import { Suspense, lazy } from 'react'
import Loading from './Components/Loading'
import Category from './Components/Admin/AdminBody/Category/Category'
import Product from './Components/Admin/AdminBody/Product/Product'
import CategoryProducts from './Components/Admin/CategoryProducts/CategoryProducts'
import CategoryEdit from './Components/Admin/AdminBody/CategoryEdit/CategoryEdit'
import SingleProduct from './Components/Admin/AdminBody/SingleProduct/SingleProduct'
import ProductEdit from './Components/Admin/AdminBody/ProductEdit/ProductEdit'
import UserHome from './Components/User/UserBody/UserHome/UserHome'
import UserProduct from './Components/User/UserProduct/UserProduct'

function App() {
  const AdminHome=lazy(()=>setData(import('./Components/Admin/AdminBody/AdminHome/AdminHome')))

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

      <Route path='/' Component={UserHome}/>
      <Route path='/userproduct/:id' Component={UserProduct}/>

    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}

async function setData(cmp){
  await new Promise((res)=>setTimeout(res,1000))
  return cmp
}

export default App
