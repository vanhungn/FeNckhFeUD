import { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

function LoadingComponent() {
    return (
        <div style={{display:"flex", justifyContent:"center"}} className="sweet-loading">
            <ClimbingBoxLoader color="rgb(26, 78, 141)" size={20} />
        </div>
    );
}

export default LoadingComponent;
