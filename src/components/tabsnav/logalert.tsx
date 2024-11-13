import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Select,SelectItem ,SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectGroup } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Item } from "@/type.d/common";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";

interface AlertLogDemoProps {
    isLogOpen: boolean;
    isOpen: boolean;
    onClose: () => void;
}
interface AlertLogHaveProps {
    isLogOpen: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export function AlertLogDemo({ isOpen, onClose }:AlertLogDemoProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
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

export function AlertLogHave({ isOpen, onClose ,app }:AlertLogHaveProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent >
            <SheetHeader>
                <SheetTitle className='ml-9 -mt-1.5 text-gray-700'>Log</SheetTitle>
            </SheetHeader>
                <SheetDescription className='pt-3'>
                    <div className='flex items-center justify-between'>
                        <Select 
                            value=""
                            onValueChange={() => { }}
                            >
                            <SelectTrigger className="w-52">
                                <SelectValue placeholder="1 hour" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    <SelectLabel>select time</SelectLabel>
                                    <SelectItem value="1">1 hour</SelectItem>
                                    <SelectItem value="2">2 hour</SelectItem>
                                    <SelectItem value="3">3 hour</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select 
                            value=""
                            onValueChange={() => { }}
                            >
                            <SelectTrigger className="w-52">
                                <SelectValue placeholder="50条" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    <SelectLabel>select lines</SelectLabel>
                                    <SelectItem value="1">100条</SelectItem>
                                    <SelectItem value="2">200条</SelectItem>
                                    <SelectItem value="5">500条</SelectItem>
                                    
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p>日志内容</p>
                    </div>
                </SheetDescription>
            
            
            </SheetContent>
        </Sheet>
    );
}

