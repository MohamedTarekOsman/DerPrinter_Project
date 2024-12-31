import { useState } from 'react';
import InputField from '../../shared/InputField/InputField';
import TextAreaField from '../../shared/TextareaField/TextareaField';
import './ContactUsForm.css';

const ContactUsForm = () => {
  const initialValues = {
    fname: '',
    lname: '',
    email: '',
    msg: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const fields = [
    { name: 'fname', type: 'text', placeholder: 'Vorname' },
    { name: 'lname', type: 'text', placeholder: 'Nachname' },
    { name: 'email', type: 'email', placeholder: 'E-mail' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.fname.trim()) newErrors.fname = 'Vorname erforderlich';
    if (!formValues.lname.trim()) newErrors.lname = 'Nachname erforderlich';
    if (!formValues.email.trim()) {
      newErrors.email = 'E-mail erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Ungültiges E-Mail-Format';
    }
    if (!formValues.msg.trim()) newErrors.msg = 'Ihre Nachricht erforderlich';
    return newErrors;
  };

  const handleClick = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // إرسال البيانات إلى الخادم
      fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setIsSent(true);
            setFormValues(initialValues);
          } else {
            console.error('Error:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="contact-form">
      <h2 className="text-center">Eine Nachricht senden</h2>
      <div className="fieldes-container">
        {fields.map((field, index) => (
          <InputField
            key={index}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formValues[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        ))}
        <TextAreaField
          name="msg"
          placeholder="Ihre Nachricht"
          value={formValues.msg}
          onChange={handleChange}
          error={errors.msg}
        />
      </div>
      {isSent && <p className="success-message">تم إرسال الرسالة بنجاح!</p>}
      <div>
        <button type="button" className="submit-btn" onClick={handleClick}>
          Einreichen
        </button>
      </div>
    </div>
  );
};

export default ContactUsForm;
