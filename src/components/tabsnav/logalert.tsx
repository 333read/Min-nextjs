/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import axios from "axios";
import Codemirror from "@uiw/react-codemirror";
import { javascript } from '@codemirror/lang-javascript';
import { Button } from "@/components/ui/button"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectGroup } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "@/type.d/common";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface AlertLogDemoProps {
    isLogOpen: boolean;
    isOpen: boolean;
    onClose: () => void;
}
interface AlertLogHaveProps {
    isLogOpen: boolean;
    isOpen: boolean;
    onClose: () => void;
    app: Item;
}

export function AlertLogDemo({ isOpen, onClose }: AlertLogDemoProps) {
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

export function AlertLogHave({ isOpen, onClose, app }: AlertLogHaveProps) {

    const { t } = useTranslation();

    const [error, setError] = useState<string>("");
    const [logInfo, setLogInfo] = useState('');
    const [logSearch, setLogSearch] = useState({
        tail: 500
    });

    const codemirrorRef = useRef(null);

    // 时间范围选择项
    const timeOptions = [
        { label: t('container.all'), value: 'all' }, // 获取所有日志
        { label: t('container.lastDay'), value: (Date.now() - 24 * 60 * 60 * 1000).toString() }, // 昨天
        { label: t('container.last4Hour'), value: (Date.now() - 4 * 60 * 60 * 1000).toString() }, // 最近4小时
        { label: t('container.lastHour'), value: (Date.now() - 1 * 60 * 60 * 1000).toString() }, // 最近1小时
        { label: t('container.last10Minute'), value: (Date.now() - 10 * 60 * 1000).toString() }, // 最近10分钟
    ];


    useEffect(() => {
        if (!isOpen) return;

        fetchLogs(); // 当打开日志抽屉时，拉取日志

        return () => {
            // 关闭日志时的清理工作（没有 WebSocket连接，所以不需要关闭）
        };
    }, [isOpen, logSearch]); // 每次打开和日志搜索条件更新时重新请求数据

    // 使用 axios来请求日志
    const fetchLogs = async () => {
        try {
            const response = await axios.get(`/api/v1/apps/installed/${app.id}/logs`, {
                params: {
                    tail: logSearch.tail,
                    since: logSearch.mode,
                },
                headers: {
                    token: `YIG8ANC8q2QxFV_Gf8qwkPdBj2EpsqGqlfc3qvSdg7ksVkZcokOUtQn43XGK0NK3s2uV4oLAEbwcuHiev6xcxqnB0kpNgtZ2Vus-0ALbiLLDFuhkO6T7Yay-mOYRrcm_`
                }
            });

            setLogInfo(response.data.data); // 设置返回的日志数据

            console.log("日志 data:", response.data);

            //  设置Codemirror 的引用，滚动到最后
            if (codemirrorRef.current) {
                const { doc } = codemirrorRef.current.view.state;
                codemirrorRef.current.view.dispatch({
                    selection: { anchor: doc.length, head: doc.length },
                    scrollIntoView: true,
                });
            }
        } catch (error) {
            console.log("Failed to fetch logs:", error);
            setError('container.fetchLogError'); // 错误提示

        }
    };

    // 搜索日志的逻辑
    const searchLogs = () => {
        if (Number(logSearch.tail) < 0) {
            alert('请输入正确的日志条数');
            return;
        }

        fetchLogs(); // 执行日志请求
    };
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle className='ml-9 -mt-1.5 text-gray-700'>Log</SheetTitle>
                </SheetHeader>
                <SheetDescription className='pt-3'>
                </SheetDescription>
                <div className='flex items-center justify-between'>
                    <Select value={logSearch.mode} onValueChange={(value) => setLogSearch(prev => ({ ...prev, mode: value }))}>
                        <SelectTrigger className="w-52">
                        <SelectValue>{t('container.fetch')}</SelectValue>
                        </SelectTrigger>
                        <SelectContent >
                            {timeOptions.map((item) => (
                                <SelectItem key={item.value} value={item.value.toString()}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* 条数选择 */}
                    <Select value={logSearch.tail.toString()} onValueChange={(value) => setLogSearch(prev => ({ ...prev, tail: Number(value) }))}>
                        <SelectTrigger className="w-52">
                            <span>{t('container.lines')}</span>
                        </SelectTrigger>
                        <SelectContent>
                            {[0, 500, 1000, 5000, 10000].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                    {value === 0 ? t('commons.table.all') : value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="py-4">
                    <p className="text-gray-500">Log part</p>
                    {/* 日志显示区域 */}
                    <Codemirror
                        ref={codemirrorRef}
                        value={logInfo}
                        editable={false}
                        height="1000px"
                        theme="light"
                        autoFocus={true} // 加载自动聚焦
                        extensions={[javascript()]}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}



