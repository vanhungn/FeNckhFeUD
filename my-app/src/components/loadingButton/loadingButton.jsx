import { useState } from "react";
import { ClipLoader, SyncLoader } from "react-spinners";

function LoadingButton() {
    return (
        <div className="sweet-loading">
            <SyncLoader color="#fff" size={6} />
        </div>
    );
}

export default LoadingButton;
