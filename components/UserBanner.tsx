import React, { useMemo } from 'react';
import { StyleSheet, View, Animated, ViewProps } from 'react-native';
import { BASE_URL } from '@/http/HttpRequest';
import { numberToStr } from '@/utils/numberToStr';
import Button from '@/components/Buttons/Button';
import FollowButton from '@/components/FollowButton';
import ThemedText from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import Avatar from './Avatar';
import User from '@/models/User';
import { useAuth } from '@/hooks/AuthContext';

type UserBannerProps = ViewProps & {
    anim: Animated.Value,
    user: User,
}

const UserBanner = ({ anim, user }: UserBannerProps) => {
    const router = useRouter();
    const auth = useAuth();
    const status = useMemo(() => {
        if (user.username === auth.user?.username) {
            return "profile";
        } else if (!user.private || user.following_status == true) {
            return "public";
        }
        return "private";
    }, [user, auth.user]);

    const handleShowUsers = (type: string) => {
        if (status == "private") {
            return;
        }

        router.push(`/users?username=${user.username}&type=${type}`);
    }

    return (
        <Animated.View
            style={{
                ...styles.root,
                backgroundColor: anim.interpolate({ inputRange: [0, 50, 200], outputRange: ["#00000000", "#00000011", "#00000055"] }),
                opacity: anim.interpolate({ inputRange: [0, 50, 200], outputRange: [1, 0.8, 0], extrapolateRight: 'clamp' }),
                transform: [
                    { scale: anim.interpolate({ inputRange: [-30, 0, 200], outputRange: [1.5, 1, 0.7], extrapolateRight: 'clamp' }) },
                    { translateY: anim.interpolate({ inputRange: [0, 200], outputRange: [0, 100], extrapolateRight: 'clamp' }) },
                ]
            }}>
            <View style={styles.head}>
                <Avatar uri={`${BASE_URL}api/users/${user.username}/image`} size='large' />

                <View style={styles.headContent}>
                    <ThemedText type="subtitle">{`${user.first_name} ${user.last_name}`}</ThemedText>
                    <View style={{ flex: 1, justifyContent: 'space-evenly', flexDirection: 'row', paddingVertical: 25, }}>
                        <Button onPress={() => handleShowUsers("followers")}>
                            <ThemedText>followers</ThemedText>
                            <ThemedText>{numberToStr(user.followers_count)}</ThemedText>
                        </Button>
                        <Button onPress={() => handleShowUsers("following")}>
                            <ThemedText>following</ThemedText>
                            <ThemedText>{numberToStr(user.following_count)}</ThemedText>
                        </Button>
                    </View>
                </View>
            </View>
            {
                status == "profile" ?
                    <Button onPress={() => handleShowUsers("requests")}>
                        <ThemedText>Requests</ThemedText>
                    </Button>
                    : <FollowButton user={user} />
            }
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root: {
        position: "relative",
        padding: 10,
        width: '100%',
        overflow: 'hidden',
        marginBottom: 10,
        zIndex: 25,
        minHeight: 200
    },
    head: {
        flex: 1,
        flexDirection: 'row',
        zIndex: 2,
    },
    headContent: {
        flex: 1,
        paddingHorizontal: 10,
    },
});


export default UserBanner;