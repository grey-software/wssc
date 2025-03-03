import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BreadCrumb = ({ screen, title }) => {
    const navigation = useNavigation();
    return (
        <View style={Styles.breadCrumb}>
            <FontAwesome5 name='arrow-circle-left' size={30} color={COLORS.gray}
                onPress={() => navigation.navigate(screen)} />
            <Text style={Styles.breadHeading}>{title}</Text>
            <Text style={Styles.blank}></Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    breadCrumb: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    breadHeading: {
        fontSize: SIZES.medium,
        backgroundColor: COLORS.feedbackColor,
        color: COLORS.white,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    blank: {
        width: 32,
    }
})


export default BreadCrumb