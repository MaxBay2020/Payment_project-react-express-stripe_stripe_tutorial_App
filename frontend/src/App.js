import Checkout from "./components/Checkout"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Cancel from "./components/Cancel";
import Success from "./components/Success";


const App = () => {
  return (
    <div className="App">
        <h1>Hello Stripe!</h1>

        <Router>
            <Routes>
                <Route path='/' element={<Checkout />} />
                <Route path='/success' element={<Success />} />
                <Route path='/cancel' element={<Cancel />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
