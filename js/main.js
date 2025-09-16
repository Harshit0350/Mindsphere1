// Main JavaScript functionality for the blog website

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeToggleText(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleText(newTheme);
    });
}

function updateThemeToggleText(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
}

// Blog functionality
let allPosts = [];
let filteredPosts = [];

function initBlog() {
    // Load posts from posts.js
    allPosts = [...blogPosts];
    filteredPosts = [...allPosts];
    
    // Display posts
    displayPosts();
    
    // Initialize search
    initSearch();
    
    // Initialize category filters
    initCategoryFilters();
}

function displayPosts() {
    const blogGrid = document.getElementById('blog-grid');
    
    if (!blogGrid) return;
    
    if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-results">
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    blogGrid.innerHTML = filteredPosts.map(post => `
        <div class="blog-card">
            <img src="${post.image}" alt="${post.title}" class="blog-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='">
            <div class="blog-content">
                <h2 class="blog-title">${post.title}</h2>
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-category">${post.category}</span>
                </div>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="blog.html?id=${post.id}" class="read-more-btn">Read More</a>
            </div>
        </div>
    `).join('');
}

function initSearch() {
    const searchBar = document.getElementById('search-bar');
    
    if (!searchBar) return;
    
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        filterPosts(searchTerm);
    });
}

function initCategoryFilters() {
    const categoryFilters = document.getElementById('category-filters');
    
    if (!categoryFilters) return;
    
    // Get unique categories
    const categories = [...new Set(allPosts.map(post => post.category))];
    
    // Create filter buttons
    const filterButtons = categories.map(category => `
        <button class="category-btn" data-category="${category}">${category}</button>
    `).join('');
    
    // Add "All" button
    categoryFilters.innerHTML = `
        <button class="category-btn active" data-category="all">All</button>
        ${filterButtons}
    `;
    
    // Add event listeners
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            // Update active button
            categoryFilters.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Filter posts
            const category = e.target.dataset.category;
            filterPostsByCategory(category);
        }
    });
}

function filterPosts(searchTerm) {
    const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
    
    filteredPosts = allPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                            post.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayPosts();
}

function filterPostsByCategory(category) {
    const searchTerm = document.getElementById('search-bar')?.value.toLowerCase().trim() || '';
    
    if (category === 'all') {
        filteredPosts = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.excerpt.toLowerCase().includes(searchTerm)
        );
    } else {
        filteredPosts = allPosts.filter(post => 
            post.category === category && 
            (post.title.toLowerCase().includes(searchTerm) || 
             post.excerpt.toLowerCase().includes(searchTerm))
        );
    }
    
    displayPosts();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Blog detail page functionality
function loadBlogDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    
    if (!postId) {
        showError('Blog post not found');
        return;
    }
    
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) {
        showError('Blog post not found');
        return;
    }
    
    displayBlogDetail(post);
}

function displayBlogDetail(post) {
    const blogDetail = document.getElementById('blog-detail');
    
    if (!blogDetail) return;
    
    blogDetail.innerHTML = `
        <div class="blog-header">
            <h1 class="blog-detail-title">${post.title}</h1>
            <div class="blog-detail-meta">
                <span>By ${post.author}</span>
                <span>${formatDate(post.date)}</span>
                <span class="blog-category">${post.category}</span>
            </div>
            <img src="${post.image}" alt="${post.title}" class="blog-detail-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='">
        </div>
        <div class="blog-detail-content">
            ${post.content}
        </div>
    `;
}

function showError(message) {
    const blogDetail = document.getElementById('blog-detail');
    
    if (!blogDetail) return;
    
    blogDetail.innerHTML = `
        <div class="no-results">
            <h3>Error</h3>
            <p>${message}</p>
            <a href="index.html" class="back-btn">Back to Home</a>
        </div>
    `;
}

// About page functionality
function initAboutPage() {
    // About page doesn't need special JavaScript functionality
    // The content is static HTML
}

// Initialize the appropriate functionality based on the current page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle on all pages
    initThemeToggle();
    
    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'index.html':
        case '':
            initBlog();
            break;
        case 'blog.html':
            loadBlogDetail();
            break;
        case 'about.html':
            initAboutPage();
            break;
        default:
            // If we're on the root or index, initialize blog
            if (currentPage === '' || currentPage === 'index.html') {
                initBlog();
            }
    }
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'blog.html') {
        loadBlogDetail();
    } else if (currentPage === 'index.html' || currentPage === '') {
        initBlog();
    }
});
