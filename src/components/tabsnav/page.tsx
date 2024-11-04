import { PaginationCom } from "@/components/tabsnav/paginationcom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { CardWithAll } from "@/components/tabsnav/allcard"
import { CardWithInStalled } from "@/components/tabsnav/installedcard"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import  Drawer  from "@/components/drawer/page"
// import { UniSearch } from "./search"

const variants = {
    enter: { opacity: 0, x: 0 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
};

const ITEMS_PER_PAGE = 9;
const ITEMS_PER_PAGE_INSTALLED = 6;

// 示例数据，生成CardWithAll 组件的个数
const allItems = Array.from({ length: 19 }, (_, index) => (
    <CardWithAll key={`all-${index}`} />
));
const installedItems = Array.from({ length: 15 }, (_, index) => (
    <CardWithInStalled key={`installed-${index}`} />
));

function Tabsnav() {
    

    const [apps, setApps] = useState([]);
    const [installedApps, setInstalledApps] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [visibleTab, setVisibleTab] = useState("all");
    const [currentPage, setCurrentPage] = useState({
        "all-all": 1,
        "all-yd": 1,
        "all-fs": 1,
        "all-tool": 1,
        "all-note": 1,
        "ins-all": 1,
        "ins-yd": 1,
        "ins-fs": 1,
        "ins-tool": 1,
        "ins-note": 1,

    });

    const fetchApps = async (page = 1, pageSize = 9) => {
        try {
            const response = await fetch(`http://192.168.31.214:8080/api/v1/apps?page=${page}&page_size=${pageSize}`,
                {
                    headers: {
                        'token': `YIG8ANC8q2QxFV_Gf8qwkPdBj2EpsqGqlfc3qvSdg7ksVkZcokOUtQn43XGK0NK3MUAP5yGxCAKefco_Wu4RcKnB0kpNgtZ2Vus-0ALbiLIe8s2i1kI7gjm9GRU_3xLT`
                    }
                }
            );
            console.log(response);
            const data = await response.json();
            if (data.code === 200) {
                setApps(data.data.items);
                setTotalItems(data.data.total);
            } else {
                setError(data.msg);
            }
        } catch (err) {
            setError('请求失败，请重试');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApps(currentPage["all-all"], ITEMS_PER_PAGE);
    }, [currentPage["all-all"]]);

    // useEffect(() => {
    //     // 假设有一个接口获取已安装的应用
    //     fetchInstalledApps();
    // }, []);

    const handlePageChange = (tab: string, pages: number) => {
        setCurrentPage((prev) => ({ ...prev, [tab]: pages }));
    };

    // 计算需要显示的卡片
    const getCurrentItems = (tab:string) => {
        let items;
        if (tab.startsWith("all")) {
            items = apps;
        } else {
            items = installedApps;
        }
        const itemsPerPage = tab.startsWith("all")? ITEMS_PER_PAGE : ITEMS_PER_PAGE_INSTALLED;
        const startIndex = (currentPage[tab] as number - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
        
    };
    
    const totalPages = (tab: string) => {
        const itemsPerPage = tab.startsWith("all")? ITEMS_PER_PAGE : ITEMS_PER_PAGE_INSTALLED;
        if (tab.startsWith("all")) {
            return Math.ceil(allItems.length / itemsPerPage);
        } else {
            return Math.ceil(installedItems.length / itemsPerPage);
        }

    };

    return (
        <>
            <Tabs defaultValue="all" className="w-[1200px] mx-auto ">
                <TabsList className="grid w-full grid-cols-8">
                    <TabsTrigger value="all" onClick={() => setVisibleTab("all")}>all</TabsTrigger>
                    <TabsTrigger value="installed" onClick={() => setVisibleTab("installed")}>installed</TabsTrigger>
                </TabsList>
                <AnimatePresence>
                    {visibleTab === "all" && (
                        <motion.div
                            key="tab-all"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            transition={{ duration: 0.7 }}
                        >
                            <TabsContent value="all">
                                <Card className="border-none">
                                    <Tabs defaultValue="all-all" className="w-12/12">
                                        <TabsList className="grid h-12 w-full grid-cols-8">
                                            <TabsTrigger value="all-all">all</TabsTrigger>
                                            <TabsTrigger value="all-yd">yundisk</TabsTrigger>
                                            <TabsTrigger value="all-fs">fileselect</TabsTrigger>
                                            <TabsTrigger value="all-tool">tool</TabsTrigger>
                                            <TabsTrigger value="all-note">note</TabsTrigger>
                                            <Tabs></Tabs>
                                            <Tabs value="search">
                                                {/* <UniSearch onSearch={handleSearch} /> */}
                                            </Tabs>
                                            <Tabs></Tabs>
                                        </TabsList>

                                        <AnimatePresence>
                                            <TabsContent value="all-all" key="all-all" className="m-1">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className=" content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                    {loading ? (
                                                            <p>Loading...</p>
                                                        ) : (
                                                            apps.map(app => (
                                                                <>
                                                                    <Card key={app.id} className="w-[377px] h-[200px] m-2">
                                                                        <CardContent key={app.id}  className=" flex justify-start space-x-4 mt-9">
                                                                            <Avatar className="my-auto size-10">
                                                                                <AvatarImage src={app.icon} />
                                                                                <AvatarFallback>loading</AvatarFallback>
                                                                            </Avatar>
                                                                            <CardDescription className="space-y-1 text-left" >
                                                                                <h1 className="text-lg font-medium text-slate-950">{app.name}</h1>
                                                                                <p className="text-sm line-clamp-2">{app.description}</p>
                                                                            </CardDescription>
                                                                        </CardContent>
                                                                        <CardFooter className="flex justify-end">
                                                                            <Drawer status={app.status} />
                                                                        </CardFooter>
                                                                    </Card>
                                                                </>
                                                                
                                                            ))
                                                        )}

                                                    </div>

                                                    <PaginationCom
                                                        currentPage={currentPage["all-all"]}
                                                        totalPages={totalPages("all-all")}
                                                        onPageChange={(pages) => handlePageChange("all-all", pages)}
                                                    />
                                                </motion.div>
                                            </TabsContent>

                                            <TabsContent value="all-yd" key="all-yd">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        
                                                        {loading ? (
                                                            <p>Loading...</p>
                                                        ) : (
                                                            apps.map(app => (
                                                                <>
                                                                    <Card className="w-[377px] h-[200px] m-2">
                                                                        <CardContent key={app.id}  className=" flex justify-start space-x-4 mt-9">
                                                                            <Avatar className="my-auto size-10">
                                                                                <AvatarImage src={app.icon} />
                                                                                <AvatarFallback>loading</AvatarFallback>
                                                                            </Avatar>
                                                                            <CardDescription className="space-y-1 text-left">
                                                                                <h1 className="text-lg font-medium text-slate-950">{app.name}</h1>
                                                                                <p className="text-sm line-clamp-2">{app.description}</p>
                                                                            </CardDescription>
                                                                        </CardContent>
                                                                        <CardFooter className="flex justify-end">
                                                                            <Drawer />
                                                                        </CardFooter>
                                                                    </Card>
                                                                </>
                                                                
                                                            ))
                                                        )}
                                                        
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["all-yd"]}
                                                        totalPages={totalPages("all-yd")}
                                                        onPageChange={(page) => handlePageChange("all-yd", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="all-fs" key="all-fs">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        {/* {getCurrentItems("all-fs")} */}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["all-fs"]}
                                                        totalPages={totalPages("all-fs")}
                                                        onPageChange={(page) => handlePageChange("all-fs", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="all-tool" key="all-tool">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        {/* {getCurrentItems("all-tool")} */}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["all-tool"]}
                                                        totalPages={totalPages("all-tool")}
                                                        onPageChange={(page) => handlePageChange("all-tool", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="all-note" key="all-note">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        {/* {getCurrentItems("all-note")} */}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["all-note"]}
                                                        totalPages={totalPages("all-note")}
                                                        onPageChange={(page) => handlePageChange("all-note", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                        </AnimatePresence>
                                    </Tabs>
                                </Card>
                            </TabsContent>
                        </motion.div>
                    )}
                    {visibleTab === "installed" && (
                        <motion.div
                            key="tab-installed"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            transition={{ duration: 0.7 }}
                        >
                            <TabsContent value="installed">
                                <Card>
                                    <Tabs defaultValue="ins-all" className="w-12/12">
                                        <TabsList className="grid h-12 w-full grid-cols-8">
                                            <TabsTrigger value="ins-all">all</TabsTrigger>
                                            <TabsTrigger value="ins-yd">yd</TabsTrigger>
                                            <TabsTrigger value="ins-fs">fs</TabsTrigger>
                                            <TabsTrigger value="ins-tool">tool</TabsTrigger>
                                            <TabsTrigger value="ins-note">note</TabsTrigger>
                                            <Tabs></Tabs>
                                            <Tabs value="search">
                                                {/* <UniSearch onSearch={handleSearch} /> */}
                                            </Tabs>
                                            <Tabs></Tabs>
                                        </TabsList>
                                        <AnimatePresence>
                                            <TabsContent value="ins-all" key="ins-all">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    {/* <div className="content-start grid grid-cols-2 gap-1 m-1 h-[660px] ">
                                                        {getCurrentItems("ins-all")}
                                                    </div> */}
                                                    
                                                    {getCurrentItems("ins-all").map(app => (
                                                        <CardWithInStalled key={app.id} app={app} />
                                                    ))}
                                                    <PaginationCom
                                                        currentPage={currentPage["ins-all"]}
                                                        totalPages={totalPages("ins-all")}
                                                        onPageChange={(page) => handlePageChange("ins-all", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="ins-yd" key="ins-yd">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="flex flex-wrap m-3 ">
                                                        {getCurrentItems("ins-yd")}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["ins-yd"]}
                                                        totalPages={totalPages("ins-yd")}
                                                        onPageChange={(page) => handlePageChange("ins-yd", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="ins-fs" key="ins-fs">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="flex flex-wrap m-3 ">
                                                        {getCurrentItems("ins-fs")}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["ins-fs"]}
                                                        totalPages={totalPages("ins-fs")}
                                                        onPageChange={(page) => handlePageChange("ins-fs", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="ins-tool" key="ins-tool">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="flex flex-wrap m-3 ">
                                                        {getCurrentItems("ins-tool")}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["ins-tool"]}
                                                        totalPages={totalPages("ins-tool")}
                                                        onPageChange={(page) => handlePageChange("ins-tool", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="ins-note" key="ins-note">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="flex flex-wrap m-3 ">
                                                        {getCurrentItems("ins-note")}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["ins-note"]}
                                                        totalPages={totalPages("ins-note")}
                                                        onPageChange={(page) => handlePageChange("ins-note", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                        </AnimatePresence>
                                    </Tabs>
                                </Card>
                            </TabsContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Tabs>
        </>
    )
}


export default Tabsnav; 