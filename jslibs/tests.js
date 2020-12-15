console.log("Running tests");

user_input = {
    element_type: "h3",
    class: "display-3",
    text: "This is a test"
}
let container = document.getElementById("test1")
create_jumbotron(user_input, container);

user_input['element_type'] = "h2";
user_input['class'] = "display-2";
container = document.getElementById("test2");
create_jumbotron(user_input, container);

create_table();


// test_text = () => {
//     let user_input = {
//         element_type: "h3",
//         class: "display-3",
//         text: new Date().toLocaleString()
//     }
//     let container = document.getElementById("test3");
//     create_jumbotron(user_input, container);
// }
// test_text();

// setInterval(() => {
//     test_text();
// }, 2000);