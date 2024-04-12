import Header from 'components/Header';
import Loader from 'components/Loader';
import MainContent from 'components/MainContent';
import Messsages from 'components/Messages';
import React from 'react';

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
