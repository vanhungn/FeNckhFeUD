import { Route, Routes } from "react-router-dom"
import { Login } from "./Login/Login"
import { Home } from "./home/home"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IntroduceDepartment } from "./Introduce/IntroduceDepartment/IntroduceDepartment"
import { CodeLap } from "./codeLap/codeLap"
import IntroduceLapCode from "./introduceLapCode/introduceLapcode"
import { LayoutWithHeaderFooter } from "./LayoutWithHeaderFooter"
import { LayoutMain } from "./LayoutMain"
import { Practice } from "./practice/practice"
import { ScoreUp } from "./scoreup/scoreUp"
import { Contact } from "./contact/contact";
import { Admin } from "./admin/admin"
import { Information } from "./information/infomation";
import { InformationDetail } from "./informationDetail/informationDetail";
import { TrainingTechnology } from "./training/trainingTechnology";
import { TrainingDesign } from "./training/trainingDesign";
import { InfoSearch } from "./inforSearch/inforSearch";
import './App.css'
import '@coreui/coreui/dist/css/coreui.min.css';

function App() {
  const { pathname } = useLocation();
  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);
    return null;
  }


  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutWithHeaderFooter />}>
          <Route path="/code_lap" element={<CodeLap />} />
          <Route path="/code_lap_introduce" element={<IntroduceLapCode />} />
          <Route path="/code_lap_practice" element={<Practice />} />
        </Route>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/scoreup/*" element={<ScoreUp />} />

        <Route element={<LayoutMain />}>
          <Route path="/introduce/department" element={<IntroduceDepartment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/information" element={<Information />} />
          <Route path="/information/detail/:_id" element={<InformationDetail />} />
          <Route path="/training/technology" element={<TrainingTechnology />} />
          <Route path="/training/design" element={<TrainingDesign />} />
          <Route path="/search" element={<InfoSearch />} />
          <Route path="/" element={<Home />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
