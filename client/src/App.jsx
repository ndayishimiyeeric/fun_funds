import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, CampaignDetail, Profile, CreateCampaign } from './pages';
import { Navbar, Sidebar } from './components';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

    </div>
  )
}

export default App