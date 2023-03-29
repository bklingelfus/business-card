import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    
    // scroll to top everytime url changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}