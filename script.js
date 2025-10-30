
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Toggle mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.navbar-menu');
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Add active class to navbar links based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-item a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').includes(current)) {
                    a.classList.add('active');
                }
            });
        });
        
        // Update copyright year
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Hide mobile menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Typing animation for hero designation
        const designationTextElement = document.getElementById('designation-text');
        const designations = ['Data Analyst', 'Data Scientist'];
        let designationIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentDesignation = designations[designationIndex];
            if (isDeleting) {
                designationTextElement.textContent = currentDesignation.substring(0, charIndex - 1);
                charIndex--;
            } else {
                designationTextElement.textContent = currentDesignation.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentDesignation.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                designationIndex = (designationIndex + 1) % designations.length;
            }

            const typingSpeed = isDeleting ? 75 : 150;
            setTimeout(type, typingSpeed);
        }

        // Intersection Observer for scroll-based section fade-in animation
        const sectionsToAnimate = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1
        });
        
        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });

        // Digital Rain / Data Flow Canvas Animation
        function startDigitalRain() {
            const canvas = document.getElementById('digital-rain-canvas');
            const ctx = canvas.getContext('2d');
            
            let width, height;

            // Function to resize the canvas
            function resizeCanvas() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }

            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            // Characters to display
            const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}[]|:;<,>.?/`~-=';
            const fontSize = 16;
            const columns = Math.floor(width / fontSize);
            const drops = Array(columns).fill(1); // One drop per column

            // Text to display in the middle
            const welcomeText = "WELCOME TO PRANJAL SHINDE'S PORTFOLIO WEBSITE";
            const middleRowY = Math.floor(height / 2) + (fontSize / 2); // Center the text vertically

            function draw() {
                // Dim the old characters with a more transparent color for a lighter effect
                ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
                ctx.fillRect(0, 0, width, height);

                // Draw the digital rain
                ctx.fillStyle = '#00aaff'; // A vibrant blue for the characters
                ctx.font = `${fontSize}px monospace`;
                ctx.textAlign = 'left';

                for (let i = 0; i < drops.length; i++) {
                    const text = characters.charAt(Math.floor(Math.random() * characters.length));
                    
                    // Don't draw rain drops on the welcome text line
                    if (Math.abs(drops[i] * fontSize - middleRowY) > fontSize) {
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    }

                    // Send the drop back to the top randomly
                    if (drops[i] * fontSize > height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }

                    drops[i]++;
                }

                // Draw the welcome text in the middle
                ctx.fillStyle = '#00aaff'; // The same vibrant blue as the digital rain
                ctx.font = `bold ${fontSize}px monospace`; // Bold to stand out
                ctx.textAlign = 'center';
                ctx.fillText(welcomeText, width / 2, middleRowY);

                requestAnimationFrame(draw);
            }

            draw();
        }

        // Initialize animations on window load
        document.addEventListener('DOMContentLoaded', () => {
            type(); // Start the typing animation
            startDigitalRain(); // Start the new digital rain animation
        });
    
