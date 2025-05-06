import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
