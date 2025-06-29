(() => {
  const uppercaseCheckbox = document.getElementById('uppercase');
  const lowercaseCheckbox = document.getElementById('lowercase');
  const numericCheckbox = document.getElementById('numeric');
  const symbolsCheckbox = document.getElementById('symbols');
  const lengthNumber = document.getElementById('length-number');
  const lengthSlider = document.getElementById('length-slider');
  const passwordOutput = document.getElementById('password-output');
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');
  const copyMsg = document.getElementById('copy-msg');
  const darkmodeToggle = document.getElementById('darkmode-toggle');
  const appContainer = document.getElementById('app');
  const body = document.body;
  const passwordContainer = document.getElementById('password-container');
  const customizeBox = document.getElementById('customize-box');
  const footer = document.querySelector('footer');
  const titles = document.querySelectorAll('.title');

  // Character sets
  const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE_CHARS = UPPERCASE_CHARS.toLowerCase();
  const NUMERIC_CHARS = '0123456789';
  const SYMBOLS_CHARS = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  // Initialize range and number inputs sync
  function syncLengthInputs() {
    let length = parseInt(lengthNumber.value);
    if (isNaN(length) || length < 4) length = 4;
    if (length > 64) length = 64;
    lengthNumber.value = length;
    lengthSlider.value = length;
    lengthSlider.setAttribute('aria-valuenow', length);
  }

  lengthNumber.addEventListener('input', () => {
    syncLengthInputs();
  });

  lengthSlider.addEventListener('input', () => {
    lengthNumber.value = lengthSlider.value;
    lengthSlider.setAttribute('aria-valuenow', lengthSlider.value);
  });

  // Password generator function
  function generatePassword() {
    let length = parseInt(lengthNumber.value);
    if (isNaN(length) || length < 4) length = 4;
    if (length > 64) length = 64;

    const useUpper = uppercaseCheckbox.checked;
    const useLower = lowercaseCheckbox.checked;
    const useNum = numericCheckbox.checked;
    const useSym = symbolsCheckbox.checked;

    // If no options selected, force lowercase to true (minimum)
    if (!useUpper && !useLower && !useNum && !useSym) {
      lowercaseCheckbox.checked = true;
      return generatePassword();
    }

    let charSet = '';
    if (useUpper) charSet += UPPERCASE_CHARS;
    if (useLower) charSet += LOWERCASE_CHARS;
    if (useNum) charSet += NUMERIC_CHARS;
    if (useSym) charSet += SYMBOLS_CHARS;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet.charAt(randomIndex);
    }
    return password;
  }

  // Handle generate button click
  generateBtn.addEventListener('click', () => {
    const newPassword = generatePassword();
    passwordOutput.textContent = newPassword;
    passwordOutput.focus();
  });

  // Copy to clipboard functionality
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(passwordOutput.textContent);
      copyMsg.textContent = 'Copied to clipboard';
      copyMsg.style.position = 'absolute';
      copyMsg.style.left = '-9999px';
      copyMsg.classList.add('sr-only');
      setTimeout(() => {
        copyMsg.textContent = '';
      }, 2000);
    } catch (e) {
      copyMsg.textContent = 'Failed to copy';
    }
  });

  // Dark mode toggle - though page already dark, toggling to light mode and back
  darkmodeToggle.addEventListener('change', () => {
    if (darkmodeToggle.checked) {
      // Dark mode
      body.style.backgroundColor = '#121212';
      body.style.color = '#e0e0e0';
      appContainer.style.backgroundColor = '#1e1e1e';
      appContainer.style.boxShadow = '0 0 14px 1px rgb(34 197 94 / 0.40)';
      passwordContainer.style.backgroundColor = '#2c2c2c';
      passwordContainer.style.color = '#c8c8c8';
      customizeBox.style.color = '#d0d0d0';
      footer.style.color = '#a0a0a0';
      titles.forEach(title => title.style.color = '#e0e0e0');
    } else {
      // Light mode
      body.style.backgroundColor = '#000000';
      body.style.color = '#000000';
      appContainer.style.backgroundColor = '#e5e7eb'; // tailwind gray-200
      appContainer.style.boxShadow = '0 0 14px 1px rgba(34, 197, 94, 0.3)';
      passwordContainer.style.backgroundColor = '#f8f8f8';
      passwordContainer.style.color = '#000000';
      customizeBox.style.color = '#000000';
      footer.style.color = '#000000';
      titles.forEach(title => title.style.color = '#000000');
    }
  });

  // Initial sync of slider and number input
  syncLengthInputs();

  // Generate initial password on load
  passwordOutput.textContent = generatePassword();
})();