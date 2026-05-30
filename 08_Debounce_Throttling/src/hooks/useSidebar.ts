import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const useSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    }

    

    const openSidebar = () => {
        setIsSidebarOpen(true);
    }
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    return {openSidebar, closeSidebar, toggleSidebar, isSidebarOpen}
}