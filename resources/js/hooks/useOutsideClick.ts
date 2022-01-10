import { useEffect } from "react";

const useOutsideClick = (ref: any, callback: any) => {
    const handleClick = (e: React.MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick as any);

        return () => {
            document.removeEventListener("click", handleClick as any);
        };
    });
};

export default useOutsideClick;