# Issue Tracker App

This is an Issue Tracker application built with **Next.js**, **MySQL**, and **Prisma**. It allows users to manage and track issues with functionalities like login/logout, issue categorization, and visual summaries (charts) for each user. The app supports both **Light** and **Dark Modes**.

## Features
- **User Authentication:** Login and logout functionality.
- **Dashboard:** Summary of issues, with pie chart, line chart, and bar chart for visualization.
- **Issue Management:** View, create, edit, and delete issues.
- **Categorization:** Issues are categorized into OPEN, IN_PROGRESS, and CLOSED.
- **Dark Mode:** Switch between light and dark modes in the UI.

## Getting Started

### Issue Tracker Demo Video

https://github.com/user-attachments/assets/bcc08809-e4eb-44f5-be87-fdd8e6bf7bcb

### Prerequisites

Make sure you have the following installed on your system:

- **[Node.js](https://nodejs.org)** (version 14 or later)
- **[MySQL](https://www.mysql.com/)** (version 5.7 or later)
- **[Prisma](https://www.prisma.io/)**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/furqanahmad03/nextjs-issue-tracker.git
   ```
   ```bash
   cd nextjs-issue-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up the MySQL database**:
   - Make sure you have a MySQL server running.
   - Create a new database for the project.
   - Update the `DATABASE_URL` in your `.env` file with your database connection details.

   Example:
   ```bash
   DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

4. **Run Prisma migrations** to set up the database schema:
   ```bash
   npx prisma migrate dev
   # or
   yarn prisma migrate dev
   # or
   pnpm prisma migrate dev
   ```

## Running the Development Server

1. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

2. **Open your browser** and navigate to:
   ```bash
   http://localhost:3000
   ```

## Light/Dark Mode

The application supports both **light** and **dark modes**. You can switch between them using the toggle provided in the UI.

## Learn More

To learn more about Next.js, Prisma, and other technologies used in this project, take a look at the following resources:

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features and API.
- **[Prisma Documentation](https://www.prisma.io/docs)** - Learn about Prisma features and API.
- **[Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview)** - Learn about Radix UI components.

## Additional Instructions for Windows Users

If you are on **Windows**, ensure you have the correct setup for MySQL and environment variables:

1. **Install MySQL**:
   You can download and install MySQL from [MySQL's official website](https://dev.mysql.com/downloads/installer/). Follow the instructions to set up MySQL on your system.

2. **Set environment variables**:
   Ensure your `.env` file contains the correct paths for your MySQL setup. You might need to adjust the `DATABASE_URL` depending on your installation path and credentials.

## Additional Instructions for macOS Users

If you are on **macOS**, follow these additional steps to ensure proper setup:

1. **Install MySQL using Homebrew**:
   If you use Homebrew, you can install MySQL with the following command:
   ```bash
   brew install mysql
   ```

2. **Start MySQL server**:
   After installation, start the MySQL server:
   ```bash
   brew services start mysql
   ```

3. **Set environment variables**:
   Ensure your `.env` file contains the correct paths for your MySQL setup. Update the `DATABASE_URL` with the appropriate credentials.
