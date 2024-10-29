import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ProfileForm } from "@/components/drawer/draform"


function Drawer() {
    return (
        <>
        <Sheet>
            <SheetTrigger>
                <div className='cursor-pointer border-lime-400 text-lime-600 border-2 rounded-full px-5 py-2'>安装</div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle className='ml-9 -mt-1.5 text-gray-700'>返回</SheetTitle>
                <SheetDescription className='pt-10'>
                    <ProfileForm />
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
        </>
    )
}



export default Drawer