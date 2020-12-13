Clone (not fork) this repo and run `npm install` then run `npm start` to start.

Render the video found in the public folder on the page. Make it as pretty (or as ugly) as you like. In the **public/images** folder you will find three images that should render in the following ways during the video playing. Timings are in reference to the current time of the video. Using a **native html5 video component** is preferred. You can also migrate the project to use typescript if you'd prefer (or create a separate react repository and import the assets).

Images should render as follows:

**Image 1**:

- shows at **3500ms**
- shows for **5000ms** (i.e. the image is visible from 3500ms-8500ms)
- shows in **top left** of the video
- \*\*shows up **once** (i.e. when rewinding it should not show up again)

**Image 2:**

- shows at **6000ms**
- shows for **2000ms** (i.e. 6000ms-8000ms)
- shows in **top right** of the video
- \*\*shows up **twice**

**Image 3:**

- shows at **7000ms**
- shows for **1500ms** (i.e. 7000ms-8500ms)
- shows up in **centre** of the video
- \*\*shows up **three** times

\*\* bonus objective

Additional tasks:

- Colour the background
- Change the colour of the background when hovering over a specific element (such as the video).

Feel free to ask any questions, as well as to have fun and expand on the specification as much as you like (e.g. custom controls, fullscreen toggle button, a button that runs away from your cursor).

If you're struggling, take notes about areas you are having trouble with, proposed solutions you have considered etc.

Please create a new git repository with your project and send us a link to it. Alongside this, please provide a screen recorded video or text-documented walkthrough and overview of your development process where you describe the process behind building the app and run through any thoughts you had, decisions you made, concerns that came up etc.
