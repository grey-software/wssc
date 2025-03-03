import React, { useRef, useEffect } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const Loader = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotation]);

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={[{ transform: [{ rotate: spin }] }, Styles.container]}>
            <Feather style={Styles.icon} name="loader" size={50} color={COLORS.primary} />
        </Animated.View>
    )
}

const Styles = StyleSheet.create({
    container: {
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {

    }
})

export default Loader