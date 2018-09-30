"use strict";

(function() {
    let wordCount = 0;
    let currentData = 1;
    let correct = 0;
    window.onload = function() {
        if (document.querySelectorAll(".wordcontainer").length != 0) {
            wordCount = document.querySelectorAll(".wordcontainer").length;
            currentData = document.querySelectorAll(".wordcontainer")[1].children.length - 2;
            for (let i = 0; i < wordCount.length; i++) {
                if (wordCount[i].children[wordCount[i].children.length - 1].classList.contains("correct")) {
                    correct++;
                }
            }
        }
        $("submit-listno").onclick = function() {
            if ($("list").value.length != 0){
            	$("listID").classList.add("hidden");
                let listNum = $("list").value;
                $("list-no").innerText = "List " + listNum;

            } 
        };

        document.onkeydown = function() {
            if(event.keyCode == 13) {
                addRow();
            } 
        };

        $("add-row").onclick = addRow;

        $("add-col").onclick = function() {
            if ($("vocab-area").children.length != 0) {
                $("stats").innerText += "Round " + currentData + ": " + correct + " correct out of " + wordCount + " words. \n";
                let wordList = document.querySelectorAll(".wordcontainer")
                for (let i = 0; i < wordList.length; i++) {
                    let container = wordList[i];
                    container.children[container.children.length - 1].classList.add
                    let data = document.createElement("div");
                    data.style.width = window.getComputedStyle(container).height;
                    data.classList.add("data");
                    container.appendChild(data);
                    data.onclick = function () {
                        updateCorrect(container, data);
                    };
                }
                currentData++;
                correct = 0;
            }
        };

        clickBox();
        
        hideOrShow();

        $("remove-row").onclick = function() {
            getLastWord();
        };

        $("edit-last").onclick = editVocab;

        $("hide-def").onclick = function() {
            let defs = document.querySelectorAll(".def")
            for (let i = 0; i < defs.length; i ++) {
                if ($("hide-def").innerText == "Hide Definition" 
                    && !defs[i].classList.contains("hidden")) {
                    defs[i].classList.add("hidden");
                } else {
                    defs[i].classList.remove("hidden");
                }
            }
            if ($("hide-def").innerText == "Hide Definition") {
                $("hide-def").innerText = "Show Definition";
            } else {
                $("hide-def").innerText = "Hide Definition";
            }
        };
    };

    function addRow(){
        if ($("new-vocab").value != "" && $("new-def").value != "") {
            if (wordCount % 10 == 0 && wordCount != 0) {
                let br = document.createElement("br");
                br.classList.add("divider");
                $("vocab-area").appendChild(br);
            }
            let defs = document.querySelectorAll(".def")
            for (let i = 0; i < defs.length; i ++) {
                if (defs[i].classList.contains("hidden")) { 
                    defs[i].classList.remove("hidden");
                }
            }
            $("hide-def").innerText = "Hide Definition";
            createRow(currentData);
            wordCount++;
            $("new-vocab").focus();
        }
    }

    function clickBox() {
        let wordList = document.querySelectorAll(".wordcontainer");
        for (let i = 0; i < wordList.length; i++) {
            let container = wordList[i];
            let data = container.children[container.children.length - 1];
            data.onclick = function () {
                updateCorrect(container, data);
            };
        }
    }

    function hideOrShow() {
        let words = document.querySelectorAll(".wordcontainer");
        for (let i = 0; i < words.length; i++) {
            let definition = words[i].children[0];
            words[i].children[1].onclick = function () {    
                if(definition.classList.contains("hidden")) {
                    definition.classList.remove("hidden");
                } else {
                    definition.classList.add("hidden");
                }
            };
            definition.onclick = function () {
                definition.classList.add("hidden");
            };
        }
    }

    function createRow(currentData) {
        let container = document.createElement("div");
        container.classList.add("wordcontainer");
        let definition = document.createElement("div");
        definition.classList.add("def");
        definition.innerText = $("new-def").value;
        $("new-def").value = "";
        container.appendChild(definition);
        let word = document.createElement("div");
        word.innerText = $("new-vocab").value;
        $("new-vocab").value = "";
        word.classList.add("word");
        container.appendChild(word);
        word.onclick = function () {
            if(definition.classList.contains("hidden")) {
                definition.classList.remove("hidden");
            } else {
                definition.classList.add("hidden");
            }
        };
        definition.onclick = function () {
            definition.classList.add("hidden");
        };
        $("vocab-area").appendChild(container);
        for (let i = 0; i < currentData; i++) {
            let data = document.createElement("div");
            data.style.width = window.getComputedStyle(container).height;
            data.classList.add("data");
            container.appendChild(data);
            data.onclick = function () {
                updateCorrect(container, data);
            }
        }
    }

    function updateCorrect(container, data) {
        if (nodeIndex(container.children, data) == container.children.length - 1) {
            if (!data.classList.contains("correct")) {
                data.classList.add("correct");
                correct++;
            } else {
                data.classList.remove("correct");
                correct--;
                if (correct < 0) {
                    correct = 0;
                }
            }
        }
    }

    function getLastWord() {
        let wordList = document.querySelectorAll(".wordcontainer");
            if (wordList.length != 0) {
                let lastVocab = wordList[wordCount - 1];
                if (lastVocab.children[lastVocab.children.length - 1].classList.contains("correct")) {
                    correct--;
                }
                let breaks = document.querySelectorAll("#vocab-area br");
                if (wordCount >= 10 && (wordCount - 1) % 10 == 0) {
                    let divider = breaks[breaks.length - 1];
                    $("vocab-area").removeChild(divider);
                }
                $("vocab-area").removeChild(wordList[wordCount - 1]);
                wordCount--;
                return lastVocab;
            }
    }

    function editVocab() {
        let vocab = getLastWord();
        $("new-def").value = vocab.children[0].innerText;
        $("new-vocab").value = vocab.children[1].innerText;
    }

    function nodeIndex(container, data) {
        for (let i = 0; i < container.length; i++) {
            if (container[i] == data) {
                return i;
            }
        }
        return -1;
    }


    function $(id) {
		return document.getElementById(id);
	}
})();