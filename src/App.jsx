import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import TermsAndConditions from "./components/terms/TermsAndConditions";
import PrivacyPolicy from "./components/terms/PrivacyPolicy";
import RefundPolicy from "./components/terms/Refunds";
import ContactUs from "./components/terms/ContactUs";
import Chat from "./components/Chat";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests/>} />
              <Route path="/premium" element={<Premium />} />
              <Route path ="/tnc" element={<TermsAndConditions/>}/>
              <Route path ="/privacypolicy" element={<PrivacyPolicy/>}/>
              <Route path ="/refunds" element={<RefundPolicy/>}/>
              <Route path ="/contact" element={<ContactUs/>}/>
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;