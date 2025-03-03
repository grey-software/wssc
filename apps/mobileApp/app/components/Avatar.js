import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SIZES, COLORS } from '../constants/theme'
import { FontAwesome } from '@expo/vector-icons'
const placeholder = require('../../assets/user.jpg')
import Feather from 'react-native-vector-icons/Feather'

const Avatar = ({ uri, user, setIsModal, update }) => {
    return (
        <View style={Styles.imgContainer}>
            {update ? <View style={Styles.imgContainer}>
                <Image source={{ uri }} style={Styles.imgLoading} />
                <Feather name="loader" size={45} color={COLORS.primary} style={Styles.loader} />
            </View> : <>
                {user.profile_image ? <Image source={{ uri: user.profile_image }} style={Styles.img} /> : <Image source={placeholder} style={Styles.img} />}
            </>}

            <Text style={Styles.name}>{user.name}</Text>
            <TouchableOpacity style={Styles.cameraIcon} onPress={() => setIsModal(true)}>
                <FontAwesome name="camera" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    imgContainer: {
        gap: 8,
        alignItems: 'center',
        position: 'relative',
        marginTop: 2,
    },
    img: {
        height: 150,
        width: 150,
        borderRadius: 100,
        objectFit: 'cover'
    },
    name: {
        // fontSize: SIZES.xLarge,
        fontSize: 22,
        fontWeight: '700',
        textTransform: "capitalize"
    },
    cameraIcon: {
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        padding: 8,
        position: 'absolute',
        bottom: "20%",
        right: "32%",
    },
    imgLoading: {
        height: 150,
        width: 150,
        borderRadius: 100,
        objectFit: 'cover',
        opacity: 0.5,
    },
    loader: {
        position: 'absolute',
        top: "40%",
        left: "15%",
    }
})

export default Avatar