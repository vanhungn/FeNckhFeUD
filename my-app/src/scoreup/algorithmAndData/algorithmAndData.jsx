import classNames from "classnames/bind";
import style from "./algorithmAndData.module.scss"
import { Code } from "../../components/Code/Code";
import { useEffect, useState } from "react";
import { Get } from "../../baseService/baseService";
import { useParams } from "react-router-dom";
const cx = classNames.bind(style)

export const AlgorithmAndData = () => {
    const [detail, setDetail] = useState({})
    const { code } = useParams()

    const CallApi = async () => {
        try {
            const data = await Get(`/problem/detail/${code} `)
            setDetail(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        CallApi()
    }, [])
    return (
        <div className={cx('algorithmAndData')}>
            <div className={cx('topic')}>
                <p>{detail?.statement}
                </p>
                <div>
                    <p>{detail?.suggest}</p>
                </div>
                <h5>Ví dụ:</h5>
                <div className={cx('output')}>

                    <h6>Input:</h6>
                    <div style={{ backgroundColor: '#fff', padding: 5, borderRadius: 10 }}>

                        {detail?.input}
                    </div>


                    Output:
                    <div style={{ backgroundColor: '#fff', padding: 5, borderRadius: 10 }}>

                        {detail?.output}
                    </div>

                </div>
            </div>
            <Code />
        </div>
    )
}