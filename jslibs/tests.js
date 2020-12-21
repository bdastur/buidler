console.log("Running tests");

function ResetTest() {
    let domElem = document.getElementById("testsetup");
    ReactDOM.unmountComponentAtNode(domElem);

    let testInfoContainer = document.getElementById("testinfo");
    ReactDOM.unmountComponentAtNode(testInfoContainer);
}

/*******************************************************
 *  Main Test function
 *******************************************************/
function  InvokeTest(id) {
    console.log("Invoke Test " + id);
    let data = {}
    switch (id) {
        case "jt1":
            console.log("Execute testcase jt1");
            data['component'] = "Jumbotron";
            data['test'] = "A simple Jumbotron usage";
            data['details'] = "props: ";
            setTestInfo(data);
            var jtprops = {
                id: "h5-1",
                element_type: "h3",
                class: "display-3",
                text: "This is a  test Jumbotron",
                style: {
                    color: "blue",
                    fontFamily: "Times New Roman",
                    backgroundColor: "#d6edd5"
                }
            };
            testJumbotron(jtprops);
            break;
        case "jt2":
            console.log("Execute testcase jt2");
            data['component'] = "Jumbotron";
            data['test'] = "A Jumbotron example - using default props";
            data['details'] = "props: ";
            var jtprops = {
                element_type: "h3",
                text: "Test 2"
            }
            setTestInfo(data);
            testJumbotron(jtprops);
            break;
        case "jt3":
            console.log("Execute testcase jt3");
            data['component'] = "Jumbotron";
            data['test'] = "A Jumbotron example - set props to null";
            data['details'] = "props: ";
            setTestInfo(data);
            testJumbotron(null);
            break;
    
        default:
            console.log("Default switch, No test case defined: " + id);
            break;
    }
}

/***************************************************************
 * Set test info - Details on what component, what test is run
 ****************************************************************/
function setTestInfo (data) {
    console.log(data);
    let testInfoContainer = document.getElementById("testinfo");
    let message = "Test Info:: ";
    message += "Component: " + data['component'] + ", ";
    message += "Testcase: " + data['test'] + ", ";
    message += "Details: " + data['details']

    /*
     * Set default props.
     */
    let jtprops = {
        id: "h6-1",
        element_type: "h6",
        class: "display-6",
        text: message,
        style: {
            color: "black",
            fontFamily: "Times New Roman",
            backgroundColor: "#d6edd5"
        }
    };

    let jt = React.createElement(Jumbotron, jtprops, null);
    ReactDOM.render(jt, testInfoContainer);

}

/***************************************************************
 * Test function: Test Jumbotron component.
 ****************************************************************/
function testJumbotron(jtprops) {

    if (jtprops == undefined) {
        console.log("JT props are undefined");
    }

    let testContainer = document.getElementById("testsetup");
    let jt = React.createElement(Jumbotron, jtprops, null);
    ReactDOM.render(jt, testContainer);
}



// user_input = {
//     element_type: "h3",
//     class: "display-3",
//     text: "This is a test"
// }
// let container = document.getElementById("test1")
// create_jumbotron(user_input, container);

// user_input['element_type'] = "h2";
// user_input['class'] = "display-2";
// container = document.getElementById("test2");
// create_jumbotron(user_input, container);

create_table();

let form = React.createElement(Form, null, null);
ReactDOM.render(form, document.getElementById("form"));


let signup = React.createElement(Signup, null, null);
ReactDOM.render(signup, document.getElementById("signup"));


let card = React.createElement(Card, null, null);
ReactDOM.render(card, document.getElementById("card1"));


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