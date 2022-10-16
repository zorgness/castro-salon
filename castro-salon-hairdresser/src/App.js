import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Index from './components/Index';
import Login from './components/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Gallery from './components/Gallery';
import GalleryShow from './components/GalleryShow';
import Contact from './components/Contact';
import GalleryForm from './components/admin/GalleryForm';
import GalleryIndexAdmin from './components/admin/GalleryIndexAdmin';

function App() {
  return (
    <div className="App">

      <Navigation />

      <BrowserRouter>

        <Routes>
            <Route path="/" element={<Index />}/>
            <Route path="/gallerie" element={<Gallery />}/>
            <Route path="/gallerie/:id" element={<GalleryShow />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/gallerie_edit" element={<GalleryForm />}/>
            <Route path="/gallerie_index" element={<GalleryIndexAdmin />}/>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
