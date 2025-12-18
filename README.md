# AI Powered Email Assistant

A chrome extension which uses Gemini API to help quickly reply to mails. Designed to increase productivity and efficiency in day to day work.

## Demo

User can use the AI reply button to quickly generate an appropriate reply for the mail.

![firstlook](https://github.com/manu-822/Email-Writer/blob/main/email-writer-images/first%20look.png)

You also have the option to select the tone of the reply whether you want it to sound professional, friendly or casual.
User can select the tone right alongside the reply button by just clicking on it. 

![tone-selection](https://github.com/manu-822/Email-Writer/blob/main/email-writer-images/tone%20selection.png)

A generated reply looks something like this. 

![friendly-reply](https://github.com/manu-822/Email-Writer/blob/main/email-writer-images/friendly%20reply.png)

## Webpage

A simple react based webpage is also there if one needs to generate reply for some other platforms. 

![webpage](https://github.com/manu-822/Email-Writer/blob/main/email-writer-images/react-webpage.png)

The webpage also offers the similar tone selection option. 

![webpage-tone](https://github.com/manu-822/Email-Writer/blob/main/email-writer-images/webpage-tone.png)

All one needs to do is just paste the required message in the textbox, select the tone and click on generate, then they can directly copy the reply to their clipboard using the button.

![webpage-reply](https://github.com/manu-822/Email-Writer/blob/main/email-writer-images/wepage-casual-reply.png)

## Key Features

* **Native Integration:** Looks and feels like a part of Gmail thanks to Material UI.
* **Contextual Intelligence:** Understands the email you are replying to, no manual copy-pasting required.
* **Multiple Personas:** Switch between Professional (interviews/work), Friendly (colleagues), and Casual (friends).
* **One-Click Copy:** Standalone web app includes a "Copy to Clipboard" feature for use on Outlook or other platforms.


## How It Works

```USER INTERFACE           LOGIC BRIDGE            AI ENGINE
   +--------------+       +----------------+      +--------------+
   |   Gmail UI   | ----> | Spring Boot    | ---> |  Google      |
   |  (Extension) | <---- | Backend (Java) | <--- |  Gemini API  |
   +--------------+       +----------------+      +--------------+
          |                       |
          +--- Context Scraping --+
          +--- Tone Selection ----+
```
This project connects the Gmail interface to the Gemini AI model using a seamless three-tier architecture.

### 1. UI Injection
The extension uses a **Chrome Content Script** to monitor the Gmail DOM. It identifies when the "Reply" button is clicked and then injects a custom button styled with **Material UI** to ensure a native look and feel.

### 2. Context Capture
When the AI Reply button is clicked, the extension reads the text of the current email thread. This context, along with your chosen tone, is sent via a REST API to our **Spring Boot** backend.

### 3. AI Processing (Gemini)
In the backend, the email context is converted into a prompt and sent to **Google Gemini API** to generate a relevant response.

### 4. Smart Reply Injection
The generated response is sent back to the extension, which instantly populates the Gmail reply text area, allowing you to review and send in seconds.

--- 

##  Tech Stack

**Frontend:**
* **React.js** (Functional Components, Hooks)
* **Material UI (MUI)** (For the Gmail-native UI feel)
* **Vite** (Build tool)
* **Chrome Extension API** (Content Scripts, UI Injection)

**Backend:**
* **Java 17+** & **Spring Boot 3.4.10**
* **Spring Web** (REST APIs)
* **Google Gemini API** (AI Content Generation)


## Installation

### Backend Setup (Spring Boot)
The backend manages communication with the Google Gemini API.

#### Open your IDE: 
- Import the email-writer-sb folder into your IDE ( Eclipse, IntelliJ, VSCode) 

#### Environment Configuration:

- In the root of the backend folder, create a file named .env.
- Copy the contents from .env.example into .env.
- Add your specific credentials:
 
`GEMINI_API_KEY = your_api_key_here` 

`GEMINI_API_URL = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent` 


You can get your API key from [Google AI Studio](https://aistudio.google.com/?authuser=1) 

#### Install Dependencies & Run: 

- Open your terminal/command prompt in the backend folder and run:

```
./mvnw clean install 
./mvnw spring-boot:run
```
(Or run your project as a java application) 

The backend server will start at `http://localhost:8080`

---

### Frontend & Web App Setup (React)
This handles the standalone web interface.

#### Open your IDE: 
- Import the email-writer-react folder into your IDE.

#### Open the Terminal: 
- and run following commands. 

```bash
npm install
npm run dev
```

This will load the webpage for the same. 

The react app usually runs on `http://localhost:5173`

---

### Chrome Extension Integration 

### Method 1: Load Unpacked Extension (Developer Mode)
1.  Download the Extension
    - Extract the files if downloaded as ZIP

2. Open Chrome Extensions Page
    - Open Google Chrome
    - Navigate to chrome://extensions/
    - Or go to Menu → More Tools → Extensions

3. Enable Developer Mode
    - Toggle the "Developer mode" switch in the top-right corner

4. Load the Extension
    - Click "Load unpacked" button
    - Select the folder containing the extension files
    - The extension should now appear in your extensions list

5. Pin the Extension (Optional)
    - Click the puzzle piece icon in the Chrome toolbar
    - Find "Email Writer Assistant" and click the pin icon
    - The extension icon will now be visible in your toolbar

### Method 2: Chrome Web Store (Future)
- This extension will be available on the Chrome Web Store soon.

---

### Contributing
Feel free to contribute to this project by:
- Reporting bugs or issues
- Suggesting new features
- Improving the code

Thanks for reading this far (～￣▽￣)～
