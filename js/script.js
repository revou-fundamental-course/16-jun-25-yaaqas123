document.addEventListener('DOMContentLoaded', function() {
    // 1. Menampilkan waktu saat ini di form output
    function updateCurrentTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
            timeZone: 'Asia/Jakarta'
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

        const userName = prompt("Please enter your nick name for the greeting:");
        const greetingElement = document.getElementById('greeting');
        const heroSection = document.getElementById('home');
        const mainContentSections = document.querySelectorAll('main > section:not(#home)');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        document.body.style.overflow = 'hidden'; // Menghindari scrolling sebelum muncul


        if (userName && userName.trim() !== '') {
            greetingElement.textContent = `${timeOfDayGreeting}, ${userName}! Welcome To Industrial Co.`;
        } else {
            greetingElement.textContent = `${timeOfDayGreeting}, Guest! Welcome To Industrial Co.`;
        }

        // Setelah nama disetel, baru tampilkan konten
        if (heroSection) {
            heroSection.classList.remove('hidden');
        }
        // Pastikan juga section lain di dalam main ditampilkan jika sebelumnya hidden
        mainContentSections.forEach(section => {
            section.classList.remove('hidden');
        });
        // Tampilkan header dan footer juga jika menyembunyikannya
        if (header) {
            header.classList.remove('hidden');
        }
        if (footer) {
            footer.classList.remove('hidden');
        }

        document.body.style.overflow = ''; // Aktifkan kembali scrolling
    }

    // Panggil setGreeting secara langsung saat DOM selesai dimuat
    setGreeting();


    // 3. Validasi Formulir "Message Us"
    const messageForm = document.getElementById('messageForm');
    const outputName = document.getElementById('output-name');
    const outputDob = document.getElementById('output-dob');
    const outputGender = document.getElementById('output-gender');
    const outputMessage = document.getElementById('output-message');

    // Setel ulang keluaran formulir saat memuat halaman
    outputName.textContent = '-';
    outputDob.textContent = '-';
    outputGender.textContent = '-';
    outputMessage.textContent = '-';

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('name-error').textContent = '';
        document.getElementById('dob-error').textContent = '';
        document.getElementById('gender-error').textContent = '';
        document.getElementById('message-error').textContent = '';

        let isValid = true;

        // Dapatkan nilai form
        const name = document.getElementById('name').value.trim();
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const message = document.getElementById('message').value.trim();

        // Validasi nama
        if (name === '') {
            document.getElementById('name-error').textContent = 'Name cannot be empty.';
            isValid = false;
        }

        // Validasi Tanggal Lahir
        if (dob === '') {
            document.getElementById('dob-error').textContent = 'Date of Birth cannot be empty.';
            isValid = false;
        } else {
            const selectedDate = new Date(dob);
            const currentDate = new Date();
            // Periksa apakah tanggal yang dipilih ada di masa depan
            if (selectedDate > currentDate) {
                document.getElementById('dob-error').textContent = 'Date of Birth cannot be in the future.';
                isValid = false;
            }
        }

        // Validasi jenis kelamin
        if (!gender) {
            document.getElementById('gender-error').textContent = 'Gender must be selected.';
            isValid = false;
        }

        // Validasi pesan
        if (message === '') {
            document.getElementById('message-error').textContent = 'Message cannot be empty.';
            isValid = false;
        }

        if (isValid) {
            // Jika semua valid, tampilkan data di bagian output
            outputName.textContent = name;
            outputDob.textContent = dob;
            outputGender.textContent = gender ? gender.value : '-';
            outputMessage.textContent = message;

            alert('Thank you for your message! We will get back to you shortly.');
            messageForm.reset();
        } else {
            alert('Please correct the errors in the form.');
        }
    });

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