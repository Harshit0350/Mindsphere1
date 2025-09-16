# Mindsphere

A complete blog website built with HTML, CSS, and JavaScript featuring a modern, responsive design with dark/light theme toggle.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Dynamic Blog Posts**: Blog posts loaded from JavaScript data
- **Search Functionality**: Search through blog posts by title and content
- **Category Filtering**: Filter posts by category (Education, Youth, Technology, Society)
- **Blog Detail Pages**: Individual pages for each blog post
- **Clean Navigation**: Easy navigation between pages

## File Structure

```
/blog-website
├── index.html          # Homepage with blog listing
├── blog.html           # Blog detail page template
├── about.html          # About page
├── /css/
│   └── style.css       # Main stylesheet with theme support
├── /js/
│   ├── main.js         # Main JavaScript functionality
│   └── posts.js        # Blog posts data
└── /images/            # Placeholder images directory
```

## Pages

### Homepage (index.html)
- Displays all blog posts in a responsive grid
- Search bar to filter posts
- Category filter buttons
- Theme toggle button
- Clean navigation

### Blog Detail Page (blog.html)
- Shows full blog post content
- Author, date, and category information
- Featured image
- Back to home navigation

### About Page (about.html)
- Information about the blog platform
- Mission and values
- Clean, minimal design

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Dynamic functionality and DOM manipulation
- **CSS Variables**: For theme switching
- **Responsive Design**: Mobile-first approach

## How to Use

1. Open `index.html` in a web browser
2. Browse blog posts on the homepage
3. Use the search bar to find specific posts
4. Click category buttons to filter posts
5. Click "Read More" to view full blog posts
6. Toggle between dark and light themes
7. Navigate between pages using the navigation menu

## Customization

### Adding New Blog Posts
Edit `js/posts.js` and add new post objects to the `blogPosts` array:

```javascript
{
    id: 7,
    title: "Your Blog Title",
    date: "2024-01-20",
    author: "Author Name",
    excerpt: "Short description...",
    content: "<p>Full blog content...</p>",
    image: "https://via.placeholder.com/350x200/color/text",
    category: "Category"
}
```

### Styling
Modify `css/style.css` to customize colors, fonts, and layout. The CSS uses custom properties (variables) for easy theme customization.

### Categories
Add new categories by updating the category filter logic in `main.js` and adding posts with the new category.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This project is open source and available under the MIT License.
