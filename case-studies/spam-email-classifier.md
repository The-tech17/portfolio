# Spam Email Classifier

## The Problem

Traditional email spam filters classify incoming messages into binary buckets ("Spam" vs "Ham") without providing any rationale. Users receiving flagged messages cannot determine *why* a message was flagged, leading to distrust, overlooked legitimate emails (false positives), and vulnerability to subtle phishing attacks.

---

## What I Built

I developed a Python machine learning and prompt-reasoning web application deployed on Streamlit. The application performs real-time email content analysis, flags suspicious phishing patterns, and generates a concise, human-understandable explanation detailing the exact reasons behind the classification.

---

## My Decisions

- **Python & Streamlit**: Selected Streamlit for rapid web prototyping and real-time interactive user interface updates.
- **Explainable Classification**: Combined machine learning binary classification with LLM reasoning (Gemini API) to output actionable explanation points (e.g. suspicious urgency, mismatched link domain, fake sender header).
- **CLI Development**: Developed and debugged local parser logic using Windows Command Prompt and PowerShell before Streamlit packaging.

---

## How AI Helped

- **Reasoning Prompts**: Designed zero-shot classification prompts that force the AI model to cite specific sentences from the email body as proof of spam intent.
- **Code Refactoring**: Accelerated string manipulation and regex cleaning routines via vibe coding.

---

## Outcome

- **Live Streamlit Deployment**: Deployed and operational at `https://ai-spam-classifier-ceqkrdomyfjzszkcktbadu.streamlit.app/`.
- **Explainable Feedback**: Reduces user uncertainty by breaking down deceptive messaging signatures.

---

## Evidence

- **Status**: AVAILABLE & DEPLOYED
- **Source Repository**: [github.com/The-tech17/AI-Spam-Classifier](https://github.com/The-tech17/AI-Spam-Classifier)
- **Live URL**: [ai-spam-classifier.streamlit.app](https://ai-spam-classifier-ceqkrdomyfjzszkcktbadu.streamlit.app/)
- **Screenshot**: `assets/projects/spam-blocker.png`

---

## What I Learned

- Designing classification pipelines that prioritize user trust over black-box accuracy metrics.
- Structuring prompt outputs into predictable JSON schemas for web rendering.

---

## Links

- **GitHub Repository**: [github.com/The-tech17/AI-Spam-Classifier](https://github.com/The-tech17/AI-Spam-Classifier)
- **Live Demo**: [ai-spam-classifier-ceqkrdomyfjzszkcktbadu.streamlit.app](https://ai-spam-classifier-ceqkrdomyfjzszkcktbadu.streamlit.app/)
