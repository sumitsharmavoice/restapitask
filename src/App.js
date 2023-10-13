import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableData from "./components/TableData";
function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<TableData />}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
