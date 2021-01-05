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
                text: "This is a  test Jumbotron",
                text_size: 3,
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
                text: "Test 2",
                text_size: 3
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
            break;
        case "linechart1":
            console.log("Execute testcase Line chart1");
            data['component'] = "ChartJS";
            data['test'] = "A Chart example - Bar chart";
            data['details'] = "props: ";
            setTestInfo(data);

            testLineChart();
            break;
        case "card1":
            console.log("Execute testcase card1");
            data['component'] = "Card";
            data['test'] = "A Card example - Simple card";
            data['details'] = "props: ";
            setTestInfo(data);

            testCard1();
            break;
        case "card2":
            console.log("Execute testcase card2");
            data['component'] = "Card";
            data['test'] = "A Card example - Simple card";
            data['details'] = "props: ";
            setTestInfo(data);

            testCard2();
            break;
        case "card3":
            console.log("Execute testcase card3");
            data['component'] = "Card";
            data['test'] = "A Card example - Simple card";
            data['details'] = "props: ";
            setTestInfo(data);

            testCard3();
            break;
        case "grid1":
            console.log("Execute testcase grid1");
            data['component'] = "Grid Container";
            data['test'] = "A Grid example";
            data['details'] = "props: ";
            setTestInfo(data);

            testGrid1();
            break;
        case "icon1":
            console.log("Execute testcase icon 1");
            data['component'] = "Grid Container";
            data['test'] = "A Grid example";
            data['details'] = "props: ";
            testIcon(data);
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
        text: message,
        text_size: 6,
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
 * Test function: Test Card component.
 ****************************************************************/
function testCard1() {
    console.log("Test Card 1...");
    let testContainer = document.getElementById("testsetup");
    let fgProps = {
        id: "card-1",
        style: {
            width: "22rem"
        },
        cardHeader: {
            text: "Yahoo",
            text_size: 4,
            style: {
                backgroundColor: "red"
            }
        }
    };

    testCallback = (data) => {
        console.log("Callback: " + JSON.stringify(data));
    }
    fgProps['callback'] = this.testCallback

    // Create children to pass to card.
    let hCardTitle = React.createElement("h5", 
                                         {class: "card-title"}, "Card Title");

    let signup = React.createElement(Signup, null, null); 


    let fgObj = React.createElement(Card, fgProps, hCardTitle, signup);
    ReactDOM.render(fgObj, testContainer);
}


/***************************************************************
 * Test function: Test Card component.
 ****************************************************************/
function testCard2() {
    let testContainer = document.getElementById("testsetup");
    
    let cardProps = {
        style: {
            width: "22rem"
        },
        cardHeader: {
            text: "Second Card",
            text_size: 4,
            style: {
                backgroundColor: "green"
            }
        }
    };
    
    testFgCallback = (data) => {
        console.log("Callback: " + JSON.stringify(data));
    }

    let fgProps = {
        label:       "Name",
        type:        "text",
        placeholder: "Enter your name",
        small_text:  "A simple name input"
    }
    fgProps['callback'] = this.testFgCallback

    let fgObj = React.createElement(InputFormGroup, fgProps, null);


    testCallback = (data) => {
        console.log("Callback: " + JSON.stringify(data));
    }
    cardProps['callback'] = this.testCallback

    // Create children to pass to card.
    let hCardTitle = React.createElement("h5", 
                                         {class: "card-title"}, "Card Title");


    let cardObj = React.createElement(Card, cardProps, hCardTitle, fgObj);
    ReactDOM.render(cardObj, testContainer);
}

/***************************************************************
 * Test function: Test Card component.
 ****************************************************************/
function testCard3() {
    let testContainer = document.getElementById("testsetup");
    
    let cardProps = {
        style: {
            width: "34rem"
        },
        cardHeader: {
            image_source: "https://itsvit.com/wp-content/uploads/2019/05/ItSvit_DevOps-business-value-and-advantages_Cover_1-1.png",
            style: {
                opacity: "0.6"
            }
        }
    };

   
    JumbotronProps = {
        id: "jjt1",
        text: "Signup now to access free",
        text_size: 4,
        style: {
          color:      "blue",
          fontFamily: "Roboto, sans-serif"
        }
    }
    let jtObj = React.createElement(Jumbotron, JumbotronProps, null);

    let cardObj = React.createElement(ImageCard, cardProps, jtObj);
    ReactDOM.render(cardObj, testContainer);
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
    let chartProps = {};

    let data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [2, 29, 31, 5, 22, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
        {
          label: '# of People',
          data: [21, 22, 13, 5, 2, 23],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    };
    chartProps['data'] = data


    let fcObj = React.createElement(BarChart, chartProps, null);
    ReactDOM.render(fcObj, testContainer);
}

/***************************************************************
 * Test function: Test Line chart component.
 ****************************************************************/
function testLineChart(fgProps) {
    let testContainer = document.getElementById("testsetup");
    let chartProps = {};

    let data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Hazel'],
        datasets: [{
            label: '# of Votes',
            data: [2, 29, 31, 5, 22, 3],
            backgroundColor: 'rgba(129, 7, 29, 0.2)',
            borderColor:'rgba(255, 99, 132, 1)',
            borderWidth: 2
        },
        {
          label: '# of People',
          data: [21, 22, 13, 5, 2, 23],
          backgroundColor: 'rgba(19, 7, 237, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
      }]
    };
    chartProps['data'] = data


    let fcObj = React.createElement(LineChart, chartProps, null);
    ReactDOM.render(fcObj, testContainer);
}




/***************************************************************
 * Test function: Test Grid component.
 ****************************************************************/
function testGrid1(fgProps) {
    let testContainer = document.getElementById("testsetup");

    let gridProps = {
        grid: {
            columns: 5,
            style: {
                display: "grid",
                gridAutoRows: 'minmax(20px, auto)',
                gridGap: '5px'
            }
        },
        children: {
            "jumbotext1": {
              id: "test-1",
              class: "gelem c1c2 r1r2 colored",
              text: "column 2",
              text_size: 3,
              style: {
                color: "black",
                fontFamily: "Roboto, sans-serif",
                backgroundColor: "#d6edd5"
              }
            },
            "jumbotext2": {
                id: "test-2",
                class: "gelem c2c3 r1r2 colored",
                text: "column 2",
                text_size: 3,
                style: {
                  color: "black",
                  fontFamily: "Roboto, sans-serif",
                  backgroundColor: "#d6edd5"
                }
            },
            "signup": {
                class: "gelem c3c6 r1r3"
            }
        }
    }

    let jt1 = React.createElement(Jumbotron, gridProps.children['jumbotext1']);
    let jt2 = React.createElement(Jumbotron, gridProps.children['jumbotext2']);
    let signup = React.createElement(Signup, gridProps.children['signup'], null);
   
    let grid = React.createElement(Grid, gridProps.grid, jt1, jt2, signup);
     ReactDOM.render(grid, testContainer);
}



/***************************************************************
 * Test function: Test Icon
 ****************************************************************/

 class TestIcon extends React.Component {
     constructor (props) {
         super(props);
         this.state = {
             name: "home"
         }
     }

    selectCallback = (data) => {
        console.log("Select Callback: " + JSON.stringify(data));
        this.setState({name: data['value']});
    }

    iconCallback = (data) => {
        console.log("Icon Callback: " + JSON.stringify(data));
    }

     render () {
        let cardProps = {
            id: "card-1",
            style: {
                width: "22rem"
            },
            cardHeader: {
                text: "Icons",
                text_size: 4,
                style: {
                    backgroundColor: "white"
                }
            }
        };
       
        // Create children to pass to card.
        var fgProps = {
            label:       "Icons",
            placeholder: "home",
            small_text:  "Icon list",
            select_options: ["home", "sliders-h", "cogs", "hammer", "wrench", "tools",
                             "user-cog", "toolbox", "bars", "ellipsis-h", "ellipsis-v",
                             "tachometer-alt", "chart-line", "cloud", "cloud-upload-alt",
                             "bullhorn", "database", "bell", "info", "asterisk", "user-circle",
                            "user"]
        };
        fgProps['callback'] = this.selectCallback

        let form = React.createElement(SelectFormGroup, fgProps, null);

        let iconProps = {
            name: "home",
            class: "fa-home"
        }; 
        iconProps['name'] = this.state.name;
        iconProps['class'] = "fa-" + this.state.name; 
        iconProps['callback'] = this.iconCallback;

        let iconObj = React.createElement(Icon, iconProps, null);
        let cardObj = React.createElement(Card, fgProps, form, iconObj);
        return(cardObj);
     }
 }

function testIcon(test) {
    let testContainer = document.getElementById("testsetup");
   
    let testIconObj = React.createElement(TestIcon, null, null);
    ReactDOM.render(testIconObj, testContainer);
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