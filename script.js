/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.querySelector(".menu-btn");

const navLinks =
    document.querySelector(".nav-links");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        const isOpen =
            navLinks.classList.toggle("show");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}



/* =========================================
   QUOTE SLIDER
========================================= */

const quotes =
    document.querySelectorAll(
        ".quote-slider blockquote"
    );

const nextButton =
    document.querySelector(".quote-next");

const previousButton =
    document.querySelector(".quote-prev");

const quoteCounter =
    document.querySelector(".quote-counter");


let currentQuote = 0;


function showQuote(index) {

    if (!quotes.length) {
        return;
    }


    quotes.forEach(function (quote) {

        quote.classList.remove(
            "active-quote"
        );

    });


    quotes[index].classList.add(
        "active-quote"
    );


    if (quoteCounter) {

        quoteCounter.textContent =
            `${index + 1} / ${quotes.length}`;

    }

}



if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            currentQuote++;

            if (
                currentQuote >= quotes.length
            ) {

                currentQuote = 0;

            }

            showQuote(currentQuote);

        }
    );

}



if (previousButton) {

    previousButton.addEventListener(
        "click",
        function () {

            currentQuote--;

            if (currentQuote < 0) {

                currentQuote =
                    quotes.length - 1;

            }

            showQuote(currentQuote);

        }
    );

}



/* =========================================
   AUTO QUOTE CHANGE
========================================= */

if (quotes.length > 1) {

    setInterval(function () {

        currentQuote++;

        if (
            currentQuote >= quotes.length
        ) {

            currentQuote = 0;

        }

        showQuote(currentQuote);

    }, 6000);

}



/* =========================================
   MESSAGE CHARACTER COUNTER
========================================= */

const messageInput =
    document.getElementById(
        "message"
    );

const characterCount =
    document.getElementById(
        "characterCount"
    );


if (messageInput && characterCount) {

    messageInput.addEventListener(
        "input",
        function () {

            characterCount.textContent =
                messageInput.value.length;

        }
    );

}



/* =========================================
   MESSAGE WALL
========================================= */

const messageForm =
    document.getElementById(
        "messageForm"
    );

const messageList =
    document.getElementById(
        "messageList"
    );



function getMessages() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "doctorMessages"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}



function saveMessages(messages) {

    try {

        localStorage.setItem(
            "doctorMessages",
            JSON.stringify(messages)
        );

    } catch (error) {

        console.log(
            "Messages could not be saved."
        );

    }

}



function createMessageCard(name, text) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "message-card";


    const nameElement =
        document.createElement(
            "strong"
        );

    nameElement.textContent =
        name;


    const textElement =
        document.createElement(
            "p"
        );

    textElement.textContent =
        text;


    card.appendChild(
        nameElement
    );


    card.appendChild(
        textElement
    );


    messageList.appendChild(
        card
    );

}



function loadMessages() {

    if (!messageList) {
        return;
    }


    const messages =
        getMessages();


    messageList.innerHTML = "";


    if (messages.length === 0) {

        const empty =
            document.createElement(
                "p"
            );

        empty.className =
            "empty-message";

        empty.textContent =
            "Your first message will begin the wall.";

        messageList.appendChild(
            empty
        );

        return;

    }


    messages.forEach(function (message) {

        createMessageCard(
            message.name,
            message.text
        );

    });

}



if (messageForm) {

    messageForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            if (
                name === "" ||
                message === ""
            ) {

                return;

            }


            const messages =
                getMessages();


            messages.push({

                name: name,

                text: message

            });


            saveMessages(messages);


            messageForm.reset();


            if (characterCount) {

                characterCount.textContent =
                    "0";

            }


            loadMessages();

        }
    );

}



/* =========================================
   INITIALIZE
========================================= */

showQuote(0);

loadMessages();