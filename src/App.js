import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './pages/List';
import EditForm from './pages/EditForm';
import WriteForm from './pages/WriteForm';
import List2 from './pages/List2';
import List3 from './pages/List3';




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/list' element={<List />} />
          <Route path='/editForm/:no' element={<EditForm />} />
          <Route path='/writeForm' element={<WriteForm />} />
          <Route path='/list2' element={<List2 />} />
          <Route path='/list3' element={<List3 />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;