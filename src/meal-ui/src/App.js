import 'styles/styles.css'; 
import RouterConfig from './navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'use-http';


export default function App() {
  const useHttpOptions = {
    cachePolicy: "no-cache"
  };

  return (
    <div className="meal-ui-basekit-theme negative-space-scale">
      <Provider options={useHttpOptions}>
        <BrowserRouter>
            <RouterConfig />
        </BrowserRouter>
      </Provider>
    </div>
  );
}
