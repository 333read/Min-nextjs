/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Item } from "@/type.d/common";
import { useState } from "react"

interface ProfileFormProps {
    app: Item;  // 接收 app 数据
    loadData: () => void;  // 重新加载数据
}

export function ProfileForm( {app,loadData} : ProfileFormProps) {
    const [dockerCompose, setDockerCompose] = useState<string>("");  // 存储docker_compose内容
    const [cpuLimit, setCpuLimit] = useState<string>("1");  // 默认值为 1
    const [memoryLimit, setMemoryLimit] = useState<string>("0");  // 默认值为 120M
    const [loading, setLoading] = useState<boolean>(false);  // 加载状态
    const [error, setError] = useState<string>("");  // 错误信息
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [forFormFields, setForFormFields] = useState<any[]>([]); // 保存 form_fields 数据
    
    const form = useForm({
            defaultValues: {
                username: "",
                ossAccessKeyId: "",
                ossAccessKeySecret: "",
                store: false,
            },
        });
        // const onSubmit = (data: unknown) => {
        //     console.log(data);
        //     // 在这里处理表单提交逻辑
        // };

           // 更新 form_fields 数据
        const handleFieldsUpdate = (fields: any[]) => {
            // setForFormFields(fields); // 将 form_fields 数据存储到本地状态   ?会一直请求接口
            console.log(fields); // 将 form_fields 数据存储到本地状态
        };

        //点击重启按钮
        const handleRestart = async () => {
                setLoading(true);
                setError(""); //清除之前的错误信息
                setSuccessMessage(""); //清除之前的成功信息
        try {

            // 构建请求体
            const requestBody = {
                cpus: cpuLimit,
                docker_compose: dockerCompose,
                memory_limit: memoryLimit,
                params: {}
            };

            // 发送 POST 请求
            const response = await fetch(`http://127.0.0.1:8080/api/v1/apps/${app.key}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": `YIG8ANC8q2QxFV_Gf8qwkPdBj2EpsqGqlfc3qvSdg7ksVkZcokOUtQn43XGK0NK3vMTIj1-_qieyJrqCgYaFNKnB0kpNgtZ2Vus-0ALbiLJXqbLpTpeHh_B7v-cZxbBj`,
                },
                body: JSON.stringify(requestBody),  // 将请求体包装成字符串
            });

            const result = await response.json();
            if (response.ok) {
                // 请求成功，显示成功消息
                setSuccessMessage("安装成功！");
            } else {
                // 请求失败，显示错误消息
                setError(result.message || "请求失败，请稍后重试");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                // 捕获网络错误
                setError("网络错误，请检查网络连接");
            } finally {
                loadData();//安装成功触发加载数据
                setLoading(false); // 请求完成，无论成功或失败都需要关闭加载状态
            }

         
    };


    return (
            <Form {...form}>
                <form className="space-y-8">
                        {/* 动态渲染 form_fields */}
                        {forFormFields.map((field, index) => (
                            <FormField key={index} control={form.control} name={field.name || `field_${index}`} render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel>{field.label || "未设置"}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder={field.default || "请输入..."} 
                                            {...formField} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            rules={{
                                required: "* 输入不能为空", // 这里添加必填验证
                            }}
                            />
                        ))}

                        <FormItem>
                            <div  className="flex items-center space-x-2">
                                <Checkbox id="store" />
                                <Label htmlFor="store">默认储存</Label>
                            </div>
                        </FormItem>

                        <FormItem>
                            <HighConfig
                                app={app}
                                dockerCompose={dockerCompose}
                                cpuLimit={cpuLimit}
                                memoryLimit={memoryLimit}
                                setDockerCompose={setDockerCompose}
                                setCpuLimit={setCpuLimit}
                                setMemoryLimit={setMemoryLimit}  
                                onFieldsUpdate={handleFieldsUpdate}  // 传递回调函数    
                                />  
                        </FormItem>
                        
                    
                    <div className='flex justify-start space-x-3'>
                        <Button type='submit' variant='surely' className='cursor-pointer' onClick={handleRestart}>重启</Button>
                        <SheetClose 
                            className='cursor-pointer border border-input rounded-md bg-transparent text-sm text-gray-600 shadow-sm hover:bg-white hover:border-theme-color/85 hover:text-theme-color/85 h-9 px-6 py-2'
                        >取消</SheetClose>
                    </div>
                </form>
            </Form>
    )

}
