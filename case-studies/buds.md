# BUDS — Friendly Creative AI Chatbot

## The Problem

Traditional mobile chatbots use rigid, robotic conversation flows that fail to validate emotional nuance. Users experiencing stress or looking for creative brainstorming often disengage when faced with robotic responses. Additionally, standard chat applications automatically persist and sync all chat logs to cloud databases, which violates user privacy when discussing personal topics.

---

## What I Built

I built **BUDS**, an interactive Kotlin Android application designed as an empathetic conversational companion. The application connects multiple LLM providers (Gemini, Claude, ChatGPT) through a unified Android interface, features Text-to-Speech capabilities for spoken interaction, and supports customizable theme preferences while ensuring chats remain session-bound and private.

---

## My Decisions

- **Android Studio & Kotlin**: Selected Kotlin for native Android performance, smooth lifecycle management, and clean asynchronous coroutine handling.
- **Multi-LLM Architecture**: Integrated API connectors for Google Gemini, OpenAI ChatGPT, and Anthropic Claude so users can compare conversational styles.
- **Privacy First (No Auto-Save)**: Implemented ephemeral session state so sensitive chats are kept on-device and erased upon exiting, protecting personal boundaries.
- **Text-to-Speech (TTS)**: Integrated Android native TTS engines for audible responses.

---

## How AI Helped

- **Prompt Engineering**: Engineered system prompts for empathetic, respectful, and emotionally neutral boundaries to prevent harmful advice.
- **Vibe Coding**: Used AI coding assistants to quickly scaffold Kotlin activity lifecycles and layout XML bindings.

---

## Outcome

- **Functional Android APK**: Successfully compiled and deployed Android APK targeting Android 36.
- **Multi-Mode Support**: Smooth switching between Gemini, Claude, and ChatGPT backend APIs.

---

## Evidence

- **Status**: AVAILABLE / NEEDS SCREENSHOT
- **Source Repository**: [github.com/The-tech17/Buds-AI](https://github.com/The-tech17/Buds-AI)
- **APK Target**: Android 36 Build Output
- **Required Placeholder**: `[TO ADD: Screenshot of Buds Android app active conversational screen on Android device]`

---

## What I Learned

- Handling native Android coroutines and asynchronous network requests to third-party LLM APIs.
- Structuring strict system prompts to maintain safe conversational guardrails.

---

## Links

- **GitHub Repository**: [github.com/The-tech17/Buds-AI](https://github.com/The-tech17/Buds-AI)
- **Live Demo / APK Download**: [TO ADD: Direct link to downloadable Buds APK binary]
