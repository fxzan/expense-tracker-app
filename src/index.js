import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { InfoModalContextProvider } from "./store/infoModal-context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <AuthContextProvider>
         <InfoModalContextProvider>
        <div className="content-wrapper">
          <App />
        </div>
        </InfoModalContextProvider>
      </AuthContextProvider>
  </BrowserRouter>
);
