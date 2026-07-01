import classNames from "classnames/bind";
import style from "./formEdit.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CForm } from "@coreui/react";
import { Input } from "../../../components/inputs/inputs";

const cx = classNames.bind(style);

const getConfig = (dataEdit) => {
  if ("title" in dataEdit) return {
    init: { title: dataEdit?.title || "" },
    validate: { title: Yup.string().required("Bạn vui lòng nhập tiêu đề") },
    name: "title",
    nameType: null,
    nameLocation: null,
  };
  if ("titleMenu" in dataEdit) return {
    init: {
      titleMenu: dataEdit?.titleMenu || "",
      typeof: dataEdit?.typeof || "",
      location: dataEdit?.location || null,
    },
    validate: { titleMenu: Yup.string().required("Bạn vui lòng nhập tiêu đề") },
    name: "titleMenu",
    nameType: "typeof",
    nameLocation: "location",
  };
  if ("titleChildrenMenu" in dataEdit) return {
    init: {
      titleChildrenMenu: dataEdit?.titleChildrenMenu || "",
      typeofChildrenMenu: dataEdit?.typeofChildrenMenu || "",
      locationChildrenMenu: dataEdit?.locationChildrenMenu || null,
    },
    validate: { titleChildrenMenu: Yup.string().required("Bạn vui lòng nhập tiêu đề") },
    name: "titleChildrenMenu",
    nameType: "typeofChildrenMenu",
    nameLocation: "locationChildrenMenu",
  };
  return null;
};

export const FormEdit = ({ dataEdit }) => {
  // Lấy config trước
  const config = getConfig(dataEdit);

  // Gọi useFormik ở top level — không đặt trong if/else
  const formik = useFormik({
    initialValues: config?.init ?? {},
    enableReinitialize: true,
    validationSchema: Yup.object(config?.validate ?? {}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  if (!config) return null;

  const { name, nameType, nameLocation } = config;
  const err = formik.errors[name] && formik.touched[name];
  const logError = formik.errors[name];
  const toSlug = (str) => {
    if (!str) return ""  
  return str
    .normalize("NFD")                         
    .replace(/[\u0300-\u036f]/g, "")          
    .replace(/đ/g, "d").replace(/Đ/g, "D")    
    .replace(/\s+/g, "_")                   
    .replace(/[^a-zA-Z0-9_]/g, "")        
    .toLowerCase()                      
}

 const nameTy = toSlug(formik.values[name])

  return (
    <div className={cx("edit")}>
      <CForm onSubmit={formik.handleSubmit}>
        <div className={cx("titleEdit")}>THÔNG TIN CHUNG</div>
        <div>
          <Input
            name={name}
            value={formik.values[name] || ""}
            placeholder="Tiêu đề..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={err}
            logError={logError}
          />
        </div>
        <div className={cx("groupTypeAndLocation")}>
          <Input value={nameTy} disabled />
          <Input value={ formik.values[nameLocation ]} disabled />
        </div>
      </CForm>
    </div>
  );
};