import Accordion from '@/components/accordion/Accordion';

import './questions.css';

interface Props {
  contactBtn: (value: unknown) => void;
}

const AskQuestions: React.FC<Props> = ({ contactBtn }) => {
  const accordionItems = [
    {
      title: 'How do I sign up for the evaluator app ?',
      content:
        'Signing up is easy! Simply download the app from the App Store, Google Play, or access it via the web. Create your profile by entering basic details, and you’ll be ready to start evaluating your skills in minutes.',
    },
    {
      title: 'Can I use the app on both mobile and web ?',
      content:
        'Yes, the app is available on both Android and iOS platforms, as well as through a web application.',
    },
    {
      title: 'What should I do if I encounter a problem in the app ?',
      content:
        'You can reach out to our support team through the "contact" section on the app or web, another option is to email us at [support@techwingsglobal.com].',
    },
    {
      title: 'Can I retake an evaluation if I’m not satisfied with my score ?',
      content:
        'Yes, each user has a maximum of 3 trials to retake an evaluation after which a recommendation is made to participate in the Skill-gap Programme.',
    },
    {
      title: 'Can I request a new feature ?',
      content:
        'Absolutely! We welcome user feedback. You can request new features through the "Feedback" section in the app.',
    },
    {
      title: 'How do I reset my password ?',
      content:
        'To reset your password, go to the login screen, click "Forgot Password," and follow the instructions sent to your registered email address.',
    },
    {
      title: 'How do I view completed evaluations ?',
      content:
        'Completed evaluations are stored in the "History" section, where you can review and analyze the results.',
    },
    {
      title: 'What happens if I delete my account ?',
      content:
        'Deleting your account will permanently remove all your data. Be sure to take note of any important data before proceeding.',
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
          <div
            className="ask_question_contact_me_container"
            onClick={contactBtn}
          >
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
