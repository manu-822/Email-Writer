console.log("Email Writer Extension - Content Script Loaded");

function findComposeToolbar() {
  const selectors = [
    '.btC', // Main reply toolbar
    '.aDh', // Pop-out reply toolbar
    '.gU.Up', // "Send" button's parent
    '[role="toolbar"]' // Generic toolbar
  ];

  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  // Return null only after checking all selectors
  return null;
}

function createAIButton() {
  const button = document.createElement('div');
  button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3'; // Gmail's button classes
  button.style.marginRight = '8px';
  button.innerHTML = 'AI Reply';
  button.setAttribute('role', 'button');
  button.setAttribute('data-tooltip', 'Generate AI Reply');
  return button;
}

function getEmailContent() {
  const selectors = [
    '.a3s.aiL', // Main email body
    '.gmail_quote', // Quoted reply text
    '.h7', // Pop-out reply body
    '[role="presentation"]' // Fallback
  ];

  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  // Return '' only after checking all selectors
  return '';
}

async function generateReply(tone, mainButton) {
  try {
    mainButton.innerHTML = 'Generating...';
    mainButton.disabled = true;

    const emailContent = getEmailContent();
    const response = await fetch('http://localhost:8080/api/email/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailContent: emailContent,
        tone: tone
      })
    });

    if (!response.ok) {
      throw new Error('API Request Failed');
    }

    const generatedReply = await response.text();
    const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

    if (composeBox) {
      composeBox.focus();
      // 'insertText' is deprecated but is the simplest way to insert at the cursor
      document.execCommand('insertText', false, generatedReply);
    } else {
      console.error('Compose box was not found');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to generate reply');
  } finally {
    mainButton.innerHTML = 'AI Reply ▾'; // Reset text to include arrow
    mainButton.disabled = false;
  }
}

// This is the correct (second) version of your function
function createToneMenu(mainButton) {
  const existingMenu = document.querySelector('.ai-reply-menu');
  if (existingMenu) {
    existingMenu.remove();
    return;
  }

  const menu = document.createElement('div');
  menu.className = 'ai-reply-menu';
  
  menu.style.position = 'absolute';
  menu.style.top = '100%';    // Right below the button
  menu.style.left = '0';      // Aligned with the button's left edge
  menu.style.marginTop = '2px'; // A small gap
  
  const tones = ['Professional', 'Casual', 'Friendly', 'Direct'];

  tones.forEach(tone => {
    const item = document.createElement('div');
    item.innerText = tone;
    item.className = 'ai-reply-menu-item';

    item.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop this click from re-opening the menu
      menu.remove(); 
      generateReply(tone.toLowerCase(), mainButton);
    });
    
    menu.appendChild(item);
  });

  mainButton.appendChild(menu); 

  // Click-away listener
  setTimeout(() => { 
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) {
        menu.remove();
      }
    }, { once: true });
  }, 0);
}

// This is the correct (second) version of your function,
// modified to accept the toolbar as an argument.
function injectButton(toolbar) {
  const existingButton = document.querySelector('.ai-reply-button');
  if (existingButton) existingButton.remove(); // Remove old one if it exists

  console.log("Toolbar found, creating AI button");
  const button = createAIButton();
  button.classList.add('ai-reply-button');
  button.style.position = 'relative'; // Parent for the menu

  button.addEventListener('click', (e) => {
    e.stopPropagation(); 
    createToneMenu(button); 
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

// Robust polling function to replace setTimeout
function injectButtonWhenReady() {
  const maxAttempts = 10;
  let attempt = 0;

  const intervalId = setInterval(() => {
    if (attempt >= maxAttempts) {
      clearInterval(intervalId); // Stop trying
      console.log("Toolbar not found after 10 attempts.");
      return;
    }

    // Check if button is already injected (e.g., in a pop-out)
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) {
      clearInterval(intervalId);
      return;
    }

    const toolbar = findComposeToolbar();
    if (toolbar) {
      clearInterval(intervalId); // Found it!
      injectButton(toolbar); // Inject the button
    }
    
    attempt++;
  }, 500); // Check every 500ms
}

// --- MutationObserver (with corrected typo) ---
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(node =>
      // Corrected comparison (===)
      node.nodeType === Node.ELEMENT_NODE && 
      (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
    );

    if (hasComposeElements) {
      console.log("Compose Window Detected");
      // Call the robust polling function
      injectButtonWhenReady();
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});