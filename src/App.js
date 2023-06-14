import './App.css';
import Sidebar from './SideBarComponents/Sidebar';
import Table from './TableComponents/Table';

function App() {
  return (
    <div className="App">
      <Sidebar>
        <Table/>
      </Sidebar>
    </div>
  );
}

export default App;
