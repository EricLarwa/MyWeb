import Navbar from './Nav/Navbar'
import Dash from './landing/Dash'
import Projects from './project/Projects'
import Contact from './contact/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section id="about">
        <Dash />
      </section>
      <section id="experience">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <footer>
        <p>&copy; 2025 Eric Larwa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
