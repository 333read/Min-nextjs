import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { AlertDialogDemo } from "@/components/tabsnav/uninstallalert"
import { LoadingOverlay } from "@/components/tabsnav/loading"
import { AlertLogDemo, AlertLogHave } from "@/components/tabsnav/logalert"
import EditDrawer from "@/components/drawer/editpage"
import { Item } from "@/type.d/common"
import { Skeleton } from "@/components/ui/skeleton"

export function InStalledBtn({ app,loadData }:  { app: Item, loadData: () => void }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLogDemoOpen, setIsLogDemoOpen] = useState(false)
    const [isLogHaveOpen, setIsLogHaveOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const openDialog = () => setIsDialogOpen(true)
    const closeDialog = () => setIsDialogOpen(false)
    const closeLog = () => setIsLogDemoOpen(false)
    const closeLogHave = () => setIsLogHaveOpen(false)
    const closeDrawer = () => setIsDrawerOpen(false)

    const [isLoading, setIsLoading] = useState(false)
    const handleUninstall = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 3000)) // 模拟卸载过程
        loadData(); // 卸载完成后触发 loadData 刷新数据
        setIsLoading(false)
        closeDialog() // 关闭对话框
    }

    const [isDisable, setIsDisable] = useState(false)
    const handleToggleStarted = () => {
        setIsDisable(!isDisable)
    }

    const handleLogClick = () => {
        if (isDisable) {
            setIsLogDemoOpen(true)
        } else {
            setIsLogHaveOpen(true)
        }
    }

    const openDrawer = () => {
        setIsDrawerOpen(true)
    }

    return (
        <Card className="w-[560px]  h-[200px] my-3 mx-3">
            <CardContent className="flex justify-start space-x-4 mt-9">
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
                            <span
                                className={
                                    isDisable
                                        ? "ml-6 border-2 rounded-full border-red-700 py-1 px-2 text-lg text-red-700"
                                        : "ml-6 border-2 rounded-full border-theme-color py-1 px-2 text-lg text-theme-color"
                                }
                            >
                                {isDisable ? "已停止" : "已运行"}
                            </span>
                        </div>
                    )}

                    {isLoading ? (
                        <Skeleton className="h-4 w-56" />
                    ) : (
                        <p className="text-sm line-clamp-3 min-h-[63px] leading-[21px]">{app.description || "No description available"}</p>
                    )}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end -mt-1">
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
                            className={isDisable ? "bg-gray-500 text-white cursor-not-allowed hover:bg-gray-500" : ""}
                            onClick={handleLogClick}
                        >
                            日志
                        </Button>
                        {isLogDemoOpen && <AlertLogDemo isOpen={isLogDemoOpen} onClose={closeLog} isLogOpen={false} />}
                        {isLogHaveOpen && <AlertLogHave isOpen={isLogHaveOpen} onClose={closeLogHave} isLogOpen={false} />}

                        <Button 
                            variant="common" 
                            onClick={openDrawer}  
                            className={isDisable ? "bg-gray-500 text-white cursor-not-allowed hover:bg-gray-500" : ""}>
                            参数
                        </Button>
                        <EditDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />

                        <Button variant="common" onClick={handleToggleStarted} className={isDisable ? "bg-theme-color text-white" : ""}>
                            {isDisable ? "启用" : "停止"}
                        </Button>

                        <Button variant="common" onClick={openDialog}>
                            卸载
                        </Button>
                        <AlertDialogDemo 
                            isOpen={isDialogOpen} 
                            onClose={closeDialog} 
                            app={app} 
                            onUninstall={handleUninstall} 
                            />

                        <Button variant="common">重启</Button>
                    </>
                )}
            </CardFooter>

            {isLoading && <LoadingOverlay />}
        </Card>
    )
}
