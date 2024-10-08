import React from 'react';
import { useRequest, Request } from '@/hooks/RequestContext';

export type PaginationStateCallbackType = {
    processing: boolean,
    refreshing: boolean,
    data: Array<any>,
    next: string | null,
    loadNext: () => void,
    refresh: () => void,
}

export type Pagination = {
    children: ((state: PaginationStateCallbackType) => React.ReactNode),
    url: string,
}

const Pagination = ({ children, url }: Pagination) => {
    const [processing, setProcessing] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [list, setList] = React.useState([])
    const [next, setNext] = React.useState<string | null>(null);
    const request = useRequest();

    React.useEffect(() => {
        loadData(request, url, setList, setNext, setRefreshing);
    }, [request, url]);

    const handleRefresh = () => {
        loadData(request, url, setList, setNext, setRefreshing);
    }

    const handleLoadNext = () => {
        loadNext(request, next, setList, setNext, setProcessing);
    }

    return children({ next: next, refreshing: refreshing, processing: processing, data: list, loadNext: handleLoadNext, refresh: handleRefresh });
}

const loadData = async (request: Request, url: string, setList: any, setNext: any, setRefreshing: any) => {
    setRefreshing(true);

    const res = await request(url);

    if (res?.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(js.results);
    }

    setRefreshing(false);
}

const loadNext = async (request: Request, next: string | null, setList: any, setNext: any, setProcessing: any) => {
    if (!next) return;

    setProcessing(true);

    const res = await request(next);

    if (res && res.ok) {
        const js = await res.json();
        setNext(js.next);
        setList((e: any) => ([...e, ...js.results]));
    }

    setProcessing(false);
}

export default Pagination;