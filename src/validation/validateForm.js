const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForm(schema, values) {
  const errors = {};

  if (!schema || !Array.isArray(schema.fields)) {
    return { isValid: true, errors };
  }

  for (const field of schema.fields) {
    const value = values[field.name];

    if (field.required) {
      const isEmpty =
        field.type === "checkbox"
          ? !value
          : value === undefined ||
            value === null ||
            String(value).trim() === "";

      if (isEmpty) {
        errors[field.name] = "This field is required.";
        continue;
      }
    }

    if (
      (field.type === "text" || field.type === "email") &&
      typeof value === "string"
    ) {
      if (field.minLength && value.length < field.minLength) {
        errors[field.name] = `Minimum length is ${field.minLength}.`;
        continue;
      }
      if (field.maxLength && value.length > field.maxLength) {
        errors[field.name] = `Maximum length is ${field.maxLength}.`;
        continue;
      }
    }

    if (field.type === "email" && value) {
      if (!EMAIL_REGEX.test(String(value))) {
        errors[field.name] = "Enter a valid email address.";
        continue;
      }
    }

    if (field.type === "number" && value !== "" && value !== undefined) {
      const numeric = Number(value);
      if (!Number.isNaN(numeric)) {
        if (field.min !== undefined && numeric < field.min) {
          errors[field.name] = `Minimum value is ${field.min}.`;
          continue;
        }
        if (field.max !== undefined && numeric > field.max) {
          errors[field.name] = `Maximum value is ${field.max}.`;
          continue;
        }
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

