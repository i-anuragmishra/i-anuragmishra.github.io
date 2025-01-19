//
// blog.js
//

// Parse front matter delimited by "---"
function parseFrontMatter(markdown) {
    // We expect:  ---\nkey: value\nkey: value\n---\n# Real content ...
    const parts = markdown.split('---');
    // If there aren't at least 3 segments, then there's no front matter
    if (parts.length < 3) return { frontMatter: {}, content: markdown };

    try {
        const frontMatterLines = parts[1].trim().split('\n');
        const frontMatter = {};

        frontMatterLines.forEach(line => {
            const [key, ...rest] = line.split(':');
            if (!key) return; // skip blank lines

            let rawValue = rest.join(':').trim();
            // If it's "tags: [AI, XAI]", parse into an array
            if (key.trim() === 'tags') {
                rawValue = rawValue
                    .replace(/[\[\]]/g, '') // remove [ or ]
                    .split(',')
                    .map(t => t.trim());
            }

            frontMatter[key.trim()] = rawValue;
        });

        return {
            frontMatter,
            // Join everything after the second "---" back together
            content: parts.slice(2).join('---').trim()
        };
    } catch (err) {
        console.error('Error parsing front matter:', err);
        return { frontMatter: {}, content: markdown };
    }
}

// Format a date string nicely, e.g. "March 20, 2024"
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Simple function to grab the first non‐header paragraph as an excerpt
function getExcerpt(content) {
    // Split by double‐newline
    const paragraphs = content.split('\n\n');
    // Return the first paragraph that doesn’t start with "#"
    for (const p of paragraphs) {
        if (!p.trim().startsWith('#')) {
            return p.trim();
        }
    }
    return '';
}

// Create the small preview snippet used on writing.html
function createPostPreview(post) {
    const { title, date, tags } = post.frontMatter;
    return `
      <div class="item">
        <h2>${title}</h2>
        <div class="post-meta">
          ${formatDate(date)} • ${Array.isArray(tags) ? tags.join(', ') : ''}
        </div>
        <p class="item-description">${post.excerpt}</p>
        <a href="post.html?post=${encodeURIComponent(post.filename)}" class="read-more">
          Read More →
        </a>
      </div>
    `;
}

// Load the list of posts for the writing page
async function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;

    blogList.innerHTML = '<p>Loading posts...</p>';

    // ADD the filenames of all your .md posts here:
    const filenames = [
        '2024-03-20-introduction-to-explainable-ai.md',
        'sample-post.md'
    ];

    const posts = [];

    // Fetch each file from /posts, parse the front matter, extract an excerpt
    for (const filename of filenames) {
        try {
            const response = await fetch(`posts/${filename}`);
            if (!response.ok) {
                console.warn(`File not found: ${filename}`);
                continue;
            }
            const markdown = await response.text();
            const parsed = parseFrontMatter(markdown);

            // If there's no valid front matter "title", skip
            if (!parsed.frontMatter.title) continue;

            posts.push({
                filename,
                frontMatter: parsed.frontMatter,
                excerpt: getExcerpt(parsed.content)
            });
        } catch (err) {
            console.error(`Error loading ${filename}:`, err);
        }
    }

    if (posts.length === 0) {
        blogList.innerHTML = '<p>No posts found.</p>';
        return;
    }

    // Sort by date descending
    posts.sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date));

    // Render them
    blogList.innerHTML = posts.map(createPostPreview).join('');
}

// Load a single post in post.html
async function loadPost(filename) {
    const postContent = document.getElementById('post-content');
    const postTitle = document.getElementById('post-title');
    const postMeta = document.getElementById('post-meta');

    if (!postContent || !postTitle || !postMeta) return;

    postContent.innerHTML = '<p>Loading post...</p>';

    try {
        const response = await fetch(`posts/${filename}`);
        if (!response.ok) throw new Error(`Post ${filename} not found.`);

        const markdown = await response.text();
        const parsed = parseFrontMatter(markdown);
        if (!parsed.frontMatter.title) {
            throw new Error(`Invalid front matter in ${filename}.`);
        }

        // Set page <title>
        document.title = `${parsed.frontMatter.title} • Anurag Mishra`;

        // Update the post heading
        postTitle.textContent = parsed.frontMatter.title;

        // Update metadata line
        const dateStr = formatDate(parsed.frontMatter.date);
        const tags = Array.isArray(parsed.frontMatter.tags)
            ? parsed.frontMatter.tags.join(', ')
            : '';
        postMeta.textContent = `${dateStr} • ${tags}`;

        // Convert the Markdown body to HTML
        const html = marked.parse(parsed.content);
        postContent.innerHTML = html;

        // Optional: highlight code blocks
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightBlock(block);
        });
    } catch (err) {
        console.error('Error loading post:', err);
        postContent.innerHTML = '<p>Error loading post. Please try again later.</p>';
    }
}

// On DOM load, decide which function to run
document.addEventListener('DOMContentLoaded', () => {
    // If the URL ends in writing.html, show the list of posts
    if (window.location.pathname.endsWith('writing.html')) {
        loadBlogPosts();
    }
    // If the URL ends in post.html, show a single post
    else if (window.location.pathname.endsWith('post.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const postFile = urlParams.get('post');
        if (postFile) {
            loadPost(postFile);
        } else {
            // If no ?post=... param, go back to writing
            window.location.href = 'writing.html';
        }
    }
});