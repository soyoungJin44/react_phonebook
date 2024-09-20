import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './pages/List';
import EditForm from './pages/EditForm';
import WriteForm from './pages/WriteForm';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/list' element={<List />} />
          <Route path='/editForm' element={<EditForm />} />
          <Route path='/writeForm' element={<WriteForm />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;