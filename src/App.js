import React, {useState} from 'react';
import moment from 'moment';
import MyDataGrid from './modules/datagrid';
import MyTimeline from './modules/timeline';
import CategoriesGrid from './modules/categories-grid';
import { events, categories } from './constants/constants';
import './App.css';

function App() {
  const [eventRows, setEventRows] = useState(events);
  const [categoriesRows, setCategoriesRows]= useState(categories);

  const sortEvents = () => {
    return eventRows.slice().sort((r1, r2) => !!r1.startDate ? moment(r1.startDate).isBefore(moment(r2.startDate)) : true)
  }

  return (
    <div className="App">
      <header className="App-header">
        My diary
      </header>
      <MyTimeline categories={categoriesRows} events={sortEvents()} />
      <MyDataGrid rows={eventRows} setRows={setEventRows} categoriesRows={categoriesRows}/>
      <CategoriesGrid categories={categoriesRows} setCategories={setCategoriesRows}/>
      <div style={{height: 50}}></div>
    </div>
  );
}

export default App;
