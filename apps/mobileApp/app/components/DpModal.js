import React from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';


const DpModal = ({ isModal, setIsModal, onCameraPress, onGalleryPress }) => {
    return (
        <Modal visible={isModal} onRequestClose={setIsModal} animationType='fade' transparent>
            <View style={Styles.overlay} >
                <View style={Styles.container}>
                    <View style={Styles.header}>
                        <Text style={Styles.heading}>Profile Photo</Text>
                        <FontAwesome name="close" size={24} color={COLORS.closedColor} onPress={() => setIsModal(false)} />
                    </View>

                    <View style={Styles.iconsContainer}>
                        <TouchableOpacity style={Styles.icon} onPress={onCameraPress}>
                            <FontAwesome name="camera" size={24} color={COLORS.primary} />
                            <Text style={Styles.iconText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.icon} onPress={onGalleryPress}>
                            <FontAwesome name="photo" size={24} color={COLORS.primary} />
                            <Text style={Styles.iconText}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.icon}>
                            <FontAwesome name="trash" size={24} color={COLORS.gray} />
                            <Text style={Styles.iconText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const Styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: '#fff',
        padding: 22,
        borderRadius: 20,
        width: '70%',
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: SIZES.medium,
        fontWeight: '700'
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        backgroundColor: "#ddd",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    iconText: {
        fontSize: 12,
    }
})
export default DpModal