import { Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, logInOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/login';
import TabManager from './pages/TabManager';

import OneSignal from "react-onesignal";

const App = () => {
  useEffect(() => {
    OneSignal.init({
      appId: "28e49e61-bde9-4f66-8225-67fb0b4fcd2a"
    });
  }, []);

  return (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} exact />
          <Route path="/TabManager" component={TabManager} exact />
          
          <Route exact path="/" component={Login} />
        </IonRouterOutlet>
        
    </IonReactRouter>
  </IonApp>
)};

export default App;