
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"
import  Drawer  from "@/components/drawer/page"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"


export function CardWithAll() {
    return (
        <Card className="w-[377px] h-[200px] m-2">
            <CardContent  className=" flex justify-start space-x-4 mt-9">
                <Avatar className="my-auto size-10">
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>loading</AvatarFallback>
                </Avatar>
            
                <CardDescription className="space-y-1 text-left">
                    <h1 className="text-lg font-medium text-slate-950">AliyunOSS</h1>
                    <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                    </p>
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Drawer status={""} />
            </CardFooter>
        </Card>
    )
}
