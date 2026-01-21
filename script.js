/*              MENU             */
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("open");
}

/*         STAR BACKGROUND             */
const canvas = document.getElementById("stars");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];
  const STAR_COUNT = 200;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
  }

  window.addEventListener("resize", resizeCanvas);

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.25 + 0.05
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    }

    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  drawStars();
}

/*             FADE ANIMATION             */
function initFade() {
  
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.add('visible');
  }

  
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          
          observer.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.1,  
      rootMargin: '0px 0px -50px 0px'  
    }
  );

  
  document.querySelectorAll('.fade:not(.hero-content)').forEach(el => {
    observer.observe(el);
  });
}


document.addEventListener('DOMContentLoaded', initFade);


function toggleTeam() {
  const type = document.getElementById("type").value;
  const singleFields = document.getElementById("singleFields");
  const teamFields = document.getElementById("teamFields");
  const membersDiv = document.getElementById("members");

  if (singleFields) singleFields.style.display = type === "single" ? "block" : "none";
  if (teamFields) teamFields.style.display = type === "team" ? "block" : "none";

  if (membersDiv) membersDiv.innerHTML = ""; 

function generateMembers() {
  const count = parseInt(document.getElementById("count").value);
  const membersDiv = document.getElementById("members");
  if (!membersDiv || !count) return;

  membersDiv.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const memberBox = document.createElement("div");
    memberBox.className = "member-box";

    memberBox.innerHTML = `
      <h4>Participant ${i}</h4>
      <label>Full name</label>
      <input type="text" name="member_${i}_name">
      <label>School</label>
      <input type="text" name="member_${i}_school">
      <label>Class</label>
      <input type="text" name="member_${i}_class">
    `;

    membersDiv.appendChild(memberBox);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector(".reg-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    const membersDiv = document.getElementById("members");
    const membersData = document.getElementById("membersData");
    if (!membersDiv || !membersData) return;

    let membersText = "";
    document.querySelectorAll("#members .member-box").forEach((box, i) => {
      const inputs = box.querySelectorAll("input");
      if (inputs.length === 3) {
        membersText += `Participant ${i + 1}: ${inputs[0].value}, ${inputs[1].value}, ${inputs[2].value}\n`;
      }
    });

    membersData.value = membersText;
  });
});
}