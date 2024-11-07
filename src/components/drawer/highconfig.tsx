/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Item } from "@/type.d/common";

interface HighConfigProps {
    app: Item;  // 接收 app 数据
    dockerCompose: string;  // dockerCompose 状态
    cpuLimit: string;  // CPU 限制
    memoryLimit: string;  // 内存限制
    setDockerCompose: React.Dispatch<React.SetStateAction<string>>;  // 更新 dockerCompose 的函数
    setCpuLimit: React.Dispatch<React.SetStateAction<string>>;  // 更新 cpuLimit 的函数
    setMemoryLimit: React.Dispatch<React.SetStateAction<string>>;  // 更新 memoryLimit 的函数
    onFieldsUpdate: (fields: any[]) => void;  // 回调函数：父组件用于接收 form_fields 数据

}

export function HighConfig( { app,dockerCompose, cpuLimit, memoryLimit, setDockerCompose, setCpuLimit, setMemoryLimit,onFieldsUpdate, } : HighConfigProps) {
    const [isAdvancedSettingsEnabled, setAdvancedSettingsEnabled] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);  // 加载状态
    const [error, setError] = useState<string>("");  // 错误信息



    const handleCheckboxChange = () => {
        setAdvancedSettingsEnabled(prev => !prev); // 切换状态
    };

     // 发送请求获取docker_compose内容
        useEffect(() => {
            if (app.key) {
            setLoading(true); // 开始加载
            setError(""); // 清空之前的错误

            // 发起 GET 请求
            fetch(`http://127.0.0.1:8080/api/v1/apps/${app.key}/detail`,
                {
                    headers: {
                        'token': `YIG8ANC8q2QxFV_Gf8qwkPdBj2EpsqGqlfc3qvSdg7ksVkZcokOUtQn43XGK0NK3vMTIj1-_qieyJrqCgYaFNKnB0kpNgtZ2Vus-0ALbiLJXqbLpTpeHh_B7v-cZxbBj`
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("请求失败");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("API Response:", data);  // 调试：检查返回的数据
                    // data.data.docker_compose是需要的内容
                    setDockerCompose(data.data.docker_compose || "");  // 设置docker_compose内容
                    setLoading(false); // 请求完成

                    
                    onFieldsUpdate(data.data.params.form_fields); // 更新父组件状态
                    
                })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .catch((err) => {
                    setError("请求失败，请稍后重试"); // 错误处理
                    setLoading(false);
                });
            }
        }, [app.key, setDockerCompose,onFieldsUpdate]); // 依赖app.key

    return (
        <>
            <div className="flex gap-2 text-left">
                <Checkbox 
                    checked={isAdvancedSettingsEnabled} //状态绑定
                    onCheckedChange={handleCheckboxChange}  //处理
                    className="mt-1"
                />
                <Label>高级设置</Label>
            </div>
            {isAdvancedSettingsEnabled && ( // 根据状态显示或隐藏文本区域
                <>
                {/* 显示加载状态 */}
                {loading && <div>加载中...</div>}
                {error && <div className="text-red-500">{error}</div>}  {/* 错误信息 */}
                    <Textarea 
                        className="resize-none" 
                        placeholder="输入高级设置..."
                        value={dockerCompose} // 将返回的数据填充到textarea
                        onChange={(e) => setDockerCompose(e.target.value)} // 如果需要编辑
                        />
                    <div className="flex justify-around w-full">
                                <div className="w-1/2 px-2">
                                    <Label htmlFor='input'>CPU限制：</Label>
                                    <Input 
                                        className='sm:w-1/2 lg:w-full'
                                        value={cpuLimit} // 绑定cpuLimit状态
                                        onChange={(e) => setCpuLimit(e.target.value)} // 更新状态
                                        placeholder="1"
                                        />
                                </div>
                                <div className="w-1/2 px-2">
                                    <Label htmlFor='input'>内存限制：</Label>
                                    <Input 
                                        className='sm:w-1/2 lg:w-full'
                                        value={memoryLimit} // 绑定cpuLimit状态
                                        onChange={(e) => setMemoryLimit(e.target.value) } // 更新状态
                                        placeholder="120m 或 12g"
                                        />
                                </div>
                    </div>

                </>
                
            )}
        </>
        
    )
}