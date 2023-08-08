(function() {
    var videoElement = document.querySelector('video');
    
    // 建立輸入框和按鈕
    const hourInput = document.createElement('input');
    hourInput.style.border = '1px solid black';
    hourInput.placeholder = '時';
    hourInput.id = 'hourInput';
    
    const timeInput = document.createElement('input');
    timeInput.style.border = '1px solid black';
    timeInput.placeholder = '分:秒';
    timeInput.id = 'timeInput';

    const copyButton = document.createElement('button');
    copyButton.style.border = '1px solid black';
    copyButton.innerText = 'copy';

    const root = document.getElementById('root');
    root.appendChild(hourInput);
    root.appendChild(timeInput);
    root.appendChild(copyButton);

    timeInput.addEventListener('keydown', function(event) {
        var values = timeInput.value.split(':').map(Number);
        var hours = parseInt(hourInput.value) || 0;
        var minutes = values[0], seconds = values[1];

        switch (event.key) {
            case 'ArrowLeft':
                seconds -= 10;
                break;
            case 'ArrowRight':
                seconds += 10;
                break;
            case 'ArrowDown':
                seconds -= 1;
                break;
            case 'ArrowUp':
                seconds += 1;
                break;
            case 'Enter':
                videoElement.currentTime = hours * 3600 + minutes * 60 + seconds;
                return;
            default:
                return;
        }
        
        while (seconds >= 60) {
            minutes += 1;
            seconds -= 60;
        }
        while (seconds < 0) {
            minutes -= 1;
            seconds += 60;
        }
        while (minutes >= 60) {
            hours += 1;
            minutes -= 60;
        }
        while (minutes < 0) {
            hours -= 1;
            minutes += 60;
        }

        hourInput.value = hours;
        timeInput.value = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
        timeInput.select();
        document.execCommand('copy');
    });

    // 複製按鈕的功能
    copyButton.addEventListener('click', () => {
        var text = hourInput.value + ':' + timeInput.value;
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });

    // 監聽輸入框的貼上事件
    timeInput.addEventListener('paste', (event) => {
        setTimeout(() => {
            const [hour, minutes, seconds] = timeInput.value.split(':').map(Number);
            if (seconds !== undefined) {
                hourInput.value = hour.toString();
                timeInput.value = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 0);
    });
})();
