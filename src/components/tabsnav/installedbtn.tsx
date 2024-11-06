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
import { AlertLogDemo, AlertLogHave } from "@/components/tabsnav/logalert"
import EditDrawer from "@/components/drawer/editpage";
import { Item } from "@/type.d/common";
import { Skeleton } from "@/components/ui/skeleton"


export function InStalledBtn( { app }: { app: Item } ) {
    //卸载状态
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLogDemoOpen, setIsLogDemoOpen] = useState(false);  // 控制 AlertLogDemo 的显示
    const [isLogHaveOpen, setIsLogHaveOpen] = useState(false);  // 控制 AlertLogHave 的显示
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 控制 EditDrawer 的显示

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    const closeLog = () => setIsLogDemoOpen(false); // 关闭 AlertLogDemo 弹窗
    const closeLogHave = () => setIsLogHaveOpen(false); // 关闭 AlertLogHave 弹窗
    const closeDrawer = () => setIsDrawerOpen(false); // 关闭 EditDrawer 弹窗

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

    // 日志按钮点击事件
    const handleLogClick = () => {
        if (isDisable) {
            // 如果按钮禁用，打开 AlertLogDemo 弹窗
            setIsLogDemoOpen(true);
        } else {
            // 如果按钮启用，打开 AlertLogHave 弹窗
            setIsLogHaveOpen(true);
        }
    };

     // 打开 EditDrawer
     const openDrawer = () => {
        setIsDrawerOpen(true);
    };


    return (
        <Card className="w-[560px]  h-[200px] m-2">
            <CardContent  className=" flex justify-start space-x-4 mt-9">

            {isLoading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
            ) : (
                <Avatar className="my-auto size-10">
                    <AvatarImage src={app.icon} />
                    <AvatarFallback>loading</AvatarFallback>
                </Avatar>
            )}

                <CardDescription className="space-y-1 text-left">
                    {isLoading ? (
                    <Skeleton className="h-6 w-48" />
                    ) : (
                    <div className="text-lg font-medium text-slate-950">
                        {app.name}
                        <span className={isDisable?'ml-6 border-2 rounded-full border-red-700 py-1 px-2 text-lg text-red-700':'ml-6 border-2 rounded-full border-theme-color py-1 px-2 text-lg text-theme-color'}>
                            {isDisable ? '已停止' : '已运行'}
                        </span>
                    </div>
                    )}

                    {isLoading ? (
                    <Skeleton className="h-4 w-56" />
                    ) : (
                    <p className="text-sm">
                    {app.description || "No description available"} {/* 使用 app.description */}
                    </p>
                    )}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end -mt-1">
                {/* 按钮部分：如果加载中，显示占位符 */}
                {isLoading ? (
                <>
                    <Skeleton className="h-8 w-20 mx-2" />
                    <Skeleton className="h-8 w-20 mx-2" />
                    <Skeleton className="h-8 w-20 mx-2" />
                    <Skeleton className="h-8 w-20 mx-2" />
                </>
                ) : (
                <>
                <Button 
                    variant="common" 
                    className={isDisable?'bg-gray-500 text-white cursor-not-allowed hover:bg-gray-500':''}
                    onClick={handleLogClick}
                    >日志</Button>
                {/* 渲染弹窗组件 */}
                {isLogDemoOpen && <AlertLogDemo isOpen={isLogDemoOpen} onClose={closeLog} isLogOpen={false} />}
                {isLogHaveOpen && <AlertLogHave isOpen={isLogHaveOpen} onClose={closeLogHave} isLogOpen={false} />}
        

                <Button variant="common" onClick={openDrawer}>
                    参数
                </Button>
                {/* 渲染 EditDrawer */}
                <EditDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
                
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
                </>
                )}
            </CardFooter>   

            {isLoading && <LoadingOverlay />} {/* 显示 loading 蒙版 */}
        </Card>
    )
}
