import React, {FC} from "react";

const Overlay: FC = () => {
    return <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(255,255,255,.5)"
    }}/>
};

export default Overlay;
