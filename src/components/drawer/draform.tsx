"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label" 
import { Textarea } from "@/components/ui/textarea"

export function ProfileForm() {
    const form = useForm();
  // ...

return (
            <Form {...form}>
                <form className="space-y-8">
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <>
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn"  />
                        </FormControl>
                        <FormMessage />
                        </FormItem>

                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>

                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>

                        <FormItem>
                            <div  className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">高级设置</Label>
                            </div>
                            <FormControl>
                                <Textarea
                                    placeholder="请输入....."
                                    className="resize-none"
                                />
                            </FormControl>
                        </FormItem>
                        
                        <FormItem>
                            <div className="flex justify-between">
                                <div>
                                    <Label htmlFor='input'>CPU限制：</Label>
                                    <Input className='w-max'/>
                                </div>
                                <div>
                                    <Label htmlFor='input'>内存限制：</Label>
                                    <Input className='w-min'/>
                                </div>
                            </div>
                        </FormItem>

                        <FormItem>
                            <div  className="flex items-center space-x-2">
                                <Checkbox id="store" />
                                <Label htmlFor="store">默认储存</Label>
                            </div>
                        </FormItem>
                    </>
                        
                    )}
                    />
                    <div className='flex justify-start'>
                        <Button type='submit' variant='surely' className='cursor-pointer'>重启</Button>
                        <Button variant='outline' className='cursor-pointer'>取消</Button>
                    </div>
                </form>
            </Form>
        
        
    )
}
