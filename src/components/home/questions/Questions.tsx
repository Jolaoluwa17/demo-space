import Accordion from '../../accordion/Accordion';
import './questions.css';

const AskQuestions = () => {
  const accordionItems = [
    {
      title: 'How do I sign up for the evaluator app ?',
      content:
        'Signing up is easy! Simply download the app from the App Store, Google Play, or access it via the web. Create your profile by entering basic details, and you’ll be ready to start evaluating your skills in minutes.',
    },
    {
      title: 'Can I use the app on both mobile and web ?',
      content:
        'Signing up is easy! Simply download the app from the App Store, Google Play, or access it via the web. Create your profile by entering basic details, and you’ll be ready to start evaluating your skills in minutes.',
    },
    {
      title: 'Is there any support available if I need help ?',
      content:
        'Signing up is easy! Simply download the app from the App Store, Google Play, or access it via the web. Create your profile by entering basic details, and you’ll be ready to start evaluating your skills in minutes.',
    },
    {
      title: 'Are the evaluations timed ?',
      content:
        'Signing up is easy! Simply download the app from the App Store, Google Play, or access it via the web. Create your profile by entering basic details, and you’ll be ready to start evaluating your skills in minutes.',
    },
    {
      title: 'Can I retake an evaluation if I’m not satisfied with my score ?',
      content:
        'Signing up is easy! Simply download the app from the App Store, Google Play, or access it via the web. Create your profile by entering basic details, and you’ll be ready to start evaluating your skills in minutes.',
    },
  ];

  return (
    <div className="ask_question_root">
      <div className="ask_question_container">
        <div className="left">
          <div className="ask_question_title">
            Frequently Asked questions 🙋‍♀️
          </div>
          <div className="ask_question_subTitle">
            Got questions? We got answers!
          </div>
          <div className="ask_question_subTitle_sub">
            Feel free to reach out to us if you have more questions for us.
          </div>
          <div className="ask_question_contact_me_container">
            <div className="ask_question_contact_me">Contact us</div>
          </div>
        </div>
        <div className="right">
          <Accordion items={accordionItems} />
        </div>
      </div>
    </div>
  );
};

export default AskQuestions;
