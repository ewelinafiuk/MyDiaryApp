import React, {useState} from 'react';
import moment from 'moment';
import EventsGrid from './modules/events-grid';
import MyTimeline from './modules/timeline';
import CategoriesGrid from './modules/categories-grid';
import { events } from './constants/events';
import { categories } from './constants/categories';

const styles = {
  app: {
    textAlign: 'center',
    backgroundColor: '#9a9b9e'
  },
  appHeader: {
    backgroundColor: '#282c34',
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
    fontSize: 30,
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center'
  },
  footer: {
    height: 50
  }
};


function App() {
  const [eventRows, setEventRows] = useState(events);
  const [categoriesRows, setCategoriesRows]= useState(categories);

  const sortEvents = () => {
    return eventRows.slice().filter(e => !e.isNew).sort((r1, r2) => !!r1.startDate ? moment(r1.startDate).isBefore(moment(r2.startDate)) : true)
  }

  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        My diary
      </header>
      <MyTimeline categories={categoriesRows} events={sortEvents()} />
      <EventsGrid rows={eventRows} setRows={setEventRows} categoriesRows={categoriesRows}/>
      <CategoriesGrid categories={categoriesRows} setCategories={setCategoriesRows} events={eventRows}/>
      <div style={styles.footer}></div>
    </div>
  );
}

export default App;
