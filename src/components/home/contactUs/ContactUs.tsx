import { useState } from 'react';
import './contactUs.css';

import { CiLocationOn } from 'react-icons/ci';
import { IoMailOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationToast from '@/components/notificationToast/NotificationToast';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    content: '',
  });

  const [success, setIsSuccess] = useState(false);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.subject &&
    form.content &&
    form.name.length > 0 &&
    form.email.length > 0 &&
    form.subject.length > 0 &&
    form.content.length > 0;

  const handleSend = async () => {
    setIsSuccess(true);

    setForm({
      name: '',
      email: '',
      subject: '',
      content: '',
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="contact_us_root">
      <div className="contact_us_container">
        <div className="left">
          <div className="contact_us_left_item">
            <CiLocationOn size={50} color="#007BFF" />
            <div className="item_text">
              2nd Street, #2651 Casper WY, 82601 United States
            </div>
          </div>
          <div className="contact_us_left_item">
            <IoMailOutline size={50} color="#007BFF" />
            <div className="item_text">info@techwingsglobal.com</div>
          </div>
          <div className="contact_us_left_item">
            <FiPhone size={50} color="#007BFF" />
            <div className="item_text">+16892565535</div>
          </div>
        </div>
        <div className="right">
          <div className="contact_us_form_title">
            Do you have further enquiries?
          </div>
          <div className="contact_us_form_subTitle">
            We curated our FAQs to answer common questions, but if they didn't
            address our specific concern we're here to help.
          </div>
          <div className="contactus_form_top_section">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              className="contactus_form_top_section_second_input"
              onChange={handleChange}
            />
          </div>
          <div className="contactus_form_input">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="content"
            id=""
            className="contactus_textarea"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
          />
          <button
            disabled={!isFormValid}
            style={{
              backgroundColor: !isFormValid ? 'grey' : '',
              cursor: !isFormValid ? 'not-allowed' : 'pointer',
            }}
            onClick={handleSend}
          >
            Send Message
          </button>
        </div>
      </div>
      {success && (
        <AnimatePresence>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className="notification-toast-wrapper"
          >
            <NotificationToast
              msg="Message sent 👍🏼! We will get back to you as soon as possible"
              toastType="info"
              cancel={() => setIsSuccess(false)}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ContactUs;
