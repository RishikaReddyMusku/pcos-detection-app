import React from 'react';
import '../styles/Articlespage.css';
import ribbonImage from '../assets/teal-ribbon.png';

const Articles = () => {
  return (
    <div className="articles-wrapper container-fluid position-relative">
      {/* Ribbons */}
      <img src={ribbonImage} alt="Teal Ribbon" className="ribbon-top-left img-fluid d-none d-md-block" />
      <img src={ribbonImage} alt="Teal Ribbon" className="ribbon-bottom-right img-fluid d-none d-md-block" />

      <div className="articles-header text-center">
        <h1>PCOS Research & Resources</h1>
        <p>
          Dive into reliable studies, medical insights, and awareness content about PCOS. These resources are handpicked to support your journey to better understanding and managing PCOS.
        </p>
      </div>

      <div className="articles-container row">
        {/* Section 1 */}
        <div className="col-12 mb-4">
          <div className="article-box">
            <h2>📘 In-depth Articles</h2>

            <div className="article-link">
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3270894/" target="_blank" rel="noopener noreferrer">
                NIH: Current Understanding of PCOS
              </a>
              <p>Explains hormone levels, metabolism, and how symptoms vary in PCOS patients.</p>
            </div>

            <div className="article-link">
              <a href="https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome" target="_blank" rel="noopener noreferrer">
                Women's Health: PCOS Overview
              </a>
              <p>Government-supported guide covering symptoms, causes, and treatment options.</p>
            </div>

            <div className="article-link">
              <a href="https://www.sciencedirect.com/topics/medicine-and-dentistry/polycystic-ovary-syndrome" target="_blank" rel="noopener noreferrer">
                ScienceDirect: Medical Publications
              </a>
              <p>Scientific research and case studies on diagnosis, genetics, and treatments.</p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="col-12 mb-4">
          <div className="article-box">
            <h2>🧬 Hormonal Health & Treatment</h2>

            <div className="article-link">
              <a href="https://www.endocrine.org/patient-engagement/endocrine-library/pcos" target="_blank" rel="noopener noreferrer">
                Endocrine Society: PCOS Resources
              </a>
              <p>Focuses on insulin resistance, hormone therapies, and personalized treatments.</p>
            </div>

            <div className="article-link">
              <a href="https://journals.sagepub.com/doi/full/10.1177/20533691231173841" target="_blank" rel="noopener noreferrer">
                SAGE Journals: Latest Research
              </a>
              <p>Recent breakthroughs in PCOS diagnosis using AI and reproductive medicine.</p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="col-12 mb-4">
          <div className="article-box">
            <h2>🎥 Educational Videos & Webinars</h2>

            <div className="article-link">
              <a href="https://www.youtube.com/watch?v=XY7fybtt2Z0" target="_blank" rel="noopener noreferrer">
                PCOS Explained by a Gynecologist
              </a>
              <p>A simple, accurate video lecture that clears myths and gives lifestyle tips.</p>
            </div>

            <div className="article-link">
              <a href="https://www.youtube.com/watch?v=5qwMIJbMd-g" target="_blank" rel="noopener noreferrer">
                TEDx Talk: Managing PCOS Naturally
              </a>
              <p>Powerful storytelling and science on real-life PCOS journeys and coping strategies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
