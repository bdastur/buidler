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
        case "fg1":
            data['component'] = "FormGroup";
            data['test'] = "A Formgroup example - input type email";
            data['details'] = "props: ";
            setTestInfo(data);

            var fgProps = {
                label:       "Email address",
                type:        "email",
                placeholder: "Email address",
                small_text:  "We will never share your email with anyone"
            }
            testFormgroup(fgProps);
            break;
        case "fg2":
            data['component'] = "FormGroup";
            data['test'] = "A Formgroup example - input type password";
            data['details'] = "props: ";
            setTestInfo(data);

            var fgProps = {
                label:       "password",
                type:        "password",
                placeholder: "password",
                small_text:  "A password",
                class: "form-control-sm"
            }
            testFormgroup(fgProps);
            break;
        case "fg3":
            console.log("Execute testcase fg3");
            data['component'] = "FormGroup";
            data['test'] = "A Formgroup example - input type file";
            data['details'] = "props: ";
            setTestInfo(data);

            var fgProps = {
                label:       "File",
                type:        "file",
                placeholder: "File",
                small_text:  "Local file"
            }
            testFormgroup(fgProps);
            break;
        case "sg1":
            console.log("Execute testcase sg1");
            data['component'] = "SelectFormGroup";
            data['test'] = "A Select Formgroup example - input type file";
            data['details'] = "props: ";
            setTestInfo(data);

            var fgProps = {
                label:       "Numbers",
                placeholder: "Numbers",
                small_text:  "Local file",
                select_options: ["one", "two", "three"]
            }
            testSelectFormgroup(fgProps);
            break;
        case "sg2":
            console.log("Execute testcase sg2");
            data['component'] = "SelectFormGroup";
            data['test'] = "A Select Formgroup example - input type file";
            data['details'] = "props: ";
            setTestInfo(data);

            var fgProps = {
                label:       "Numbers",
                placeholder: "File",
                small_text:  "Local file",
                class: "form-control-sm",
                select_options: ["one", "two", "three"]
            }
            testSelectFormgroup(fgProps);
            break;
        case "fc1":
            console.log("Execute testcase fc1");
            data['component'] = "FormCheck";
            data['test'] = "A FormCheck example - input type checkbox";
            data['details'] = "props: ";
            setTestInfo(data);

            var fgProps = {
                label:       "Numbers",
                type: "checkbox",
                placeholder: "File",
                small_text:  "Local file",
                class: "form-control-sm",
                select_options: ["one", "two", "three"]
            }
            testFormCheck(fgProps);
            break;
        case "fc2":
            console.log("Execute testcase fc2");
            data['component'] = "FormCheck";
            data['test'] = "A FormCheck example - input type radio";
            data['details'] = "props: ";
            setTestInfo(data);

            var fgProps = {
                label:       "Verbose",
                type: "radio",
                placeholder: "File",
                small_text:  "Local file",
                class: "form-control-sm",
                select_options: ["one", "two", "three"]
            }
            testFormCheck(fgProps);
            break;
        case "col1":
            console.log("Execute testcase col1");
            data['component'] = "Collapse";
            data['test'] = "A FormCheck example - input type radio";
            data['details'] = "props: ";
            setTestInfo(data);

            var fgProps = {
                label:       "Verbose",
                type: "radio",
                placeholder: "File",
                small_text:  "Local file",
                class: "form-control-sm",
                select_options: ["one", "two", "three"]
            }
            testCollapse(fgProps);
            break;
        case "chart1":
            console.log("Execute testcase chart1");
            data['component'] = "ChartJS";
            data['test'] = "A Chart example - Bar chart";
            data['details'] = "props: ";
            setTestInfo(data);

            testBarChart();

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

/***************************************************************
 * Test function: Test Formgroup component.
 ****************************************************************/
function testFormgroup(fgProps) {
    let testContainer = document.getElementById("testsetup");

    testCallback = (data) => {
        console.log("Callback: " + JSON.stringify(data));
    }
    fgProps['callback'] = this.testCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);
    ReactDOM.render(fgObj, testContainer);
}

/***************************************************************
 * Test function: Test SelectFormgroup component.
 ****************************************************************/
function testSelectFormgroup(fgProps) {
    let testContainer = document.getElementById("testsetup");

    testCallback = (data) => {
        console.log("Callback: " + JSON.stringify(data));
    }
    fgProps['callback'] = this.testCallback

    let fgObj = React.createElement(SelectFormGroup, fgProps, null);
    ReactDOM.render(fgObj, testContainer);
}


/***************************************************************
 * Test function: Test FormCheck component.
 ****************************************************************/
function testFormCheck(fgProps) {
    let testContainer = document.getElementById("testsetup");

    testCallback = (data) => {
        console.log("Callback: " + JSON.stringify(data));
    }
    fgProps['callback'] = this.testCallback

    let fcObj = React.createElement(FormCheck, fgProps, null);
    ReactDOM.render(fcObj, testContainer);
}


/***************************************************************
 * Test function: Test Collapse component.
 ****************************************************************/
function testCollapse(fgProps) {
    let testContainer = document.getElementById("testsetup");

    let collapseProps = {
        id: "collapseOne",
        card_info: [
            {
                header_text: "Card One",
                card_body_text: "This is a body of the card",
                card_id: "cardOne"
            },
            {
                header_text: "Card Two",
                card_body_text: "This is a second body",
                card_id: "cardTwo"
            }
        ]
    };
    testCallback = (data) => {
        console.log("Callback: " + JSON.stringify(data));
    }
    fgProps['callback'] = this.testCallback
    collapseProps['callback'] = this.testCallback

    let fcObj = React.createElement(Collapse, collapseProps, null);
    ReactDOM.render(fcObj, testContainer);
}

/***************************************************************
 * Test function: Test Bar chart component.
 ****************************************************************/
function testBarChart(fgProps) {
    let testContainer = document.getElementById("testsetup");
    let fcObj = React.createElement(BarChart, null, null);
    ReactDOM.render(fcObj, testContainer);
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