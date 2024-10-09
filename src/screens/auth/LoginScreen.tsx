import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import {TextInput} from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';

function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          ref={passwordRef}
          placeholder="이메일"
          error={login.errors.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          touched={login.touched.email}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={login.errors.password}
          secureTextEntry
          returnKeyType="join"
          {...login.getTextInputProps('password')}
          touched={login.touched.password}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
