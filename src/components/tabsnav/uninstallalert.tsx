import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"

interface AlertDialogDemoProps {
    isOpen: boolean;
    onClose: () => void;
    onConfig: () => void;
}


export function AlertDialogDemo({ isOpen, onClose, onConfig }:AlertDialogDemoProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            {/* <AlertDialogTrigger>Trigger</AlertDialogTrigger> */}
            <AlertDialogContent >
            <AlertDialogHeader>
                <AlertDialogTitle>卸载</AlertDialogTitle>
                <AlertDialogDescription>
                即将执行卸载操作，您是否确定要卸载此xxx插件？
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={onConfig}>确认</AlertDialogAction>
                <AlertDialogCancel onClick={onClose}>取消</AlertDialogCancel>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
