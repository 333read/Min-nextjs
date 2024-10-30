import  Drawer  from "@/components/drawer/page"
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


function Tabsnav(){
    return (
        <>

            <Tabs defaultValue="all" className="w-[1200px] mx-auto ">
                <TabsList className="grid w-full grid-cols-8">
                    <TabsTrigger value="all">all</TabsTrigger>
                    <TabsTrigger value="installed">installed</TabsTrigger>
                </TabsList>
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
                            <TabsContent  value="all-all" className="m-1">
                                <div className="flex flex-wrap m-1  h-[660px]">
                                    <CardWithAll />
                                    <CardWithAll />
                                    <CardWithAll />
                                    <CardWithAll />
                                    <CardWithAll />
                                    <CardWithAll />
                                    <CardWithAll />
                                    <CardWithAll />
                                    <CardWithAll />
                                </div>
                                    <PaginationCom />
                            </TabsContent>
                            <TabsContent value="all-yd">
                                <Drawer />
                            </TabsContent>
                            <TabsContent value="all-fs">
                                <Drawer />
                            </TabsContent>
                            <TabsContent value="all-tool">
                                <Drawer />
                            </TabsContent>
                            <TabsContent value="all-note">
                                <Drawer />
                            </TabsContent>
                        </Tabs>
                    </Card>
                </TabsContent>
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
                            <TabsContent value="ins-all">
                                <div className="flex flex-wrap m-3 ">
                                    <CardWithInStalled />
                                    <CardWithInStalled />
                                    <CardWithInStalled />
                                </div>
                                <PaginationCom />
                            </TabsContent>
                            <TabsContent value="ins-yd">
                            </TabsContent>
                            <TabsContent value="ins-fs">
                            </TabsContent>
                            <TabsContent value="ins-tool">
                            </TabsContent>
                            <TabsContent value="ins-note">
                            </TabsContent>
                        </Tabs>
                    </Card>
                </TabsContent>
            </Tabs>


        </>
    )
}


export default Tabsnav;