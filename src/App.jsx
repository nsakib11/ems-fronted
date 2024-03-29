import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import EmployeeComponent from './components/EmployeeComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {

  return (
    <>
      <BrowserRouter>
      
          <Routes>
              {/* // http://localhost:3000 */}
              <Route path='/' element = { <ListEmployeeComponent />}></Route>
              {/* // http://localhost:3000/employees/{id} */}
              <Route path='/employees/:id' element = { <ViewEmployeeComponent />}></Route>
              {/* // http://localhost:3000/employees */}
              <Route path='/employees' element = { <ListEmployeeComponent /> }></Route>
              {/* // http://localhost:3000/add-employee */}
              <Route path='/add-employee' element = { <EmployeeComponent />}></Route>

              {/* // http://localhost:3000/edit-employee/1 */}
              <Route path='/edit-employee/:id' element = { <EmployeeComponent /> }></Route>

              {/* // http://localhost:3000/employees/dashboard */}
              <Route path='/employees/dashboard' element = { <h1> Dashboard</h1>  }></Route>

              {/* // http://localhost:3000/employees/inStock */}
              <Route path='/employees/inStock' element = { <h1> In Stock</h1>  }></Route>

              {/* // http://localhost:3000/employees/products */}
              <Route path='/employees/products' element = { <h1> Products</h1>  }></Route>

              {/* // http://localhost:3000/employees/sales */}
              <Route path='/employees/sales' element = { <h1> Sales</h1>  }></Route>

              {/* // http://localhost:3000/employees/orders */}
              <Route path='/employees/orders' element = { <h1> Orders</h1>  }></Route>

              {/* // http://localhost:3000/employees/users */}
              <Route path='/employees/users' element = { <h1> Users</h1>  }></Route>

            
          </Routes>
    
      </BrowserRouter>
    </>
  )
}

export default App