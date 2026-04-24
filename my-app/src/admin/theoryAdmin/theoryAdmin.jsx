import classNames from "classnames/bind";
import style from "./theoryAdmin.module.scss"
import { DocumentAdmin } from "../../components/documentAdmin/documentAdmin";
const cx = classNames.bind(style)

export const TheoryAdmin = () => {
    return (
        <div className={cx('theoryAdmin')}>
            <DocumentAdmin path="/admin/theory/chapter/" title="Câu hỏi trắc nghiệm" headerDocx={false} bin={false} />

        </div>
    )
}