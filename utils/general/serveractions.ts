import type {
  InvalidFields,
  StringKeyValue,
  ValidationObject,
} from "@/types/general";
import { formDataIsFile, formDataIsNotFile } from "@/types/guards";

export function mapFormDataToStringObject(formData: FormData) {
  const object: StringKeyValue = {};
  formData.forEach((value, key) => {
    if (formDataIsNotFile(value)) {
      object[key] = value;
    }
  });

  return object;
}

export function mapFormDataToArrayObject(formData: FormData) {
  const object: { [k: string]: string[] } = {};

  formData.forEach((value, key) => {
    if (!formDataIsNotFile(value)) return;
    if (object[key]) {
      object[key].push(value as string);
    } else {
      object[key] = [value];
    }
  });

  return object;
}

export function validateFormData(dataToValidate: ValidationObject) {
  const invalidFields: InvalidFields = {};

  Object.entries(dataToValidate).forEach(([key, value]) => {
    if (value.required && !value.value) {
      invalidFields[key] = { messageKey: "required", violatedRules: [] };
    }

    const validity = value.validationFunction();
    if (
      ((formDataIsFile(value.value) && value.value.size > 0) ||
        (!formDataIsFile(value.value) && value.value)) &&
      !validity.valid
    ) {
      if (validity.error === "required") {
        invalidFields[key] = {
          messageKey: "required",
          violatedRules: [],
        };
      } else {
        invalidFields[key] = {
          messageKey: `${key}.${validity.error}`,
          violatedRules: validity.violatedRules || [],
        };
      }
    }
  });

  return invalidFields;
}
