import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { COLORS, SHADOWS, SIZES } from '../constants/theme';
import complaintDummy from '../../assets/complaintDefaultPic.png'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const borderColor = {
    "Initiated": COLORS.initiatedColor,
    "InProgress": COLORS.inprogessColor,
    "Completed": COLORS.completedColor,
    "Closed": COLORS.closedColor,
}

const ComplaintCard = ({ complaint, index }) => {
    const navigation = useNavigation();
    const status = complaint.status?.slice(-1).pop().state;
    return (
        <Animatable.View style={Styles.container} animation="fadeInUp" duration={500} delay={100 * index} >
            <TouchableOpacity style={Styles.complaint(status)} onPress={() => navigation.navigate("SingleComplaint", complaint)}>
                <View style={Styles.left}>
                    <Text style={Styles.heading}>{complaint.complaintType}</Text>
                    <View style={[Styles.infoContainer, Styles.marginBottom]}>
                        <Text style={Styles.infoKey}>Status:</Text>
                        <Text style={[Styles.infoValue, Styles.statusColor(status)]}>{status}</Text>
                    </View>
                    <View style={Styles.infoContainer}>
                        <Text style={Styles.infoKey}>Complaint ID:</Text>
                        <Text style={Styles.infoValue}>{complaint?._id.slice(0, 8).toUpperCase()}</Text>
                    </View>
                    <View style={Styles.infoContainer}>
                        <Text style={Styles.infoKey}>Submitted On:</Text>
                        <Text style={Styles.infoValue}>{moment(complaint.createdAt).format('Do MMM YY')}</Text>
                    </View>
                    <View style={Styles.infoContainer}>
                        <Text style={Styles.infoKey}>Address:</Text>
                        <Text style={Styles.infoValue}>{complaint.complaintAddress.length > 14 ? `${complaint?.complaintAddress?.slice(0, 14)}...` : `${complaint.complaintAddress}`}</Text>
                    </View>
                </View>
                {complaint.ImageUrl ? <Image style={Styles.img} source={{ uri: complaint.ImageUrl }} /> : <Image style={Styles.img} source={complaintDummy} />}
            </TouchableOpacity>
        </Animatable.View>
    )
}
const Styles = StyleSheet.create({
    container: {
        width: wp(99),
        height: hp(22.1),
    },
    complaint: (status) => ({
        flexDirection: 'row',
        gap: wp(5.7),
        width: wp('96%'),
        backgroundColor: 'white',
        // borderRadius: 14,
        borderRadius: wp(3.5),
        padding: wp(4),
        borderLeftColor: borderColor[status],
        borderLeftWidth: wp(1.6),
        ...SHADOWS.medium,
    }),
    left: {
        // width: '65%'
        width: wp(56)
    },
    img: {
        // width: '30%',
        width: wp(25.2),
        // height: '100%',
        height: hp(18),
        // borderRadius: 10,
        borderRadius: wp(3.2),
        objectFit: 'cover',
    },
    heading: {
        // fontSize: SIZES.large,
        fontSize: hp(3),
        fontWeight: '600',

    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: 14,
        gap: wp(2),
        justifyContent: 'space-between'
    },
    infoKey: {
        // fontSize: SIZES.medium,
        fontSize: hp(2),
        color: '#3b3b3b'
    },
    infoValue: {
        // fontSize: SIZES.medium,
        fontSize: hp(2),
        color: '#000'
    },
    statusColor: (status) => ({
        color: borderColor[status]
    }),
    marginBottom: {
        marginBottom: wp(2.5),
        // marginBottom: 10,
    }
})

export default ComplaintCard