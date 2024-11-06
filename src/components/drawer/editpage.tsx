import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { ProfileForm } from "@/components/drawer/draform"

interface EditDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

function EditDrawer({ isOpen, onClose }: EditDrawerProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='ml-9 -mt-1.5 text-gray-700'>参数</SheetTitle>
                    <SheetDescription className='pt-3'>
                        {/* 你可以添加更多的描述内容 */}
                    </SheetDescription>
                    <ProfileForm />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default EditDrawer
