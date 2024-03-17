

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    // Smooth scroll functionality
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    contactForm.addEventListener('submit', function (event) {

        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

        if (!discordWebhookUrl) {
            console.error("Discord webhook URL not found in environment variables.");
            process.exit(1); // Exit the script if the environment variable is not set
        }
        
        event.preventDefault();
        const formData = new FormData(contactForm);

        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Construct payload for Discord webhook
        const payload = {
            content: `New message\nName: ${name}\nE-mail: ${email}\nMessage:${message}`
        };

        // Make HTTP POST request to Discord webhook
        fetch('discordWebhookUrl', {
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
