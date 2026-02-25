import classNames from "classnames/bind"
import style from "./Feature.module.scss"
const cx = classNames.bind(style)
export const FeatureIntroduce = ({ svg, title, desc }) => {
    return (
        <div className={cx('boxFeature')}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className={cx('icon')}>
                    {svg}
                </div>

                <h4>{title}</h4>
            </div>
            <p style={{ color: "gray", marginTop: 25 }}>{desc}</p>

        </div>
    )
}