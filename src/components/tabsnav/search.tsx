// UniSearch.tsx
import { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button'

interface UniSearchProps {
    onSearch: (query: string) => void; // 父组件传递的搜索函数
}

const UniSearch: React.FC<UniSearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    // 正则：只允许输入中文、英文、数字
    const regex = /^[a-zA-Z0-9\u4e00-\u9fa5]*$/;


    // 处理搜索输入变化
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // 如果输入不符合要求（不是中文、英文、数字），就不更新搜索框内容
        if (regex.test(value)) {
            setQuery(value);
        }
    };

    // 处理键盘输入的变化
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // 只有在用户输入时才触发搜索（非中文输入时）
        if (event.key === "Enter") {
            onSearch(query);
        }
    };
    // 处理提交搜索
    const handleSearch = () => {
        onSearch(query); // 调用父组件传递的搜索函数

    };

    return (
        <div className="relative flex items-center lg:w-[250px] sm:w-[150px]">
            <Input
                type="text"
                placeholder="请输入中文、英文或数字..."
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown} // 键盘按下时触发（处理回车提交）
                className="input-class lg:w-[300px] sm:w-[150px]"
            />
            <Button
                variant="common"
                onClick={handleSearch}
                className="absolute right-0 top-0.5  p-2"
            >
                <MagnifyingGlassIcon className="size-10 shrink-0" />
            </Button>
        </div>
    );
};

export default UniSearch;
