import NavBar from './components/NavBar';
import Profile from './components/Profile';
import About from './components/About';
// import Experience from './components/Experience';
import Projects from './components/Projects';
import './App.css';
import './index.css';

function App() {
  return (
    <div>
      <NavBar />
      <Profile />
      <About />
      {/* <Experience /> */}
      <Projects />
    </div>
  );
}

export default App;
