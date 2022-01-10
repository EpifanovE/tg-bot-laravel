import React, {useEffect, useState} from "react";

const useIsMounted = () => {
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        return () => {setIsMounted(false)};
    }, []);

    return {
        isMounted
    }
};

export default useIsMounted;
