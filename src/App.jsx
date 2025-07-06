// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './pages/landing';
import Chat  from "./pages/chat"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
