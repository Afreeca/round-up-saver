import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-950 text-white p-4 w-full h-min px-10">
      <div className="container">
        <a href="https://www.starlingbank.com/" target="_blank" rel="noopener noreferrer">
            <img src='assets/logo.svg' alt='starling logo' height={140} width={140}/>
        </a>
      </div>
    </header>
  );
};

export default Header;
