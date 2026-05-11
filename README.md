# Devix 🚀

[![Built with React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)](https://reactjs.org/)
[![Backend Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)](https://nodejs.org/)
[![Database PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Prisma-indigo)](https://www.postgresql.org/)
[![Real-time Socket.io](https://img.shields.io/badge/Real--time-Socket.io-black)](https://socket.io/)
[![Sandboxing Docker](https://img.shields.io/badge/Sandboxing-Docker-blue)](https://www.docker.com/)

Devix is a modern, cloud-native development playground that brings the power of a local IDE to your browser. Build, run, and collaborate on code instantly without any local setup.

---

## ✨ Key Features

- 🏎️ **Instant Sandboxes**: Spin up a fully-configured React environment.
- 💻 **Monaco Editor**: A high-performance code editor powered by the same engine as VS Code.
- 🐚 **Integrated Terminal**: Real bash access inside an isolated Linux container.
- 📂 **Live File Tree**: Real-time file system synchronization between the browser and the sandbox.
- 🤝 **Collaborative Editing**: Pair program in real-time with peers.
- 🌐 **Live Preview**: See your changes instantly with an integrated browser preview.
- ☁️ **Cloud Persistence**: Automatic synchronization to S3-compatible storage for your projects.

---

## 🏗️ Architecture

Devix uses a distributed architecture designed for low-latency and security:

- **Frontend**: A sleek, responsive React SPA using **Zustand** for state and **Framer Motion** for premium animations.
- **Backend**: A Node.js/Express server that manages project lifecycles and orchestrates Docker containers.
- **Sandboxing**: Every project runs in a dedicated, isolated Docker container with resource limits and restricted network access.
- **Real-time Engine**: **Socket.IO** handles terminal I/O and file system operations with sub-millisecond latency.
- **Hot Cache**: Active projects are mirrored on the host's high-speed disk for maximum performance, then reaped and persisted to **AWS S3** when idle.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS + Tailwind-like utility classes
- **Editor**: Monaco Editor
- **Terminal**: xterm.js
- **Animations**: Framer Motion
- **State**: Zustand

### Backend
- **Runtime**: Node.js (TypeScript)
- **Framework**: Express
- **ORM**: Prisma (PostgreSQL)
- **Containerization**: Docker (Dockerode)
- **Real-time**: Socket.IO
- **Storage**: AWS S3 (Hot/Cold sync)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (Recommended)
- [Docker](https://www.docker.com/) (Must be running on the host)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/devix.git
   cd devix
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pnpm install
   cp .env.example .env # Update with your DB and S3 credentials
   npx prisma migrate dev # Run database migrations
   pnpm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   pnpm install
   cp .env.example .env # Update VITE_API_URL and VITE_SOCKET_URL
   pnpm run dev
   ```

4. **Docker Sandbox**:
   The backend will automatically pull/build the `devix-sandbox` image on first run.

---

## 🛡️ Security

- **Isolation**: All user code runs inside restricted Docker containers.
- **Path Sanitization**: Every file operation is validated to prevent directory traversal attacks.
- **Rate Limiting**: Integrated protection against API and project creation abuse.
- **Reaper Service**: Automatic cleanup of inactive containers and temporary files.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ for the developer community</p>
