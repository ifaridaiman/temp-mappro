import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";

export const useNavbar = () => {

    const { setShowRightWidget, showRightWidget, setWidgetContent, widgetContent} = useThemeContext();

    const handleOpenRightWidget = (content?: string | null) => {
        setShowRightWidget(!showRightWidget);
        // once off, remove all layers that created by swipe widget
        
        if(showRightWidget == true){
            setWidgetContent(null);
        }
        if (content !== undefined) {
            setWidgetContent(content);
        }
    };

    const handleCloseRightWidget = () => {
        setShowRightWidget(false);
        setWidgetContent(null);
    };

    const router = useRouter();

    const handleClick = (action: string) => {
        // Close all widgets before opening the new one
        // closeRightWidget();

        switch (action) {

            case "imagery_swipe":
                handleOpenRightWidget("imagery_swipe")
                break;

            case "home":
                router.push("/");
                break;
            default:
                console.log("Default action or navigate:", action);
        }
    };

    return { handleClick, handleOpenRightWidget, handleCloseRightWidget };
};
