import { Route, Routes } from "react-router"
import MainLayout from "./Layout/MainLayout"
import Login from "./pages/Login/Login"
import TaskManager from "./pages/TaskManger/TaskManger"
import AddTask from "./pages/AddTask/AddTask"
import PrivateRoute from "./provider/PrivateRoute"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout></MainLayout>} />
        <Route path="/task" element={<TaskManager></TaskManager>} />
        <Route path="/add-task" element={<PrivateRoute><AddTask></AddTask></PrivateRoute>} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
    </>
  )
}

export default App
