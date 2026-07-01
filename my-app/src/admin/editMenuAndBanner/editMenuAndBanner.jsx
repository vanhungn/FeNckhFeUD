import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames/bind";
import styles from "./editMenuAndBanner.module.scss";
import { Get, Post } from "../../baseService/baseService";
import Banner from "../../home/Banner/Banner";
import { CButton, CFormLabel, CNav, CNavItem, CSpinner,CNavLink as CTabLink, } from "@coreui/react";
import {
  cilList,
  cilImage,
  cilSettings,
  cilSave,
  cilPlus,
  cilArrowTop,
  cilArrowBottom,
  cilTrash
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useRef } from "react";
import { FormEdit } from "./formEdit/formEdit";
const cx = classNames.bind(styles);

export const EditMenuAndBanner=() =>{
 const [data, setData] = useState([
   { menu: [
        {
            title: "Danh mục",
            menu1: [
               
            ]
        }
    ],
    logo: "#",
    banner: [
        {
            img: "#",
            locationBanner: 1
        }
    ]}
 ]
    
)
   const [activeTab, setActiveTab] = useState("menu");
    const [dataEdit,setDataEdit] = useState(null)
    
  const HandleCallApi = async()=>{
    try {
        const newData = await Get("/menu")
        const news =newData?.data?.data

        const activeM = news.map((item,index)=>({
            ...item,
            menu:item.menu.map((item1,index1)=>({
                                ...item1,
                                iCap1:index1,
                                status:false,
                                menu1:item1.menu1.map((item2,index2)=>({
                                    ...item2,
                                     icap2:index2,
                                    status:false,
                                }))
                            }))
                    }));
        
        setData(activeM)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    HandleCallApi()
  },[])
  const HandleDataEdit=(icap1,icap2,icap3)=>{
    
}
const toggleMenu = (cap, indexCap1, indexCap2,indexCap3) => {
    let result =null
    const product = data[0];
    if (indexCap2 === null && indexCap3 === null) {
        result = product.menu[indexCap1];   
    }
    else if (indexCap3 === null) {
        result = product.menu[indexCap1]?.menu1[indexCap2];
    }
    else {
        result = product.menu[indexCap1]?.menu1[indexCap2]?.menu2[indexCap3];
    }
    setDataEdit(result)
  setData(prev => prev.map(product => ({
    ...product,
    menu: product.menu.map(item1 => {
      if (cap === "cap1" && item1.iCap1 === indexCap1) {
        return { ...item1, status: !item1.status };
      }
      if (cap === "cap2" && item1.iCap1 === indexCap1) {
        return {
          ...item1,
          menu1: item1.menu1.map(item2 =>
            item2.icap2 === indexCap2
              ? { ...item2, status: !item2.status }
              : item2
          )
        };
      }
      return item1;
    })
  })));

};
const HandleAddDanhMucParent = () => {
    setData((prev) => prev.map((product, i) => 
        i === 0 ? {
            ...product,
            menu: [
                ...product.menu,
                {
                    title: `Danh mục ${product.menu.length+1}`,
                    iCap1: product.menu.length,
                    status: false,
                    menu1: []
                }
            ]
        } : product
    ))
}
const HandleAddDanhMucCap1=(icap1)=>{
    setData((prev)=>prev.map((product)=>
    ( {...product,
        menu:product.menu.map((item)=>
            item.icap1 == icap1?{
                ...item,
                menu1:[
                    ...item.menu1,
                    {
                        titleMenu: `Danh mục ${item.menu1.length+1}`,
                        typeof: "",
                        location: item.menu1.length+1   ,
                        icap2: item.menu1.length,
                        status: false,
                        menu2: []
                    }
                ]
            }:item
        )
     })
    ))
}
const HandleAddDanhMucCap2=(icap1,icap2)=>{
    setData((prev)=>prev.map((product)=>({
        ...product,
        menu:product.menu.map((item1)=>
            item1.icap1 === icap1 ?{
                ...item1,
                menu1: item1.menu1.map((item2)=>
                    item2.icap2===icap2?{
                        ...item2,
                           menu2: [
                            ...item2.menu2,
                            {
                                titleChildrenMenu: `Danh mục ${item2.menu2.length + 1} `,
                                typeofChildrenMenu: "",
                                locationChildrenMenu: item2.menu2.length + 1
                            }
                        ]
                    }:item2
                )

            }:item1
        )
    })))
}

const swapLocation =(arr, idx, newIdx)=>{
    const newArr = arr.map(item => ({...item}));
    const tempLoc = newArr[idx].location;
    newArr[idx].location = newArr[newIdx].location;
    newArr[newIdx].location = tempLoc;
  return newArr.sort((a, b) => a.location - b.location);
    
}
const HandleMoveMenu1 = (iCap1, index1, direction) => {
    setData(prev => prev.map(product => ({
        ...product,
        menu: product.menu.map(item1 => {
            if (item1.iCap1 !== iCap1) return item1;
            const sorted = [...item1.menu1].sort((a, b) => a.location - b.location);
            const newIdx = direction === "up" ? index1 - 1 : index1 + 1;
            if (newIdx < 0 || newIdx >= sorted.length) return item1;
            return { ...item1, menu1: swapLocation(sorted, index1, newIdx) };
        })
    })));
}
  return (
    <div>
     {
            data?.map((product,index)=>{
                return (
                    <div key={index}>
                         <div className={cx('category')}>
       
                            <div className={cx('boxLogo')}  >
                                <img className={cx('logo')} src={product.logo} alt="" />
                                <div >
                                    <p className={cx("nameVN")}>KHOA CÔNG NGHỆ THÔNG TIN</p>
                                    <p className={cx('nameEl')}> Faculty of Information Technology</p>
                                </div>
                            </div>
                            <div className={cx('listCategory')}>
                        
                                <div className={cx('menu')}> 
                                    {
                                        product?.menu?.map((item,index)=>{
                                            return(
                                                 <div key={index} className={cx('boxCategoryBottom')}  >
                                        <p className={cx('title')}>{item.title}</p>
                                        <svg
                                            className={cx('iconDown')}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 12 12"
                                        >
                                            <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                        </svg>
                                        <div className={cx('categorySmall')} >
                                            {
                                      item.menu1.map((item1, index1) => {
                                                    return (
                                                        <div key={index1} className={cx('categoryChildren1')}>
                                                            <p>{item1.titleMenu}</p>
                                                            <div>
                                                                {item1?.menu2?.map((item2, index2) => {
                                                                    return (
                                                                        <div style={{borderRadius:5}} key={index2}>
                                                                            <p>{item2.titleChildrenMenu}</p>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                            )
                                        })
                                    }
                                   
                                </div>
                            </div>  
                        </div>
                        <div className={cx("banners")}>
                            <Banner url={product?.banner} />
                        </div>
                    </div>
                )
            })
        }
        <div className={cx("editorWrap")}>
            <div className={cx("nav")}>
                <CNav variant="tabs" className={cx("tabs")}>
                    <CNavItem>
                        <CTabLink className={cx(activeTab === "menu"?"active":"noneActive")} onClick={() => setActiveTab("menu")}>
                            <CIcon icon={cilList} className="me-2" />
                            Menu
                        </CTabLink>
                    </CNavItem>
                    <CNavItem>
                        <CTabLink className={cx(activeTab === "banner"?"active":"noneActive")} onClick={() => setActiveTab("banner")}>
                            <CIcon icon={cilImage} className="me-2" />
                            Banner
                        </CTabLink>
                    </CNavItem>
                </CNav>
                    <CButton className={cx("btnSave")} color="Primary" type="Submit">
                        <CIcon icon={cilSave} className="me-2" />
                        Lưu
                    </CButton>
            </div>
            <div className={cx("editFormMenu")}>
                <div className={cx("edit")}>
                    {
                        data?.map((item,index)=>{
                            return(
                               <div key={index}>
                               {
                                item?.menu?.map((item1,index1)=>{
                                    return(
                                        <div  key={index1}>
                                            <div>
                                                <div  className={cx("lblTitleEdit")} 
                                                >
                                                    <div className={cx('boxMenu')} onClick={()=>toggleMenu("cap1", item1.iCap1,null,null)}>
                                                         <CFormLabel style={{margin:0}}>{item1.title}</CFormLabel>
                                                    <svg
                                                        className={cx('iconDown', { open: item1.status })}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15"
                                                        height="15"
                                                        viewBox="0 0 12 12"
                                                        >
                                                    <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                                    </svg>
                                                    </div>
                                                   
                                                    <div className={cx('setting')}>
                                                        <div style={{display:"flex",gap:5}}>
                                                            <div className={cx('boxIcon')}>
                                                                <CIcon className={cx('iconCilArrowTop')} icon={cilArrowTop} />

                                                            </div>
                                                            <div className={cx('boxIcon')}>
                                                                <CIcon  className={cx('iconCilArrowTop')} icon={cilArrowBottom}  />

                                                            </div>
                                                            <div>
                                                        <CIcon className={cx('iconTrash')} icon={cilTrash} />

                                                            </div>
                                                        </div>
                                                        

                                                    </div>
                                                    </div  >
                                                    <div 
                                                    style={{
                                                        height: item1.status 
                                                         ? "auto" 
                                                        : "0",
                                                        overflow: "hidden",
                                                        transition: "height 0.3s ease"
                                                    }}
                                                     className={cx('bordermenu')}
                                                     >
                                                        {
                                                        item1?.menu1?.map((item2,index2)=>{
                                                            return(
                                                                <div key={index2} style={{marginLeft:10, padding:"10px 0"}} >
                                                                    <div className={cx("lblTitleEdit1")}  >
                                                                        <div className={cx('boxMenu')}  onClick={()=>toggleMenu("cap2",item1.iCap1, item2.icap2,null)}>
                                                                            <CFormLabel style={{margin:0}}>{item2.titleMenu}</CFormLabel>
                                                                        <svg
                                                                            className={cx('iconDown', { open: item2?.status })}
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="15"
                                                                            height="15"
                                                                            viewBox="0 0 12 12"
                                                                            
                                                                            >
                                                                        <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                                                        </svg> 
                                                                        </div>
                                                                       
                                                                           <div className={cx('setting')}>
                                                                                <div style={{display:"flex",gap:5}}>
                                                                                    <div className={cx('boxIcon')} onClick={()=>HandleMoveMenu1(item1.iCap1,index2, "up")}>
                                                                                        <CIcon className={cx('iconCilArrowTop')} icon={cilArrowTop} />

                                                                                    </div>
                                                                                    <div className={cx('boxIcon')} onClick={()=>HandleMoveMenu1(item1.iCap1,index2, "down")}>
                                                                                        <CIcon  className={cx('iconCilArrowTop')} icon={cilArrowBottom}  />

                                                                                    </div>
                                                                                    <div>
                                                                                <CIcon className={cx('iconTrash')} icon={cilTrash} />

                                                                                    </div>
                                                                                </div>
                                                        

                                                                        </div>
                                                                    </div>
                                                                    <div className={cx("menuCollapse ")}>

                                                                  
                                                                    <div className={cx('bordermenu')} 
                                                                    style={{padding:item2?.status ? "10px ":"0",display:"flex",flexDirection:"column",gap:"10px",
                                                                          height: item2?.status 
                                                                            ? "auto" 
                                                                            : "0",
                                                                            overflow: "hidden",
                                                                            transition: "height 0.3s ease"
                                                                    }} 
                                                                    >
                                                                                {
                                                                                item2?.menu2?.map((item3,index3)=>{
                                                                                    return(
                                                                                        <div key={index3} style={{marginLeft:10}}  onClick={()=>toggleMenu("",item1.iCap1, item2.icap2,index3)} >
                                                                                            <div className={cx("lblTitleEdit2")}>
                                                                                                <CFormLabel style={{margin:0}}>{item3.titleChildrenMenu}</CFormLabel>
                                                                                            </div>
                                                                                        </div>
                                                                                        
                                                                                    )
                                                                                })
                                                                                
                                                                            }
                                                                        <CButton onClick={()=>HandleAddDanhMucCap2(item1.icap1,item2.icap2)}  style={{marginLeft:10}} className={cx('btnAdd')} type="button">
                                                                            <CIcon style={{margin:"0px"}} icon={cilPlus} />
                                                                        </CButton>
                                                                    </div>
                                                                   </div>
                                                                </div>
                                                                
                                                            )
                                                        })
                                                    }
                                                    
                                                    <CButton onClick={()=>HandleAddDanhMucCap1(item1.icap1)} style={{marginLeft:10}} className={cx('btnAdd')} type="button">
                                                        <CIcon style={{margin:"0px"}} icon={cilPlus} />
                                                    </CButton>
                                                    </div>

                                               
                                            </div>
                                            
                                           
                                        </div>
                                        
                                    )
                                    
                                })
                               }
                                    
                               </div>
                                
                               
                            )
                        })
                    }
                         <CButton onClick={()=>HandleAddDanhMucParent()} className={cx('btnAdd')} type="button">
                               <CIcon style={{margin:"0px"}} icon={cilPlus} />
                         </CButton>
                </div>
                <div className={cx("formEdit")}>
                    {
                           dataEdit == null
    ? <div className={cx("emptyDisplay")}>
        <CIcon icon={cilSettings} style={{ width: 48, height: 48, color: "#ccc" }} />
        <p style={{ color: "#aaa", marginTop: 12, fontSize: 14 }}>
            Chọn một mục bên trái để chỉnh sửa
        </p>
      </div>
    : <FormEdit dataEdit={dataEdit} />

                    }
                     
                </div>
            </div>
        </div>
    </div>
  );
}