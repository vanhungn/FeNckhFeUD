import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

export const ModalInform = ({ handleSubmit, setVisible, visible, result }) => {
    return (
        <CModal
            visible={visible}
            onClose={() => {
                document.activeElement.blur(); 
                setVisible(false);
            }}
            aria-labelledby="LiveDemoExampleLabel"
        >
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Nộp bài</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Số câu hoàn thành hiện tại <b>{result}</b> bạn có chắc muốn nộp không?
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => {
                    document.activeElement.blur();
                    setVisible(false);
                }}>
                    Hủy
                </CButton>
                <CButton
                    color="primary"
                    onClick={(e) => {
                        document.activeElement.blur();
                        setVisible(false);
                        handleSubmit(e);
                    }}
                >
                    Hoàn thành
                </CButton>
            </CModalFooter>
        </CModal>


    )
}