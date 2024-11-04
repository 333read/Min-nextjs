import {
    Command,
    CommandInput,
} from "@/components/ui/command"
import { Tabs } from "@/components/ui/tabs";

import { useEffect, useState } from "react"

export function UniSearch({ onSearch }) {
    const [query, setQuery] = useState("")  // 搜索框输入内容
    const [categories, setCategories] = useState([]);    // 从接口加载分类选项
    const [error, setError] = useState(""); // 新增状态管理错误提示
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);//控制搜索请求的发送

    useEffect(() => {       //请求获取分类选项并更新状态
        const fetchCategories = async () => {
            try{
                const response = await fetch("https://api.uniswap.org/v3/coins");
                const data = await response.json();
                setCategories(data);
            }catch(error){
                console.error("获取出错",error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;
        if (/^[\u4e00-\u9fa5A-Za-z0-9]*$/.test(value)) {
            setError("");
            // setQuery(value);

            // 清除之前的 debounce
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }

            setQuery(value);  // 输入框内容更新

            // 设置新的 debounce
            const timeout = setTimeout(() => {
                onSearch(value);
            }, 1000); // 1秒钟的间隔
            setDebounceTimeout(timeout);
        } else {
            // 如果输入不符合要求，清空输入框
            setError("请输入中文、英文或数字");
            setQuery(""); // 输入框内容清空
        }
    };

    // 清理 timeout
    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [debounceTimeout]);

    return(
        <Tabs value="search">
            <Command className="rounded-lg border shadow-md md:min-w-[280px] mt-2">
                <CommandInput 
                    placeholder="允许输入中文、英文、数字..." 
                    value={query} 
                    onChange={handleChange} 
                />
                <div className="category-options">
                    {categories.map((category) => (
                        <div key={category.id}>{category.name}</div>
                    ))}
                </div>
            </Command>
        </Tabs>
    );
}