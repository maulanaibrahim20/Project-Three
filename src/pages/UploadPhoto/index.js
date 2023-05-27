import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, Link} from '../../components';
import {ILNullPhoto, IconAddPhoto, IconRemovePhoto} from '../../assets';
import {colors, fonts} from '../../utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

export default function UploadPhoto({navigation}) {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    const result = launchImageLibrary({includeBase64: true}, response => {
      console.log(response.assets[0].uri);
      const source = {uri: response.assets[0].uri};
      if (response.didCancel || response.error) {
        showMessage({
          message: 'Oppsss..., Sepertinya anda belum memilih foto',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        setPhoto(source);
        setHasPhoto(true);
      }
    });
    // console.log('response:', result);
  };
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Gap height={26} />
          <Text style={styles.name}>Shayna Melinda</Text>
          <Text style={styles.proffession}>Software Developer</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={() => navigation.replace('MainApp')}
          />
          <Gap height={30} />
          <Link
            title="Skip For This"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {width: 110, height: 110, borderRadius: 110 / 2},
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  proffession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
});
