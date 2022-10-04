import { setupStore as store } from '../app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const AppProviders = () => {
    return (
        <Provider store={store()}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );
};

export default AppProviders;
