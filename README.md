# I MACX – Multi Brand Mobile Repairing Centre

This is a premium, dark-blue themed static website for **I MACX**, a mobile repair centre based in Shakthinagar, Mangalore.

## Features
- **Modern Design**: Dark-blue theme with glassmorphism and smooth animations.
- **Dynamic Gallery**: Automatically loads and sorts images from the `/public/gallery` folder using the GitHub API.
- **Mobile Optimized**: Fully responsive with a sticky bottom CTA bar on mobile devices.
- **SEO Ready**: Optimized with meta tags, Open Graph, JSON-LD Schema, sitemap, and robots.txt.
- **Fast Performance**: Lightweight vanilla HTML/CSS/JS with no dependencies.

## Project Structure
- `index.html`: Main structure and SEO tags.
- `styles.css`: Styling and animations.
- `script.js`: Gallery logic, scroll reveal, and UI interactions.
- `public/gallery/`: Store your shop images here (e.g., `0.jpg`, `1.png`, `11.png`).

## How to Deploy to GitHub Pages
1. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. **Create a GitHub Repository**:
   - Create a new repository named `IMACX` on GitHub.
   - Follow the instructions to push your local code to GitHub.
3. **Configure Script.js**:
   - Open `script.js` and update `REPO_OWNER` and `REPO_NAME` with your actual GitHub username and repository name. This is required for the Dynamic Gallery to work.
4. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub.
   - Click on **Pages** in the left sidebar.
   - Under **Build and deployment > Source**, select "Deploy from a branch".
   - Select the `main` branch and `/ (root)` folder.
   - Click **Save**.
5. **Add Gallery Images**:
   - Simply upload your images to the `public/gallery` folder in your GitHub repo.
   - The website will automatically detect and display them in the "Shop Showcase" section.

## EV Battery Repair Redirect
The "EV Battery Repair" button in the header is pre-configured to redirect to [ev.engineer](https://ev.engineer).

## Contact
**Owner**: Ananth
**Location**: Shakthinagar, Mangalore
**Phone**: +91 90000 00000
