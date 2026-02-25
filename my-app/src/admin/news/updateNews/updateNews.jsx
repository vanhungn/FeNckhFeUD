import { CreateNews } from "../createNews/createNews";
import classNames from "classnames/bind";
import style from "./updateNew.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Get } from "../../../baseService/baseService";
const cx = classNames.bind(style)

export const UpdateNews = () => {
    const { _id } = useParams()
    const [data, setData] = useState({})

    const callData = async () => {
        try {
            const result = await Get(`/news/detail/${_id}`)
            setData(result.data.data)
        } catch (error) {
            console.log()
        }
    }
    useEffect(() => {
        callData()
    }, [])
    return (
        <CreateNews dataTrans={data} path={`/news/update/${_id}`} />
    )
}