import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function HighConfig() {
    const [isAdvancedSettingsEnabled, setAdvancedSettingsEnabled] = useState(false);

    const handleCheckboxChange = () => {
        setAdvancedSettingsEnabled(prev => !prev); // 切换状态
    };
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
                    <Textarea className="resize-none" placeholder="输入高级设置..." />
                    <div className="flex justify-around w-full">
                                <div className="w-1/2 px-2">
                                    <Label htmlFor='input'>CPU限制：</Label>
                                    <Input className='sm:w-1/2 lg:w-full'/>
                                </div>
                                <div className="w-1/2 px-2">
                                    <Label htmlFor='input'>内存限制：</Label>
                                    <Input className='sm:w-1/2 lg:w-full'/>
                                </div>
                    </div>

                </>
                
            )}
        </>
        
    )
}