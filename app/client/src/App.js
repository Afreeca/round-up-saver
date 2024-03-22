import Header from 'components/Header';
import MainContent from 'components/MainContent';
import { AccountsContextProvider } from 'context/AccountContext';

function App() {
  return (
    <div className="h-screen bg-stone-50 justify-center">
      <div className='flex flex-col'>
        <AccountsContextProvider>
          <Header />
          <MainContent />
        </AccountsContextProvider>
      </div>
    </div>
  );
}

export default App;
