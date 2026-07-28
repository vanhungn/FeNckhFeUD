import classNames from "classnames/bind";
import style from "./formEdit.module.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  CFormSelect
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import {
  cilPlus,
  cilTrash,
  cilArrowTop,
  cilArrowBottom
} from "@coreui/icons";

import { Input } from "../../../components/inputs/inputs";

import { useEffect, useRef } from "react";


const cx = classNames.bind(style);



const getConfig = (dataEdit) => {

  if (!dataEdit)
    return null;



  // cấp 1
  if ("title" in dataEdit) {

    return {

      init: {
        title: dataEdit.title || "",
        kindOf: dataEdit.kindOf || ""
      },

      validate: {
        title:
          Yup.string()
            .required("Bạn vui lòng nhập tiêu đề")
      },

      name: "title",

      nameType: null,

      nameLocation: null
    };

  }




  // cấp 2
  if ("titleMenu" in dataEdit) {

    return {

      init: {

        titleMenu:
          dataEdit.titleMenu || "",

        typeof:
          dataEdit.typeof || "",

        location:
          dataEdit.location || ""

      },


      validate: {

        titleMenu:
          Yup.string()
            .required("Bạn vui lòng nhập tiêu đề")

      },


      name: "titleMenu",

      nameType: "typeof",

      nameLocation: "location"

    };

  }





  // cấp 3
  if ("titleChildrenMenu" in dataEdit) {

    return {

      init: {

        titleChildrenMenu:
          dataEdit.titleChildrenMenu || "",

        typeofChildrenMenu:
          dataEdit.typeofChildrenMenu || "",

        locationChildrenMenu:
          dataEdit.locationChildrenMenu || ""

      },


      validate: {

        titleChildrenMenu:
          Yup.string()
            .required("Bạn vui lòng nhập tiêu đề")

      },


      name: "titleChildrenMenu",

      nameType: "typeofChildrenMenu",

      nameLocation: "locationChildrenMenu"

    };

  }


  return null;

};






const toSlug = (str) => {

  if (!str)
    return "";


  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase();

};









export const FormEdit = ({

  dataEdit,

  onChange,

  onAddBannerTop,

  onRemoveBannerTop,

  onMoveBannerTop

}) => {


  const config = getConfig(dataEdit);


  const inputBannerRef = useRef();




  const formik = useFormik({

    initialValues:
      config?.init || {},


    enableReinitialize: true,


    validationSchema:
      Yup.object(
        config?.validate || {}
      ),


    onSubmit: () => { }

  });





  const name = config?.name;

  const nameType = config?.nameType;

  const nameLocation = config?.nameLocation;







  useEffect(() => {


    if (!dataEdit)
      return;


    onChange({

      ...dataEdit,

      ...formik.values

    });


  }, [formik.values]);









  useEffect(() => {


    if (

      dataEdit &&

      dataEdit._id === undefined &&

      nameType &&

      formik.values[name]

    ) {


      formik.setFieldValue(

        nameType,

        toSlug(
          formik.values[name]
        )

      );

    }


  }, [

    formik.values[name]

  ]);







  if (!config)
    return null;








  const handleUploadBannerTop = (e) => {


    const files =
      Array.from(
        e.target.files || []
      );


    if (files.length) {

      onAddBannerTop(files);

    }


    e.target.value = "";

  };









  return (

    <div className={cx("edit")}>



      <div className={cx("titleEdit")}>

        THÔNG TIN CHUNG

      </div>







      <Input

        name={name}

        value={
          formik.values[name] || ""
        }


        placeholder="Tiêu đề..."


        onChange={
          formik.handleChange
        }


        onBlur={
          formik.handleBlur
        }


        errors={
          formik.errors[name]
          &&
          formik.touched[name]
        }


        logError={
          formik.errors[name]
        }

      />









      {
        "title" in dataEdit &&


        <CFormSelect

          style={{
            marginTop: 20
          }}


          value={
            dataEdit.kindOf || ""
          }


          onChange={(e) =>


            onChange({

              ...dataEdit,

              kindOf:
                e.target.value

            })

          }


        >

          <option value="">

            -- Chọn loại --

          </option>


          <option value="tin_tuc">

            Tin tức

          </option>


          <option value="mon_hoc">

            Môn học

          </option>


        </CFormSelect>


      }









      {
        (nameType || nameLocation)

        &&


        <div className={cx("groupTypeAndLocation")}>



          {
            nameType &&


            <Input

              value={
                formik.values[nameType] || ""
              }


              disabled


              placeholder="Type"

            />


          }





          {
            nameLocation &&


            <Input

              value={
                formik.values[nameLocation] || ""
              }


              disabled


              placeholder="Location"

            />


          }



        </div>


      }
      




    </div>


  );


};