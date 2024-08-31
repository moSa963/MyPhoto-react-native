import React from "react";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "expo-router";
import PaginationList, { PaginationListProps } from "../PaginationList";
import User from "./User";
import UserModel from "@/models/User";

type UserListProps = Omit<PaginationListProps<any>, "renderItem" | "keyExtractor"> & {
    itemExtractor?: (item: any) => any,
    request?: boolean
};

const UserList = ({ url, itemExtractor = (i) => i, request, style, ...rest }: UserListProps) => {
    const auth = useAuth();
    const router = useRouter();

    const showUser = (user: UserModel) => {
        if (user?.username === auth.user?.username) {
            router.replace('/profile');
            return;
        }

        router.push(`/users/${user?.username}`);
    }

    return (
        <PaginationList {...rest}
            style={[{ padding: 3, }, style]}
            url={url}
            keyExtractor={item => "key" + item.username}
            renderItem={
                ({ item }) => <User
                    user={itemExtractor(item)}
                    style={{ marginBottom: 5 }}
                    request={request}
                    onPress={showUser} />
            }
        />
    );
}

export default UserList;