document.addEventListener('DOMContentLoaded', function() {
    // 1. Menampilkan waktu saat ini di form output
    function updateCurrentTime() {
        const now = new Date();
        // Use 'en-GB' for a more standard date format, or keep 'en-US' if preferred.
        // Also, specify Indonesia time zone.
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
            timeZone: 'Asia/Jakarta' // Set to Jakarta time zone (WIB)
        };
        document.getElementById('current-time').textContent = now.toLocaleDateString('en-GB', options);
    }
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // 2. Salam di Halaman Utama dengan waktu hari
    function setGreeting() {
        const now = new Date();
        const hour = now.getHours();
        let timeOfDayGreeting;

        if (hour < 12) {
            timeOfDayGreeting = "Good Morning";
        } else if (hour < 18) {
            timeOfDayGreeting = "Good Afternoon";
        } else {
            timeOfDayGreeting = "Good Evening";
        }

        const userName = prompt("Please enter your name for the greeting:");
        const greetingElement = document.getElementById('greeting');

        if (userName && userName.trim() !== '') {
            greetingElement.textContent = `${timeOfDayGreeting}, ${userName}! Welcome To My Company`;
        } else {
            greetingElement.textContent = `${timeOfDayGreeting}, Guest! Welcome To My Company`;
        }
    }
    setGreeting();


    // 3. Validasi Formulir "Message Us"
    const messageForm = document.getElementById('messageForm');
    const outputName = document.getElementById('output-name');
    const outputDob = document.getElementById('output-dob');
    const outputGender = document.getElementById('output-gender');
    const outputMessage = document.getElementById('output-message');

    // Reset form output on page load
    outputName.textContent = '-';
    outputDob.textContent = '-';
    outputGender.textContent = '-';
    outputMessage.textContent = '-';

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous error messages
        document.getElementById('name-error').textContent = '';
        document.getElementById('dob-error').textContent = '';
        document.getElementById('gender-error').textContent = '';
        document.getElementById('message-error').textContent = '';

        let isValid = true;

        // Get form values
        const name = document.getElementById('name').value.trim();
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const message = document.getElementById('message').value.trim();

        // Validate Name
        if (name === '') {
            document.getElementById('name-error').textContent = 'Name cannot be empty.';
            isValid = false;
        }

        // Validate Date of Birth
        if (dob === '') {
            document.getElementById('dob-error').textContent = 'Date of Birth cannot be empty.';
            isValid = false;
        } else {
            const selectedDate = new Date(dob);
            const currentDate = new Date();
            // Check if the selected date is in the future
            if (selectedDate > currentDate) {
                document.getElementById('dob-error').textContent = 'Date of Birth cannot be in the future.';
                isValid = false;
            }
        }

        // Validate Gender
        if (!gender) {
            document.getElementById('gender-error').textContent = 'Gender must be selected.';
            isValid = false;
        }

        // Validate Message
        if (message === '') {
            document.getElementById('message-error').textContent = 'Message cannot be empty.';
            isValid = false;
        }

        if (isValid) {
            // If all valid, display data in output section
            outputName.textContent = name;
            outputDob.textContent = dob;
            outputGender.textContent = gender ? gender.value : '-';
            outputMessage.textContent = message;

            alert('Thank you for your message! We will get back to you shortly.');
            messageForm.reset(); // Clear the form fields
        } else {
            alert('Please correct the errors in the form.');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('header').offsetHeight), // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});