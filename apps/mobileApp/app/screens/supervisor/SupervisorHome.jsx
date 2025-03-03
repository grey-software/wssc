// import React, { useState } from 'react';
import {Alert,Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, Text, ToastAndroid } from 'react-native'
import BreadCrumb from '../../components/BreadCrumb';
import SupervisorComplaintCard from '../../components/supervisor/SupervisorComplaintCard';
import { API } from '../Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import {SetComplaints} from '../../GlobalState/SupervisorSlice'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Loader from '../../components/Loader';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

export const FiltersBtns = [
  {
    name: "All",
    index: 0,
    filter: "AllComplaints",
  },
  {
    name: "Assigned",
    index: 1,
    filter: "InProgress",
  },
  {
    name: "Resolved",
    index: 2,
    filter: "Completed",
  },
  {
    name: "Closed",
    index: 3,
    filter: "Closed",
  },
];

const FetchSupervisorComplaints = async (setFilteredComplaints,setComplaintsAll, setLoading, dispatch) => {
  try {
    const storedToken = await AsyncStorage.getItem('stoken');
    const token = JSON.parse(storedToken);

    // API call to get all complaints
    const res = await API.get('/api/v1/complaints', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,     
        },
    })
    dispatch(SetComplaints({complaints:res.data.allComplaints}))
    setComplaintsAll(res.data.allComplaints);
    setFilteredComplaints(res.data.allComplaints);
    setLoading(false)
  } catch (error) {
    setLoading(false)
    ToastAndroid.showWithGravity(
        'Something went wrong!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
    );
}
};

const SupervisorHome = () => {
  const dispatch = useDispatch();
  const [selected, setselected] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [complaintsAll, setComplaintsAll] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()


    const FilteredComplaints = (index) => {
      if (index === "AllComplaints") {
        const all = complaintsAll;
        console.log(all.length);
        setFilteredComplaints(complaintsAll);
        return;
      }
  
      const filteredComplaints = complaintsAll.filter((complaint) => {
        let lastStatus = complaint.status[complaint.status.length - 1].state;
        return lastStatus === index;
      });
      console.log(filteredComplaints.length);
      setFilteredComplaints(filteredComplaints);
    };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      FetchSupervisorComplaints(setFilteredComplaints,setComplaintsAll, setLoading, dispatch);
      setselected(0);
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    FetchSupervisorComplaints(setFilteredComplaints,setComplaintsAll, setLoading, dispatch);
    setselected(0);
}, [])

  return (
     <View>
      <View style={{  justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
      <View style={{ width: '100%', padding: 10, backgroundColor: '#F5F5F5' }}>
        <View style={{ flexDirection: 'row', overflow: 'hidden', borderRadius: 5, marginHorizontal: 10, marginTop: 20 }}>
          {FiltersBtns.map((e, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                FilteredComplaints(e.filter);
                setselected(e.index);
              }}
              style={{
                flex: 1,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                marginRight: 10,
                borderRadius:10,
                borderColor: '#CCCCCC',
                backgroundColor: e.index === selected ? '#008000' : 'transparent',
              }}>
              <Text style={{ fontSize: 16, color: e.index === selected ? '#FFFFFF' : '#000000' }}>{e.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ margin: 7, marginTop: 0 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#666666' }}>Assigned complaints</Text>
      </View>
    </View>

    {/* Displaying All Complaints */}
    <View style={styles.list}>
      {!loading ? <FlatList data={filteredComplaints} renderItem={({ item, index }) => {
              return <SupervisorComplaintCard complaint={item} index={index}/>}} 
              contentContainerStyle={{ rowGap: 10, paddingTop: 10, paddingBottom: 100, alignItems: 'center' }} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              } /> 
              : <>
                  {complaintsAll.length === 0 && loading && <Loader />}
              </>
      }
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list:{
    width:wp('98%'),
    height:hp('87%'),
    marginLeft:'1.1%',
    marginRight:'1.5%'
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    marginBottom: 2,
    marginHorizontal: 2,
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  alignmentContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  infoContainer: {
    marginBottom: 5,
    marginRight: 12,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#666666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 10,
  },
  image: {
    width: '35%',
    height: 115, // Adjust height as needed
    resizeMode: 'cover',
    borderRadius: 10,
  },
  statusIndicator: {
    width: 8,
    height: '100%',
    position: 'absolute',
    borderRadius:3,
    top: 0,
    left: 0,
  },
  statusTextInitiatedColor: {
    color: '#efbb1a',
  },
  statusTextInProgressColor: {
    color: '#197fd0',
  },
  statusTextCompletedColor: {
    color: '#34ff34',
  },
  statusTextClosedColor: {
    color: '#ff0000',
  },
  initiatedColor: {
    backgroundColor: '#efbb1a',
  },
  inProgressColor: {
    backgroundColor: '#197fd0',
  },
  completedColor: {
    backgroundColor: '#34ff34',
  },
  closedColor: {
    backgroundColor: '#ff0000',
  },
});

export default SupervisorHome;