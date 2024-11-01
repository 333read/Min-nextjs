import { PaginationCom } from "@/components/tabsnav/paginationcom"
import {
    Card,
} from "@/components/ui/card"

import {
    Command,
    CommandInput,
} from "@/components/ui/command"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { CardWithAll } from "@/components/tabsnav/allcard"
import { CardWithInStalled } from "@/components/tabsnav/installedcard"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const variants = {
    enter: { opacity: 0, x: 0 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
};

const ITEMS_PER_PAGE = 9;
const ITEMS_PER_PAGE_INSTALLED = 6;

// 示例数据，生成CardWithAll 组件的个数
const allItems = Array.from({ length: 50 }, (_, index) => (
    <CardWithAll key={`all-${index}`} />
));
const installedItems = Array.from({ length: 15 }, (_, index) => (
    <CardWithInStalled key={`installed-${index}`} />
));

function Tabsnav() {
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

    const handlePageChange = (tab: string, page: number) => {
        setCurrentPage((prev) => ({ ...prev, [tab]: page }));
    };

    // 计算需要显示的卡片
    const getCurrentItems = (tab:string) => {
        console.log('Rendering all items with keys:', allItems.map((_, index) => `all-${index}`));
console.log('Rendering installed items with keys:', installedItems.map((_, index) => `installed-${index}`));

        let items;
        if (tab.startsWith("all")) {
            items = allItems;
        } else {
            items = installedItems;
        }
        const itemsPerPage = tab.startsWith("all")? ITEMS_PER_PAGE : ITEMS_PER_PAGE_INSTALLED;
        const startIndex = (currentPage[tab]  - 1) * itemsPerPage;
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
                                                <Command className="rounded-lg border shadow-md md:min-w-[280px] mt-2">
                                                    <CommandInput placeholder=" search..." />
                                                </Command>
                                            </Tabs>
                                            <Tabs></Tabs>
                                        </TabsList>

                                        <AnimatePresence>
                                            <TabsContent value="all-all" className="m-1">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className=" content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        {getCurrentItems("all-all")}
                                                    </div>

                                                    <PaginationCom
                                                        currentPage={currentPage["all-all"]}
                                                        totalPages={totalPages("all-all")}
                                                        onPageChange={(page) => handlePageChange("all-all", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>

                                            <TabsContent value="all-yd">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        {getCurrentItems("all-yd")}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["all-yd"]}
                                                        totalPages={totalPages("all-yd")}
                                                        onPageChange={(page) => handlePageChange("all-yd", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="all-fs">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        {getCurrentItems("all-fs")}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["all-fs"]}
                                                        totalPages={totalPages("all-fs")}
                                                        onPageChange={(page) => handlePageChange("all-fs", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="all-tool">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        {getCurrentItems("all-tool")}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["all-tool"]}
                                                        totalPages={totalPages("all-tool")}
                                                        onPageChange={(page) => handlePageChange("all-tool", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="all-note">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-3 gap-1 m-1 h-[660px]">
                                                        {getCurrentItems("all-note")}
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
                                                <Command className="rounded-lg border shadow-md md:min-w-[270px] mt-1 ">
                                                    <CommandInput placeholder="Type a command or search..." />
                                                </Command>
                                            </Tabs>
                                            <Tabs></Tabs>
                                        </TabsList>
                                        <AnimatePresence>
                                            <TabsContent value="ins-all">
                                                <motion.div
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    variants={variants}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="content-start grid grid-cols-2 gap-1 m-1 h-[660px] ">
                                                        {getCurrentItems("ins-all")}
                                                    </div>
                                                    <PaginationCom
                                                        currentPage={currentPage["ins-all"]}
                                                        totalPages={totalPages("ins-all")}
                                                        onPageChange={(page) => handlePageChange("ins-all", page)}
                                                    />
                                                </motion.div>
                                            </TabsContent>
                                            <TabsContent value="ins-yd">
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
                                            <TabsContent value="ins-fs">
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
                                            <TabsContent value="ins-tool">
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
                                            <TabsContent value="ins-note">
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