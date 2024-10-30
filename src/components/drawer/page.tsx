import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ProfileForm } from "@/components/drawer/draform"
import  { useState } from "react";


function Drawer() {

    const [isInstalled, setIsInstalled] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const handleInstallClick = () => {
        if (!isInstalled) {
            setIsInstalled(true);
            setIsOpen(true); // 打开侧边栏
        }
    };


    return (
        <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div 
                onClick={(e) => {
                    if (isInstalled) {
                        e.preventDefault(); // 阻止默认行为
                        e.stopPropagation(); // 阻止事件冒泡
                    } else {
                        handleInstallClick(); // 处理安装逻辑
                    }
                }} 
                className={`cursor-pointer border-2 rounded-full px-5 py-2${isInstalled? " bg-gray-500 text-gray-200 cursor-not-allowed" : " bg-theme-color text-white"} `}>
                    {isInstalled? "已安装" : "安装"}
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='ml-9 -mt-1.5 text-gray-700'>返回</SheetTitle>
                    <SheetDescription className='pt-3'>
                    </SheetDescription>
                    <ProfileForm />
                </SheetHeader>
            </SheetContent>
        </Sheet>
        </>
    )
}



export default Drawer