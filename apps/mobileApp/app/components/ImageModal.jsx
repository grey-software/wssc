import React from 'react';
import { Modal, View, Text, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageModal = ({ visible, imageUrls, onClose }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <ImageViewer imageUrls={imageUrls} enableSwipeDown={true} onCancel={onClose} />
    </Modal>
    
    // <Modal visible={visible} transparent={true} onRequestClose={onClose}>
    //   <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
    //     <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
    //       <FlatList
    //         horizontal
    //         data={imageUrls}
    //         keyExtractor={(item, index) => index.toString()}
    //         renderItem={({ item }) => (
    //           <TouchableOpacity onPress={onClose}>
    //             <Image source={{ uri: item.url }} style={{ width: 100, height: 100, marginRight: 10 }} />
    //           </TouchableOpacity>
    //         )}
    //       />
    //       <ImageViewer imageUrls={imageUrls} />
    //       <Button title="Close" onPress={onClose} />
    //     </View>
    //   </View>
    // </Modal>
  );
};

export default ImageModal;
