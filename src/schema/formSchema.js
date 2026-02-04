export const FIELD_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  NUMBER: "number",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio"
};

export const emptySchema = {
  id: "form",
  title: "Untitled Form",
  fields: []
};

export const exampleSchema = {
  id: "customer-onboarding",
  title: "Customer Onboarding",
  fields: [
    {
      id: "full-name",
      type: FIELD_TYPES.TEXT,
      name: "fullName",
      label: "Full name",
      placeholder: "Enter full name",
      required: true,
      minLength: 2,
      maxLength: 80
    },
    {
      id: "email",
      type: FIELD_TYPES.EMAIL,
      name: "email",
      label: "Work email",
      placeholder: "name@company.com",
      required: true,
      minLength: 5,
      maxLength: 120
    },
    {
      id: "age",
      type: FIELD_TYPES.NUMBER,
      name: "age",
      label: "Age",
      placeholder: "30",
      required: false,
      min: 18,
      max: 120
    },
    {
      id: "account-type",
      type: FIELD_TYPES.SELECT,
      name: "accountType",
      label: "Account type",
      placeholder: "Select account type",
      required: true,
      options: [
        { id: "standard", label: "Standard", value: "standard" },
        { id: "premium", label: "Premium", value: "premium" },
        { id: "enterprise", label: "Enterprise", value: "enterprise" }
      ]
    },
    {
      id: "terms",
      type: FIELD_TYPES.CHECKBOX,
      name: "terms",
      label: "I agree to the terms",
      required: true
    },
    {
      id: "risk-profile",
      type: FIELD_TYPES.RADIO,
      name: "riskProfile",
      label: "Risk profile",
      required: true,
      options: [
        { id: "conservative", label: "Conservative", value: "conservative" },
        { id: "balanced", label: "Balanced", value: "balanced" },
        { id: "aggressive", label: "Aggressive", value: "aggressive" }
      ]
    }
  ]
};

