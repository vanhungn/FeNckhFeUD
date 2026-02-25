import classNames from "classnames/bind";
import style from "./informationDetail.module.scss";
import { useEffect, useState } from "react";
import { Get } from "../baseService/baseService";
import { useNavigate, useParams } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilAlarm } from "@coreui/icons";
import { CButton } from "@coreui/react";
import BANNER from "../components/listBgrInfo";

import Editor from "../components/editor/editor";
const cx = classNames.bind(style);

export const InformationDetail = () => {
    const [dataDetail, setDataDetail] = useState(null);
    const [suggest, setSuggest] = useState([]);
    const [resetEditor, setResetEditor] = useState(true)
    const navigate = useNavigate()
    const { _id } = useParams();

    const callApi = async () => {
        try {
            const res = await Get(`/news/detail/${_id}`);
            setDataDetail(res.data.data);
            setSuggest(res.data.dataSuggest);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callApi();
    }, []);
    const d = new Date(dataDetail?.createdAt);
    const time = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;

    const titleNavigate = BANNER?.find((q) => q?.keyName === dataDetail?.typeOf);
    const handleNavigate = (path) => {
        navigate(`/information?info=${path}`)
    }
    return (
        <div className={cx("information")}>
            <div
                className={cx("banner")}
                style={{ backgroundImage: `url(https://i.pinimg.com/736x/81/71/90/81719096602acfff9ffb0fcea33e5de0.jpg)` }}
            >
                <div className={cx("contentBanner")}>
                    <h3>{dataDetail?.title}</h3>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <p className={cx("time")}>
                            <CIcon icon={cilAlarm} size="lg" /> <span>{time}</span>
                        </p>
                        <CButton onClick={() => handleNavigate(titleNavigate?.keyName)} className={cx("btnNavigate")} type="button">
                            {titleNavigate?.title}
                        </CButton>
                    </div>
                </div>
                <div className={cx("shadow")}></div>
            </div>

            <div style={{ width: "80%", margin: "auto", paddingTop: "30px" }}>
                <div className={cx('contentInfo')} style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
                    <Editor
                        style={{ backgroundColor: "#fff", width: "100%", padding: 0 }}
                        setResetEditor={setResetEditor}
                        resetEditor={resetEditor}
                        data={dataDetail?.content}
                        readOnly={true}
                    />
                    <div style={{ padding: "0 30px" }}>
                        <h4 className={cx('title')} style={{ color: "#0061bb", fontWeight: 600, fontSize: 30 }}>Tin cùng chuyên mục</h4>
                        <div>
                            {
                                suggest?.map((item, index) => {
                                    const d = new Date(item.createdAt);
                                    const day = d.getDate().toString().padStart(2, "0");
                                    const month = (d.getMonth() + 1).toString().padStart(2, "0");
                                    const year = d.getFullYear();
                                    const time = `${day}/${month}/${year}`;
                                    return (
                                        <div key={index} className={cx('boxNews')}>
                                            <img className={cx('imgNews')} src={item.img.url} alt="" />
                                            <div style={{ marginTop: 10 }}>
                                                <h5>{item.title}
                                                </h5>
                                                <p>{item.note}
                                                </p>
                                                <p className={cx('timeNews')} >{time}</p>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};
