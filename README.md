### **📌 Pinpoint (IN PROGRESS:)**

📍 **Pinpoint** is a web application that helps U.S. citizens **engage with their elected government officials** by:

- Allowing users to find **local, state, and federal representatives** based on their location.
- Displaying officials in a **D3.js-powered visualization** (Temporal force-directed graph or Bubble chart).
- Providing a way to **contact officials** via email (with AI-assisted drafting and NSFW moderation).
- Encouraging civic engagement and accountability.

---

## **🚀 Features**

✅ **Find Elected Officials** – Search by **city, state, zip code, or full address**.  
✅ **D3.js Visualization** – See officials in an interactive graph.  
✅ **Contact Officials** – Send emails (or call if email is unavailable).  
✅ **AI-Assisted Messaging** – Draft professional emails with an AI assistant.  
✅ **NSFW Content Moderation** – Ensures messages remain appropriate.

---

## **🛠 Tech Stack**

### **Frontend (React + Vite)**

- **React** – Component-based UI framework.
- **Vite** – Fast bundler & development server.
- **D3.js** – Visualization library for graph rendering.
- **Zustand** – State management.
- **Tailwind CSS** – Styling framework.

### **Backend (Node.js + TypeScript)**

- **Express.js** – Server framework.
- **Google Civic API** – Retrieves elected officials' data.
- **Nodemailer** – Sends emails.
- **OpenAI API** – AI-assisted email drafting.
- **NSFW Moderation API** – Ensures message appropriateness.

---

## **📂 Project Structure**

```
pinpoint/
│── frontend/ (React + Vite)
│   ├── src/
│   │   ├── assets/ (static images/icons)
│   │   ├── components/ (reusable UI components)
│   │   ├── pages/ (views like Home, Officials, Contact)
│   │   ├── services/ (API calls)
│   │   ├── utils/ (helper functions)
│   │   ├── App.tsx (main app)
│── backend/ (Node.js + Express + TypeScript)
│   ├── controllers/ (handles API logic)
│   ├── routes/ (API endpoints)
│   ├── services/ (external API & helper functions)
│   ├── index.ts (main backend entry)
│── package.json (dependencies)
│── README.md (this file)
```

---

## **🔧 Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/pinpoint.git
cd pinpoint
```

### **2️⃣ Install Dependencies**

#### **Backend**

```sh
cd backend
npm install
```

#### **Frontend**

```sh
cd ../frontend
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in both **frontend** and **backend**:

#### **Backend (`backend/.env`)**

```env
GOOGLE_CIVIC_API_KEY=your_google_api_key
OPENAI_API_KEY=your_openai_api_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
PORT=5001
```

#### **Frontend (`frontend/.env`)**

```env
VITE_API_BASE_URL=http://localhost:5001
```

### **4️⃣ Start the Servers**

#### **Backend**

```sh
cd backend
npm run dev
```

#### **Frontend**

```sh
cd ../frontend
npm run dev
```

---

## **🖥️ Usage**

1️⃣ Open **`http://localhost:5173`** in your browser.  
2️⃣ Enter a **city, state, or zip code** to find your officials.  
3️⃣ Click on an official **(D3 visualization)** to view details.  
4️⃣ Use the **contact form** to email them, with AI assistance if needed.

---

## **📡 API Endpoints**

### **1️⃣ Officials API**

📌 **Fetch elected officials based on an address**  
**Endpoint:** `POST /api/officials`  
**Request Body:**

```json
{
  "address": "New York, NY"
}
```

**Response:**

```json
{
  "officials": [
    { "name": "John Doe", "office": "Mayor", "party": "Independent" }
  ]
}
```

### **2️⃣ Send Email**

📌 **Send a message to an elected official**  
**Endpoint:** `POST /api/email/send`  
**Request Body:**

```json
{
  "toEmail": "official@example.com",
  "fromEmail": "user@example.com",
  "message": "I want to discuss local policies."
}
```

### **3️⃣ AI-Assisted Message Drafting**

📌 **Generate a professional email draft**  
**Endpoint:** `POST /api/chatbot/draft`  
**Request Body:**

```json
{
  "prompt": "Draft an email about climate change policies."
}
```

---

## **🛠 Deployment**

### **Backend (Railway/Render)**

```sh
git push origin main
```

Configure **environment variables** in **Railway/Render settings**.

### **Frontend (Vercel/Netlify)**

```sh
npm run build
```

Deploy using **Vercel or Netlify**, ensuring environment variables are set.

---

## **👨‍💻 Contributors**

- Open for contributors! **Submit a pull request!** 🚀

---

## **📜 License**

MIT License. **Feel free to modify and use!** 🏛️
