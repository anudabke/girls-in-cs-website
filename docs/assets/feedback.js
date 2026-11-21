    const feedback = document.querySelector('#feedback-form');
    const send = feedback.querySelector('button[type="submit"]');
    const statusMessage = document.querySelector('#feedback-status');

    feedback.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (send.disabled) return;

      const submission = new FormData(feedback);
      submission.set('first_name', submission.get('first_name').trim());
      send.disabled = true;
      statusMessage.textContent = 'Sending your message…';

      try {
        const response = await fetch(feedback.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: submission
        });
        if (!response.ok) {
          statusMessage.textContent = 'Your message could not be accepted. Try again or email girlsincsorg@gmail.com.';
          return;
        }

        feedback.reset();
        statusMessage.textContent = 'Thanks! Your message was submitted.';
      } catch {
        statusMessage.textContent = 'We could not confirm delivery. Check your connection before trying again.';
      } finally {
        send.disabled = false;
      }
    });
