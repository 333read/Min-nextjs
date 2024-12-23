import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { EditForm } from "@/components/drawer/editdraform";
import { Item } from "@/type.d/common";

interface EditDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    app: Item;
}

function EditDrawer ({ isOpen, onClose, app }: EditDrawerProps){
    const editSuccess = () => {
        console.log('editSuccess');
    }
    
    const editFalse = () => {
        console.log('editFalse');
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='lg:overflow-y-hidden md:overflow-hidden overflow-auto'>
                <SheetHeader>
                    <SheetTitle className='ml-9 -mt-1.5 text-gray-700'>参数修改</SheetTitle>
                </SheetHeader>
                <SheetDescription className='pt-3'>
                </SheetDescription>
                {/* 将 app 和回调传递给 EditForm */}
                <EditForm 
                    app={app} 
                    onEditSuccess={editSuccess} 
                    onEditFalse={editFalse} 
                />
            </SheetContent>
        </Sheet>
    );
};

export default EditDrawer;
