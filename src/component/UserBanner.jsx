import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../http/HttpRequest';
import { numberToStr } from '../utils';
import Button from './Button';
import FollowButton from './FollowButton';
import Image from './Image';

const UserBanner = ({ theme, anim, navigation, user, profile }) => {
    const [auth] = useAuth();

    const handleShowUsers = (type) => {
        navigation.push("UsersList", { type: type, user: user });
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
                <Image source={{ uri: BASE_URL + 'api/user/image/' + user.username }}
                    style={{ ...styles.img, borderColor: theme.colors.border }}
                />
                <View style={styles.headContent}>
                    <Text style={{ color: theme.colors.text }}>{user.first_name + " " + user.last_name}</Text>
                    <View style={{ felx: 1, justifyContent: 'space-evenly', flexDirection: 'row', paddingVertical: 25, }}>
                        <Button color={theme.colors.primary} onPress={() => handleShowUsers("followers")}>
                            <Text style={{ color: theme.colors.text }}>FOLLOWERS</Text>
                            <Text style={{ color: theme.colors.text }}>{numberToStr(user.followers_count)}</Text>
                        </Button>
                        <Button color={theme.colors.primary} onPress={() => handleShowUsers("following")}>
                            <Text style={{ color: theme.colors.text }}>FOLLOWING</Text>
                            <Text style={{ color: theme.colors.text }}>{numberToStr(user.following_count)}</Text>
                        </Button>
                    </View>
                </View>
            </View>
            {
                profile ?
                    <Button onPress={() => handleShowUsers("requests")}>
                        <Text style={{ color: theme.colors.text }}>Requests</Text>
                    </Button>
                    : <FollowButton auth={auth} theme={theme} user={user} />
            }
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 10,
        width: '100%',
        borderBottomWidth: 0.2,
        overflow: 'hidden',
        marginBottom: 10,
        zIndex: 25,
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
    img: {
        width: 75,
        height: 75,
        borderWidth: 2,
        borderRadius: 25,
        overflow: 'hidden'
    }
});


export default UserBanner;