// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for the header title
    const text = "Master of Science in Artificial Intelligence | Machine Learning Engineer | Research Assistant";
    const typingSpeed = 50;
    let charIndex = 0;

    function typeText() {
        if (charIndex < text.length) {
            const headerSubtitle = document.querySelector('header p');
            headerSubtitle.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeText, 1000);

    // Scroll animations for sections
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-out';
        observer.observe(section);
    });

    // Skill bars animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-10px)';
            category.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
            category.style.boxShadow = 'none';
        });
    });

    // Project cards hover effect
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });

    // Add year counter in footer
    const footerYear = document.createElement('p');
    footerYear.textContent = `© ${new Date().getFullYear()} Anurag Mishra. All rights reserved.`;
    document.querySelector('footer').appendChild(footerYear);

    // Add scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--white);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-size: 20px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(scrollButton);

    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        scrollButton.style.opacity = window.scrollY > 500 ? '1' : '0';
    });

    // Scroll to top functionality
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Add dark mode toggle
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--white);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        font-size: 20px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
    `;

    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';

        // Update colors for dark mode
        if (document.body.classList.contains('dark-mode')) {
            document.documentElement.style.setProperty('--light-bg', '#1a1a1a');
            document.documentElement.style.setProperty('--text-color', '#ffffff');
            document.documentElement.style.setProperty('--white', '#2d2d2d');
        } else {
            document.documentElement.style.setProperty('--light-bg', '#f5f6fa');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--white', '#ffffff');
        }
    });
};

createDarkModeToggle(); 