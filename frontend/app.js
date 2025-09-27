// Portfolio Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Extra safety: force .modal.hidden to be display: none !important
  const style = document.createElement("style");
  style.textContent = `.modal.hidden { display: none !important; }`;
  document.head.appendChild(style);
  // Ensure modal-body is hidden on page load
  const modalBody = document.getElementById("modal-body");
  if (modalBody && !modalBody.classList.contains("hidden")) {
    modalBody.classList.add("hidden");
  }
  // Ensure project modal is hidden on page load
  const modal = document.getElementById("project-modal");
  if (modal && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
  }
  // Initialize all functionality
  initNavigation();
  initThemeToggle();
  initTypingAnimation();
  initScrollEffects();
  initProjectsSection();
  initContactForm();
  initBackToTop();
  initStatCounters();
  initMobileMenu();
  initResumeDownload();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Update active link
        updateActiveNavLink(this);

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // Update navbar on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active navigation based on scroll position
    updateActiveNavOnScroll();
  });

  // Scroll indicator click
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const offsetTop = aboutSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  }
}

function updateActiveNavLink(activeLink) {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }
}

function closeMobileMenu() {
  const navMenu = document.getElementById("nav-menu");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");

  if (navMenu && mobileMenuToggle) {
    navMenu.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  }
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-color-scheme", savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  themeToggle.addEventListener("click", function () {
    const currentTheme =
      document.documentElement.getAttribute("data-color-scheme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-color-scheme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, icon) {
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Typing animation for hero text
function initTypingAnimation() {
  const typingElement = document.getElementById("typing-text");
  const texts = [
    "Full Stack Software Developer",
    "Problem Solver & Innovator",
    "Hardworking & Fast Learner",
  ];

  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentText = texts[currentTextIndex];

    if (!isDeleting) {
      typingElement.textContent = currentText.substring(
        0,
        currentCharIndex + 1
      );
      currentCharIndex++;

      if (currentCharIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000); // Wait before deleting
        return;
      }
    } else {
      typingElement.textContent = currentText.substring(
        0,
        currentCharIndex - 1
      );
      currentCharIndex--;

      if (currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
      }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
  }

  if (typingElement) {
    typeWriter();
  }
}

// Animated counters for statistics
function initStatCounters() {
  const counters = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  function animateCounters() {
    if (hasAnimated) return;

    const aboutSection = document.getElementById("about");
    const rect = aboutSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      hasAnimated = true;

      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        let current = 0;
        const increment = Math.ceil(target / 100);
        const duration = 2000; // 2 seconds
        const stepTime = duration / (target / increment);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = current.toLocaleString();
        }, stepTime);
      });
    }
  }

  window.addEventListener("scroll", animateCounters);
  animateCounters(); // Check on load
}

// Projects section functionality
function initProjectsSection() {
  console.log("initProjectsSection called");
  const projectsData = [
    {
      id: 1,
      title: "Amply",
      subheading: "Kriti Inter Hostel Tech competition 2025",
      description:
        "A blockchain-based carbon credit trading platform. Features ERC-20 tokenization, ZK-SNARKs privacy, IoT smart meter integration, and decentralized trading of carbon credits.",
      image:
        "https://github.com/deepakkumartripathi119/Amply/blob/main/images/dashboard.png?raw=true",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PassportJS",
        "Google OAuth",
        "2FA By Twilio",
        "Metamask Wallet Integration",
        "Solidity",
        "Ethereum",
        "ZK-SNARKs",
      ],
      liveDemo: "https://amply-1.onrender.com/",
      github: "https://github.com/deepakkumartripathi119/Amply",
      category: "Blockchain/Web",
    },
    {
      id: 2,
      title: "EduCollab",
      subheading: "Group Project",
      description:
        "A MERN stack platform for students to collaborate, showcase projects, chat in real-time, and review courses. Features project showcase, chatrooms, and decentralized credit system.",
      image:
        "https://github.com/deepakkumartripathi119/Educollab-MERN-Stack-project/blob/main/Snippets/dashboard.png?raw=true",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "Socket.io",
        "WebRTC",
        "Outlook OAuth",
        "Firestore Auth",
        "Azure",
        "Cloudinary",
        "PassportJS",
      ],
      liveDemo: "https://educollab-zeta.vercel.app/",
      github:
        "https://github.com/deepakkumartripathi119/Educollab-MERN-Stack-project",
      category: "Web Application",
    },
    {
      id: 3,
      title: "Zcoder",
      subheading: "Coding Club IIT Guwahati",
      description:
        "A competitive programming and code management tool. Features problem archiving, code templates, and contest reminders for CP enthusiasts.",
      image:
        "https://github.com/deepakkumartripathi119/Zcoder/blob/main/snippet/home.png?raw=true",
      technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB", "React"],
      liveDemo: "https://github.com/deepakkumartripathi119/Zcoder",
      github: "https://github.com/deepakkumartripathi119/Zcoder",
      category: "Productivity",
    },
    {
      id: 4,
      title: "EchoMeet",
      subheading: "Self Project",
      description:
        "A video conferencing web app with chat rooms, video/audio controls, screen sharing, file sharing, and meeting recording. Built using WebRTC and Socket.io.",
      image:
        "https://github.com/deepakkumartripathi119/EchoMeet/blob/main/Screenshot%202025-09-27%20014633.png?raw=true",
      technologies: ["JavaScript", "HTML", "CSS", "Socket.io", "WebRTC"],
      liveDemo: "https://echomeet-bfos.onrender.com/action.html",
      github: "https://github.com/deepakkumartripathi119/EchoMeet",
      category: "Web Application",
    },
    {
      id: 5,
      title: "OopsIQ",
      subheading: "Self Project",
      description:
        "A Next.js app that transforms notes into interactive quizzes using Google Gemini AI. Features TailwindCSS UI and Render deployment.",
      image:
        "https://github.com/deepakkumartripathi119/OopsIQ/blob/main/Screenshot%202025-09-27%20014924.png?raw=true",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Gemini AI",
      ],
      liveDemo: "https://oopsiq.onrender.com/",
      github: "https://github.com/deepakkumartripathi119/OopsIQ",
      category: "AI/Web",
    },
    {
      id: 7,
      title: "Path-finding Visualiser",
      subheading: "Self Project",
      description:
        "A web app to visualize pathfinding algorithms like Dijkstra, A*, BFS, and DFS. Users can interactively set start/end nodes, add walls, and watch the algorithm in action.",
      image:
        "https://github.com/deepakkumartripathi119/Path-finding-visualiser/blob/main/snippet/algo-running.png?raw=true",
      technologies: ["JavaScript", "React", "HTML", "CSS"],
      liveDemo: "https://visualisepath.netlify.app/",
      github:
        "https://github.com/deepakkumartripathi119/Path-finding-visualiser",
      category: "Visualization",
    },
    {
      id: 8,
      title: "PID Control Kit",
      subheading:
        "Under Prof. Chayan Bhawal, Department of EEE, IIT Guwahati",
      description:
        "A hardware/software kit for PID position control. Built with microcontroller, DC motor, encoder, and real-time C++ algorithms for precise robotics and control systems.",
      image:
        "https://github.com/deepakkumartripathi119/PID-Control-Kit/blob/main/Screenshot%202025-09-27%20015323.png?raw=true",
      technologies: [
        "C++",
        "Microcontroller",
        "Embedded Systems",
        "Control Theory",
      ],
      liveDemo: "https://github.com/deepakkumartripathi119/PID-Control-Kit",
      github: "https://github.com/deepakkumartripathi119/PID-Control-Kit",
      category: "Robotics",
    },
  ];

  // Store projectsData globally for filtering
  window._allProjectsData = projectsData;
  console.log("projectsData:", projectsData);
  renderProjects(projectsData);
  initProjectFilters(projectsData);
  initProjectModal();
}

function renderProjects(projects) {
  console.log("renderProjects called with:", projects);
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) {
    console.warn("No element with id projects-grid found");
    return;
  }

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card" data-category="${
          project.category
        }" data-project-id="${project.id}">
            <div class="project-image">
                <img src="${project.image}" alt="${
        project.title
      }" loading="lazy">
                <div class="project-overlay">
                    <a href="${
                      project.liveDemo
                    }" target="_blank" title="View Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="${
                      project.github
                    }" target="_blank" title="View Source Code">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
    <p>${project.subheading}</p>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
            </div>
        </div>
    `
    )
    .join("");
  console.log("project visible");
  // Add click event to project cards for modal
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Don't open modal if clicking on overlay links
      if (e.target.closest(".project-overlay")) return;
      const projectId = parseInt(this.getAttribute("data-project-id"));
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        showProjectModal(project);
      }
    });
    // ...existing code...
    // Ensure card is visible
    card.style.opacity = "1";
  });
}

function initProjectFilters(projects) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      // Update active filter button
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      // Use the global projects data to filter and re-render
      const allProjects = window._allProjectsData || projects;
      let filtered = allProjects;
      if (filter !== "all") {
        filtered = allProjects.filter((p) => p.category === filter);
      }
      renderProjects(filtered);
    });
  });
}

function initProjectModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");

  // Close modal events
  [modalOverlay, modalClose].forEach((element) => {
    if (element) {
      element.addEventListener("click", closeProjectModal);
    }
  });

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeProjectModal();
    }
  });
}

function showProjectModal(project) {
  console.log("showProjectModal called for:", project.title);
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
        <img src="${project.image}" alt="${
    project.title
  }" class="modal-project-image">
        <h2 class="modal-project-title">${project.title}</h2>
        <p class="modal-project-description">${project.description}</p>
        <div class="modal-project-tech">
            ${project.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
        </div>
        <div class="modal-project-links">
            <a href="${
              project.liveDemo
            }" target="_blank" class="btn btn--primary">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="${
              project.github
            }" target="_blank" class="btn btn--outline">
                <i class="fab fa-github"></i> Source Code
            </a>
        </div>
    `;
  // Remove display: none if present
  modal.classList.remove("hidden");
  modal.style.display = "";
  modalBody.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.classList.add("hidden");
  modal.style.display = "none";
  const modalBody = document.getElementById("modal-body");
  if (modalBody && !modalBody.classList.contains("hidden")) {
    modalBody.classList.add("hidden");
  }
  document.body.style.overflow = "auto";
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Validate form
      if (!validateContactForm(data)) {
        return;
      }

  // Send request to backend
  handleFormSubmission(this, data);
    });

    // Add real-time validation
    const inputs = contactForm.querySelectorAll(".form-control");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          validateField(this);
        }
      });
    });
  }
}

function validateContactForm(data) {
  let isValid = true;
  const form = document.getElementById("contact-form");

  // Remove previous error messages
  form.querySelectorAll(".error-message").forEach((msg) => msg.remove());
  form
    .querySelectorAll(".form-control")
    .forEach((field) => field.classList.remove("error"));

  // Validate name
  if (!data.name.trim()) {
    showFieldError("name", "Name is required");
    isValid = false;
  }

  // Validate email
  if (!data.email.trim()) {
    showFieldError("email", "Email is required");
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    showFieldError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Validate subject
  if (!data.subject.trim()) {
    showFieldError("subject", "Subject is required");
    isValid = false;
  }

  // Validate message
  if (!data.message.trim()) {
    showFieldError("message", "Message is required");
    isValid = false;
  } else if (data.message.trim().length < 10) {
    showFieldError("message", "Message must be at least 10 characters long");
    isValid = false;
  }

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;

  // Remove previous error
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) existingError.remove();
  field.classList.remove("error");

  switch (fieldName) {
    case "name":
      if (!value) {
        showFieldError(fieldName, "Name is required");
        isValid = false;
      }
      break;
    case "email":
      if (!value) {
        showFieldError(fieldName, "Email is required");
        isValid = false;
      } else if (!isValidEmail(value)) {
        showFieldError(fieldName, "Please enter a valid email address");
        isValid = false;
      }
      break;
    case "subject":
      if (!value) {
        showFieldError(fieldName, "Subject is required");
        isValid = false;
      }
      break;
    case "message":
      if (!value) {
        showFieldError(fieldName, "Message is required");
        isValid = false;
      } else if (value.length < 10) {
        showFieldError(
          fieldName,
          "Message must be at least 10 characters long"
        );
        isValid = false;
      }
      break;
  }

  return isValid;
}

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  field.classList.add("error");

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "var(--color-error)";
  errorDiv.style.fontSize = "var(--font-size-sm)";
  errorDiv.style.marginTop = "var(--space-4)";
  errorDiv.textContent = message;

  field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleFormSubmission(form, data) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  fetch("http://localhost:5000/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );
        form.reset();
      } else {
        let errorMsg = "Failed to send message. Please try again later.";
        if (result.details) {
          errorMsg += `\nError: ${result.details}`;
        }
        showNotification(errorMsg, "error");
      }
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    })
    .catch((err) => {
      showNotification(
        `Failed to send message. Please check your connection or try again later.\nError: ${err?.message || err}`,
        "error"
      );
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  document.querySelectorAll(".notification").forEach((n) => n.remove());

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-${type === "success" ? "success" : "primary"});
        color: var(--color-btn-primary-text);
        padding: var(--space-16) var(--space-24);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

  notification.textContent = message;
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// Back to top functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Resume download functionality
function initResumeDownload() {
  const downloadBtn = document.getElementById("download-resume");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      // Create a mock resume download
      const link = document.createElement("a");
      link.href = "data:application/pdf;base64,"; // Mock PDF data
  link.download = "Deepak_Resume.pdf";

      // Show download notification
      showNotification("Resume download started!", "success");

      // For demo purposes, we'll just show a message
      // In real implementation, you would link to actual resume file
      setTimeout(() => {
        showNotification(
          "This is a demo. In production, your actual resume would be downloaded.",
          "info"
        );
      }, 1000);
    });
  }
}

// Scroll effects and animations
function initScrollEffects() {
  // Add scroll-based animations
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(`
        .hero-text,
        .hero-image,
        .about-text,
        .about-highlights,
        .skill-category,
        .project-card,
        .timeline-item,
        .education-item,
        .achievement-item,
        .contact-card,
        .contact-form
    `);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Add CSS animations for scroll effects
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .form-control.error {
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--color-surface);
            border-bottom: 1px solid var(--color-border);
            flex-direction: column;
            padding: var(--space-16);
            gap: var(--space-16);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all var(--duration-normal) var(--ease-standard);
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
            display: flex;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    /* Animation classes */
    .hero-text,
    .hero-image,
    .about-text,
    .about-highlights,
    .skill-category,
    .project-card,
    .timeline-item,
    .education-item,
    .achievement-item,
    .contact-card,
    .contact-form {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Stagger animation delays */
    .skill-category:nth-child(1) { transition-delay: 0.1s; }
    .skill-category:nth-child(2) { transition-delay: 0.2s; }
    .skill-category:nth-child(3) { transition-delay: 0.3s; }
    .skill-category:nth-child(4) { transition-delay: 0.4s; }
    .skill-category:nth-child(5) { transition-delay: 0.5s; }
    .skill-category:nth-child(6) { transition-delay: 0.6s; }
    
    .project-card:nth-child(1) { transition-delay: 0.1s; }
    .project-card:nth-child(2) { transition-delay: 0.2s; }
    .project-card:nth-child(3) { transition-delay: 0.3s; }
    .project-card:nth-child(4) { transition-delay: 0.4s; }
    .project-card:nth-child(5) { transition-delay: 0.5s; }
    .project-card:nth-child(6) { transition-delay: 0.6s; }
    
    .achievement-item:nth-child(1) { transition-delay: 0.1s; }
    .achievement-item:nth-child(2) { transition-delay: 0.2s; }
    .achievement-item:nth-child(3) { transition-delay: 0.3s; }
    .achievement-item:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);
