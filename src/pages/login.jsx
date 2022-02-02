// importing all of our react libs
import React, { useRef, useState, useEffect, useContext } from "react"; // standard react to edit elements etc
import axios from "axios"; // ezpz web comm

import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonAlert,
  IonText,
  IonPage,
  useIonAlert,
} from "@ionic/react";

import {
  arrowForwardOutline,
  eyeOutline,
  eyeOffOutline,
  banOutline,
} from "ionicons/icons";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router-dom";
import {
  data_send,
  data_recieve,
  http_post,
  save_login,
  is_logged_in,
} from "../componets/data";
import { db_init, db_set, db_get } from "../componets/storage";
import { UserContext } from "../App";

const Login = (props) => {
  const [login_status] = useIonAlert();

  // states
  const [show_pass, set_show_pass] = useState(true);
  const [pass_shown, set_pass_shown] = useState("password");
  const user = useContext(UserContext);

  // refs
  const username_ref = useRef(null);
  const password_ref = useRef(null);

  // website
  var server_url = "https://ziadabdelati.com/check.php";

  const initial_login = () => {
    db_get("username").then((response) => {
      const username = response;
      db_get("password").then((res) => {
        const password = res;
        
        if (!username || !password) return;

        var obj = {
          email: username,
          pword: password,
          type: "login",
        };

        http_post(server_url, obj).then((response) => {
          if (response.search(240) != -1) {
            save_login(obj);
            user.setIsLoggedIn(true);
          } else {
            console.log(response);
            login_status("Incorrect Username or password, please try again", [
              { text: "Ok" },
            ]);
          }
        });
      });
    });
  };

  const send = () => {
    const username = username_ref.current.value; // the ? after current checks if the connections (refs) exists or not, an ! means we garauntee the fact that the value exists
    const password = password_ref.current.value;

    if (!username || !password) return;

    var obj = {
      email: username,
      pword: password,
      type: "login",
    };

    http_post(server_url, obj).then((response) => {
      if (response.search(240) != -1) {
        db_set("username", username);
        db_set("password", password);
        save_login(obj);
        user.setIsLoggedIn(true);
      } else {
        console.log(response);
        login_status("Incorrect Username or password, please try again", [
          { text: "Ok" },
        ]);
      }
    });
  };

  const register = () => {
    const username = username_ref.current.value;
    const password = password_ref.current.value;

    if (!username || !password) return;

    var obj = {
      email: username,
      pword: password,
      type: "login",
    };

    http_post(server_url, obj).then((response) => {
      login_status("Account successfully registered!", [{ text: "Ok" }]);
    });
  };

  const toggle_pass = () => {
    set_show_pass(!show_pass);
    set_pass_shown(show_pass ? "text" : "password");
  };

  useEffect(() => {
    db_init();
    initial_login();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary" className="title-th">
          <IonTitle>Smart Home Senior Thesis</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  clearInput={true}
                  type="email"
                  placeholder="email"
                  ref={username_ref}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  clearOnEdit={false}
                  type={pass_shown}
                  placeholder="password"
                  ref={password_ref}
                ></IonInput>
                {!show_pass && (
                  <IonIcon onClick={toggle_pass} slot="end" icon={eyeOutline} />
                )}
                {show_pass && (
                  <IonIcon
                    onClick={toggle_pass}
                    slot="end"
                    icon={eyeOffOutline}
                  />
                )}
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonButton onClick={send}>
                <IonIcon slot="end" icon={arrowForwardOutline} />
                Login
              </IonButton>
            </IonCol>

            <IonCol size="6">
              <IonButton onClick={register}>
                <IonIcon slot="end" icon={banOutline} />
                Register
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
