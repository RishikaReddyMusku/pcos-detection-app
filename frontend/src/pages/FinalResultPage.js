import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FinalResultPage.css';

const FinalResultPage = () => {
  const [content, setContent] = useState({
    title: '',
    message: '',
    suggestions: [],
  });

  useEffect(() => {
    const scanResult = localStorage.getItem('scanResult');
    const clinicalResult = localStorage.getItem('clinicalResult');

    if (scanResult !== null && clinicalResult !== null) {
      let title = '';
      let message = '';
      let suggestions = [];

      if (scanResult === '0' && clinicalResult === '1') {
        title = ' PCOS Detected';
        message = `Your ultrasound scan shows signs of polycystic ovaries, and your symptoms align with PCOS. 
This suggests a strong possibility of PCOS. Early identification is a positive step towards managing the condition. 
We encourage you to take action and learn more.`;

        suggestions = [
          {
            title: ' What is PCOS?',
            description:
              'Learn about what Polycystic Ovary Syndrome really is, its hormonal basis, and how it affects women’s health across ages.',
            link: '/know-more',
          },
          {
            title: ' PCOS Research Articles',
            description:
              'Explore curated scientific articles, health blogs, and expert opinions on living with PCOS and making informed decisions.',
            link: '/articles',
          },
        ];
      } else if (scanResult === '0' && clinicalResult === '0') {
        title = ' Scan Suggests PCOS Traits';
        message = `While your symptoms are currently mild or absent, your scan shows signs of polycystic ovarian structure. 
You may be in an early or non-symptomatic phase. It's important to stay proactive and informed.`;

        suggestions = [
          {
            title: ' Stay Informed',
            description:
              'Understand the early indicators and preventive lifestyle changes that can help reduce the risk of PCOS complications.',
            link: '/know-more',
          },
        ];
      } else if (scanResult === '1' && clinicalResult === '1') {
        title = ' Symptoms Present, But Scan is Clear';
        message = `You are experiencing symptoms commonly seen in PCOS, but your scan does not show typical polycystic ovaries. 
Since PCOS can manifest differently in each individual,
We recommend that you consult a medical professional for a comprehensive diagnosis.`;

        suggestions = [
          {
            title: ' Learn About PCOS Without Cysts',
            description:
              'Some women have PCOS symptoms without the typical scan results. Learn about how this type is diagnosed and managed.',
            link: '/know-more',
          },
        ];
      } else if (scanResult === '1' && clinicalResult === '0') {
        title = ' No PCOS Detected';
        message = `Great news! Your scan and clinical symptoms do not suggest PCOS at this time. 
You're in a healthy state — continue maintaining a balanced lifestyle and regular checkups.`;

        suggestions = [
          {
            title: ' Women’s Wellness Tips',
            description:
              'Even in good health, staying informed about hormones, nutrition, and stress is key to long-term well-being.',
            link: '/articles',
          },
        ];
      }

      setContent({ title, message, suggestions });
    } else {
      setContent({
        title: '❗ Incomplete Evaluation',
        message: 'Please submit both your scan and clinical answers to view a complete result.',
        suggestions: [],
      });
    }
  }, []);

  return (
    <div className="final-result-wrapper">
      <h2>🧬  PCOS Screening Results</h2>
      <h3 className="result-title">{content.title}</h3>
      <p className="result-message">{content.message}</p>

      {content.suggestions.length > 0 && (
        <div className="info-sections">
          <h4>Want to Learn More?</h4>
          <ul className="suggestion-list">
            {content.suggestions.map((item, index) => (
              <li key={index}>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <Link className="info-link" to={item.link}>
                  Learn more →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FinalResultPage;
