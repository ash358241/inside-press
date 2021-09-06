import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import { createContext, useState } from 'react';
export const PortalContext = createContext();
function App() {
  const [portals, setPortals] = useState([]);
  return (
    <PortalContext.Provider value={[portals, setPortals]}>
    <Home></Home>
    </PortalContext.Provider>
  );
}

export default App;
