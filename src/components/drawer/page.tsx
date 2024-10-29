import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"


function Drawer() {
    return (
        <>
        <Sheet>
            <SheetTrigger>
                <Button variant='surely' className='cursor-pointer'>安装</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle className='ml-10 -mt-2'>Go back</SheetTitle>
                <SheetDescription className='pt-8'>
                    
                    <Label htmlFor='input'>名称：</Label>
                    <Input />
                    <Label htmlFor='input'>OSS_ACCESS_KET_ID：</Label>
                    <Input />
                    <Label htmlFor='input'>OSS_ACCESS_KET_SECRET：</Label>
                    <Input />

                    <div className='flex justify-start'>
                        <Checkbox />
                        <Label htmlFor="hight-set">高级设置</Label>
                    </div>
                    <Textarea />
                    <div className='flex justify-between'>
                        <div>
                            <Label htmlFor='input'>CPU限制：</Label>
                            <Input className='w-max'/>
                        </div>
                        <div>
                            <Label htmlFor='input'>内存限制：</Label>
                            <Input className='w-min'/>
                        </div>
                    </div>
                    <div className='flex justify-start'>
                        <Checkbox />
                        <Label htmlFor="hight-set">默认储存</Label>
                    </div>
                    <div className='flex justify-start'>
                        <Button variant='surely' className='cursor-pointer'>重启</Button>
                        <Button variant='outline' className='cursor-pointer'>取消</Button>
                    </div>
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
        </>
    )
}



export default Drawer