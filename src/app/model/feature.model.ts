import { Observable } from 'rxjs';
// Model of feature for the frontend
export class Feature {
  fullName: string;
  name: string;
  value: number | number[];
  range: number[];
  isUsed: boolean;
}

// Model of variable features (policies) returned by the APIs
export class VariableFeatures {
  dates: string[];
  policies: object;
}
