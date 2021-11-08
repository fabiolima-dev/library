function forAddBook () {

    //Making add book form

    addBook.setAttribute("style", "padding: 30px")
    const removedClick = addBook.removeChild(click);    
    const form = document.createElement("form");
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    const authorLabel = document.createElement("label");
    const authorInput = document.createElement("input");
    const pagesLabel = document.createElement("label");
    const pagesInput = document.createElement("input");
    const readContainer = document.createElement("div")
    const readLabel = document.createElement("label")
    const readInput = document.createElement("input");
    const unreadContainer = document.createElement("div")
    const unreadLabel = document.createElement("label");
    const unreadInput = document.createElement("input");
    const sendContainer = document.createElement("button");
    const send = document.createElement("h4");

    form.setAttribute("id", "form")
    titleInput.setAttribute("class", "input")
    authorInput.setAttribute("class", "input")
    pagesInput.setAttribute("class", "input")
    readContainer.setAttribute("class", "read-container")
    unreadContainer.setAttribute("class", "read-container")
    readInput.setAttribute("type", "radio")
    readInput.setAttribute("name", "read")
    unreadInput.setAttribute("type", "radio")
    unreadInput.setAttribute("name", "read")
    sendContainer.setAttribute("class", "button")
    send.setAttribute("id", "send")

    titleLabel.innerHTML = "Title";
    authorLabel.innerHTML = "Author";
    pagesLabel.innerHTML = "Pages";
    readLabel.innerHTML = "Read";
    unreadLabel.innerHTML = "Unread";
    send.innerHTML = "Send";

    readContainer.append(readInput, readLabel)
    unreadContainer.append(unreadInput, unreadLabel)
    sendContainer.append(send)
    form.append(
        titleLabel,
        titleInput,
        authorLabel,
        authorInput,
        pagesLabel,
        pagesInput,
        readContainer,
        unreadContainer,
        sendContainer
    );
    addBook.append(form);

    addBook.onclick = null;

    //Send form and making book card
    sendContainer.onclick = () => {
        let read;
        if (readInput.checked) {
            read = true;
        } else if (unreadInput.checked) {
            read = false;
        };
        forSend(
            titleInput.value,
            authorInput.value,
            pagesInput.value,
            read);

        //Making add book screen again
        addBook.innerHTML = "";
        addBook.setAttribute("style", "padding: 0px")
        addBook.append(removedClick);
        click.onclick = () => {
            forAddBook();
        }
    }
}

function forSend (title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    elementPoistion = books.push(book);
    addBookCard(book, elementPoistion);
    localStorage.setItem("books", JSON.stringify(books))
}

function addBookCard (book, elementPosition) {
    const bookDiv = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("h4");
    const pages = document.createElement("h4");
    const buttonsContainer = document.createElement("div");
    const readContainer = document.createElement("button");
    const read = document.createElement("h4")
    const x = document.createElement("button");

    bookDiv.classList.add("book")
    buttonsContainer.classList.add("buttonsContainer")
    readContainer.classList.add("button")
    read.setAttribute("id", "read");
    x.setAttribute("id", "x");

    title.innerHTML = `${book.title}`;
    author.innerHTML = `By:<br>${book.author}`
    pages.innerHTML = `Pages:<br>${book.pages}`
    x.innerHTML = "x"

    if (book.read) {
        read.innerHTML = "Unreaded"
        readContainer.onclick = () => {
            makeReaded(read, bookDiv, readContainer, read, x, book)
            book.read = !book.read;
            localStorage.setItem("books", JSON.stringify(books))
        }
    } else {
        makeReaded(read, bookDiv, readContainer, read, x, book);
    }

    x.onclick = () => {
        main.removeChild(bookDiv);
        books.splice(elementPosition, 1)
        localStorage.setItem("books", JSON.stringify(books))
    }
    bookDiv.append(title, author, pages, buttonsContainer);
    buttonsContainer.append(readContainer, x);
    main.appendChild(bookDiv);
    readContainer.append(read)
}

function makeReaded (
    text,
    background,
    buttonBackground,
    buttonText,
    x,
    book
    ) {
    text.innerHTML = "Readed"
    background.setAttribute("id", "readed-book")
    buttonBackground.setAttribute("id", "readed-container")
    buttonText.setAttribute("id", "readed-read")
    x.setAttribute("id", "readed-x")
    buttonBackground.onclick = () => {
        makeUnreaded(
            text, 
            background,
            buttonBackground,
            buttonText,
            x,
            book
            )
        book.read = !book.read;
        localStorage.setItem("books", JSON.stringify(books))
    }
}

function makeUnreaded (
    text,
    background,
    buttonBackground,
    buttonText,
    x,
    book
    ) {
    text.innerHTML = "Unreaded"
    background.removeAttribute("id", "readed")
    buttonBackground.removeAttribute("id", "readed-container")
    buttonText.setAttribute("id", "read")
    x.setAttribute("id", "x")
    buttonBackground.onclick = () => {
        makeReaded(
            text, 
            background,
            buttonBackground,
            buttonText,
            x
            )
        book.read = !book.read;
        localStorage.setItem("books", JSON.stringify(books))
    }
}

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

let books = [];

const main = document.querySelector("main")

const addBook = document.querySelector("#add-book");

const click = document.querySelector("#click")

if (localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"));
    books.forEach( book => {
        addBookCard(book)
    })
}

click.onclick = () => {
    forAddBook();
};
