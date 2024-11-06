import {
    Command,
    CommandInput,
} from "@/components/ui/command"
import { Tabs } from "@/components/ui/tabs";

import { useEffect, useState } from "react"

interface UniSearchProps {
    onSearch: (query: string) => void;
}
export default function UniSearch({ onSearch }: UniSearchProps) {
    const [query, setQuery] = useState("");  // 搜索框输入内容
    const [error, setError] = useState("");  // 错误提示
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null); // 控制搜索请求的发送
    const [results, setResults] = useState([]); // 存储搜索结果

     // 处理输入变化
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);  // 直接更新输入框内容

        // 立即触发父组件的搜索
        onSearch(value);
    };
    // 发起搜索请求
    const fetchSearchResults = async (query: string) => {
        if (!query.trim()) {
            setResults([]); // 如果搜索内容为空，清空结果
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8080/api/v1/apps?name_like=${query}&descript_like=${query}`);
            const data = await response.json();
            setResults(data); // 更新搜索结果
        } catch (error) {
            console.error("搜索请求出错", error);
        }
    };


    return(
        <Tabs value="search">
            <Command className="rounded-lg border shadow-md md:min-w-[280px] mt-2">
            <CommandInput 
                    placeholder="允许输入中文、英文、数字..." 
                    value={query} 
                    onChange={handleChange} 
                />
                {/* 错误提示 */}
                {/* {error && <div className="text-red-500 mt-2">{error}</div>} */}

               {/* 显示搜索结果 */}
                {/* <div className="search-results mt-2">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((result) => (
                                <li key={result.id}>
                                    <div>{result.name}</div>
                                    <div>{result.descript}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>暂无搜索结果</div>
                    )}
                </div> */}
            </Command>
        </Tabs>
    );
}