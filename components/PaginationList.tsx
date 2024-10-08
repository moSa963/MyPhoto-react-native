import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, FlatListProps, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import ThemedRefreshControl from "@/components/ThemedRefreshControl";
import Pagination from './Pagination';

export type PaginationListProps<T> = Omit<FlatListProps<T>, "data" | "refreshing"> & {
    url: string,
    onRefresh?: () => void,
    asView?: boolean,
}

const PaginationList = ({ url, onScroll, ListHeaderComponent, onRefresh, style, renderItem, asView, ...rest }: PaginationListProps<any>) => {
    const { theme } = useTheme();


    const handleRefresh = (refresh: () => void) => {
        refresh();
        onRefresh && onRefresh();
    }

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>, processing: boolean, loadNext: () => void) => {
        if (!processing && e.nativeEvent.contentOffset.y + 10 >= (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)) {
            loadNext();
        }

        onScroll && onScroll(e);
    }

    return (
        <Pagination url={url}>
            {
                ({ data, loadNext, processing, refreshing, refresh, next }) => (
                    <FlatList {...rest}
                        style={[styles.root, style]}
                        refreshControl={<ThemedRefreshControl onRefresh={() => handleRefresh(refresh)} refreshing={refreshing} />}
                        onScroll={(e) => handleScroll(e, processing, loadNext)}
                        refreshing={refreshing}
                        ListFooterComponent={next !== null ? <ActivityIndicator color={theme.colors.text} size="large" /> : null}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={renderItem}
                    />
                )
            }
        </Pagination>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
    },
});

export default PaginationList;