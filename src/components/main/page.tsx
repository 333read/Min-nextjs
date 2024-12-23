/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Drawer from "@/components/drawer/page";
import { useEffect, useState } from "react";
import { PaginationCom } from "@/components/tabsnav/paginationcom";
import UniSearch from "@/components/tabsnav/search"
import { InStalledBtn } from "@/components/tabsnav/installedbtn";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Item } from "@/type.d/common";
import { motion, AnimatePresence } from "framer-motion"; // 引入 framer-motion
import * as http from '@/api/modules/fouceinter'
import { useTokenStore } from "@/store/ TokenContext";

const fetchAppsData = async (tab: string, className = '', currentPage: number, pageSize = 9, query: string = '') => {

    const p = {
        page: 1,
        page_size: 9,
        name: '',
        descript: '',
        class: ''
    }
    if (tab === 'all') {

        p.page = currentPage;
        p.page_size = pageSize;
        p.name = query;
        p.descript = query;

        if (className && className !== 'all' && className !== 'allson') {
            p.class = className;
        }
    } else if (tab === 'installed') {
        p.page = currentPage;
        p.page_size = pageSize;
        p.name = query;
        p.descript = query;

        if (className && className !== 'installed' && className !== 'allson') {
            p.class = className;
        }
    }

    try {
        let response;
        if (tab === 'all') {
            response = await http.getAppList(p)
        } else if (tab === 'installed') {
            response = await http.getInstalledAppList(p)
        }

        if (response?.code === 200) {
            if (response.data) {

                return {
                    items: response.data.items, // 返回应用数据
                    total: response.data.total, // 返回数据总数
                };

            }

        } else {
            throw new Error(response?.msg);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { items: [], total: 0 }; // 请求失败时返回空数组和总数为 0
    }
};


const handleMicroData = () => {
    const eventCenterForMicroApp = window.eventCenterForAppNameVite;
    //
    if (eventCenterForMicroApp) {
        // 设置名称
        // GlobalStore().setAppName(eventCenterForMicroApp.appName)
        // 主动获取基座下发的数据
        const info = eventCenterForMicroApp.getData();
        // if (info?.type == "init") {
        // initGlobaStore(info)
        // }
        useTokenStore.getState().token = info?.userInfo?.token
        console.log('22222222333333333', useTokenStore.getState().token);

        // 监听基座下发的数据变化
        eventCenterForMicroApp.addDataListener((data: any) => {
            // handleData(router, eventCenterForMicroApp.appName, data)
            console.log('1111111111', data);

            // useTokenStore().setToken(data.token)
        });
        // 监听基座下发的数据变化 - 全局
        eventCenterForMicroApp.addGlobalDataListener(() => {
            // useTokenStore().setToken(data.token)
        });
    }
}
handleMicroData();

function MainPage() {


    const [apps, setApps] = useState<Item[]>([]);
    const [installedApps, setInstalledApps] = useState<Item[]>([]);  // 存储已安装的应用
    const [filteredApps, setFilteredApps] = useState<Item[]>([]);  // 存储过滤后的应用列表
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all"); // 当前激活的 Tab（"all" 或 "installed"）
    const [selectedClass, setSelectedClass] = useState("allson"); // 当前选中的 class 类型（如 "yundisk"）
    const [totalItems, setTotalItems] = useState(0); // 保存接口返回的总数
    const [currentPage, setCurrentPage] = useState(1); // 当前页面
    const [searchQuery, setSearchQuery] = useState(""); // 搜索关键词
    const pageSize = 9; // 每页显示的应用数


    // 请求数据
    const loadData = async (query: string = '', page: number = currentPage) => {
        setLoading(true);
        const data = await fetchAppsData(activeTab, selectedClass, page, pageSize, query);
        if (activeTab === 'installed') {
            console.log('installedApps', installedApps);
            setInstalledApps(data?.items || []); // 已安装应用的搜索结果
        } else if (activeTab === 'all') {
            console.log('apps', apps);
            setApps(data?.items || []); // 所有应用的搜索结果
        }
        setFilteredApps(data?.items || []); // 过滤后的应用
        setTotalItems(data?.total || 0); // 设置接口返回的总数
        setLoading(false);
    };

    // 初次加载数据
    useEffect(() => {
        // 设置延迟时间（比如 3 秒），延迟一下页面加载会更丝滑
        // const timer = setTimeout(() => {
        //     console.log("这个方法延迟了3秒后触发！");
        // }, 3000);
        loadData(searchQuery, currentPage); /// 根据 currentPage 加载数据



    }, [activeTab, selectedClass, currentPage, searchQuery]);


    // 切换 Tab 的方法
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1); // 切换 Tab 时重置为第 1 页
        setSearchQuery(""); // 如果切换到其他 Tab，清空搜索框

    };

    // 搜索时触发的过滤逻辑,父组件传递给 UniSearch 的搜索函数
    const handleSearch = (query: string) => {
        setSearchQuery(query); // 更新搜索关键词
        setCurrentPage(1); // 重置为第一页
        loadData(query); // 加载匹配查询的数据
    };

    // 处理分页变化
    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 更新当前页
    };

    const totalPages = Math.ceil(totalItems / pageSize); // 确保分页计算是向上取整
    return (
        <>
            <AnimatePresence mode="wait">
                <div key="b1" className="flex lg:-space-x-1 ">
                    {loading ? (
                        <div key="b11" className="flex -space-x-1">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    ) : (
                        <>
                            <motion.div
                                key="Aoading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Button
                                    className="text-md"
                                    variant={activeTab === "all" ? "common" : "default"}
                                    onClick={() => handleTabChange("all")}
                                >
                                    ALL
                                </Button>
                                <Button
                                    className="text-md"
                                    variant={activeTab === "installed" ? "common" : "default"}
                                    onClick={() => handleTabChange("installed")}
                                >
                                    Installed
                                </Button>
                            </motion.div>
                        </>
                    )}
                </div>
            </AnimatePresence>

            <div className="lg:pb-2 sm:p-0  lg:w-full md:w-full ">

                <AnimatePresence mode="wait">
                    <div key="b2" className="lg:flex md:flex lg:justify-between md:justify-between sm:justify-between lg:items-center lg:mb-3 ">
                        {loading ? (
                            <div key="b22" className="flex w-306 whitespace-nowrap rounded-md">
                                <Skeleton className="h-8 w-20 mb-3" />
                                <Skeleton className="h-8 w-20 mb-3" />
                                <Skeleton className="h-8 w-20 mb-3" />
                            </div>
                        ) : (
                            <ScrollArea className="lg:w-[606px] md:w-[330px] whitespace-nowrap overflow-x-auto">
                                {/* 使用 Button 切换*/}
                                <div className="flex -space-x-2 mb-3">
                                    <motion.div
                                        key="Boading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <Button
                                            variant={selectedClass === "allson" ? "common" : "default"}
                                            onClick={() => setSelectedClass("allson")}
                                        >
                                            ALL
                                        </Button>
                                        <Button
                                            variant={selectedClass === "database" ? "common" : "default"}
                                            onClick={() => setSelectedClass("database")}
                                        >
                                            database
                                        </Button>
                                        <Button
                                            variant={selectedClass === "oss" ? "common" : "default"}
                                            onClick={() => setSelectedClass("oss")}
                                        >
                                            oss
                                        </Button>
                                        <Button
                                            variant={selectedClass === "tool" ? "common" : "default"}
                                            onClick={() => setSelectedClass("tool")}
                                        >
                                            tool
                                        </Button>
                                        <Button
                                            variant={selectedClass === "note" ? "common" : "default"}
                                            onClick={() => setSelectedClass("note")}
                                        >
                                            note
                                        </Button>
                                    </motion.div>
                                </div>
                                <ScrollBar orientation="horizontal" className="bg-transparent display-none " />
                            </ScrollArea>
                        )}
                        {loading ? (
                            <div className="w-306 whitespace-nowrap rounded-md">
                                <Skeleton className="h-8 w-48 mb-3" />
                            </div>
                        ) : (
                            <div className="pr-6">
                                <UniSearch onSearch={handleSearch} />
                            </div>

                        )}
                    </div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {/* 如果当前 Tab 是 "all" 或 "allson" 且未选择 class，显示 all 类应用列表 */}
                    {(activeTab === "all" && selectedClass !== "installed") && (
                        <div key="b3" className={` grid gap-4 m-1 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 `}>
                            {loading ? (
                                Array.from({ length: 9 }).map((_, index) => (
                                    <motion.div
                                        key={"a" + index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Card key={index} className="lg:w-auto  lg:h-[200px] md:w-auto w-[360px] my-2">
                                            <CardContent className="flex justify-start space-x-4 mt-9">
                                                <Skeleton className="h-12 w-12 rounded-full" />
                                                <CardDescription className="space-y-1 text-left">
                                                    <Skeleton className="h-6 w-48" />
                                                    <Skeleton className="h-4 w-32" />
                                                </CardDescription>
                                            </CardContent>
                                            <CardFooter className="flex justify-end">
                                                <Skeleton className="h-6 w-24" />
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (

                                filteredApps.map((app) => (
                                    <motion.div
                                        key={"d" + app.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.7 }}
                                    >

                                        <Card key={app.id} className="lg:w-auto   md:w-auto w-auto lg:h-[200px] my-2">
                                            <CardContent className="flex justify-start space-x-4 mt-9">
                                                <Avatar className="my-auto size-10">
                                                    <AvatarImage src={app.icon} />
                                                    <AvatarFallback>loading</AvatarFallback>
                                                </Avatar>
                                                <CardDescription className="space-y-1 text-left">
                                                    <h1 className="text-lg font-medium text-slate-900 dark:text-white">{app.name}</h1>
                                                    <p className="text-sm line-clamp-3 min-h-[63px] ">{app.description || "No description available"}</p>


                                                </CardDescription>
                                            </CardContent>
                                            <CardFooter className="flex justify-end">
                                                <Drawer status={app.status} isOpen={false} app={app} loadData={loadData} />
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </div>

                    )}


                    {/* 如果 Tab 是 "installed"，只显示已安装应用 */}
                    {activeTab === "installed" && (

                        <motion.div
                            key="eoading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className=" grid gap-4 m-1 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                {loading ? (
                                    <div></div>
                                ) : (

                                    filteredApps.map((app) => (
                                        <motion.div
                                            key={"fo" + app.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.7 }}
                                        >
                                            < InStalledBtn key={app.id} app={app} loadData={loadData} />
                                        </motion.div>
                                    ))

                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <PaginationCom
                    currentPage={currentPage} // 当前页数
                    totalPages={totalPages} // 总页数
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}


export default MainPage; 