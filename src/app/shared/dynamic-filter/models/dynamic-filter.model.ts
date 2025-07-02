export interface DynamicFilterField {
  label: string;
  formControlName: string;
  type: 'select' | 'text' | 'date';
  options?: string[];
  required?: boolean;
}