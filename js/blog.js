// Function to get repository contents from GitHub
async function getPostsFromGitHub() {
    try {
        const response = await fetch('https://api.github.com/repos/i-anuragmishra/i-anuragmishra.github.io/contents/posts');
        const files = await response.json();
        return files.filter(file => file.name.endsWith('.md'));
    } catch (error) {
        console.error('Error fetching posts from GitHub:', error);
        return [];
    }
}

// Function to parse front matter from markdown
function parseFrontMatter(markdown) {
    const parts = markdown.split('---');
    if (parts.length < 3) return null;

    const frontMatter = {};
    const frontMatterLines = parts[1].trim().split('\n');
    frontMatterLines.forEach(line => {
        const [key, ...value] = line.split(':');
        if (key) {
            let parsedValue = value.join(':').trim();
            // Handle tags array
            if (key.trim() === 'tags') {
                parsedValue = parsedValue.replace(/[\[\]]/g, '').split(',').map(t => t.trim());
            }
            frontMatter[key.trim()] = parsedValue;
        }
    });

    return {
        frontMatter,
        content: parts[2].trim()
    };
}

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
            <h2><a href="#" onclick="loadPost('${post.name}', '${post.sha}'); return false;">${post.frontMatter.title}</a></h2>
            <div class="post-meta">
                ${formatDate(post.frontMatter.date)} • 
                ${post.frontMatter.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
            </div>
            <p>${post.excerpt}</p>
            <a href="#" onclick="loadPost('${post.name}', '${post.sha}'); return false;" class="read-more">Read More →</a>
        </article>
    `;
}

// Function to load and display blog posts list
async function loadBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    blogPostsContainer.innerHTML = '<p>Loading posts...</p>';

    try {
        const files = await getPostsFromGitHub();
        const posts = [];

        // Load content and metadata for each post
        for (const file of files) {
            try {
                const response = await fetch(file.download_url);
                const markdown = await response.text();
                const parsed = parseFrontMatter(markdown);
                if (parsed) {
                    // Get excerpt from first paragraph of content
                    const excerpt = parsed.content.split('\n\n')[0].replace(/^#+.*\n/, '').trim();
                    posts.push({
                        ...file,
                        frontMatter: parsed.frontMatter,
                        excerpt
                    });
                }
            } catch (error) {
                console.error(`Error loading post ${file.name}:`, error);
            }
        }

        // Sort and display posts
        const postsHTML = posts
            .sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
            .map(post => createPostPreview(post))
            .join('');

        blogPostsContainer.innerHTML = postsHTML || '<p>No posts found.</p>';

        // Update URL without reload
        history.pushState(null, null, '/writing');
        document.title = 'Technical Writing';

    } catch (error) {
        console.error('Error loading posts:', error);
        blogPostsContainer.innerHTML = '<p>Error loading posts. Please try again later.</p>';
    }
}

// Function to load and display a single post
async function loadPost(filename, sha) {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = '<p>Loading post...</p>';

    try {
        // Get file content from GitHub
        const response = await fetch(`https://raw.githubusercontent.com/i-anuragmishra/i-anuragmishra.github.io/main/posts/${filename}`);
        if (!response.ok) throw new Error('Post not found');

        const markdown = await response.text();
        const parsed = parseFrontMatter(markdown);
        if (!parsed) throw new Error('Invalid post format');

        // Update page content
        mainContent.innerHTML = `
            <article class="post">
                <header class="post-header">
                    <h1>${parsed.frontMatter.title}</h1>
                    <div class="post-meta">
                        ${formatDate(parsed.frontMatter.date)} • 
                        ${parsed.frontMatter.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
                    </div>
                </header>
                <div class="post-content">
                    ${marked.parse(parsed.content)}
                </div>
                <div class="post-footer">
                    <a href="#" onclick="loadBlogPosts(); return false;">← Back to Posts</a>
                </div>
            </article>
        `;

        // Update URL and title
        history.pushState(null, null, `/posts/${filename.replace('.md', '')}`);
        document.title = `${parsed.frontMatter.title} - Technical Writing`;

    } catch (error) {
        console.error('Error loading post:', error);
        mainContent.innerHTML = '<p>Error loading post. Please try again later.</p>';
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    if (window.location.pathname === '/writing' || window.location.pathname === '/writing/') {
        loadBlogPosts();
    } else if (window.location.pathname.startsWith('/posts/')) {
        const filename = window.location.pathname.split('/').pop() + '.md';
        loadPost(filename);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/writing' || window.location.pathname === '/writing/') {
        loadBlogPosts();
    } else if (window.location.pathname.startsWith('/posts/')) {
        const filename = window.location.pathname.split('/').pop() + '.md';
        loadPost(filename);
    }
}); 