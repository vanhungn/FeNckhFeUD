import { DocumentAdmin } from "../../components/documentAdmin/documentAdmin"
export const AdminDocument = () => {

    return (
        <DocumentAdmin path="/admin/document_detail/" title="Tài liệu khoa" headerDocx={true} bin={true} />
    )
}