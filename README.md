# Intelligent Worker Profiling Tool

An AI-powered system to analyze task logs, generate worker profiles, create performance reports, and simulate data for worker evaluation and bonus allocation. This application is built using React, Tailwind CSS, and the Google Gemini API.

## Run Locally

Follow these steps to get the project running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v18.0 or later recommended)
-   npm (comes bundled with Node.js)

### Setup Instructions

1.  **Clone the repository** (if applicable) or download the source code.

2.  **Install dependencies:**
    Navigate to the project's root directory in your terminal and run the following command to install the necessary packages:
    ```bash
    npm install
    ```

3.  **Set up your Gemini API Key:**
    The application requires a Google Gemini API key to interact with the AI model.

    -   In the root of the project, create a new file named `.env.local`.
    -   Open the `.env.local` file and add your API key like this, replacing `YOUR_API_KEY_HERE` with your actual key:
        ```
        API_KEY=YOUR_API_KEY_HERE
        ```
    *Note: This file is typically ignored by version control to keep your API key private.*

4.  **Run the application:**
    After setting up the dependencies and API key, you can start the local development server:
    ```bash
    npm run dev
    ```
    This command will start the application. Open your web browser and navigate to the URL shown in the terminal (usually a `http://localhost:` address) to see the application running.
