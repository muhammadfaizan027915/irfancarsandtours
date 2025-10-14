export function objectToFormData(
  obj: any,
  form: FormData = new FormData(),
  namespace?: string
): FormData {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const formKey = namespace ? `${namespace}[${key}]` : key;

    if (value === null || value === undefined) {
      form.append(formKey, "");
    } else if (typeof value === "object" && !(value instanceof File)) {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          const arrayKey = `${formKey}[${i}]`;
          objectToFormData(v, form, arrayKey);
        });
      } else {
        objectToFormData(value, form, formKey);
      }
    } else {
      form.append(formKey, String(value));
    }
  }
  return form;
}

export function formDataToObject(formData: FormData): any {
  const result: any = {};

  for (const [key, value] of formData.entries()) {
    const path = key.replace(/\]/g, "").split("[").filter(Boolean);

    let current = result;
    for (let i = 0; i < path.length; i++) {
      const part = path[i];
      const nextPart = path[i + 1];

      if (i === path.length - 1) {
        current[part] = value;
      } else {
        if (!current[part]) {
          current[part] = /^\d+$/.test(nextPart) ? [] : {};
        }
        current = current[part];
      }
    }
  }

  return result;
}

export function mergeObjectToFormData(
  formData: FormData | undefined,
  obj: any,
  namespace?: string
): FormData {
  const form = formData ?? new FormData();

  if (!obj || typeof obj !== "object") return form;

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const formKey = namespace ? `${namespace}[${key}]` : key;

    if (value === null || value === undefined) {
      form.append(formKey, "");
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === "object" && !(v instanceof File)) {
          mergeObjectToFormData(form, v, `${formKey}[${i}]`);
        } else {
          form.append(`${formKey}[${i}]`, v);
        }
      });
    } else if (typeof value === "object" && !(value instanceof File)) {
      mergeObjectToFormData(form, value, formKey);
    } else {
      form.append(formKey, String(value));
    }
  }

  return form;
}

