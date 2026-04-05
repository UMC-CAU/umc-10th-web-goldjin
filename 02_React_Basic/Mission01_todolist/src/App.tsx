import './App.css'
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';


function App() {
  return (
    <>
    <div className='background'>
      <div className='card'>
      <header>
        <TaskInput />
      </header>
      <main>
        <TaskList listType='todo'/>
        <TaskList listType='done'/>
      </main>
      </div>
    </div>
    </>
  )
}

export default App;
