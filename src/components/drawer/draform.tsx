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
import { SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label" 
import { HighConfig } from '@/components/drawer/highconfig'



export function ProfileForm() {
    
    const form = useForm({
            defaultValues: {
                username: "",
                ossAccessKeyId: "",
                ossAccessKeySecret: "",
                store: false,
            },
        });
   
        const onSubmit = (data: unknown) => {
            console.log(data);
            // 在这里处理表单提交逻辑
        };

return (
            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>名称：</FormLabel>
                                <FormControl>
                                    <Input placeholder="阿里云oss" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}
                    rules={{
                        required: "* 用户名不能为空", // 这里添加必填验证
                    }}
                    />
                    <FormField
                        control={form.control}
                        name="ossAccessKeyId"
                        render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>OSS_ACCESS_KEY_ID：</FormLabel>
                                    <FormControl>
                                        <Input placeholder="<ALIBABA_CLOUD_ACCESS_KEY_ID>" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                    )}
                    rules={{
                        required: "* OssAccessKeyId不能为空", // 这里添加必填验证
                    }}
                    />
                    <FormField
                        control={form.control}
                        name="ossAccessKeySecret"
                        render={({ field }) => (
                    
                        <FormItem>
                        <FormLabel>OSS_ACCESS_KEY_SECRET：</FormLabel>
                        <FormControl>
                            <Input placeholder="<ALIBABA_CLOUD_ACCESS_KEY_SECRET>" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        rules={{
                            required: "* OssAccessKeySecret不能为空", // 这里添加必填验证
                        }}
                        />

                        <FormItem>
                            <div  className="flex items-center space-x-2">
                                <Checkbox id="store" />
                                <Label htmlFor="store">默认储存</Label>
                            </div>
                        </FormItem>

                        <FormItem>
                            <HighConfig />
                        </FormItem>
                        
                    
                    <div className='flex justify-start space-x-3'>
                        <Button type='submit' variant='surely' className='cursor-pointer' onClick={form.handleSubmit(onSubmit)}>重启</Button>
                        <SheetClose 
                            className='cursor-pointer border border-input rounded-md bg-gray-300 text-sm text-white shadow-sm hover:bg-white hover:text-theme-color/85 h-9 px-6 py-2'
                        >取消</SheetClose>
                    </div>
                </form>
            </Form>
        
        
    )
}
