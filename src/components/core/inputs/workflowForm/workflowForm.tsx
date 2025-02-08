import React, { useState } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, Easing } from 'react-native';
import { IFormField } from './IFormField';

interface IWorkflowFormProps {
  fields: IFormField[]; // List of fields to display
  onSubmit: (data: Record<string, string>) => void; // Callback to submit form data
}

const SignupWorkflow: React.FC<IWorkflowFormProps> = ({ fields, onSubmit }) => {
  // State for the current stage and form data
  const [stage, setStage] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {} as Record<string, string>)
  );

  // Animation values
  const fadeAnim = new Animated.Value(0);

  // Handle input changes
  const handleChange = (key: string, value: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Move to the next stage
  const goToNextStage = () => {
    if (stage < fields.length) {
      setStage((prevStage: any) => prevStage + 1);
      triggerFadeAnimation();
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(formData);
  };

  // Animation to smoothly transition between stages
  const triggerFadeAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(0); // Reset animation value after transition
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.inputWrapper, opacity: fadeAnim }}>
        {renderInput()}
      </Animated.View>

      <View style={styles.buttonContainer}>
        {stage < fields.length ? (
          <Button title="Next" onPress={goToNextStage} />
        ) : (
          <Button title="Submit" onPress={handleSubmit} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default SignupWorkflow;
