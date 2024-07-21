var form = document.querySelector("form");
var submit = document.getElementById("submit");
const messageDiv = document.getElementById("messageDiv");
const message = document.getElementById("message");
const serveyDiv = document.getElementById("servey-container");
const invisibleButton = document.getElementById("invisibleButton");

form.addEventListener(
  "submit",
  (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  },
  false
);

submit.onclick = (e) => {
  if (form.checkValidity()) {
    e.preventDefault();
    serveyDiv.classList.add("d-none");
    messageDiv.classList.remove("d-none");
    invisibleButton.classList.remove("d-none");
    display();
    setTimeout(() => {
      message.classList.remove("d-none");
    }, 5500);
  }
};

const resolver = {
  resolve: function resolve(options, callback) {
    const resolveString =
      options.resolveString ||
      options.element.getAttribute("data-target-resolver");
    const combinedOptions = Object.assign({}, options, {
      resolveString: resolveString
    });

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    }

    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, {
            iterations: iterations - 1
          });

          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            element.textContent =
              partialString.substring(0, partialString.length - 1) +
              randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    }

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, {
        partialString: partialString
      });

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, {
          offset: offset + 1
        });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    }

    doResolverEffect(combinedOptions, callback);
  }
};

const strings = [
    "😁 Congrats!!!",
    "You've been hacked!",
    "Yoo ho ho ho hooo",
    "So............",
    "To find the real List click on top left corner "
];

let counter = 0;

const options = {
  offset: 0,
  timeout: 5,
  iterations: 10,
  characters: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "#",
    "%",
    "&",
    "-",
    "+",
    "_",
    "?",
    "/",
    "\\",
    "="
  ],
  resolveString: strings[counter],
  element: document.querySelector("[data-target-resolver]")
};

function callback() {
  setTimeout(() => {
    counter++;

    if (counter >= strings.length) {
      counter = 0;
    }

    let nextOptions = Object.assign({}, options, {
      resolveString: strings[counter]
    });
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

function display() {
  resolver.resolve(options, callback);
}
