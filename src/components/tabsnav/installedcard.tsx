// 模版+1（可delete）
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import  { AlertDialogDemo }  from "@/components/tabsnav/uninstallalert"
import { LoadingOverlay } from "@/components/tabsnav/loading"
import { AlertLogDemo } from "@/components/tabsnav/logalert"




export function CardWithInStalled() {
    //卸载状态
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLogOpen, setIsLogOpen] = useState(false);
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    const closeLog = () => setIsLogOpen(false);

    //loading状态
    const [isLoading, setIsLoading] = useState(false);
    const handleUninstall = async () => {
        setIsLoading(true); // 开始 loading
        // 模拟卸载过程
        await new Promise(resolve => setTimeout(resolve, 3000)); // 2秒后完成
        setIsLoading(false); // 完成 loading
        closeDialog(); // 关闭对话框
    };

    //启动与停止状态
    const [isDisable, setIsDisable] = useState(false);
    const handleToggleStarted = () => {
        setIsDisable(!isDisable); // 切换安装状态
    };

    //日志点击事件状态
    const LogClick = () => {
        if (isDisable) {
            // 打开另一个组件（这里可以控制显示状态）
            setIsLogOpen(true); // 假设这是控制显示的状态
        } else {
            alert("Yes: 日志按钮正常，可以执行跳转或其他操作。");
            // 这里可以添加跳转逻辑，例如：
            // window.location.href = "/logs"; // 示例跳转
        }
    };


    return (
        <Card className="w-[560px]  h-[200px] m-2">
            <CardContent  className=" flex justify-start space-x-4 mt-9">
                <Avatar className="my-auto size-10">
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>VC</AvatarFallback>
                </Avatar>
            
                <CardDescription className="space-y-1 text-left">
                    <div className="text-lg font-medium text-slate-950">
                        AliyunOSS 
                        <span className={isDisable?'ml-6 border-2 rounded-full border-red-700 py-1 px-2 text-lg text-red-700':'ml-6 border-2 rounded-full border-theme-color py-1 px-2 text-lg text-theme-color'}>
                            {isDisable ? '已停止' : '已运行'}
                        </span>
                    </div>
                    <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                    </p>
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end mt-3">
                <Button 
                    variant="common" 
                    className={isDisable?'bg-gray-500 text-white cursor-not-allowed hover:bg-gray-500':''}
                    onClick={LogClick}
                    >日志</Button>
                <AlertLogDemo isOpen={isLogOpen} onClose={closeLog} isLogOpen={false} />

                <Button variant="common" className={isDisable?'bg-gray-500 text-white cursor-not-allowed hover:bg-gray-500':''} >参数</Button>
                <Button
                    variant="common"
                    onClick={handleToggleStarted}
                    className={isDisable ? 'bg-theme-color text-white' : ''}
                >
                    {isDisable ? '启用' : '停止'}</Button>
                
                <Button 
                    variant="common"
                    onClick={openDialog} 
                    >
                    卸载
                </Button>
                <AlertDialogDemo isOpen={isDialogOpen} onClose={closeDialog} onConfig={handleUninstall} />

                <Button variant="common">重启</Button>
                
            </CardFooter>   

            {isLoading && <LoadingOverlay />} {/* 显示 loading 蒙版 */}
        </Card>
    )
}
