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
import { InfoSearch } from "./inforSearch/inforSearch";
import TeachingStaff from "./teachingStaff/teachingStaff";
import { Facilities } from "./facilities/facilities";
import { ComputerScience } from "./computerScience/computerScience";
import { DataScience } from "./dataScience/dataScience";
import { GraphicDesign } from "./graphicDesign/graphicDesign";
import { InformationTechnology } from "./informationTechnology/informationTechnology";
import { StudentSupportForm } from "./studentSupportForm/studentSupportForm";
import './App.css'
import '@coreui/coreui/dist/css/coreui.min.css';
import "./i18n.js";
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

          <Route path="/information_technology" element={<InformationTechnology />} />
          <Route path="/teaching_staff" element={<TeachingStaff />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/computer_science" element={<ComputerScience />} />
          <Route path="/data_science" element={<DataScience />} />
          <Route path="/graphic_design" element={<GraphicDesign />} />
          <Route path="/search" element={<InfoSearch />} />
          <Route path="/form" element={<StudentSupportForm />} />
          <Route path="/" element={<Home />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
