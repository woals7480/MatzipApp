import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import {validateSignup} from '../../utils';
import {TextInput} from 'react-native-gesture-handler';
import useAuth from '../../hooks/queries/useAuth';

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const {signupMutation, loginMutation} = useAuth();
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password} = signup.values;

    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => {
          loginMutation.mutate({email, password});
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          touched={signup.touched.email}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signup.errors.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
          touched={signup.touched.password}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
          touched={signup.touched.passwordConfirm}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
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

export default SignupScreen;
