const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyaBMpmR-0cXHxB31mPmO08DFwbXDsXYHcfyRhh9l2Pdz46wyCFzDDB6Fc0ROidASjo/exec";

document.getElementById("partnerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const btn = document.getElementById("submitBtn");
    const status = document.getElementById("formStatus");

    btn.disabled = true;
    btn.textContent = "Sending...";
    status.textContent = "";

    const payload = {
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        status.style.color = "green";
        status.textContent = "Proposal sent successfully!";
        document.getElementById("partnerForm").reset();
    } catch (err) {
        status.style.color = "red";
        status.textContent = "Something went wrong. Please try again.";
    } finally {
        btn.disabled = false;
        btn.innerHTML = `Send Proposal <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    }
});