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
                <AlertDialogTitle>Are you uninstall sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
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
