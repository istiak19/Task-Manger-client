import { Route, Routes } from "react-router"
import MainLayout from "./Layout/MainLayout"
import Login from "./pages/Login/Login"
import TaskManager from "./pages/TaskManger/TaskManger"
import AddTask from "./pages/AddTask/AddTask"
import PrivateRoute from "./provider/PrivateRoute"
import Home from "./pages/Home/Home"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout></MainLayout>}>
          <Route index element={<Home></Home>} />
          <Route path="/task" element={<PrivateRoute><TaskManager></TaskManager></PrivateRoute>} />
          <Route path="/add-task" element={<PrivateRoute><AddTask></AddTask></PrivateRoute>} />
          <Route path="/login" element={<Login></Login>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
