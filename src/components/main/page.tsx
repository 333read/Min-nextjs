/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Drawer from "@/components/drawer/page";
import { useEffect, useState } from "react";
import { PaginationCom } from "@/components/tabsnav/paginationcom";
import UniSearch from "@/components/tabsnav/search"
import {InStalledBtn} from "@/components/tabsnav/installedbtn";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Item } from "@/type.d/common";
import { motion, AnimatePresence } from "framer-motion"; // 引入 framer-motion


const fetchAppsData = async (tab: string, className = '', currentPage: number, pageSize = 9 )=> {
    let url = `http://192.168.31.214:8080/api/v1/apps?page=${currentPage}&page_size=${pageSize}`;

    // 判断是否选择了 'all' 或 'allson'，如果是则不传递 class 参数
    if ((className === 'all' || className === 'allson') && tab === 'all') {
        url = `http://192.168.31.214:8080/api/v1/apps?page=${currentPage}&page_size=${pageSize}`;
    }

    // 如果选择了 className，且 tab 是 "all"，请求带有类别的应用
    if (className && tab === 'all' && className !== 'all' && className !== 'allson') {
        url = `http://192.168.31.214:8080/api/v1/apps?class=${className}&page=${currentPage}&page_size=${pageSize}`;
    }
    
    // 判断是否选择了 'installed' 或 'allson'，如果是则不传递 class 参数
    if ((className === 'installed' || className === 'allson') &&tab === 'installed') {
        // 如果 tab 是 "installed"，请求已安装的应用
        url = `http://192.168.31.214:8080/api/v1/apps/installed?page=${currentPage}&page_size=${pageSize}`;
    }

     // 如果选择了 className，且 tab 是 "installed"，请求带有类别的应用
    else if (className && tab === 'installed' && className !== 'installed' && className !== 'allson') {
        url = `http://192.168.31.214:8080/api/v1/apps/installed?class=${className}&page=${currentPage}&page_size=${pageSize}`;
    }

    try {
        const response = await fetch(url,
            {
                headers: {
                    'token': `YIG8ANC8q2QxFV_Gf8qwkPdBj2EpsqGqlfc3qvSdg7ksVkZcokOUtQn43XGK0NK3s2uV4oLAEbwcuHiev6xcxqnB0kpNgtZ2Vus-0ALbiLLDFuhkO6T7Yay-mOYRrcm_`
                }
            }
        );
        const data = await response.json();
        if (data.code === 200) {
            return {
                items: data.data.items, // 返回应用数据
                total: data.data.total, // 返回数据总数
            };
        } else {
            throw new Error(data.msg);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { items: [], total: 0 }; // 请求失败时返回空数组和总数为 0
    }
};

function MainPage() {
    const [apps, setApps] = useState<Item[]>([]);
    const [filteredApps, setFilteredApps] = useState([]);  // 新增：存储过滤后的应用列表
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all"); // 当前激活的 Tab（"all" 或 "installed"）
    const [selectedClass, setSelectedClass] = useState("allson"); // 当前选中的 class 类型（如 "yundisk"）
    const [totalItems, setTotalItems] = useState(0); // 保存接口返回的总数
    const [currentPage, setCurrentPage] = useState(1); // 当前页面
    const pageSize = 9; // 每页显示的应用数


    // 请求数据
    const loadData = async (page: number = currentPage) => {
        setLoading(true);
        const data = await fetchAppsData(activeTab, selectedClass, page, pageSize);
        setApps(data.items); // 设置获取到的数据
        setFilteredApps(data.items); // 初始时，过滤后的应用就是所有应用
        setTotalItems(data.total); // 设置接口返回的总数
        setLoading(false);
    };

    // 初次加载数据
    useEffect(() => {
        // 设置延迟时间（比如 2 秒），延迟一下页面加载会更丝滑
        const timer = setTimeout(() => {
        console.log("这个方法延迟了 2 秒后触发！");
        }, 3000);
        loadData(currentPage); // 根据 currentPage 加载数据
    }, [activeTab, selectedClass, currentPage]); 


     // 切换 Tab 的方法
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1); // 切换 Tab 时重置为第 1 页
    };

    // 搜索时触发的过滤逻辑
    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredApps(apps);  // 如果没有输入，显示所有应用
        } else {
            // 根据 `name` 或 `descript` 字段进行模糊搜索
            const filtered = apps.filter((app) =>
                app.name.toLowerCase().includes(query.toLowerCase()) ||
                app.description?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredApps(filtered);  // 更新过滤后的应用列表
        }
    };

    // 处理分页变化
    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 更新当前页
    };

    const totalPages = Math.ceil(totalItems / pageSize); // 确保分页计算是向上取整
    return (

        <>
            <AnimatePresence mode="wait">
            <div key="b1" className="flex -space-x-1">
                {/* 使用 Button 代替 ToggleGroupItem */}
                {/* 按钮部分：如果正在加载，显示 Skeleton 占位符 */}
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

            <div className="p-2 border-2 border-gray-300">
            
            <AnimatePresence mode="wait">
            <div key="b2" className="flex justify-between items-center mb-3">
            {loading ? (
            <div key="b22" className="flex w-306 whitespace-nowrap rounded-md">
                <Skeleton className="h-8 w-20 mb-3" />
                <Skeleton className="h-8 w-20 mb-3" />
                <Skeleton className="h-8 w-20 mb-3" />
            </div>
            ) : (
                <ScrollArea className="w-[606px] overflow-x-auto">
                {/* 使用 Button 代替 ToggleGroupItem */}
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
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            )}

            {loading ? (
            <div className="w-306 whitespace-nowrap rounded-md">
                <Skeleton className="h-8 w-48 mb-3" />
            </div>
            ) : (
            <UniSearch onSearch={handleSearch} /> 
            )}
            </div>
            </AnimatePresence>


            <AnimatePresence mode="wait">
            {/* 如果当前 Tab 是 "all" 或 "allson" 且未选择 class，显示 all 类应用列表 */}
            {(activeTab === "all" && selectedClass !== "installed") && (

            <div key="b3" className=" content-start grid gap-1 m-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
            {loading ? (
                    Array.from({ length: 9 }).map((_, index) => (
                        <motion.div
                        key={"a"+index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        >
                        <Card key={index} className="w-[377px] h-[200px]">
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
                    
                    apps.map((app) => (
                        
                        <motion.div
                        key={"d"+app.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        >

                        <Card key={app.id} className="w-[377px] h-[200px]">
                            <CardContent className="flex justify-start space-x-4 mt-9">
                                <Avatar className="my-auto size-10">
                                    <AvatarImage src={app.icon} />
                                    <AvatarFallback>loading</AvatarFallback>
                                </Avatar>
                                <CardDescription className="space-y-1 text-left">
                                    <h1 className="text-lg font-medium text-slate-950">{app.name}</h1>
                                    <p className="text-sm line-clamp-3">{app.description || "No description available"}</p>
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
            {activeTab === "installed" &&  (
                <motion.div
                key="eoading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                >
            <div className=" content-start grid grid-cols-2 gap-1 m-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {loading ? (
                            <div>Loading...</div>
                        ) : (
                            
                            apps.map((app) => (
                                <motion.div
                                    key={"fo"+app.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                    >
                                < InStalledBtn key={app.id} app={app} loadData={loadData}/>
                                </motion.div>
                            ))
                            
                        )}
                </div>
                </motion.div>
                )}
            </AnimatePresence>

                {/* 分页组件 */}
                <PaginationCom
                        currentPage={currentPage}
                        totalPages={totalPages} // 计算总页数
                        onPageChange={handlePageChange}
                    />
            </div>
        </>
    )
}


export default MainPage; 