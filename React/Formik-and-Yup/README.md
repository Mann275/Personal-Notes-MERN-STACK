# Formik and Yup - Professional Form Handling

## Topics Covered

- Formik for form state management
- Yup for schema-based validation
- Field-level validation
- Form-level validation
- Custom error messages
- Async validation
- Touch and dirty state
- Form submission handling
- Conditional validation
- Array and nested object validation

## What This Project Does

Demonstrates professional form handling with Formik (form management) and Yup (validation). Shows how to handle complex forms efficiently without manually managing state, validation, and errors.

## The Problem - Manual Form Handling

```javascript
// Without Formik - Too much code!
function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Required";
    if (!password) newErrors.password = "Required";
    if (password.length < 6) newErrors.password = "Too short";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched({ ...touched, email: true })}
      />
      {touched.email && errors.email && <span>{errors.email}</span>}

      {/* Similar for password... */}
    </form>
  );
}
```

**Problem**: Too much repetitive code for state, validation, errors!

## The Solution - Formik + Yup

### 1. Basic Formik Form

```javascript
import { useFormik } from 'formik'

function SignupForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name=\"email\"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <input
        type=\"password\"
        name=\"password\"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <button type=\"submit\">Submit</button>
    </form>
  )
}
```

**Benefits**:

- `formik.values` - All form values in one object
- `formik.handleChange` - Automatic state update
- `formik.handleSubmit` - Handles submission
- `formik.handleBlur` - Tracks field touch

### 2. Adding Yup Validation Schema

```javascript
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Define validation rules
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
    .matches(/[0-9]/, 'Must contain number')
    .required('Password is required'),

  age: Yup.number()
    .min(18, 'Must be 18 or older')
    .required('Age is required'),

  website: Yup.string()
    .url('Must be valid URL'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
})

function SignupForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      website: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form data:', values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          name=\"email\"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder=\"Email\"
        />
        {formik.touched.email && formik.errors.email && (
          <div className=\"error\">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <input
          type=\"password\"
          name=\"password\"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder=\"Password\"
        />
        {formik.touched.password && formik.errors.password && (
          <div className=\"error\">{formik.errors.password}</div>
        )}
      </div>

      <button type=\"submit\" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

### 3. Formik with Components (Cleaner Way)

```javascript
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required')
})

function SignupForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log(values)
          setSubmitting(false)
          resetForm()
        }, 1000)
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <div>
            <Field type=\"email\" name=\"email\" placeholder=\"Email\" />
            <ErrorMessage name=\"email\" component=\"div\" className=\"error\" />
          </div>

          <div>
            <Field type=\"password\" name=\"password\" placeholder=\"Password\" />
            <ErrorMessage name=\"password\" component=\"div\" className=\"error\" />
          </div>

          <button
            type=\"submit\"
            disabled={!isValid || !dirty || isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
```

**Benefits**:

- `<Field>` - Automatically connected
- `<ErrorMessage>` - Shows errors automatically
- `<Form>` - Handles submission
- Less repetitive code!

### 4. Complex Validation - Nested Objects & Arrays

```javascript
const validationSchema = Yup.object({
  user: Yup.object({
    name: Yup.string().required('Name required'),
    email: Yup.string().email().required('Email required')
  }),

  addresses: Yup.array().of(
    Yup.object({
      street: Yup.string().required('Street required'),
      city: Yup.string().required('City required'),
      zipCode: Yup.string()
        .matches(/^[0-9]{5}$/, 'Must be 5 digits')
        .required('Zip required')
    })
  ).min(1, 'At least one address required'),

  hobbies: Yup.array()
    .of(Yup.string())
    .min(2, 'Select at least 2 hobbies')
})

function ComplexForm() {
  return (
    <Formik
      initialValues={{
        user: { name: '', email: '' },
        addresses: [{ street: '', city: '', zipCode: '' }],
        hobbies: []
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors }) => (
        <Form>
          <Field name=\"user.name\" placeholder=\"Name\" />
          <ErrorMessage name=\"user.name\" />

          <Field name=\"user.email\" placeholder=\"Email\" />
          <ErrorMessage name=\"user.email\" />

          {/* Dynamic addresses */}
          <FieldArray name=\"addresses\">
            {({ push, remove }) => (
              <div>
                {values.addresses.map((address, index) => (
                  <div key={index}>
                    <Field name={`addresses[${index}].street`} />
                    <Field name={`addresses[${index}].city`} />
                    <Field name={`addresses[${index}].zipCode`} />
                    <button type=\"button\" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type=\"button\" onClick={() => push({ street: '', city: '', zipCode: '' })}>
                  Add Address
                </button>
              </div>
            )}
          </FieldArray>

          <button type=\"submit\">Submit</button>
        </Form>
      )}
    </Formik>
  )
}
```

### 5. Async Validation (Check Username Availability)

```javascript
const checkUsernameAvailability = async (username) => {
  const response = await fetch(`/api/check-username/${username}`);
  return response.json();
};

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Too short")
    .test("check-username", "Username already taken", async (value) => {
      if (!value) return false;
      const { available } = await checkUsernameAvailability(value);
      return available;
    })
    .required("Required"),
});
```

### 6. Custom Field Component

```javascript
function CustomInput({ label, ...props }) {
  const [field, meta] = useField(props)

  return (
    <div className=\"form-field\">
      <label htmlFor={props.name}>{label}</label>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? 'error' : ''}
      />
      {meta.touched && meta.error && (
        <div className=\"error-message\">{meta.error}</div>
      )}
    </div>
  )
}

// Usage
<Formik>
  <CustomInput name=\"email\" type=\"email\" label=\"Email Address\" />
  <CustomInput name=\"password\" type=\"password\" label=\"Password\" />
</Formik>
```

## Key Concepts

### Formik Object Properties

```javascript
formik.values; // All form values { email: '', password: '' }
formik.errors; // Validation errors { email: 'Required' }
formik.touched; // Which fields were touched { email: true }
formik.isSubmitting; // Is form being submitted (true/false)
formik.isValid; // Is form valid (true/false)
formik.dirty; // Has form been modified (true/false)
formik.handleChange; // Update field value
formik.handleBlur; // Mark field as touched
formik.handleSubmit; // Submit form
formik.resetForm; // Reset all fields
formik.setFieldValue; // Set specific field
formik.setFieldError; // Set error manually
```

### Yup Validation Rules

```javascript
Yup.string(); // Must be string
Yup.number(); // Must be number
Yup.boolean(); // Must be boolean
Yup.date(); // Must be date
Yup.array(); // Must be array
Yup.object() // Must be object

  .required("Message") // Cannot be empty
  .min(5, "Too short") // Minimum length/value
  .max(100, "Too long") // Maximum length/value
  .email("Invalid") // Must be email format
  .url("Invalid") // Must be URL
  .matches(/regex/, "Invalid") // Must match pattern
  .oneOf([array], "Message") // Must be one of values
  .test("name", "error", fn); // Custom validation
```

## Common Patterns

### Disable Submit Until Valid

```javascript
<button
  type=\"submit\"
  disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
>
  Submit
</button>
```

### Show Errors Only After Touch

```javascript
{
  formik.touched.email && formik.errors.email && (
    <div>{formik.errors.email}</div>
  );
}
```

### Conditional Validation

```javascript
const validationSchema = Yup.object({
  accountType: Yup.string().required(),
  companyName: Yup.string().when("accountType", {
    is: "business",
    then: (schema) => schema.required("Company name required for business"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
```

## Setup

```bash
npm install formik yup
```

## Common Use Cases

✅ Login/Signup forms
✅ Contact forms
✅ Multi-step forms
✅ Survey forms
✅ Profile update forms
✅ Dynamic field forms (add/remove)
✅ File upload with validation
✅ Search forms with filters

## Learning Outcomes

- Professional form handling without repetitive code
- Schema-based validation with Yup
- Field and form-level validation
- Touch and dirty state management
- Async validation techniques
- Error handling and display
- Dynamic forms with arrays
- Custom field components
- Form submission patterns
- Production-ready form patterns

## Why Formik + Yup?

❌ **Without Formik**: Managing state, validation, errors manually = 100+ lines  
✅ **With Formik**: Clean, maintainable forms = 30-40 lines

❌ **Manual Validation**: Write validation logic for each field  
✅ **Yup Schema**: Define all rules in one place

**Result**: Less code, fewer bugs, better maintainability!

- Professional validation
