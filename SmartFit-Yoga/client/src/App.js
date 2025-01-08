import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { Toaster } from 'react-hot-toast';
import ChatBot from './pages/Chat/ChatBot';


const App = () => {
  return (
    //<GoogleOAuthProvider clientId={process.env.REACT_APP_GG_CLIENT_ID}>
    <div>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return <Route key={route.id} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </Router>
      <ChatBot/>
    </div>
  );
};

export default App;
