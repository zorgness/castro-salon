import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer'
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
import GalleryNewAdmin from './components/admin/GalleryNewAdmin';
import GalleryIndexAdmin from './components/admin/GalleryIndexAdmin';
import GalleryEditAdmin from './components/admin/GalleryEditAdmin';
import TextIntroNewAdmin from './components/admin/TextIntroNewAdmin';
import TextIntroIndexAdmin from './components/admin/TextIntroIndexAdmin';

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
            <Route path="/admin_text_intro_new" element={<TextIntroNewAdmin />}/>
            <Route path="/admin_text_intro_index" element={<TextIntroIndexAdmin />}/>
            <Route path="/admin_gallery_new" element={<GalleryNewAdmin />}/>
            <Route path="/admin_gallery_index" element={<GalleryIndexAdmin />}/>
            <Route path="/admin_gallery_edit/:id" element={<GalleryEditAdmin />}/>
        </Routes>
      </BrowserRouter>

      <Footer />

    </div>
  );
}

export default App;
