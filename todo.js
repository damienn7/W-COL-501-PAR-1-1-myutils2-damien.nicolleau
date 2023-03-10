class Todo {

    constructor(document) {
        this.doc = document;
    }

    checkFunctions() {
        this.count = 0;
        this.count2 = 0;
        this.addBoxes(this.doc);
        this.createSave(this.doc);
        this.createLoad(this.doc);
        this.createAdd(this.doc, this.count, this.count2);
    }

    createSave(doc) {
        //creation du bouton
        let container = doc.getElementsByClassName("container")[0];
        let btn = doc.createElement("button");
        btn.id = "save";
        btn.value = "save";
        btn.innerText = "Save";
        container.appendChild(btn);

        //creation de l'evenement
        let save = doc.getElementById("save");

        save.addEventListener("click", (e) => {
            e.preventDefault();
            this.post(this.doc);
        });
    }

    createAdd(doc, count, count2) {
        let container = doc.getElementsByClassName("todo")[0];
        let btn = doc.createElement("button");
        btn.id = "add";
        btn.value = "add";
        btn.innerText = "+";
        doc.getElementsByClassName("column")[0].appendChild(btn);

        //creation de l'evenement
        let add = doc.getElementById("add");
        add.addEventListener("click", () => {
            this.addTask(doc, container, count, count2);
            count++;
            // count2++;
            console.log(count);
            console.log(count2);
        });
    }

    addTask(doc, container, count, count2) {
        let create = doc.createElement("input");

        create.type = "text";
        create.id = "toappend";

        create.style.color = "black";

        doc.getElementsByClassName("column")[0].appendChild(create);

        doc.getElementById("add").style.display = "none";

        doc.getElementById("toappend").addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                // count++;
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                doc.getElementById("add").style.display = "";
                let textValue = doc.getElementById("toappend").value;
                doc.getElementById("toappend").remove();

                container.innerHTML += "<div class='row " + count + "'><p class='" + count + "value todovalue'>" + textValue + "</p><i class='fa fa-arrow-right " + count + "done'></i><i class='fa fa-trash remove " + count + "delete'></i></div>";

                doc.getElementsByClassName(count + "done")[0].addEventListener("click", () => {
                    doc.getElementsByClassName("done")[0].innerHTML += "<div class='row " + count2 + "'><p class='" + count2 + "value donevalue'>" + textValue + "</p><i class='fa fa-trash remove " + count2 + "delete'></i></div>";
                    doc.getElementsByClassName(count + "")[0].remove();
                    count--;
                    count2++;
                    doc.getElementsByClassName(count2 + "delete")[0].addEventListener("click", () => {
                        console.log(count2);
                        count2--;
                        doc.getElementsByClassName(count2 + "")[0].remove();
                        // add.addEventListener("click", () => {
                        //     count++;
                        //     count2++;
                        //     this.addTask(doc, container, count, count2);
                        //     console.log(count);
                        //     console.log(count2);
                        // });
                    });


                    // add.addEventListener("click", () => {
                    //     count++;
                    //     count2++;
                    //     this.addTask(doc, container, count, count2);
                    //     console.log(count);
                    //     console.log(count2);
                    // });

                });

                doc.getElementsByClassName(count + "delete")[0].addEventListener("click", () => {
                    //doc.getElementsByClassName(count)[0].remove();
                    console.log(count);
                    doc.getElementsByClassName(count + "")[0].remove();
                    // add.addEventListener("click", () => {
                    //     count++;
                    //     count2++;
                    //     this.addTask(doc, container, count, count2);
                    //     console.log(count);
                    //     console.log(count2);
                    // });
                    count--;

                });


                add.addEventListener("click", () => {
                    // count++;

                    this.addTask(doc, container, count, count2);
                    console.log(count);
                    console.log(count2);
                });
            }

            // var close = document.getElementsByClassName("remove");
            // var i;
            // let div;
            // for (i = 0; i < close.length; i++) {
            //     close[i].onclick = function () {
            //         div = this.parentElement;
            //     }
            //         div.style.display = "none";
            //     }
        });

        add.addEventListener("click", () => {
            // count++;
            // count2++;
            this.addTask(doc, container, count, count2);
            console.log(count);
            console.log(count2);
        });

        // Click on a close button to hide the current list item

        // count2++;
        // count++;
    }

    createLoad(doc) {
        let container = doc.getElementsByClassName("container")[0];
        let btn = doc.createElement("button");
        btn.id = "load";
        btn.value = "load";
        btn.innerText = "Load";
        container.appendChild(btn);

        //creation de l'evenement
        let load = doc.getElementById("load");

        load.addEventListener("click", () => {
            this.loadData(this.doc);
        });

    }

    loadData(doc) { }

    addBoxes(doc) {
        //body element
        let body = doc.body;

        //creation of the container box
        let container = doc.createElement("div");
        container.id = "container";
        container.classList = "container";
        body.appendChild(container);

        //creation of the todo box
        let todo = doc.createElement("div");
        todo.id = "todo";
        todo.classList = "todo";
        container.appendChild(todo);

        //title of the box
        let todo_append = doc.getElementsByClassName("todo")[0];
        let div = doc.createElement("div");
        div.classList = "column";
        todo_append.appendChild(div);

        let title = doc.createElement("h1");
        title.innerText = "Todo";
        doc.getElementsByClassName("column")[0].appendChild(title);

        //creation of the todo box
        let done = doc.createElement("div");
        done.id = "done";
        done.classList = "done";
        container.appendChild(done);

        let done_append = doc.getElementsByClassName("done")[0];
        let div2 = doc.createElement("div");
        div2.classList = "column";
        done_append.appendChild(div2);

        //title of the box
        let title2 = doc.createElement("h1");
        title2.innerText = "Done";
        doc.getElementsByClassName("column")[1].appendChild(title2);
    }

    post(doc) {

        try {
            //donnees a recuperer dans l'objet datas

            let array = [];
            let p = doc.querySelector("p");

            // Click on a close button to hide the current list item

            var i;
            let text = "";
            for (i = 0; i < p.length; i++) {
                text+=p.innerText;
            }
            // todo
            // Datas.append("table", text);

            //initialisation de la requete ajax
            let request = $.ajax({
                type: 'POST',
                url: 'save.php',
                asynch: true,
                data: {table:text},
                dataType: 'json'
            });

            request.done(function (output) { });

            request.fail(function (error) { alert("Erreur : " + error + " !") });

            request.always(alert("Vos taches ont bien ete enregistrees en base de donnees !"));
        } catch (e) {
            alert("Erreur retenue : " + e);
        }
    }

}

export { Todo };