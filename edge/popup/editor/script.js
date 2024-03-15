document.addEventListener("DOMContentLoaded", function() {
    const windowExtern = document.getElementById("window-extern");
    const noteText = document.getElementById("note-text");
    const settingsButton = document.getElementById("settings-button");
    const returnButton = document.getElementById("return-button");
    const resetButton = document.getElementById("reset-button");
    const aboutButton = document.getElementById("about-button");
    const helpButton = document.getElementById("help-button");
    const webButton = document.getElementById("web-button");
    const settingsMenu = document.getElementById("settings-menu");
    const editorIcons = document.getElementById("editor-icons");
    const fontSelect = document.getElementById("font-select");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const decreaseFontSizeButton = document.getElementById("decrease-font-size");
    const increaseFontSizeButton = document.getElementById("increase-font-size");
    const copyTextButton = document.getElementById("copy-text");
    const openChat = document.getElementById("open-chat");

    function darkMode() {

    }

    darkModeToggle.addEventListener("change", toggleDarkMode);

    function showSettingsMenu() {
        noteText.style.display = "none";
        editorIcons.style.display = "none";
        settingsButton.style.display = "none";
        returnButton.style.display = "block";
        settingsMenu.style.display = "block";
    }

    function hideSettingsMenu() {
        noteText.style.display = "block";
        editorIcons.style.display = "flex";
        settingsButton.style.display = "block";
        returnButton.style.display = "none";
        settingsMenu.style.display = "none";
    }

    settingsButton.addEventListener("click", showSettingsMenu);

    returnButton.addEventListener("click", hideSettingsMenu);

    windowExtern.addEventListener("click", function () {
        window.open("index.html", "FireNotes", "width=800,height=600");
    });

    resetButton.addEventListener("click", function() {
        playWarningSound(); 
        const confirmReset = window.confirm(chrome.i18n.getMessage("deleteWarning"));
        if (confirmReset) {
            localStorage.clear();
            noteText.value = "";
            noteText.style.fontSize = "16px";
            noteText.style.fontFamily = "Arial, sans-serif";
            document.body.classList.remove("dark-mode");
            settingsMenu.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "false");
            window.location.reload(); 
        }
    });

    openChat.addEventListener("click", function () {   
        window.open("https://chat.openai.com/", "ChatGPT", "width=800,height=600");
    });

    aboutButton.addEventListener("click", function() {
        window.location.href = "about/index.html";
    });

    helpButton.addEventListener("click", function() {
        window.open("https://firenotes-extension.github.io/help/", "_blank");
    });

    webButton.addEventListener("click", function() {
        window.open("https://firenotes-extension.github.io/", "_blank");
    });

    const isDarkMode = localStorage.getItem("darkMode") === "true";

    document.body.classList.toggle("dark-mode", isDarkMode);
    settingsMenu.classList.toggle("dark-mode", isDarkMode);

    darkModeToggle.checked = isDarkMode;

    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
        noteText.style.fontSize = savedFontSize + "px";
    }

    const savedFont = localStorage.getItem("font");
    if (savedFont) {
        noteText.style.fontFamily = savedFont;
        fontSelect.value = savedFont;
    }

    const savedText = localStorage.getItem("noteText");
    if (savedText) {
        noteText.value = savedText;
    }

    noteText.addEventListener("input", function() {
        localStorage.setItem("fontSize", noteText.style.fontSize.replace("px", ""));
        localStorage.setItem("noteText", noteText.value);
    });

    decreaseFontSizeButton.addEventListener("click", function() {
        const currentSize = parseFloat(window.getComputedStyle(noteText).fontSize);
        const newSize = currentSize - 2;
        noteText.style.fontSize = newSize + "px";
        localStorage.setItem("fontSize", newSize);
    });

    increaseFontSizeButton.addEventListener("click", function() {
        const currentSize = parseFloat(window.getComputedStyle(noteText).fontSize);
        const newSize = currentSize + 2;
        noteText.style.fontSize = newSize + "px";
        localStorage.setItem("fontSize", newSize);
    });

    function toggleDarkMode() {
        playClickSound();
        const isDark = document.body.classList.toggle("dark-mode");
        settingsMenu.classList.toggle("dark-mode", isDark);
        localStorage.setItem("darkMode", isDark);
    }

    fontSelect.addEventListener("change", function() {
        const selectedFont = fontSelect.value;
        noteText.style.fontFamily = selectedFont;
        localStorage.setItem("font", selectedFont);
    });

    copyTextButton.addEventListener("click", function() {
        const textToCopy = noteText.value;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(function() {
                if (soundCheckbox.checked) {
                    audio.play();
                }
                createToast("success"); 
                noteText.value = "";
                localStorage.setItem("noteText", "");
            });
        } else {
            playErrorSound(); 
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const noteText = document.getElementById("note-text");
    const settingsButton = document.getElementById("settings-button");
    const returnButton = document.getElementById("return-button");
    const resetButton = document.getElementById("reset-button");
    const aboutButton = document.getElementById("about-button");
    const helpButton = document.getElementById("help-button");
    const webButton = document.getElementById("web-button");
    const settingsMenu = document.getElementById("settings-menu");
    const editorIcons = document.getElementById("editor-icons");
    const fontSelect = document.getElementById("font-select");
    const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
    const decreaseFontSizeButton = document.getElementById("decrease-font-size");
    const increaseFontSizeButton = document.getElementById("increase-font-size");
    const copyTextButton = document.getElementById("copy-text");
    const languageSelect = document.getElementById("language-select");

    const strings = {
        en: {
            title: "FireNotes",
            about: "About",
            helpButton: "Help and introduction",
            website: "Website",
            settings: "Settings",
            reset: "Reset",
            darkMode: "Dark Mode",
            resetDescription: "This will delete the text in memory, the current text size, and font.",
            darkModeDescription: "Improves readability and reduces eye strain.",
            aboutTitle: "FireNotes",
            other: "Other",
            languageLabel: "Language",
            uiSounds: "UI Sounds",
            sound: "Sound",
        },
        es: {
            title: "FireNotes",
            about: "Acerca de",
            helpButton: "Ayuda e introducción",
            website: "Sitio web",
            settings: "Ajustes",
            reset: "Restablecer",
            darkMode: "Modo oscuro",
            resetDescription: "Esto borrará el texto en memoria, el tamaño de texto actual y la fuente.",
            darkModeDescription: "Mejora la legibilidad y reduce la fatiga visual.",
            aboutTitle: "FireNotes",
            other: "Otros",
            languageLabel: "Idioma",
            uiSounds: "Sonidos de la interfaz",
            sound: "Sonido",
        },
        ca: {
            title: "FireNotes",
            about: "Quant a",
            helpButton: "Ajuda i introducció",
            website: "Lloc web",
            settings: "Configuració",
            reset: "Restablir",
            darkMode: "Mode fosc",
            resetDescription: "Això esborrarà el text en memòria, la mida de text actual i la font.",
            darkModeDescription: "Millora la llegibilitat i redueix la fatiga visual.",
            aboutTitle: "FireNotes",
            other: "Altres",
            languageLabel: "Idioma",
            uiSounds: "Sons de la interfície",
            sound: "Activa",
        },
        it: {
            title: "FireNotes",
            about: "Su di noi",
            helpButton: "Aiuto e supporto",
            website: "Sito web",
            settings: "Impostazioni",
            reset: "Ripristina",
            darkMode: "Modalità scura",
            resetDescription: "Ciò cancellerà il testo in memoria, la dimensione del testo attuale e il carattere.",
            darkModeDescription: "Migliora la leggibilità e riduce l'affaticamento degli occhi.",
            aboutTitle: "FireNotes",
            other: "Altri",
            languageLabel: "Lingua",
            uiSounds: "Suoni dell'interfaccia",
            sound: "Suono",
        },
        fr: {
            title: "FireNotes",
            about: "À propos",
            helpButton: "Aide et introduction",
            website: "Site web",
            settings: "Paramètres",
            reset: "Réinitialiser",
            darkMode: "Mode sombre",
            resetDescription: "Cela supprimera le texte en mémoire, la taille de texte actuelle et la police.",
            darkModeDescription: "Améliore la lisibilité et réduit la fatigue oculaire.",
            aboutTitle: "FireNotes",
            other: "Autre",
            languageLabel: "Langue",
            uiSounds: "Sons de l'interface utilisateur",
            sound: "Son",
        },
        de: {
            title: "FireNotes",
            about: "Über",
            helpButton: "Hilfe und Einführung",
            website: "Webseite",
            settings: "Einstellungen",
            reset: "Zurücksetzen",
            darkMode: "Dunkler Modus",
            resetDescription: "Dies löscht den Text im Speicher, die aktuelle Textgröße und die Schriftart.",
            darkModeDescription: "Verbessert die Lesbarkeit und reduziert die Augenbelastung.",
            aboutTitle: "FireNotes",
            other: "Andere",
            languageLabel: "Sprache",
            uiSounds: "UI-Sounds",
            sound: "Ton",
        },
        pt: {
            title: "FireNotes",
            about: "Sobre",
            helpButton: "Ajuda e introdução",
            website: "Site",
            settings: "Configurações",
            reset: "Redefinir",
            darkMode: "Modo escuro",
            resetDescription: "Isso apagará o texto na memória, o tamanho de texto atual e a fonte.",
            darkModeDescription: "Melhora a legibilidade e reduz a tensão nos olhos.",
            aboutTitle: "FireNotes",
            other: "Outro",
            languageLabel: "Idioma",
            uiSounds: "Sons da interface do usuário",
            sound: "Som",
        },
        nl: {
            title: "FireNotes",
            about: "Over",
            helpButton: "Help en introductie",
            website: "Website",
            settings: "Instellingen",
            reset: "Resetten",
            darkMode: "Donkere modus",
            resetDescription: "Dit verwijdert de tekst in het geheugen, de huidige tekengrootte en het lettertype.",
            darkModeDescription: "Verbeter de leesbaarheid en verminder de oogbelasting.",
            aboutTitle: "FireNotes",
            other: "Overig",
            languageLabel: "Taal",
            uiSounds: "UI-geluiden",
            sound: "Geluid",
        },
        zhHant: {
            title: "FireNotes",
            about: "關於",
            helpButton: "幫助與介紹",
            website: "網站",
            settings: "設置",
            reset: "重置",
            darkMode: "暗黑模式",
            resetDescription: "這將刪除記憶中的文字、當前文字大小和字型。",
            darkModeDescription: "改善閱讀性，減輕眼睛負擔。",
            aboutTitle: "FireNotes",
            other: "其他",
            languageLabel: "語言",
            uiSounds: "UI聲音",
            sound: "聲音",
        },
        zhHans: {
            title: "FireNotes",
            about: "关于",
            helpButton: "帮助与介绍",
            website: "网站",
            settings: "设置",
            reset: "重置",
            darkMode: "暗模式",
            resetDescription: "这将删除内存中的文本、当前文本大小和字体。",
            darkModeDescription: "改善可读性，减轻眼睛负担。",
            aboutTitle: "FireNotes",
            other: "其他",
            languageLabel: "语言",
            uiSounds: "UI声音",
            sound: "声音",
        },
        ja: {
            title: "FireNotes",
            about: "約",
            helpButton: "ヘルプと導入",
            website: "ウェブサイト",
            settings: "設定",
            reset: "リセット",
            darkMode: "ダークモード",
            resetDescription: "これにより、メモリ内のテキスト、現在のテキストサイズ、フォントが削除されます。",
            darkModeDescription: "読みやすさが向上し、目の負担が軽減されます。",
            aboutTitle: "FireNotes",
            other: "その他",
            languageLabel: "言語",
            uiSounds: "UIサウンド",
            sound: "音",
        },
        ko: {
            title: "FireNotes",
            about: "약",
            helpButton: "도움말 및 소개",
            website: "웹 사이트",
            settings: "설정",
            reset: "재설정",
            darkMode: "다크 모드",
            resetDescription: "이것은 메모리 내의 텍스트, 현재 텍스트 크기 및 글꼴을 삭제합니다.",
            darkModeDescription: "가독성을 향상시키고 눈의 피로를 줄입니다.",
            aboutTitle: "FireNotes",
            other: "기타",
            languageLabel: "언어",
            uiSounds: "UI 사운드",
            sound: "소리",
        },
        vi: {
            title: "FireNotes",
            about: "Về",
            helpButton: "Trợ giúp và giới thiệu",
            website: "Trang web",
            settings: "Cài đặt",
            reset: "Đặt lại",
            darkMode: "Chế độ tối",
            resetDescription: "Điều này sẽ xóa văn bản trong bộ nhớ, kích thước văn bản hiện tại và phông chữ.",
            darkModeDescription: "Cải thiện khả năng đọc và giảm căng thẳng cho mắt.",
            aboutTitle: "FireNotes",
            other: "Khác",
            languageLabel: "Ngôn ngữ",
            uiSounds: "Âm thanh giao diện người dùng",
            sound: "Âm thanh",
        },
        ru: {
            title: "FireNotes",
            about: "О нас",
            helpButton: "Помощь и введение",
            website: "Веб-сайт",
            settings: "Настройки",
            reset: "Сбросить",
            darkMode: "Тёмный режим",
            resetDescription: "Это удалит текст из памяти, текущий размер текста и шрифт.",
            darkModeDescription: "Улучшает читаемость и снижает напряжение на глаза.",
            aboutTitle: "FireNotes",
            other: "Другое",
            languageLabel: "Язык",
            uiSounds: "Звуки интерфейса",
            sound: "Звук",
        },
        uk: {
            title: "FireNotes",
            about: "Про",
            helpButton: "Довідка та вступ",
            website: "Веб-сайт",
            settings: "Налаштування",
            reset: "Скинути",
            darkMode: "Темний режим",
            resetDescription: "Це видалить текст з пам'яті, поточний розмір тексту та шрифт.",
            darkModeDescription: "Покращує читабельність та зменшує напругу на очі.",
            aboutTitle: "FireNotes",
            other: "Інше",
            languageLabel: "Мова",
            uiSounds: "Звуки інтерфейсу",
            sound: "Звук",
        },
        eu: {
            title: "FireNotes",
            about: "Buruz",
            helpButton: "Laguntza eta sarrera",
            website: "Webgunea",
            settings: "Ezarpenak",
            reset: "Berrabiarazi",
            darkMode: "Ilun Modea",
            resetDescription: "Hau memoriako testua, testuaren oraingo tamaina eta letra-tipoa ezabatuko du.",
            darkModeDescription: "Irakurkortasuna hobetzen du eta begien tentea murrizten du.",
            aboutTitle: "FireNotes",
            other: "Beste",
            languageLabel: "Hizkuntza",
            uiSounds: "UI Soinuak",
            sound: "Soinua",
        },
        gl: {
            title: "FireNotes",
            about: "Sobre",
            helpButton: "Axuda e introdución",
            website: "Sitio web",
            settings: "Axustes",
            reset: "Restablecer",
            darkMode: "Modo escuro",
            resetDescription: "Isto borrará o texto na memoria, o tamaño de texto actual e a fonte.",
            darkModeDescription: "Mellora a legibilidade e reduce a fatiga visual.",
            aboutTitle: "FireNotes",
            other: "Outros",
            languageLabel: "Idioma",
            uiSounds: "Sons da interface de usuario",
            sound: "Son",
        },
        id: {
            "title": "FireNotes",
            "about": "Tentang",
            "helpButton": "Bantuan dan Pengantar",
            "website": "Situs Web",
            "settings": "Pengaturan",
            "reset": "Reset",
            "darkMode": "Mode Gelap",
            "resetDescription": "Ini akan menghapus teks dalam memori, ukuran teks saat ini, dan font.",
            "darkModeDescription": "Meningkatkan kejelasan bacaan dan mengurangi ketegangan mata.",
            "aboutTitle": "FireNotes",
            "other": "Lainnya",
            "languageLabel": "Bahasa",
            "uiSounds": "Suara Antarmuka",
            "sound": "Suara"
        }

    };        

    function setLanguage(lang) {

        document.getElementById("title").textContent = strings[lang].title;
        document.getElementById("about-title").textContent = strings[lang].aboutTitle;

        document.getElementById("settings-heading").textContent = strings[lang].settings;
        document.getElementById("reset-heading").textContent = strings[lang].reset;
        document.getElementById("reset-description").textContent = strings[lang].resetDescription;
        document.getElementById("toggle-dark-mode").textContent = strings[lang].darkMode;
        document.getElementById("dark-mode-heading").textContent = strings[lang].darkMode;
        document.getElementById("dark-mode-description").textContent = strings[lang].darkModeDescription;
        document.getElementById("other-heading").textContent = strings[lang].other;
        document.getElementById("language-label").textContent = strings[lang].languageLabel;
        document.getElementById("ui-sounds-heading").textContent = strings[lang].uiSounds;
        document.getElementById("sound-text").textContent = strings[lang].sound;

        resetButton.textContent = strings[lang].reset;
        aboutButton.textContent = strings[lang].about;
        helpButton.textContent = strings[lang].helpButton;
        webButton.textContent = strings[lang].website;
    }

    function saveLanguage(lang) {
        localStorage.setItem("language", lang);
    }

    loadLanguage();

    languageSelect.addEventListener("change", function() {
        const selectedLang = languageSelect.value;
        setLanguage(selectedLang);
        saveLanguage(selectedLang);
    });

    function loadLanguage() {
        const savedLang = localStorage.getItem("language");
        if (savedLang) {
            setLanguage(savedLang);
            languageSelect.value = savedLang;
        } else {
            const browserLang = navigator.language.slice(0, 2);
            if (strings[browserLang]) {
                setLanguage(browserLang);
                languageSelect.value = browserLang;
            } else {
                setLanguage("en");
                languageSelect.value = "en";
            }
        }
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

});

const notifications = document.querySelector(".notifications"),
buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
    timer: 5000,
    success: {
        icon: 'fa-solid fa-fire',
        text: 'FireNoted!',
    },
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
}

const createToast = (id) => {

    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li");
    toast.className = `toast ${id}`;

    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                      </div>`;
    notifications.appendChild(toast);

    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => createToast(btn.id));
});

const soundCheckbox = document.getElementById("soundtog");
const audio = new Audio("sounds/fire.mp3");
const errorAudio = new Audio("sounds/error.mp3");
const clickAudio = new Audio("sounds/click.mp3");
const warningAudio = new Audio("sounds/warning.mp3");

function toggleSound() {
    playClickSound();
    if (soundCheckbox.checked) {

        localStorage.setItem("soundEnabled", "true");
    } else {

        localStorage.setItem("soundEnabled", "false");
    }

    audio.muted = !soundCheckbox.checked;
}

const isSoundEnabled = localStorage.getItem("soundEnabled");

if (isSoundEnabled === "true") {
    soundCheckbox.checked = true;
} else {
    soundCheckbox.checked = false;
}

soundCheckbox.addEventListener("change", toggleSound);

if (isSoundEnabled === null) {
    soundCheckbox.checked = true;
    audio.muted = !soundCheckbox.checked;
}

function playClickSound() {
    if (soundCheckbox.checked) {
        clickAudio.play();
    }
}

function playErrorSound() {
    if (soundCheckbox.checked) {
        errorAudio.play();
    }
}

function playWarningSound() {
    if (soundCheckbox.checked) {
        warningAudio.play();
    }
}