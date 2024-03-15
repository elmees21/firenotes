document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('logo').style.display = 'block';
    document.getElementById('text').style.display = 'block';

    document.getElementById('back').addEventListener('click', function() {
        window.location.href = '../index.html';
    });
});
