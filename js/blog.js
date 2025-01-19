//
// js/blog.js
//
/**
 * Splits Markdown by '---' to parse front matter. Expects:
 * ---
 * title: ...
 * date: ...
 * tags: [AI, XAI]
 * ---
 * # Actual Markdown Content
 */
function parseFrontMatter(markdown) {
    const parts = markdown.split('---');
    // If there's not at least 3 segments, no front matter
    if (parts.length < 3) {
        return { frontMatter: {}, content: markdown };
    }

    try {
        const frontMatterLines = parts[1].trim().split('\n');
        const frontMatter = {};

        frontMatterLines.forEach(line => {
            const [key, ...rest] = line.split(':');
            if (!key) return;
            let rawValue = rest.join(':').trim();
            if (key.trim() === 'tags') {
                // parse "tags: [AI, XAI]" into an array
                rawValue = rawValue
                    .replace(/[\[\]]/g, '')
                    .split(',')
                    .map(t => t.trim());
            }
            frontMatter[key.trim()] = rawValue;
        });

        return {
            frontMatter,
            content: parts.slice(2).join('---').trim()
        };
    } catch (err) {
        console.error('Error parsing front matter:', err);
        return { frontMatter: {}, content: markdown };
    }
}

// Format date like "March 20, 2024"
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Return the first non-# paragraph as an excerpt
function getExcerpt(content) {
    const paragraphs = content.split('\n\n');
    for (const p of paragraphs) {
        if (!p.trim().startsWith('#')) {
            return p.trim();
        }
    }
    return '';
}

/** Create the blog post preview HTML */
function createPostPreview(post) {
    return `
        <article class="blog-preview">
            <h2><a href="post.html?post=${encodeURIComponent(post.filename)}">${post.frontMatter.title}</a></h2>
            <div class="post-meta">
                ${formatDate(post.frontMatter.date)} • ${post.frontMatter.tags.join(', ')}
            </div>
            <p>${post.excerpt}</p>
            <a href="post.html?post=${encodeURIComponent(post.filename)}" class="read-more">Read More →</a>
        </article>
    `;
}

/** Load and display blog posts */
async function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;

    // Hardcoded post for testing
    const post = {
        title: "Introduction to Explainable AI",
        date: "March 19, 2024",
        tags: ["AI", "Deep Learning", "XAI"],
        excerpt: "As deep learning models become increasingly complex and ubiquitous, understanding their decision-making process has never been more crucial. This post introduces the concept of Explainable AI (XAI) and discusses why it matters.",
        filename: "2024-03-20-introduction-to-explainable-ai.md"
    };

    const html = `
        <article class="blog-preview">
            <h2><a href="post.html?post=${post.filename}">${post.title}</a></h2>
            <div class="post-meta">
                ${post.date} • ${post.tags.join(', ')}
            </div>
            <p>${post.excerpt}</p>
            <a href="post.html?post=${post.filename}" class="read-more">Read More →</a>
        </article>
    `;

    blogList.innerHTML = html;
}

/**
 * Load a single .md file (filename) and render it on post.html
 */
async function loadPost(filename) {
    const postContent = document.getElementById('post-content');
    const postTitle = document.getElementById('post-title');
    const postMeta = document.getElementById('post-meta');

    if (!postContent || !postTitle || !postMeta) return;

    postContent.innerHTML = '<p>Loading post...</p>';

    try {
        const response = await fetch(`posts/${filename}`);
        if (!response.ok) {
            throw new Error(`Post not found: posts/${filename}`);
        }
        const markdown = await response.text();
        const parsed = parseFrontMatter(markdown);
        if (!parsed.frontMatter.title) {
            throw new Error('Missing required front matter (title).');
        }

        // Update <title> of page
        document.title = `${parsed.frontMatter.title} • Anurag Mishra`;

        // Set post heading
        postTitle.textContent = parsed.frontMatter.title;

        // Set meta info
        const dateStr = formatDate(parsed.frontMatter.date);
        const tags = parsed.frontMatter.tags || [];
        postMeta.textContent = `${dateStr} • ${tags.join(', ')}`;

        // Convert the Markdown to HTML with Marked
        const html = marked.parse(parsed.content);
        postContent.innerHTML = html;

        // Syntax highlighting
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightBlock(block);
        });
    } catch (err) {
        console.error('Error loading post:', err);
        postContent.innerHTML = '<p>Error loading post. Please try again later.</p>';
    }
}

// Load posts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('blogs.html')) {
        loadBlogPosts();
    } else if (window.location.pathname.endsWith('post.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const postFile = urlParams.get('post');
        if (postFile) {
            loadPost(postFile);
        }
    }
});