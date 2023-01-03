import './styles/styles.css'; 

import RouterConfig from './navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';

// import Navigation from 'pages/Home/components/Navigation';


export default function App() {
  return (
    <div className="meal-ui-basekit-theme">
      <BrowserRouter>
          <Navigation />
          <RouterConfig />
      </BrowserRouter>
    </div>
  );
}
