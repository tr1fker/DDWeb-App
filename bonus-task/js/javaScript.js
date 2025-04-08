function handleFileSelect() {
    const input = document.getElementById('photoUpload');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    if (input.files.length > 0) {
        const fileName = input.files[0].name;
        fileNameDisplay.textContent = "Вы выбрали файл: " + fileName;
    } else {
        fileNameDisplay.textContent = "";
    }
}