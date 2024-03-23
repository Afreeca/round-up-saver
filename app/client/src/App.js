import Header from 'components/Header';
import MainContent from 'components/MainContent';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className='h-screen bg-stone-50 justify-center'>
        <div className='flex flex-col'>
          <Header />
          <MainContent />
        </div>
      </div>
    </Provider>
  );
}

export default App;
