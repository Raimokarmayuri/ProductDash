import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import TransactionsTable from './TransactionsTable';
import BarChart from './BarChart';
import PieChart from './PaiChart';

function App() {
  return (
    <div className="App">
      {/* < Dashboard /> */}
      <TransactionsTable />
      {/* <BarChart/> */}
      {/* <PieChart/> */}
    </div>
  );
}

export default App;
