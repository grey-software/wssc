import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import BreadCrumb from '../../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import DpModal from '../../components/DpModal';
import Avatar from '../../components/Avatar';
import { API } from '../Login';
import { UpdateSupervisorData } from '../../GlobalState/SupervisorSlice';
import { manipulateAsync } from 'expo-image-manipulator';
import EditModal from '../../components/EditModal';
import Rating from '../../components/Rating';


const SupervisorProfile = () => {
    const { supervisor, supervisorToken } = useSelector((state) => state.supervisor)
    const complaints = useSelector((state) => state.supervisor.complaints)
    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState(false)
    const [image, setImage] = useState()
    const [update, setUpdate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState()
    const [label, setLabel] = useState()

    if (supervisor) {
        const changeImage = async (mode) => {
            setUpdate(true)
            try {
                let result = {};
                if (mode == 'Gallery') {
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    })
                } else {
                    await ImagePicker.requestCameraPermissionsAsync();
                    result = await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    })
                }

                setIsModal(false);
                if (!result.canceled) {
                    await saveImage(result.assets[0].uri);
                } else {
                    setUpdate(false)
                }
            } catch (error) {
                setIsModal(false)
                setUpdate(false)
                ToastAndroid.showWithGravity(
                    `Error while uploading image`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                )
            }
        }

        const saveImage = async (img) => {
            try {
                // save image locally
                const manipResult = await manipulateAsync(
                    img, [],
                    { base64: true }
                );

                const uriArr = manipResult.uri.split('.');
                const fileType = uriArr[uriArr.length - 1]
                const file = `data:${fileType};base64,${manipResult.base64}`

                setImage(manipResult.uri);

                // save image to cloundinary
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "xguxdutu");
                data.append("cloud_name", "dgpwe8xy6");
                data.append("folder", "ProfilePhotos");
                data.append("quality", "auto:good");

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dgpwe8xy6/image/upload",
                    {
                        method: "post",
                        body: data,
                    }
                );
                const photo = await response.json();
                // setProfilePhoto(photo.secure_url);
                const updatedpic = {
                    profile_image: photo.secure_url,
                };


                if (photo.secure_url) {
                    // update profile image in backend
                    const res = await API.patch(`api/v1/supervisors/${supervisor._id}`, updatedpic, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${supervisorToken}`,
                        },
                    })

                    dispatch(UpdateSupervisorData(res.data.updateInfo))
                } else {
                    ToastAndroid.showWithGravity(
                        `Error uploading to cloudinary`,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    )
                }

                setUpdate(false)
            } catch (error) {
                setImage(null)
                ToastAndroid.showWithGravity(
                    `${error}`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                )
            }
        }

        // Rating Logic
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let totalFeedbacks = 0;

        const arr = complaints[Object.keys(complaints)[0]];
        arr &&
            arr.forEach((complaint, index) => {
            console.log(complaint?.feedback?.rating);
            if (complaint.feedback) {
                totalFeedbacks += 1;
            }

            if (complaint?.feedback?.rating == 1) one += 1;
            if (complaint?.feedback?.rating == 2) two += 1;
            if (complaint?.feedback?.rating == 3) three += 1;
            if (complaint?.feedback?.rating == 4) four += 1;
            if (complaint?.feedback?.rating == 5) five += 1;
        });
    
        let rate = one * 1 + two * 2 + three * 3 + four * 4 + five * 5;

        let totalRating = 0;
        if (rate != 0) totalRating = rate / totalFeedbacks;
        return (
            <View style={Styles.container}>
                <BreadCrumb screen='supervisorHome' title='Profile' />

                <Avatar uri={image} user={supervisor} setIsModal={setIsModal} update={update} />

                <View style={Styles.infoContainer}>
                    <Text style={Styles.infoLabel}>Name</Text>
                    <View style={Styles.infoInnerContainer}>
                        <Text style={Styles.infoText}>{supervisor.name}</Text>
                        <MaterialCommunityIcons name='account-edit' size={25} color={COLORS.gray} onPress={() => {
                            setValue(supervisor.name)
                            // setIsEdit(true)
                            setLabel('name')
                        }} />
                    </View>
                </View>

                <View style={Styles.infoContainer}>
                    <Text style={Styles.infoLabel}>Phone Number</Text>
                    <View style={Styles.infoInnerContainer}>
                        <Text style={Styles.infoText}>0{supervisor.phone}</Text>
                        <MaterialCommunityIcons name='account-edit' size={25} color={COLORS.gray} />
                    </View>
                </View>

                {/* Performance */}
                <View style={Styles.performanceContainer}>
                    <Text style={Styles.label}>Performance</Text>
                    <View style={Styles.ratingContainer}>
                        <Rating totalRating={totalRating} />
                        <Text style={Styles.rating}>{totalRating.toFixed(1)}</Text>
                    </View>
                </View>
                <DpModal isModal={isModal} setIsModal={setIsModal} onCameraPress={() => changeImage('')} onGalleryPress={() => changeImage('Gallery')} />

                <EditModal isEdit={isEdit} setIsEdit={setIsEdit} value={value} label={label} />
            </View>
        )
    }

}
const Styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    infoContainer: {
        marginHorizontal: 44,
        gap: 4,
        marginTop: 14,
    },
    infoLabel: {
        fontSize: 14,
        color: COLORS.gray,
    },
    infoInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoText: {
        fontSize: SIZES.medium,
        fontWeight: '600',
    },
    btn: (type) => ({
        marginHorizontal: 44,
        marginTop: type === 'password' ? 32 : 12,
        marginBottom: type === 'password' ? 0 : 14,
        alignItems: 'center',
        backgroundColor: type === 'password' ? COLORS.primary : COLORS.closedColor,
        paddingVertical: 10,
        borderRadius: 10,
    }),
    btnText: {
        fontSize: SIZES.medium,
        color: '#fff',
    },
    // Performance section Styling 
    performanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        marginBottom: 6,
        marginLeft: 44,
        marginRight: 44,
      },
      label: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      rating: {
        fontSize: 16,
        color: '#0D6EF6', // Assuming primaryColor-500 is #0D6EF6
        fontWeight: 'bold',
        marginLeft: 5
      },
})

export default SupervisorProfile