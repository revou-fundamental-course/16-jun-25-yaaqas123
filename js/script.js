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
            timeZoneName: 'short'
        };
        document.getElementById('current-time').textContent = now.toLocaleDateString('en-US', options);
    }
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // 2. Salam di Halaman Utama
    const userName = prompt("Please enter your name for the greeting:");
    if (userName) {
        document.getElementById('greeting').textContent = `Hi ${userName}, Welcome To Website`;
    } else {
        document.getElementById('greeting').textContent = `Hi Guest, Welcome To Website`;
    }


    // 3. Validasi Formulir "Message Us"
    const messageForm = document.getElementById('messageForm');
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
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
            document.getElementById('name-error').textContent = 'Nama tidak boleh kosong.';
            isValid = false;
        }

        // Validate Date of Birth (simple check for empty)
        if (dob === '') {
            document.getElementById('dob-error').textContent = 'Tanggal Lahir tidak boleh kosong.';
            isValid = false;
        }

        // Validate Gender
        if (!gender) {
            document.getElementById('gender-error').textContent = 'Jenis Kelamin harus dipilih.';
            isValid = false;
        }

        // Validate Message
        if (message === '') {
            document.getElementById('message-error').textContent = 'Pesan tidak boleh kosong.';
            isValid = false;
        }

        if (isValid) {
            // Jika semua valid, tampilkan data di output section
            document.getElementById('output-name').textContent = name;
            document.getElementById('output-dob').textContent = dob;
            document.getElementById('output-gender').textContent = gender ? gender.value : '-';
            document.getElementById('output-message').textContent = message;

            alert('Form submitted successfully!');
            messageForm.reset();
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
});