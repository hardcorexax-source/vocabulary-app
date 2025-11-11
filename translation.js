
        function translate_en_2_ru(text) {
            const textLower = text.toLowerCase();
            text = '';
            for (let i = 0; i < textLower.length - 1; i++){
                text += textLower[i];
            }

            if (textLower[textLower.length - 1] !== ' ') {
                text += textLower[textLower.length - 1];
            }

            let translates = [];

            for (let i = 0; i < 86062; i++) {
                if (DICT_ARR[i]["word"] === text) {
                    translates = DICT_ARR[i]["translates"];
                }
            }

            return translates;
        }

        function translate_ru_2_en(text) {
            const textLower = text.toLowerCase();
            text = '';
            for (let i = 0; i < textLower.length - 1; i++){
                text += textLower[i];
            }

            if (textLower[textLower.length - 1] !== ' ') {
                text += textLower[textLower.length - 1];
            }

            let words = [];

            for (let i = 0; i < 86062; i++) {
                const DICT_ARR_TRANSLATES = DICT_ARR[i]["translates"];
                if (DICT_ARR_TRANSLATES.includes(text)) {
                    words.push(DICT_ARR[i]["word"]);
                }
            }

            return words;
        }