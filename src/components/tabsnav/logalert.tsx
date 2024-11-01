import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"

interface AlertLogDemoProps {
    isOpen: boolean;
    onClose: () => void;
}


export function AlertLogDemo({ isOpen, onClose }:AlertLogDemoProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            {/* <AlertDialogTrigger>Trigger</AlertDialogTrigger> */}
            <AlertDialogContent >
            <AlertDialogHeader>
                <AlertDialogTitle>tips</AlertDialogTitle>
                <AlertDialogDescription>
                You can't click on it until it's activated.<br />
                Please run the plugin first！
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={onClose}>返回</AlertDialogCancel>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
