import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, SHADOWS, SIZES } from '../constants/theme'
import { MaterialIcons } from '@expo/vector-icons';
import Rating from './Rating';
import * as Animatable from 'react-native-animatable'
import FeedbackRating from './FeedbackRating';

const ComplaintStages = ({stages, complaintId, userfeedback, setFeedback, feedback}) => {
  // const [feedback, setFeedback] = useState(false);
   
  return (
    <Animatable.View animation="fadeInUp" duration={500} delay={100} >
    <View style={styles.container}>
      {stages.map((stage, index) => (
        <React.Fragment key={index}>
          {stage.state === 'Completed' ? (
            <>
            <View style={styles.timeline}>
              <View>
                <View style={styles.line}></View>   
                <Text style={styles.icon}>{stage.updatedAt.split('T')[0]}</Text>
              </View>
              <MaterialIcons name="arrow-left" style={[styles.arrowLeft,styles.state(stage.state)]} size={50} color="black" />
              {/* Code for complete card*/}
                <View style={styles.timelineElement}>
                  {/* <Text style={styles.icon}>{stage.updatedAt.split('T')[0]}</Text> */}
                  <View style={styles.content}>
                    <View style={styles.header}>
                      <Text style={[styles.state(stage.state),styles.fontMedium]}>{stage.state}</Text>
                      <Text style={styles.timestamp}>
                        {stage.updatedAt.split('T')[1].split('.')[0]}
                      </Text>
                    </View>
                    <View style={styles.body}>
                      <Text style={styles.remarks}>Remarks:</Text>
                      <Text>
                        Your complaint is{' '}
                        {stage.state === 'Completed' ? 'Resolved' : stage.state}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.statusBar(stage.state)}></View>
                </View> 
                </View>
              
                {/* Code for feedback */}
                <View style={styles.timeline}>
                  <View>
                    <View style={styles.line}></View>   
                    <Text style={styles.icon}>{stage.updatedAt.split('T')[0]}</Text>
                  </View>
                  <MaterialIcons name="arrow-left" style={[styles.arrowLeft,styles.state('Feedback')]} size={50} color="black" />
                    <View style={styles.timelineElement}>
                      {/* <Text style={styles.icon}>{stage.updatedAt.split('T')[0]}</Text> */}
                      <View style={styles.content}>
                        <View style={styles.header}>
                          <Text style={styles.feedbackTitle}>Feedback</Text>
                          <Text style={styles.timestamp}>
                            {new Date().toLocaleTimeString()}
                          </Text>
                        </View>
                        <View style={styles.body}>
                          {stages[stages.length - 1].state === 'Closed' ? (
                            <>
                              <Text style={styles.feedbackText}>Your Feedback:</Text>
                              <Rating totalRating={userfeedback.rating} />
                            </>
                          ) : (
                            <>
                              <Text style={styles.feedbackText}>
                                Are you satisfied with our service:
                              </Text>
                              <View>
                                <TouchableOpacity onPress={() => setFeedback(!feedback)} style={styles.button}>
                                  <Text style={styles.buttonText}>Feedback</Text>
                                </TouchableOpacity>
                              </View>
                            </>
                          )}
                        </View>
                      </View>
                      <View style={styles.statusBar('Feedback')}></View>
                    </View>
                  </View>
            </>
          ) : (
            <>
              <View key={index} style={styles.timeline}>
                <View>
                  <View style={styles.line}></View>   
                  <Text style={styles.icon}>{stage.updatedAt.split('T')[0]}</Text>
                </View>
                    <MaterialIcons name="arrow-left" style={[styles.arrowLeft,styles.state(stage.state)]} size={50} color="black" />
                <View style={styles.timelineElement}>
                  <View style={styles.content}>
                    <View style={styles.header}>
                      <Text style={[styles.state(stage.state),styles.fontMedium]}>{stage.state}</Text>
                      <Text style={styles.timestamp}>
                        {stage.updatedAt.split('T')[1].split('.')[0]}
                      </Text>
                    </View>
                    <View style={styles.body}>
                      <Text style={styles.remarks}>Remarks:</Text>
                      <Text>
                        Your complaint is{' '}
                        {stage.state === 'Completed' ? 'Resolved' : stage.state}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.statusBar(stage.state)}></View>
                </View>
              </View> 
            </>  
          )}
        </React.Fragment>
      ))}
    </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
//   complaint:{
//     flexDirection: 'row',
//     gap: wp(5.7),
//     width: wp('96%'),
//     backgroundColor: 'white',
//     // borderRadius: 14,
//     borderRadius: wp(3.5),
//     padding: wp(4),
//     // borderLeftColor: borderColor[status],
//     borderLeftWidth: wp(1.6),
//     // ...SHADOWS.medium,
// },
  fontMedium:{
    fontSize: hp(2),
  },
  arrowLeft:{
    // marginLeft: -46,
    marginLeft: -wp(11),
    position:'relative',
    // left: 62,
    left: wp(15.9),
    top: -hp(1),
    // top: -8,

  },
  timeline:{
    display:'flex',
    flexDirection:'row',
  },
  container: {
    // flex: 1,
    padding: hp(2.5),
    // height: hp(100),
    marginBottom: wp(40),
    // backgroundColor: '#333',
  },
  timelineElement: {
    backgroundColor: '#fff',
    color: 'black',
    height: hp(15),
    width: wp(72),
    // height: 150,
    borderWidth: 1,
    borderColor: '#eee',
    // borderRadius: 8,
    borderRadius: hp(1.2),
    // borderColor:'#000',
    marginLeft: wp(10),
    marginBottom: hp(2.5),
    padding: hp(1.1),
    position: 'relative',
  },
  line: {
    height: hp(18),
    // width: 6,
    width: wp(1.6),
    backgroundColor: COLORS.gray,
    // marginLeft: 24
    marginLeft: wp(5),
    position:'relative',
    top: -hp(2.5)
  },
  icon: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: hp(1.5),
    padding: hp(.9),
    height:hp(5.9),
    width: wp(11.9),
    borderRadius: wp(25),
    fontWeight: 'bold',
    position: 'absolute',
    // top: 10,
    top: hp(0.1),
    // left: 10,
    left: wp(0.3),
  },
  content: {
    // marginLeft: 50,
    marginLeft: wp(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
    marginBottom: hp(1),
  },
  state: (state) => ({
    color: state === 'Initiated' ? 'rgb(251, 182, 79)' :
           state === 'InProgress' ? 'rgb(0, 166, 255)' :
           state === 'Completed' ? 'rgb(106, 214, 22)' :
           state === 'Feedback' ? 'rgb(26, 89, 128)' :
           'rgb(212, 52, 52)',
    // fontSize: 16,
    // fontSize: hp(2),
    fontWeight: 'bold',
  }),
  timestamp: {
    // fontSize: 12,
    fontSize: hp(1.8),
    color: 'gray',
    marginRight:wp(1.5)
  },
  body: {
    marginTop: hp(1.2),
  },
  remarks: {
    color: 'gray',
    marginBottom: hp(.7),
  },
  statusBar: (state) => ({
    height: hp(14.8),
    width: 5,
    backgroundColor: state === 'Initiated' ? 'rgb(251, 182, 79)' :
                     state === 'InProgress' ? 'rgb(0, 166, 255)' :
                     state === 'Completed' ? 'rgb(106, 214, 22)' :
                     state === 'Feedback' ? 'rgb(26, 89, 128)' :
                     'rgb(212, 52, 52)',
    position: 'absolute',
    top: 0,
    right: 0,
    // borderTopRightRadius: 8,
    borderTopRightRadius: hp(.9),
    // borderBottomRightRadius: 8,
    borderBottomRightRadius: hp(.9),
  }),
  feedbackTitle: {
    color: '#1A5980',
    // fontSize: 16,
    fontSize: hp(2),
    fontWeight: 'bold',
  },
  feedbackText: {
    color: 'gray',
    fontSize: hp(1.7),
    marginBottom: hp(.7),
  },
  
  //feedback Button Styling
  button: {
    width: wp(46),
    // paddingVertical: 15,
    paddingVertical: hp(.7),
    paddingHorizontal: 3,
    backgroundColor: '#1A5980',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    // fontSize: 14,
    fontSize: hp(2),
    textAlign: 'center',
  }, 
});

export default ComplaintStages;
