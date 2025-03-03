import { Modal, StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SIZES, COLORS, SHADOWS } from '../constants/theme'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserData } from '../GlobalState/UserSlice';
import { API } from '../screens/Login';

const EditModal = ({ isEdit, setIsEdit, label, value }) => {
    const [field, setField] = useState()
    const { user, token } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    const handleUpdate = async () => {
        let updateData = {}
        if (label == 'name') {
            updateData = {
                name: field
            }
        } else if (label == 'email') {
            updateData = {
                email: field
            }
        } else if (label == 'address') {
            updateData = {
                address: field
            }
        } else {
            setIsEdit(false)
            return
        }

        try {
            const response = await API.patch(`api/v1/citizens/${user._id}`, updateData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            dispatch(UpdateUserData(response.data.updateInfo))
            ToastAndroid.showWithGravity(
                `Post updated successfully`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
            setIsEdit(false)
        } catch (error) {
            ToastAndroid.showWithGravity(
                `${error}`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
    }

    useEffect(() => {
        setField(value)
    }, [value])
    return (
        <Modal visible={isEdit} onRequestClose={setIsEdit} animationType='slide' transparent>
            <View style={styles.overlay} >
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={styles.heading}>Enter your {label}</Text>
                        <TextInput style={styles.input} keyboardType='ascii-capable' value={field} onChangeText={(value) => setField(value)} />
                    </View>
                    <View style={styles.actions}>
                        <Text style={styles.action} onPress={() => setIsEdit(false)}>cancel</Text>
                        <Text style={styles.action} onPress={handleUpdate}>save</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        backgroundColor: '#fff',
        padding: 18,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
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
    formContainer: {
        marginTop: 22,
        gap: 12,
    },
    label: {
        fontSize: SIZES.large
    },
    input: {
        backgroundColor: '#fff',
        paddingRight: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 20,
    },
    action: {
        fontSize: SIZES.medium,
        color: COLORS.primary
    }
})

export default EditModal
