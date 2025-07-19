import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import NotFound from './pages/notFound/NotFound.jsx'
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx'
import ProductsPage from './pages/products/ProductsPage.jsx'

function App() {

  

  return (
    <>


      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />


        <Route path='/' index element={
          <ProtectedRoute isAuthenticated={true}>
            <Navbar />
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/product" element={<ProductsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
