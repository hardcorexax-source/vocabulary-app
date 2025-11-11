        function isLowerCyrillic(char) {
            return /^[а-я]$/.test(char) || (char === ' ');
        }

        function shuffle(Arr) {
            let array = Arr;
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; 
            }

        return array;
        }


        function not_have(word) {
            const userDict = JSON.parse(localStorage.getItem("userDict")) || [];
            let notHave = true;
            for (let i = 0; i < userDict.length; i++) {
                if (word === userDict[i]["word"]) {
                    notHave = false;
                }
            }
            return notHave;
        }
        
        
        function hide_new_question_arr() {
            let newWord = document.querySelector('.new-word-arr');
            if (document.querySelector('.enable')) {
                newWord.classList.remove('enable');
            }
            newWord.classList.add('disable');
            setTimeout(() => {
                newWord.style.display = 'none';
            }, 300);
        }

        function show_new_question_arr() {
            let newWord = document.querySelector('.new-word-arr');
            if (document.querySelector('.disable')) {
                newWord.classList.remove('disable');
            }
            newWord.style.display = 'inline';
            setTimeout(() => {
                newWord.classList.add('enable');
            });
        }

        function send_data() {
            let userDict = [];

            const eng_word_dirty = document.querySelector(".input-english").value.toLowerCase();
            let ENG_WORD = eng_word_dirty;
            if (ENG_WORD.endsWith(" ")) {
                ENG_WORD = ENG_WORD.slice(0, -1);
            }

            const ru_word_dirty = document.querySelector(".input-russian").value.toLowerCase();
            let RU_WORD = ru_word_dirty;
            if (RU_WORD.endsWith(" ")) {
                RU_WORD = RU_WORD.slice(0, -1); 
            }

            if (localStorage.getItem("userDict")) {
                userDict = JSON.parse(localStorage.getItem("userDict"))
            }

            const now = new Date();
            const dateString = now.toLocaleString('ua-UA').split(', ')[0]; // для России/Украины

            if (!((ENG_WORD === '') && (RU_WORD === ''))) {
                if ((ENG_WORD !== '') && (RU_WORD !== '')) {
                    let RU_WORD_ARR = [];
                    let curr_ru_word = '';
                    for (let i = 0; i < RU_WORD.length; i++) {
                        if (isLowerCyrillic(RU_WORD[i])) {
                            curr_ru_word += RU_WORD[i];
                            if (i === RU_WORD.length-1) {
                                RU_WORD_ARR.push(curr_ru_word);
                                curr_ru_word = '';
                            }
                        } else {
                            if (curr_ru_word !== '') {
                                RU_WORD_ARR.push(curr_ru_word);
                                curr_ru_word = '';
                            }
                        }
                    }

                    if (not_have(ENG_WORD)) {
                        userDict.push({"word": ENG_WORD, "translates": RU_WORD_ARR, "date": dateString});
                    }
                } else if (ENG_WORD !== '') {
                    if (not_have(ENG_WORD)) {
                        userDict.push({"word": ENG_WORD, "translates": translate_en_2_ru(ENG_WORD), "date": dateString});
                    }
                } else if (RU_WORD !== ''){
                    const ENG_WORDS_ARR = translate_ru_2_en(RU_WORD);
                    for (let i = 0; i < ENG_WORDS_ARR.length; i++) {
                        const TR_EN_RU = translate_en_2_ru(ENG_WORDS_ARR[i]);
                        if (RU_WORD === TR_EN_RU[0]) {
                            if (not_have(ENG_WORDS_ARR[i])) {
                                userDict.push({"word": ENG_WORDS_ARR[i], "translates": TR_EN_RU, "date": dateString});
                            }
                        }
                    }
                }

                localStorage.setItem("userDict", JSON.stringify(userDict));
                hide_new_question_arr();
                location.reload();
            }
        }

        function are_you_sure(word) {
            let userDict = JSON.parse(localStorage.getItem("userDict")) || [];

            for (let i = 0; i < userDict.length; i++){
                if (userDict[i]["word"] === word) {
                    userDict.splice(i, 1);
                }
            }

            localStorage.setItem("userDict", JSON.stringify(userDict));
            location.reload();
        }

        function wordForm(n) {
            n = Math.abs(n) % 100;
            let n1 = n % 10;

            if (n > 10 && n < 20) return "слов";
            if (n1 === 1) return "слово";
            if (n1 >= 2 && n1 <= 4) return "слова";
            return "слов";
        }


        function showDictContent() {
            const DICT_POLE = document.querySelector(".dict-arr");
            const DICT_CONTENT_JSON = JSON.parse(localStorage.getItem("userDict")) || [];
            const dict_len = DICT_CONTENT_JSON.length;
            let dictContentHTML =  '';
            let preContentHTML = `<h2 style="text-align: center; border-bottom: solid 1px #7f7f7f44; padding: 10px; color: #7f7f7f;">${dict_len} ${wordForm(dict_len)}  <font style="color: #7f7f7f44;">|</font>  `;
            let today = 0;
            const now = new Date();
            const curr_date = now.toLocaleString('ru-RU').split(', ')[0];
            const TRASH_ICON = '<svg fill="#ffffffee" width="26px" height="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 41.336 41.336" xml:space="preserve"><g><path d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2 s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2 S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5 s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5 s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21 c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z"/></g></svg>';

            for (let i = DICT_CONTENT_JSON.length-1; i >= 0; i--) {
                dictContentHTML += `<div class="word-line"><div class="h4-arr"><h4>${DICT_CONTENT_JSON[i]["word"]} - `;
                dictContentHTML += `<font color="#2b5cce">${DICT_CONTENT_JSON[i]["translates"][0]}</font>`;
                if (DICT_CONTENT_JSON.length > 1) {}
                    dictContentHTML += `<font color="#7f7f7f">, `
                    for (let j = 1; j < DICT_CONTENT_JSON[i]["translates"].length - 1; j++) {
                        dictContentHTML += `${DICT_CONTENT_JSON[i]["translates"][j]}, `;
                    }
                    dictContentHTML += DICT_CONTENT_JSON[i]["translates"][DICT_CONTENT_JSON[i]["translates"].length - 1];
                if (curr_date === DICT_CONTENT_JSON[i]['date']) {
                    today += 1;
                }

                dictContentHTML += `</font></h4><button class="word-del-btn" onclick="are_you_sure('${DICT_CONTENT_JSON[i]["word"]}')">${TRASH_ICON}</button></div><h6>${DICT_CONTENT_JSON[i]["date"]}</h6></div>\n`;
            
            }

            dictContentHTML += `<h6><br><br><br><br><br><br><br><br></h6>`

            preContentHTML += `+${today} сегодня</h2>`;

            DICT_POLE.innerHTML = preContentHTML + dictContentHTML;
        }


        function show_settings() {
            let newWord = document.querySelector('.settings-page-arr');
            if (document.querySelector('.settings-page-arr-disable')) {
                newWord.classList.remove('settings-page-arr-disable');
            }
            newWord.style.display = 'flex';
            setTimeout(() => {
                newWord.classList.add('settings-page-arr-enable');
            });
        }


        function hide_settings() {
            let newWord = document.querySelector('.settings-page-arr');
            if (document.querySelector('.settings-page-arr-enable')) {
                newWord.classList.remove('settings-page-arr-enable');
            }
            newWord.classList.add('settings-page-arr-disable');
            setTimeout(() => {
                newWord.style.display = 'none';
            }, 300);
        }

        function onClickOutside(selector, callback) {
            document.addEventListener('click', (event) => {
                const targetArea = document.querySelector(selector);
                if (targetArea && !targetArea.contains(event.target)) {
                callback();
                }
            });
        }


        function send_data_by_json() {
            const IMPORT_JSON = document.querySelector("#import-json-textarea").value;
            let importJson = '';
            const index = IMPORT_JSON.indexOf('[');
            for (let i = index; i < IMPORT_JSON.length; i++) {
                importJson += IMPORT_JSON[i];
            }
            localStorage.setItem("userDict", importJson);
            alert("Информация JSON успешно отправлена!");
            document.querySelector(".textarea").innerHTML = '<textarea name="" id="import-json-textarea"></textarea>';
        }


        function get_data_json() {
            return localStorage.getItem("userDict");
        }

        function back_to_game() {
            location.href = "/index.html";
        }
        