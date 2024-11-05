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


interface DrawerProps {
    status: string;
}

function Drawer({ status }: DrawerProps) {


    const [isOpen, setIsOpen] = useState(false);

    const handleInstallClick = () => {
        if (status === 'Unused') {
            setIsOpen(true); // 打开侧边栏
        }
    };

    const getButtonStyles = () => {
        if (status === 'InUse') {
            return 'border border-input rounded-md bg-gray-300 text-sm text-white shadow-sm  h-9 px-6 py-2 cursor-not-allowed '; // 在使用状态
        } else if (status === 'Unused') {
            return 'bg-theme-color text-sm text-gray-100 shadow hover:bg-theme-color/70 h-9 px-6 py-2'; // 未使用状态
        }
        return 'bg-gery-500 text-white'; // 默认样式
    };
    
    const buttonText = status === 'InUse' ? "已安装" : "安装";

    return (
        <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div 
                onClick={(e) => {
                    if (status === 'InUse') {
                        e.preventDefault(); // 阻止默认行为
                        e.stopPropagation(); // 阻止事件冒泡
                    } else {
                        handleInstallClick(); // 处理安装逻辑
                    }
                }} 
                className={` rounded-md px-6 py-2 ${getButtonStyles()}`}>
                    {buttonText}
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