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
    if (parts.length < 3) {
        // No front matter, treat the whole content as markdown
        return {
            frontMatter: {},
            content: markdown
        };
    }

    try {
        const frontMatter = {};
        const frontMatterLines = parts[1].trim().split('\n');
        frontMatterLines.forEach(line => {
            const [key, ...value] = line.split(':');
            if (key) {
                let parsedValue = value.join(':').trim();
                // Handle tags array
                if (key.trim() === 'tags') {
                    parsedValue = parsedValue
                        .replace(/[\[\]]/g, '')
                        .split(',')
                        .map(t => t.trim());
                }
                frontMatter[key.trim()] = parsedValue;
            }
        });

        return {
            frontMatter,
            content: parts.slice(2).join('---').trim()
        };
    } catch (error) {
        console.error('Error parsing front matter:', error);
        return {
            frontMatter: {},
            content: markdown
        };
    }
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
    const title = post.frontMatter.title || 'Untitled Post';
    const date = post.frontMatter.date || new Date().toISOString().split('T')[0];
    const tags = post.frontMatter.tags || [];

    return `
        <div class="item">
            <h2>${title}</h2>
            <div class="post-meta">
                ${formatDate(date)} • ${tags.map(tag => tag).join(', ')}
            </div>
            <p class="item-description">${post.excerpt}</p>
            <a href="post.html?post=${post.name}" class="read-more">Read More →</a>
        </div>
    `;
}

// Function to load and display blog posts list
async function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;

    blogList.innerHTML = '<p>Loading posts...</p>';

    try {
        // Load both posts
        const posts = [];
        const filenames = ['sample-post.md', '2024-03-20-introduction-to-explainable-ai.md'];

        for (const filename of filenames) {
            try {
                const response = await fetch(`posts/${filename}`);
                if (!response.ok) continue;

                const markdown = await response.text();
                const parsed = parseFrontMatter(markdown);

                if (parsed && parsed.frontMatter.title) {
                    // Get excerpt from first paragraph after the title
                    const excerpt = parsed.content.split('\n\n')[1] || '';
                    posts.push({
                        name: filename,
                        frontMatter: parsed.frontMatter,
                        excerpt: excerpt
                    });
                }
            } catch (error) {
                console.error(`Error loading post ${filename}:`, error);
            }
        }

        if (posts.length === 0) {
            blogList.innerHTML = '<p>No posts found.</p>';
            return;
        }

        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date));

        // Create HTML for all posts
        blogList.innerHTML = posts.map(post => createPostPreview(post)).join('');

    } catch (error) {
        console.error('Error loading posts:', error);
        blogList.innerHTML = '<p>Error loading posts. Please try again later.</p>';
    }
}

// Function to load and display a single post
async function loadPost(filename) {
    const postContent = document.getElementById('post-content');
    const postTitle = document.getElementById('post-title');
    const postMeta = document.getElementById('post-meta');

    if (!postContent || !postTitle || !postMeta) return;

    postContent.innerHTML = '<p>Loading post...</p>';

    try {
        const response = await fetch(`posts/${filename}`);
        if (!response.ok) throw new Error('Post not found');

        const markdown = await response.text();
        const parsed = parseFrontMatter(markdown);

        if (!parsed || !parsed.frontMatter.title) {
            throw new Error('Invalid post format');
        }

        // Remove the title from content since we display it separately
        const contentWithoutTitle = parsed.content.replace(/^#\s+.*$/m, '').trim();

        // Update title and metadata
        document.title = `${parsed.frontMatter.title} • Anurag Mishra`;
        postTitle.textContent = parsed.frontMatter.title;
        postMeta.innerHTML = `
            ${formatDate(parsed.frontMatter.date)} • 
            ${parsed.frontMatter.tags.map(tag => tag).join(', ')}
        `;

        // Render markdown content
        postContent.innerHTML = marked.parse(contentWithoutTitle);

        // Apply syntax highlighting to code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    } catch (error) {
        console.error('Error loading post:', error);
        postContent.innerHTML = '<p>Error loading post. Please try again later.</p>';
    }
}

// Initialize page based on current URL
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('writing.html')) {
        loadBlogPosts();
    } else if (window.location.pathname.endsWith('post.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const postFile = urlParams.get('post');
        if (postFile) {
            loadPost(postFile);
        }
    }
}); 