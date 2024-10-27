import "@Assets/css/App.css";
import Footer from "@Components/layout/global/footer";
import Header from "@Components/layout/global/header";
import { UserProvider } from "@Context/UserContext";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <AppRoutes />
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
