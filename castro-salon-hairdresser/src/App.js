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
import Contact from './components/Contact';
import GalleryForm from './components/admin/GalleryForm';
import GalleryIndex from './components/admin/GalleryIndex';

function App() {
  return (
    <div className="App">
      <Navigation />

      <BrowserRouter>
        <Routes>

            <Route path="/" element={<Index />}/>
            <Route path="/gallerie" element={<Gallery />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/gallerie_edit" element={<GalleryForm />}/>
            <Route path="/gallerie_index" element={<GalleryIndex />}/>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
