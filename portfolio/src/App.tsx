import NavBar from './components/NavBar';
import Profile from './components/Profile';
import About from './components/About';
import Projects from './components/Projects';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import './index.css';

function App() {
  return (
    <div>
      <NavBar />
      <Profile />
      <About />
      <Projects />
      <ThemeToggle />
    </div>
  );
}

export default App;
