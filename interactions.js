document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Example function to handle button click
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', () => {
            alert('Button was clicked!');
        });
    }

    // Add more interactions here
});