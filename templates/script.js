document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
  
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(contactForm);
  
      const email = formData.get('email');
      const message = formData.get('message');
  
      // Construct payload for Discord webhook
      const payload = {
        content: `New message from ${email}:\n${message}`
      };
  
      // Make HTTP POST request to Discord webhook
      fetch('https://discord.com/api/webhooks/1218707734434807894/cWklwxOjQCdHK_tkvnjk_gVT9DsydH5GgNVF3jLysVGM_25eyOg1hv7viYhbMpn3Zk2S', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(response => {
        if (response.ok) {
          console.log("Message sent successfully!");
          alert("Message sent successfully!");
          contactForm.reset();
        } else {
          console.error("Failed to send message:", response.statusText);
          alert("Failed to send message. Please try again later.");
        }
      })
      .catch(error => {
        console.error("Error sending message:", error);
        alert("Error sending message. Please try again later.");
      });
    });
  });
  