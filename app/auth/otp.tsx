import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../theme/ThemeProvider';

const OTPScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const otpInputs = useRef<Array<TextInput | null>>(Array(6).fill(null));
  const { theme } = useTheme();

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      const newOtp = text.split('').slice(0, 6);
      setOtp(newOtp);
      if (newOtp.length === 6) otpInputs.current[5]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setIsLoading(true);
    setError('');
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit code');
      setIsLoading(false);
      return;
    }
    console.log('Verifying OTP:', otpCode);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleResend = () => console.log('Resending OTP...');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Verify Email</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            Enter the 6-digit code sent to your email
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { otpInputs.current[index] = ref; }}
              style={[
                styles.otpInput,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.inputBackground,
                  color: theme.colors.text,
                }
              ]}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textContentType="oneTimeCode"
              autoFocus={index === 0}
              selectTextOnFocus
              blurOnSubmit={false}
              returnKeyType={index === 5 ? 'done' : 'next'}
            />
          ))}
        </View>

        {error ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }, isLoading && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Verifying...' : 'Verify'}</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={[styles.resendText, { color: theme.colors.textSecondary }]}>
            Didn&apos;t receive a code?{' '}
          </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={[styles.resendLink, { color: theme.colors.primary }]}>Resend</Text>
          </TouchableOpacity>
        </View>

        <Link href="/auth/register" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>
              Back to registration
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  header: { marginBottom: 32, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, textAlign: 'center', marginTop: 8 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  otpInput: {
    width: 48,
    height: 60,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  errorText: { fontSize: 12, textAlign: 'center', marginBottom: 16 },
  resendContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  resendText: { fontSize: 14 },
  resendLink: { fontWeight: '600' },
  backButton: { marginTop: 32, alignItems: 'center' },
  backButtonText: { fontWeight: '600', fontSize: 14 },
});