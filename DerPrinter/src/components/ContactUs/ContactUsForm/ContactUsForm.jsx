/* eslint-disable no-unused-vars */
import { useState } from 'react';
import InputField from '../../shared/InputField/InputField';
import TextAreaField from '../../shared/TextareaField/TextareaField';
import emailjs from 'emailjs-com'; // Import EmailJS
import './ContactUsForm.css';
import toast from 'react-hot-toast';

const ContactUsForm = () => {
  const initialValues = {
    gender: '',
    fname: '',
    lname: '',
    email: '',
    msg: '',
    consent: false,
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
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.gender) newErrors.gender = 'Bitte wählen Sie eine Anrede aus';
    if (!formValues.fname.trim()) newErrors.fname = 'Vorname erforderlich';
    if (!formValues.lname.trim()) newErrors.lname = 'Nachname erforderlich';
    if (!formValues.email.trim()) {
      newErrors.email = 'E-mail erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Ungültiges E-Mail-Format';
    }
    if (!formValues.msg.trim()) newErrors.msg = 'Ihre Nachricht erforderlich';
    if (!formValues.consent) newErrors.consent = 'Bitte stimmen Sie den Bedingungen zu';
    return newErrors;
  };

  const handleClick = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Send email via EmailJS
      emailjs
        .send(
          'service_068wzuu', // Replace with your EmailJS service ID
          'template_yron9tq', // Replace with your EmailJS template ID
          {
            gender: formValues.gender,
            First_Name: formValues.fname,
            Last_Name: formValues.lname,
            email: formValues.email,
            message: formValues.msg,
          },
          'XDlGDnmFX7XfFvH4v' // Replace with your EmailJS user/public key
        )
        .then(
          (response) => {
            setIsSent(true);
            setFormValues(initialValues);
            toast.success("Nachricht erfolgreich gesendet")
          },
          (error) => {
            console.error('Failed to send email:', error);
          }
        );
    }
  };

  return (
    <div className="contact-form">
      <h2 className="text-center">Eine Nachricht senden</h2>
      <div className="fieldes-container mt-5 flex flex-col items-center">
        {/* Gender Radio Buttons */}
        <div className="gender-container ">
          <label className='text-lg mx-5 text-gray-600'>
            <input
              type="radio"
              name="gender"
              value="Herr"
              checked={formValues.gender === 'Herr'}
              onChange={handleChange}
            />
            Herr
          </label>
          <label className='text-lg text-gray-600'>
            <input
              type="radio"
              name="gender"
              value="Frau"
              className='text-2xl'
              checked={formValues.gender === 'Frau'}
              onChange={handleChange}
            />
            Frau
          </label>
          {errors.gender && <p className="error-message text-red-500">{errors.gender}</p>}
        </div>

        {/* Other Fields */}
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

        {/* Consent Checkbox */}
        <div className="consent-container mb-5">
          <label>
            <input
              type="checkbox"
              name="consent"
              checked={formValues.consent}
              onChange={handleChange}
            />
            Durch das Absenden einer Anfrage bestätige ich, die Datenschutzerklärung von Derprinter zur Kenntnis genommen zu haben.Ich erteile meine Zustimmung, dass mich Derprinter per E-Mail, Telefon oder Post kontaktieren und zu meiner Anfrage informieren darf. Die Verwendung meiner Daten erfolgt ausschließlich für diesen Zweck und wird nicht an Dritte weitergegeben.
          </label>
          {errors.consent && <p className="error-message text-red-500">{errors.consent}</p>}
        </div>
      </div>

      {/* {isSent && <p className="success-message">تم إرسال الرسالة بنجاح!</p>} */}
      <div>
        <button type="button" className="submit-btn" onClick={handleClick}>
          Einreichen
        </button>
      </div>
    </div>
  );
};

export default ContactUsForm;
