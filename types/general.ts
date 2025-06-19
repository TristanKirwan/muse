export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type FormState<Data = null> = {
  requestStatus: string;
  error: string;
  data?: Data;
};

export type StringKeyValue = { [key: string]: string };

export type ValidationObject = {
  [k: string]: {
    required: boolean;
    validationFunction: () => {
      valid: boolean;
      error: string;
      violatedRules?: string[];
    };
    value: string | File;
  };
};

export interface InvalidFields {
  [k: string]: {
    messageKey: string;
    violatedRules: string[];
  };
}
