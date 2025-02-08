export enum FormFieldType {
    Text,
    Selection
}

// Type for generic field configuration
export interface IFormField {
    name: string;
    key: string;
    type?: FormFieldType;
    options?: any[];
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: string;
}