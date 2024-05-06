import './App.css';
import Settings from './components/Settings';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";

function MyApp() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    )
}


function App_foo() {
    return (
        <Router>
            <MyApp />
        </Router>
    );
}

export default App_foo;
