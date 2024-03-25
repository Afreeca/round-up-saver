import React from 'react';
import Header from 'components/Header';
import Messsages from 'components/Messages';
import MainContent from 'components/MainContent';
import Loader from 'components/Loader';

function Dashboard() {
  return (
    <div className='h-screen bg-stone-50 justify-center'>
      <div className='flex flex-col'>
        <Header />
        <Messsages />
        <Loader />
        <MainContent />
      </div>
    </div>
  );
}

export default Dashboard;
