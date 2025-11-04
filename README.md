# Intelligent Worker Profiling Tool

This is an AI-powered tool that helps managers understand team performance by analyzing work logs. It can automatically create worker profiles, generate performance reports, and even create sample data.

## How to Run This App on Your Computer (for Beginners)

Follow these instructions carefully to get the application working on your personal computer. No programming experience is needed!

### Step 1: Install the Engine (Node.js)

This application needs a special background program called **Node.js** to run. Think of it as the engine for the app.

1.  Go to the official Node.js website: [https://nodejs.org/](https://nodejs.org/)
2.  You will see two download options. Click the one that says **"LTS"** (which stands for Long-Term Support). This is the most stable version.
3.  Once downloaded, open the installer file and follow the on-screen instructions, accepting the default options.

### Step 2: Get the App's Code

1.  Download all the files for this project as a ZIP file.
2.  Find the downloaded ZIP file on your computer (usually in your "Downloads" folder).
3.  **Unzip** or **Extract** the file. This will create a new folder with all the project files inside. Move this folder to a convenient location, like your Desktop.

### Step 3: Get Your Secret Key (from Google AI)

The app's "intelligence" comes from a Google service, which requires a special password called an **API Key**.

1.  Go to the Google AI Studio website to get your key: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2.  Click the **"Create API key"** button.
3.  A new key will appear. It's a long string of letters and numbers. Click the button next to it to **copy the key**.
4.  **Important:** Keep this key private, like a password.

### Step 4: Add Your Secret Key to the App

Now you need to give that secret key to the app so it can work.

1.  Open the project folder that you unzipped in Step 2.
2.  You need to create a new, special file here.
    -   In the folder, create a new file named exactly `.env.local`
    -   Open this new file with a basic text editor (like Notepad on Windows or TextEdit on Mac).
    -   Type the following line into the file, pasting the secret key you copied in Step 3:
        ```
        API_KEY=YOUR_API_KEY_HERE
        ```
        (Replace `YOUR_API_KEY_HERE` with your actual key.)
    -   Save and close the file.

### Step 5: Start the App!

This is the final step, where you turn the app on. This requires using a command-line window.

1.  **Open the command-line tool:**
    *   **On Windows:** Press the Windows key, type `cmd`, and hit Enter. This opens the "Command Prompt".
    *   **On Mac:** Open Spotlight (Cmd + Space), type `Terminal`, and hit Enter.

2.  **Navigate to the app's folder:**
    *   Type `cd` followed by a space.
    *   Drag the app's folder from your Desktop (or wherever you put it) and drop it directly into the command-line window. The folder's path will appear.
    *   Press **Enter**. You are now "inside" the app's folder.

3.  **Install the app's parts:**
    *   Type the following command and press **Enter**:
        ```bash
        npm install
        ```
    *   Wait for a minute or two. This command downloads all the necessary components for the app.

4.  **Run the app:**
    *   Now, type this final command and press **Enter**:
        ```bash
        npm run dev
        ```
    *   The command line will show some text, including a local web address, which should look something like: `http://localhost:5173`

5.  **View the app:**
    *   Open your web browser (like Chrome, Firefox, or Safari).
    *   Copy the `http://localhost...` address from the command line and paste it into your browser's address bar.
    *   The Intelligent Worker Profiling Tool should now be running in your browser!

To stop the app, simply close the command-line window (`cmd` or `Terminal`).
