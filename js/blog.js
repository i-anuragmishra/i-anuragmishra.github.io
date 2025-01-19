// Blog post metadata
const posts = [
    {
        title: "Introduction to Explainable AI: Making Deep Learning Models Transparent",
        date: "2024-03-20",
        tags: ["AI", "Deep Learning", "XAI"],
        file: "2024-03-20-introduction-to-explainable-ai.md",
        excerpt: "As deep learning models become increasingly complex and ubiquitous, understanding their decision-making process has never been more crucial."
    }
    // Add more posts here as you create them
];

// Function to format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to create post preview HTML
function createPostPreview(post) {
    return `
        <article class="post-preview">
            <h2><a href="/post.html?post=${post.file}">${post.title}</a></h2>
            <div class="post-meta">
                ${formatDate(post.date)} • 
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
            </div>
            <p>${post.excerpt}</p>
            <a href="/post.html?post=${post.file}" class="read-more">Read More →</a>
        </article>
    `;
}

// Function to load and display blog posts
function loadBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    const postsHTML = posts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(post => createPostPreview(post))
        .join('');

    blogPostsContainer.innerHTML = postsHTML;
}

// Load posts when the page loads
document.addEventListener('DOMContentLoaded', loadBlogPosts); 