// Scroll
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    
    if (currentScroll <= 0) {
        nav.classList.remove('hidden');
        lastScroll = currentScroll;
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 80) {
        nav.classList.add('hidden');
    } else if (currentScroll < lastScroll) {
        nav.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const isValid = [
            validateEmail(),
            validateUsername(),
            validateDob(),
            validateGender(),
            validatePassword(),
            validateConfirmPassword(),
            validateTerms(),
        ].every(Boolean);

        if (isValid) {
            alert("Account created successfully!");
            this.reset();
            clearAll();
        }
    });
}

function setField(inputId, errorId, isError) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  if (isError) {
    error.classList.add("show");
    input?.classList.add("error");
    input?.classList.remove("valid");
    return false;
  } else {
    error.classList.remove("show");
    input?.classList.remove("error");
    input?.classList.add("valid");
    return true;
  }
}

function validateEmail() {
  const value = document.getElementById("email").value.trim();
  return setField("email", "emailError", !value || !value.includes('@') || !value.includes('.'));
}

function validateUsername() {
  const value = document.getElementById("username").value.trim();
  return setField("username", "usernameError", value.length < 3 || value.length > 20);
}

function validateDob() {
  const value = document.getElementById("dob").value;
  const age = (new Date() - new Date(value)) / (1000 * 60 * 60 * 24 * 365.25);
  return setField("dob", "dobError", !value || age < 13);
}

function validateGender() {
  const selected = document.querySelector('input[name="gender"]:checked');
  const error = document.getElementById("genderError");
  if (!selected) {
    error.classList.add("show");
    return false;
  } else {
    error.classList.remove("show");
    return true;
  }
}

function validatePassword() {
  const value = document.getElementById("password").value;
  return setField("password", "passwordError", value.length < 8);
}

function validateConfirmPassword() {
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  return setField("confirmPassword", "confirmError", password !== confirm);
}

function validateTerms() {
  const checked = document.getElementById("terms").checked;
  document.getElementById("termsError").classList.toggle("show", !checked);
  return checked;
}

function clearAll() {
  ["email", "username", "dob", "password", "confirmPassword"].forEach((id) => {
    const input = document.getElementById(id);
    input?.classList.remove("valid", "error");
  });
  document.querySelectorAll(".error-msg").forEach((el) => el.classList.remove("show"));
}

const blurValidators = {
  email: validateEmail,
  username: validateUsername,
  dob: validateDob,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
};

Object.keys(blurValidators).forEach((id) => {
  document.getElementById(id)?.addEventListener("blur", blurValidators[id]);
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        courseCards.forEach(card => {
            if (filter === 'all' || card.dataset.level === filter) {
                card.style.display = 'flex';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// View
const viewBtns = document.querySelectorAll('.view-btn');
const coursesContainer = document.getElementById('coursesContainer');
viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.getAttribute('aria-label') === 'List view') {
            coursesContainer.classList.add('list-view');
        } else {
            coursesContainer.classList.remove('list-view');
        }
    });
});