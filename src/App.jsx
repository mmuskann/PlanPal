import { Routes, Route} from 'react-router-dom'
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import EditPost from "./pages/EditPost"
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import './App.css'

function App() {

  return (
    <>
      <NavBar/>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/create"
          element={<CreatePost />}
        />

        <Route
          path="/edit/:id"
          element={<EditPost />}
        />

        <Route 
          path="/postDetail/:id"
          element={<PostDetail />}
        />
      </Routes>

    </>
  )
}

export default App
