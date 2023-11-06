import './App.css';
import MyDataGrid from './modules/datagrid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        My diary
      </header>
      <MyDataGrid/>
      <div style={{height: 50}}></div>
    </div>
  );
}

export default App;
