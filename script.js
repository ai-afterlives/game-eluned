// Preload images
const imagePaths = [
  "images/eluned_portrait.png",
  "images/ElunedCatrin.png",
  "images/book_cover.png",
  "images/gallery1.png",
  "images/gallery2.png",
  "images/gallery3.png",
  "images/gallery4.png",
  "images/gallery5.png",
  "images/gallery6.jpg",
  "images/Eluned_Gwen.png",
  "images/Stitching_Valleys.png",
  "images/gallery7.png",
  "images/gallery8.jpg",
  "images/gallery9.png",
  "images/Eluned2.png",
  "images/mill2.jpg",
  "images/mill1.jpg",
  "images/Women's_Suffrage_Pilgrimage_in_Cathays_Park,_Cardiff_1913.jpg"
];

const galleryImages = [
  { path: "images/eluned_portrait.png", caption: "Eluned Davies" },
  { path: "images/ElunedCatrin.png", caption: "Eluned & Catrin (1882)" },
  { path: "images/book_cover.png", caption: "Weaving the Silence (1916)" },
 { path: "images/Eluned_Gwen.png", caption: "Eluned by Gwen John" },
  { path: "images/gallery1.png", caption: "Early Weaving Sample, 1883" },
  { path: "images/gallery2.png", caption: "Arts & Crafts Exhibition, 1887" },
  { path: "images/gallery3.png", caption: "Silent Engines, 1890" },
  { path: "images/gallery4.png", caption: "The Valleys Unfold, 1892" },
  { path: "images/gallery5.png", caption: "Jacket by Daniel Owen. c. 1981" },
  { path: "images/Stitching_Valleys.png", caption: "Stitching the Valleys" },
  { path: "images/gallery6.jpg", caption: "Welsh Suffragettes, 1911" },
  { path: "images/mill2.jpg", caption: "Mill Shut Down" },
  { path: "images/mill1.jpg", caption: "Project Failure" },
  { path: "images/Women's_Suffrage_Pilgrimage_in_Cathays_Park,_Cardiff_1913.jpg", caption: "Women's Suffrage, Cathays Park, Cardiff, 1913" }
];

// Select DOM elements
const openingScreen = document.getElementById('opening');
const enterButton = document.getElementById('enter-button');
const gameScreen = document.getElementById('game');
const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const typeSound = document.getElementById('type-sound');
const galleryContainer = document.getElementById('gallery');
const music = document.getElementById('background-music');
const mainHeader = document.getElementById('main-header');


let typing = false;
let typingTimeout = null;
let soundEnabled = false;

// Game story object
const story = {
  start: {
    text: "You are the curator at Historic Voices Museum, Wales. You’ve been donated the Eluned Davies collection by her former partner Catrin Meredith. Explore the catalog entires below ann press next when ready",
    choices: [{ text: "NEXT", next: "intro" }]
  },
  intro: {
    text: "You’re tasked with developing the AI Afterlife prototype for Eluned Davies. Where do you begin?",
    choices: [
      { text: "Start with the Catrin Meredith estate materials", next: "catrinEstate" },
      { text: "Negotiate with the Davies family", next: "DaviesFamily" }
    ]
  },
  catrinEstate: {
    text: "The Meredith estate donated extensive archives. But the Davies family still holds private letters. How do you approach them?",
    choices: [
      { text: "Negotiate joint curation with family", next: "familyDeal" },
      { text: "Proceed without family letters", next: "partialArchive" }
    ]
  },
  DaviesFamily: {
    text: "The Davies family is divided. Some fear exposure of Eluned's private life. What’s your move?",
    choices: [
      { text: "Offer full transparency rights", next: "familyDeal" },
      { text: "Appeal to Welsh national heritage", next: "familySplit" }
    ]
  },
  familyDeal: {
    text: "A fragile agreement is reached: full archive access, but strict privacy filters.",
    choices: [{ text: "Proceed to AI training", next: "aiTraining" }]
  },
  familySplit: {
    text: "The family remains divided. Some papers are withheld. Your dataset is incomplete.",
    choices: [
      { text: "Train AI with public records only", next: "blandAI" },
      { text: "Take risks with partial private letters", next: "hallucinationRisk" }
    ]
  },
  partialArchive: {
    text: "With limited personal material, accuracy risks increase.",
    choices: [
      { text: "Use only verified speeches", next: "blandAI" },
      { text: "Risk using incomplete private letters", next: "hallucinationRisk" }
    ]
  },
  aiTraining: {
    text: "AI trained. Results promising but unstable. Some hallucinations include Ada Lovelace debates that never occurred!",
    choices: [
      { text: "Add human moderation", next: "moderation" },
      { text: "Go fully autonomous", next: "launch" }
    ]
  },
  hallucinationRisk: {
    text: "AI starts generating false interviews with Laura Ashley and political speeches she never gave.",
    choices: [
      { text: "Shut down project entirely", next: "shutdown" },
      { text: "Pause and add real-time fact-check filters", next: "moderation" }
    ]
  },
  moderation: {
    text: "Human moderation filters hallucinations. AI Eluned speaks both Welsh and English and honors complex family privacy boundaries.",
    choices: [{ text: "Proceed to public launch", next: "launch" }]
  },
  launch: {
    text: "Launch day. Public reception is strong. But soon, a viral clip shows AI Eluned falsely claiming she mentored Gwen John.",
    choices: [
      { text: "Issue public apology", next: "apologyPath" },
      { text: "Defend the AI as artistic license", next: "defendPath" }
    ]
  },
  apologyPath: {
    text: "The museum apologizes. Debate grows about AI responsibility, truth, and Welsh cultural memory. Family demands stricter oversight.",
    choices: [{ text: "Pause and rewrite ethical guidelines", next: "museumValues" }]
  },
  defendPath: {
    text: "You defend the AI as 'creative interpretation.' Critics accuse the museum of distorting Welsh history.",
    choices: [
      { text: "Reopen internal review", next: "museumValues" },
      { text: "Refuse further changes", next: "boardFiresYou" }
    ]
  },
  museumValues: {
    text: "The board reviews: transparency, historical integrity, inclusion, sustainability, Welsh language, and decolonization.",
    choices: [{ text: "Restart AI under stricter ethical code", next: "successfulLaunch" }]
  },
  successfulLaunch: {
    text: "AI Eluned 2.0 launches: ethically balanced, community supervised, fully bilingual and deeply respectful of Welsh identity.",
    choices: [
      { text: "Play Again", next: "start" },
      { text: "Give Feedback", link: "https://ai-afterlives.github.io/ouija-feedback-sp/" }
    ]
  },
  blandAI: {
    text: "AI Eluned avoids controversy but lacks nuance. Welsh historians criticize its limited depth.",
    choices: [
      { text: "Reopen ethical consultation", next: "museumValues" },
      { text: "Keep bland version live", next: "quietSuccess" }
    ]
  },
  quietSuccess: {
    text: "The safe but dull AI exists for education, but never achieves the impact hoped for.",
    choices: [
      { text: "Play Again", next: "start" },
      { text: "Give Feedback", link: "https://ai-afterlives.github.io/ouija-feedback-sp/" }
    ]
  },
  shutdown: {
    text: "The board cancels the AI Afterlife project for Eluned entirely. Public disappointment grows.",
    choices: [
      { text: "Play Again", next: "start" },
      { text: "Give Feedback", link: "https://ai-afterlives.github.io/ouija-feedback-sp/" }
    ]
  },
  boardFiresYou: {
    text: "You are dismissed. The failed project sparks global debates on AI memory ethics in museums.",
    choices: [
      { text: "Play Again", next: "start" },
      { text: "Give Feedback", link: "https://ai-afterlives.github.io/ouija-feedback-sp/" }
    ]
  }
};

// Preload images first
function preloadImages(callback) {
  let loaded = 0;
  imagePaths.forEach(path => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      loaded++;
      if (loaded === imagePaths.length) {
        callback();
      }
    };
    img.onerror = () => {
      loaded++;
      if (loaded === imagePaths.length) {
        callback();
      }
    };
  });
}

// Build permanent gallery
function buildGallery() {
const headerDiv = document.createElement('div');
  headerDiv.className = 'gallery-item header-card-item';

  headerDiv.innerHTML = `
    <div class="header-card-inside">
 <h1>📁</h1>     
<h1>Historic Voices Museum</h1>
      <div class="subtitle">Eluned Davies's Collection</div>
      <a href="https://ai-afterlives.github.io/wiki-eluned/" target="_blank" class="learn-more-button">Learn More</a>
    </div>
  `;
 galleryContainer.appendChild(headerDiv);  

galleryImages.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = item.path;
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = item.caption;
    div.appendChild(img);
    div.appendChild(caption);
    galleryContainer.appendChild(div);
  });
}

// Typewriter effect
function typeWriter(text, i = 0) {
  if (i === 0 && soundEnabled) {
    typeSound.currentTime = 0;
    typeSound.play();
    typing = true;
  }
  if (i < text.length) {
    storyElement.textContent += text.charAt(i);
    typingTimeout = setTimeout(() => typeWriter(text, i + 1), 60);
  } else {
    typeSound.pause();
    typing = false;
  }
}

function showScene(sceneKey) {
  if (typing) {
    clearTimeout(typingTimeout);
    typing = false;
    typeSound.pause();
  }
  const scene = story[sceneKey];
  storyElement.textContent = '';
  choicesElement.innerHTML = '';
  typeWriter(scene.text);

  scene.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice.text;
    button.onclick = () => {
      soundEnabled = true;
      if (choice.link) {
        window.open(choice.link, '_blank');
      } else {
        showScene(choice.next);
      }
    };
    choicesElement.appendChild(button);
  });
}

enterButton.addEventListener('click', () => {
  soundEnabled = true;
  openingScreen.style.display = 'none';
  gameScreen.style.display = 'block';
music.play();

  preloadImages(() => {
    showScene('start');
  });
});

window.onload = () => {
  preloadImages(() => {
    buildGallery();
  });
}
