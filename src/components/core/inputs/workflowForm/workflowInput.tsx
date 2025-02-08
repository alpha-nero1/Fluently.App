import { IFormField } from "./IFormField";

// Render input for the current stage
export const WorkflowInput = (field: IFormField) => {
    return (
      <View style={styles.inputContainer}>
        <Text>{`Enter your ${field.placeholder}:`}</Text>
        <TextInput
          style={styles.input}
          value={formData[field.key]}
          onChangeText={(value) => handleChange(field.key, value)}
          placeholder={field.placeholder}
          secureTextEntry={field.secureTextEntry}
          keyboardType={field.keyboardType || 'default'}
        />
      </View>
    );
  };