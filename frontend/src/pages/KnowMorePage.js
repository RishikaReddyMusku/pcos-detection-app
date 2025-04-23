import React from 'react';
import '../styles/KnowMorePage.css';
import bg from '../assets/simplepinkbg.jpg';

const KnowMorePage = () => {
  return (
    <div
      className="knowmore-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="page-title">Learn More About PCOS</h1>

      <div className="info-card">
        <h2> What is PCOS?</h2>
        <p>
          Polycystic Ovary Syndrome (PCOS) is a complex hormonal condition that affects individuals with ovaries, typically during their reproductive years. It causes the ovaries to produce excessive androgens (male hormones), leading to irregular or missed periods, excess facial/body hair, and difficulty in conceiving.
        </p>
        <p>
          It is one of the most common causes of female infertility and may also lead to long-term health problems if not managed properly.
        </p>
      </div>

      <div className="info-card">
        <h2> Causes</h2>
        <ul>
          <li><strong>Hormonal Imbalance:</strong> Overproduction of androgens interferes with ovulation.</li>
          <li><strong>Insulin Resistance:</strong> Most women with PCOS have insulin resistance, increasing the risk of type 2 diabetes.</li>
          <li><strong>Genetics:</strong> PCOS tends to run in families, indicating a hereditary component.</li>
          <li><strong>Inflammation:</strong> Higher levels of inflammation are often seen in women with PCOS.</li>
        </ul>
      </div>

      <div className="info-card">
        <h2> Health Risks</h2>
        <ul>
          <li>Type 2 Diabetes due to insulin resistance.</li>
          <li>High blood pressure and cholesterol.</li>
          <li>Endometrial cancer due to irregular menstruation.</li>
          <li>Infertility and complications during pregnancy.</li>
          <li>Depression, anxiety, and low self-esteem due to physical symptoms.</li>
        </ul>
      </div>

      <div className="info-card">
        <h2> Management & Treatment</h2>
        <ul>
          <li> <strong>Lifestyle Changes:</strong> Healthy diet, weight loss, and regular exercise significantly improve symptoms.</li>
          <li> <strong>Medications:</strong> Birth control pills regulate periods and reduce androgen levels. Metformin improves insulin sensitivity.</li>
          <li> <strong>Fertility Treatments:</strong> Clomiphene and letrozole help stimulate ovulation.</li>
          <li> <strong>Mental Wellness:</strong> Therapy, stress management, and support groups can be helpful.</li>
        </ul>
      </div>
    </div>
  );
};

export default KnowMorePage;
