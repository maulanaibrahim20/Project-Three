import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, useForm} from '../../utils';
import axios from 'axios';
import {Fire} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    //   console.log(form);
    //   await axios
    //     // .post('http://10.0.167.39:8000/api/user', {
    //     .post('http://192.168.43.123:8000/api/user', {
    //       name: form.fullName,
    //       profession: form.profession,
    //       email: form.email,
    //       password: form.password,
    //     })
    //     .then(result => {
    //       Fire.auth()
    //         .createUserWithEmailAndPassword(form.email, form.password)
    //         .then(success => {
    //           const data = {
    //             fullName: form.fullName,
    //             profession: form.profession,
    //             email: form.email,
    //             password: form.password,
    //           };

    //           Fire.database()
    //             .ref('users/' + success.user.uid + '/')
    //             .set(data);

    //           navigation.navigate('UploadPhoto', {
    //             data: data,
    //           });
    //         })
    //         .catch(error => {
    //           console.log(error);
    //         });
    //       // navigation.navigate('UploadPhoto', {
    //       //   data: form,
    //       // });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   //navigation.navigate('UploadPhoto');

    console.log(form);
    setLoading(true);
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        //httpL//firebase.com/users/id992dad0ndwa
        const data = {
          fullName: form.fullName,
          proffesion: form.profession,
          email: form.email,
        };
        Fire.database()
          .ref('/users/' + success.user.uid + '/')
          .set(data);
        console.log('success register :', success);
      })
      .catch(error => {
        const errorMessage = error.message;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default  ',
          backgroundColor: colors.error,
          color: colors.white,
        });
        console.log('error:', error);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="Email"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
            <Gap height={40} />
            <Button title="Continue" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {padding: 40, paddingTop: 0},
});
