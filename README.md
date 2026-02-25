<h1 align="center">🌐 IoT Device Simulator & Analytics Dashboard</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs"/>
  <img src="https://img.shields.io/badge/React-19-%2361DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Prisma-ORM-%232D3748?style=for-the-badge&logo=prisma"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-%23336791?style=for-the-badge&logo=postgresql"/>
  <img src="https://img.shields.io/badge/Clerk-Authentication-%236C47FF?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/IoT-Data%20Simulation-%2300C853?style=for-the-badge"/>
</p>

<hr/>

<h2>📌 Problem Motivation</h2>

<p>
IoT development often requires physical hardware for testing device communication,
sensor behavior, and data visualization workflows. This introduces cost,
scalability limitations, and deployment delays.

This project provides a configurable IoT device simulation platform that
generates real-time sensor data and visualizes it through a secure,
modern web dashboard — eliminating the need for physical hardware during development.
</p>

---

<h2>🧠 System Overview</h2>

<p>
A full-stack IoT simulation platform that allows authenticated users to create virtual projects,
configure devices and sensors, generate dynamic data streams, and visualize
analytics in real-time.

The system replicates real-world IoT infrastructure behavior using a scalable,
production-ready architecture with secure user-based access control.
</p>

---

<h2>🏗 System Architecture</h2>

```
User (Authenticated via Clerk)
        │
        ▼
Next.js Frontend (React 19)
        │
        ▼
API Routes (Protected)
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL Database
        │
        ▼
Sensor Data Simulation Engine
```

📌 Replace this section later with an actual diagram image if available:

```
![Architecture Diagram](docs/architecture.png)
```

---

<h2>🛠 Tech Stack</h2>

* ⚛️ Frontend: Next.js 15 (App Router)
* ⚛️ React 19
* 🎨 Tailwind CSS
* 📊 Recharts (Data Visualization)
* 🛢 Prisma ORM
* 🐘 PostgreSQL
* 🔐 Clerk Authentication
* 🚀 Turbopack (Development)

---

<h2>🔐 Authentication (Clerk Integration)</h2>

This project uses **Clerk** for secure authentication and user management.

### Features:

* Email / Password Authentication
* Secure Session Handling
* Protected Routes
* User-specific Project Access
* Middleware-based route protection
* Scalable auth infrastructure

### How It Works:

* Users must sign in to access the dashboard.
* Each project is associated with a specific authenticated user.
* Backend APIs validate user identity before data access.
* Unauthorized access is automatically restricted.

---

<h2>⚙️ Core Features</h2>

### 🏗 Project & Device Management

* Create multiple IoT projects
* Add and configure virtual devices
* Select specific sensors per device

### 🌡 Sensor Simulation

* Temperature
* Humidity
* Pressure
* Motion
* Custom numeric sensors
* Randomized + rule-based data generation

### 📊 Real-Time Dashboard

* Interactive charts
* Sensor-wise filtering
* Device-specific views
* Historical data tracking

### 🔄 Persistent Data Storage

* Timestamped sensor logs
* Structured relational database schema
* Scalable analytics-ready design

---

<h2>📂 Folder Structure (Simplified)</h2>

```
/app
  /api
  /dashboard
  /projects
/prisma
  schema.prisma
/components
/lib
/middleware.ts
```

---

<h2>🔌 Installation & Setup</h2>

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/iot-device-simulator.git
cd iot-device-simulator
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL="your_postgresql_connection_string"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up
```

---

### 4️⃣ Setup Database

```
npx prisma migrate dev
npx prisma generate
```

---

### 5️⃣ Run Development Server

```
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

<h2>📊 Example Use Cases</h2>

* IoT architecture prototyping
* Academic research simulations
* Secure multi-user IoT dashboards
* Sensor data testing before hardware deployment
* Cloud pipeline validation

---

<h2>🎥 Demo</h2>

Add visuals here:

```
![Dashboard Demo](docs/dashboard.gif)
```

or

```
![Project Screenshot](docs/project.png)
```

---

<h2>📈 Future Enhancements</h2>

* MQTT integration
* WebSocket real-time streaming
* Edge device emulator
* CSV / API export functionality
* AI-based anomaly detection
* Role-based access control (RBAC)
* Cloud deployment pipeline

---

<h2>🏅 Key Takeaways</h2>

* Secure full-stack IoT architecture simulation
* Real-time data generation & visualization
* User-authenticated multi-project system
* Modular device-sensor modeling
* Production-ready modern tech stack

---

<h2>👩‍💻 Author</h2>

**Bhoomika Saxena**  
B.Tech — Computer Science (IoT & Intelligent Systems)  
Full Stack IoT Systems | Embedded AI | Applied Simulation Platforms  

---

<h2>📜 License</h2>

This project is shared for educational, research, and demonstration purposes.
