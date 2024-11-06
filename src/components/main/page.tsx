import { Skeleton } from "@/components/ui/skeleton"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Drawer from "@/components/drawer/page";
import { useEffect, useState } from "react";
import { PaginationCom } from "@/components/tabsnav/paginationcom";
import UniSearch from "@/components/tabsnav/search"
import { Button } from "../ui/button";
import {InStalledBtn} from "@/components/tabsnav/installedbtn";


const fetchAppsData = async (tab: string, className = '', page = 1, pageSize = 9 )=> {
    let url = `http://127.0.0.1:8080/api/v1/apps?page=${page}&page_size=${pageSize}`;

    // 判断是否选择了 'all' 或 'allson'，如果是则不传递 class 参数
    if ((className === 'all' || className === 'allson') && tab === 'all') {
        url = `http://127.0.0.1:8080/api/v1/apps?page=${page}&page_size=${pageSize}`;
    }

    // 如果选择了 className，且 tab 是 "all"，请求带有类别的应用
    if (className && tab === 'all' && className !== 'all' && className !== 'allson') {
        url = `http://127.0.0.1:8080/api/v1/apps?class=${className}&page=${page}&page_size=${pageSize}`;
    }
    
    if (tab === 'installed') {
        // 如果 tab 是 "installed"，请求已安装的应用
        url = `http://127.0.0.1:8080/api/v1/apps/installed?page=${page}&page_size=${pageSize}`;
    }
    
    


    try {
        const response = await fetch(url,
            {
                headers: {
                    'token': `YIG8ANC8q2QxFV_Gf8qwkPdBj2EpsqGqlfc3qvSdg7ksVkZcokOUtQn43XGK0NK3eOq6L3ec4CsjKLTbmJR5iKnB0kpNgtZ2HqRJdoZ8WqPYqX1jTr-BDF1i2kolBsRG`
                }
            }
        );
        const data = await response.json();
        if (data.code === 200) {
            return data.data.items; // 返回应用数据
        } else {
            throw new Error(data.msg);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // 请求失败时返回空数组
    }
};

function MainPage() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all"); // 当前激活的 Tab（"all" 或 "installed"）
    const [selectedClass, setSelectedClass] = useState("allson"); // 当前选中的 class 类型（如 "yundisk"）


    // 请求数据
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchAppsData(activeTab, selectedClass, 1, 9); // 请求当前页数据
            setApps(data); // 设置获取到的数据
            setLoading(false);
        };

        loadData();
    }, [activeTab, selectedClass]); // 组件加载时请求数据

    return (
        <>
            <ToggleGroup type="single" className="justify-start bg-gray-100 border-gray-500 border-2 mb-3 p-1" value={activeTab} onValueChange={setActiveTab}>
                <ToggleGroupItem value="all" className="px-6 py-3 text-lg font-medium">
                    ALL
                </ToggleGroupItem>
                <ToggleGroupItem value="installed" className="px-6 py-3 text-lg font-medium">
                    Installed
                </ToggleGroupItem>
            </ToggleGroup>

            <div className="p-2 border-2 border-gray-300">
            <div className="flex justify-between items-center mb-3">
                <ToggleGroup type="single" className="justify-start mb-3" value={selectedClass} onValueChange={setSelectedClass}>
                    <ToggleGroupItem value="allson">
                        ALL
                    </ToggleGroupItem>
                    <ToggleGroupItem value="database">
                        yundisk
                    </ToggleGroupItem>
                    <ToggleGroupItem value="fileselect">
                        fileselect
                    </ToggleGroupItem>
                    <ToggleGroupItem value="tool">
                        tool
                    </ToggleGroupItem>
                    <ToggleGroupItem value="note">
                        note
                    </ToggleGroupItem>
                </ToggleGroup>
                {/* <UniSearch  onSearch={handleSearch}/> */}
            </div>
            
            {/* 如果当前 Tab 是 "all" 或 "allson" 且未选择 class，显示 all 类应用列表 */}
           {(activeTab === "all" && selectedClass !== "installed") && (
            <div className=" content-start grid grid-cols-3 gap-1 m-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
            {loading ? (
                    <div>Loading...</div>
                ) : (
                    apps.map((app) => (
                        <Card key={app.id} className="w-[377px] h-[200px] ">
                            <CardContent className="flex justify-start space-x-4 mt-9">
                                <Avatar className="my-auto size-10">
                                    <AvatarImage src={app.iconUrl} />
                                    <AvatarFallback>loading</AvatarFallback>
                                </Avatar>
                                <CardDescription className="space-y-1 text-left">
                                    <h1 className="text-lg font-medium text-slate-950">{app.name}</h1>
                                    <p className="text-sm line-clamp-3">{app.description || "No description available"}</p>
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Drawer status={app.status} />
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
            )}

             {/* 如果 Tab 是 "installed"，只显示已安装应用 */}
            {activeTab === "installed" && (
            <div className=" content-start grid grid-cols-2 gap-1 m-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {loading ? (
                        <div>Loading...</div>
                    ) : (
                        apps.map((app) => (
                            <Card key={app.id} className="w-[530px] h-[200px] ">
                                <CardContent className="flex justify-start space-x-4 mt-9">
                                    <Avatar className="my-auto size-10">
                                        <AvatarImage src={app.iconUrl} />
                                        <AvatarFallback>loading</AvatarFallback>
                                    </Avatar>
                                    <CardDescription className="space-y-1 text-left">
                                    <h1 className="text-lg font-medium text-slate-950">{app.name}</h1>
                                    <p className="text-sm line-clamp-3">{app.description || "No description available"} </p>
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex">
                                    <InStalledBtn />
                                </CardFooter>
                            </Card>
                        ))
                    )}
            </div>
          )}


            <PaginationCom currentPage={1} totalPages={2} onPageChange={(page) => console.log(`Page ${page}`)}  />
        </div>
        </>
    )
}


export default MainPage; 