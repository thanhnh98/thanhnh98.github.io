# Sắp Tết 2026 - Countdown Website

A comprehensive, responsive website featuring countdown timer to Vietnamese Lunar New Year (Tết) 2026, lunar calendar, and traditional Tết features.

## Features
- Run Code: python3 -m http.server 8000/npx http-server -p 8000 --cors
- **Real-time Countdown Timer**: Displays days, hours, minutes, and seconds until Tết 2026
- **Lunar Calendar**: Interactive calendar with lunar date information
- **Tết Features**: Lucky wheel, traditional foods, and cultural information
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Festive Theme**: Vietnamese New Year themed colors and design elements
- **App Promotion**: Integrated section promoting the Sắp Tết mobile app
- **Modern UI**: Clean, modern interface with smooth animations and transitions
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Navigation**: Smooth scrolling navigation between sections

## Project Structure

```
sap-tet-web/
├── index.html              # Main HTML file
├── footer.html             # Footer component
├── css/
│   ├── style.css          # Main stylesheet with responsive design
│   └── colors.css         # Color variables and Tết theme
├── js/
│   ├── script.js          # Countdown, calendar, and interactions
│   └── resources.js       # Configuration and app store links
├── assets/
│   ├── ads/
│   │   └── adsense_ads.html
│   ├── favicon/
│   │   └── favicon.png
│   ├── fonts/             # Custom font files
│   ├── images/
│   │   ├── background.webp
│   │   ├── google_play.png
│   │   ├── apple_store.png
│   │   ├── ic_wheel.png
│   │   └── foods/         # Traditional food images
│   └── sounds/            # Sound effects
└── README.md              # This file
```

## Technical Details

### HTML Structure
- Semantic HTML5 elements for better accessibility and SEO
- Meta tags for social media sharing and search engines
- Proper heading hierarchy (h1, h2, h3)
- ARIA labels for accessibility
- Navigation with smooth scrolling
- Structured sections for different features

### CSS Features
- CSS Custom Properties (variables) for easy theming
- Flexbox and Grid layouts for responsive design
- CSS animations and transitions
- Mobile-first responsive design approach
- Modern CSS features like `backdrop-filter` for glass effects
- Comprehensive responsive breakpoints (768px, 480px)
- Footer styling with grid layout

### JavaScript Functionality
- Accurate Tết date calculations for multiple years (2025-2029)
- Real-time countdown updates every second
- Interactive lunar calendar with month navigation
- Lunar date information display
- Smooth scrolling navigation
- Dynamic app store link updates
- Responsive design considerations
- Calendar day selection and lunar info updates

### Fonts
- **Pacifico**: Decorative font for headings and special text
- **Roboto**: Clean, readable font for body text
- Loaded from Google Fonts with proper fallbacks
- Custom font files in assets/fonts/ directory

## Setup Instructions

1. **Clone or Download**: Get the project files to your local machine
2. **File Structure**: Ensure all files maintain the directory structure shown above
3. **Assets**: Make sure all assets in the `assets/` directory are properly placed
4. **Web Server**: For best results, serve the files through a web server (not just opening index.html directly)
5. **Testing**: Test on multiple devices and browsers to ensure compatibility

### Local Development
```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP's built-in server
php -S localhost:8000

# Using Live Server (VS Code extension)
# Right-click index.html and select "Open with Live Server"
```

## Customization Guide

### Updating Tết Dates
Edit `js/script.js` and update the `tetDates` object:
```javascript
const tetDates = {
    2025: new Date('2025-01-29'), // Tết Ất Tỵ
    2026: new Date('2026-02-17'), // Tết Bính Ngọ
    2027: new Date('2027-02-06'), // Tết Đinh Mùi
    // Add more years as needed
};
```

### Changing App Store Links
Edit `js/resources.js`:
```javascript
const APP_RESOURCES = {
    appStore: {
        android: 'your-google-play-url',
        ios: 'your-app-store-url'
    }
};
```

### Customizing Colors
Edit `css/colors.css` to change the color scheme:
```css
:root {
    --color-primary: #your-color;
    --color-secondary: #your-color;
    --color-accent-primary: #your-color;
    /* Update other color variables */
}
```

### Updating Fonts
To change fonts, update the Google Fonts link in `index.html` and the CSS variables in `css/colors.css`:
```css
:root {
    --font-heading: 'Your-Font', cursive;
    --font-body: 'Your-Font', sans-serif;
}
```

### Adding Images
1. Place new images in the `assets/images/` directory
2. Update the `src` attributes in `index.html`
3. Ensure images are optimized for web (WebP format recommended)
4. Update image paths in `js/resources.js` if needed

### Customizing Features
Edit the features section in `js/resources.js`:
```javascript
features: {
    countdown: 'Your countdown description',
    calendar: 'Your calendar description',
    luckyDraw: 'Your lucky draw description',
    foods: 'Your foods description'
}
```

## Deployment to GitHub Pages

1.  **Ensure your project is a GitHub repository.** If not, create one and push your code.
2.  **Go to your repository on GitHub.**
3.  **Click on the "Settings" tab.**
4.  **Scroll down to the "GitHub Pages" section.** (In newer GitHub UI, this might be under "Pages" in the left sidebar).
5.  **Choose a source:**
    - Select the branch you want to deploy from (usually `main` or `master`).
    - Select the folder (usually `/root`).
6.  **Click "Save".**
7.  GitHub will build and deploy your site. It might take a few minutes. The URL for your live site will be displayed in the GitHub Pages section (e.g., `https://your-username.github.io/your-repository-name/`).

## Performance Optimizations

- **Image Compression:** Ensure all images in the `images/` folder are optimized. Use tools like [TinyPNG](https://tinypng.com/) / [TinySVG](https://tinysvg.com/) or image editing software to reduce file sizes without significant quality loss.
- **Minify CSS and JavaScript:** For production, consider minifying your CSS and JavaScript files to reduce their size. Tools like [UglifyJS](https://github.com/mishoo/UglifyJS) for JS and [CSSNano](https://cssnano.co/) for CSS can be used, or online minifiers.

## SEO and Accessibility

- **Meta Tags:** `index.html` includes basic meta tags for description and keywords. Review and update them to be more specific to TLife.
    ```html
    <meta name="description" content="Đếm ngược đến Tết Nguyên Đán cùng TLife. Khám phá ứng dụng TLife với nhiều tính năng hấp dẫn cho một mùa Tết trọn vẹn.">
    <meta name="keywords" content="Tết, Tết Nguyên Đán, countdown, đếm ngược, TLife, Vietnamese New Year, Lunar New Year">
    ```
- **Semantic HTML:** The `index.html` uses semantic tags like `<header>`, `<main>`, `<section>`, `<footer>`, and `aria-label` attributes for accessibility. Continue to follow these practices if adding new content.

## Suggestions for Improvement & Alignment with TLife App

1.  **More Dynamic Tết Dates:** Instead of hardcoding Tết dates in `js/script.js`, consider:
    *   Using a small lunar calendar library or a more sophisticated algorithm for calculating Tết dates.
    *   Fetching Tết dates from a simple JSON file or a lightweight API if the website is expected to be maintained over many years.
2.  **Visual Consistency with TLife App:**
    *   **App Icon/Logo:** Include the TLife app's official logo in the header or near the app introduction.
    *   **Color Scheme:** Ensure the website's color scheme (`css/colors.css`) closely matches the TLife app's branding.
    *   **Typography:** If TLife uses specific fonts, try to incorporate them (if web-safe or available via Google Fonts).
3.  **Enhanced Festive Decorations:**
    *   Add more subtle animations (e.g., gently falling peach blossoms, twinkling lights).
    *   Incorporate more Tết-specific imagery (e.g., Bánh Chưng, red envelopes) as SVG icons or small images.
    *   Consider a dynamic background that changes slightly as Tết approaches.
4.  **Interactive Elements from TLife:**
    *   If TLife has features like "Tết Wishes" or "Traditional Foods," consider adding a small section on the website that teases these features, encouraging users to download the app for the full experience.
5.  **Localization:** While the current content is in Vietnamese, if TLife has an English version, consider adding a language switcher.
6.  **Favicon:** Create and add a `favicon.ico` for the website. Link it in `index.html`:
    ```html
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    ```
7.  **Social Sharing:** Add social media sharing buttons so users can share the countdown or the TLife app link.
8.  **More Detailed App Showcase:** Instead of a static placeholder, use a carousel or a small gallery to show multiple screenshots of the TLife app in action.

By implementing these suggestions, the website can become an even more effective promotional tool for the TLife app while providing a delightful Tết countdown experience.