import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodList from './FoodList';
import AddFood from './AddFood';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FoodList />} />
        <Route path='/add' element={<AddFood />} />
      </Routes>
    </Router>
  );
}

export default App;
