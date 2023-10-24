import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from 'react-redux';
import { Store } from '@/stores';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <App />
    </Provider>
    
)
