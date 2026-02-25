import classNames from "classnames/bind";
import style from "./readDocument.module.scss"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Get } from "../../baseService/baseService";
const cx = classNames.bind(style)

export const ReadDocument = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [files, setFiles] = useState({})
    const course = searchParams.get('_idCourse')
    const docx = searchParams.get('selectCode')
    useEffect(() => {
        const CallApi = async () => {
            const data = await Get(`/document/docx/${course}/${docx}`)
            setFiles(data?.data?.data)
        }
        CallApi()
    }, [])
    console.log(course)


    const extension = files?.name?.split(".").pop().toLowerCase();
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(files?.url)}&embedded=true`;
    return (
        <div className={cx("fileViewer")}>

            {extension === "pdf" ?
                <iframe
                    src={files?.url}
                    width="100%"
                    height="100%"
                    title={files?.name}
                    style={{ border: "1px solid #ccc", borderRadius: "8px", marginBottom: "20px" }}
                /> :
                <iframe
                    src={viewerUrl}
                    height="100%"
                    title={files?.name}
                    style={{ width: "100%", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "20px" }}
                />
            }

        </div>
    )
}