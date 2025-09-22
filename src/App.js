import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Prototype from './pages/Prototype';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/prototype" element={<Prototype />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
