/*
 * openTab
 * openTab API is used in conjunction with custom tabs.
*/
function openTab(evt, tabHeadingClass, tabContentClass, tabContentId) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName(tabContentClass);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName(tabHeadingClass);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabContentId).style.display = "block";
    evt.currentTarget.className += " active";
  }

/**************************************************
 * ReactJS Components:
 *
 * This library will use the core ReactJS APIs and not rely
 * on the JSX.
 * Each JSX element is just syntactic sugar for calling 
 *
 * Tow main APIs:
 * 1. Create a new component/element:
 *   React.createElement(component, props, ...children). 
 *  
 * So, anything you can do with JSX can also be done with just 
 *  plain JavaScript.
 *
 * https://reactjs.org/docs/react-api.html#createelement
 *
 * 2. Render a React Component:
 *   ReactDOM.render(element, container[, callback])
 * 
 * Other lifecycle methods:
 *   componentDidMount() method runs after the component 
 *   output has been rendered to the DOM. 
 * 
 * 
***************************************************/


/*
 * Category Content.
 * Jumbotron:
 * 
 * 
 */
class Jumbotron extends React.Component {
    constructor (props) {
        super(props); 
        this.state = {
            data: "Sample",
            color: "black",
            fontFamily: "Sans Serif"
        };

        this.style_overrides = [
            "color", "backgroundColor", "fontFamily"
        ];
    }

    componentDidMount () {
        console.log("componentDidMount");
        this.setState({data: this.props.text});
    }

    componentWillMount () {
        console.log("componentWillUnmount");
    }

    set_style (prop_style) {
        //Set default style
        let header_style = {
            color: "black",
            backgroundColor: "White",
            padding: "10px",
            fontFamily: "Sans Serif"
        };
        //Overrides.
        for (let idx in this.style_overrides) {
          let override = this.style_overrides[idx];
          if (override in prop_style) {
            console.log("Override: " + override);
            header_style[override] = prop_style[override];
          }
        }
        return(header_style);
    }

    set_id (props) {
        let id = "jumbo-" + Math.ceil(Math.random() * 100000);
        if (this.props.hasOwnProperty("id") && this.props.id != undefined) {
            console.log("Id is specified, set it "  + this.props.id);
            id = props.id;
        }
        return(id);
    }

    clickHandler = (event, data) => {
      console.log("clicked " + event.target.value);
      let rand_str = "Random: " + Math.ceil(Math.random() * 100000);
      this.setState({data: "Clicked " + rand_str});
    }
    
    render () {
        console.log("Jumbotron, render!");
        const header_style = this.set_style(this.props.style);

        let id = this.set_id(this.props);

        let props = {
          id: id,
          style: header_style
        };

        if ("class" in this.props) {
          props['class'] = this.props.class;
        }
        props['onClick'] = this.clickHandler;

        let elem =  React.createElement(
            this.props.element_type, props, "Name: ",  this.state.data);

        return(elem);
    }
}


create_jumbotron = (user_input, container) => {
    const valid_elements = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const valid_class = ["display-1", "display-2", "display-3", 
                   "display-4", "display-5", "display-6"];

    if (! valid_elements.includes(user_input.element_type)) {
        console.log("Pass valid h elements");
        return; 
    }

    if (! valid_class.includes(user_input.class)) {
      console.log("Pass valid class elements");
      return
    }

    /*
     * Set default props.
     */
    let jtprops = {
        id: user_input.id,
        element_type: user_input.element_type,
        class: user_input.display,
        text: user_input.text,
        style: {
            color: "black",
            fontFamily: "Times New Roman",
            backgroundColor: "#d6edd5"
        }
    }  

    let jt = React.createElement(Jumbotron, jtprops, null);
    ReactDOM.render(jt, container);
}


/*
 * Category: Content
 * Table
 * A Table has the following sub components:
 *   . Table Header thead
 *     . header row
 *   . Table Body
 *     . Table rows
 */
class Table extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    componentDidMount () {
        console.log("componentDidMount");
        this.setState({data: this.props.data});
        console.log(this.state.data);
        console.log("end -- componentDidMount");
    }

    componentWillMount () {
        console.log("Table - componentWillmount");
        this.setState({data: this.props.data});
        console.log(this.state.data);
        console.log("end -- componentWillMount");
    }

    render () {
        console.log("Table - render");
        // Table Header
        let columns = this.state.data.headers;
        //let columns = this.props.data.headers;
        let scope = "col";
        let th_list = [];
        for (let idx in columns) {
            let obj = React.createElement(
                "th", {scope: scope, id: idx }, columns[idx]);
            th_list.push(obj);
        }
        let tr = React.createElement("tr", null, th_list);
        let thead = React.createElement("thead", null, tr)

        // Table Body.
        //let data = this.props.data.rows;
        let data = this.state.data.rows;
        let tr_list = [];
        for (let row_idx in data) {
            let th_ro = React.createElement("th", null, row_idx);
            let cols = [];
            for (let col_idx in data[row_idx]) {
                cols.push(React.createElement(
                    "td", null, data[row_idx][col_idx]));  
            }
            let obj = React.createElement("tr", null, th_ro, cols);
            tr_list.push(obj);
        }
        let tbody = React.createElement("tbody", null, tr_list)
        
        // Table
        let table = React.createElement(
          "table", {class: "table table-bordered"}, thead, tbody);
        return (table);
    }
}

  
create_table = () => {
  let table_props = {
      data: {
          headers: ["#", "First", "Last", "Hanndle"],
          rows: [
              ["Larry", "Bird", "@bird"],
              ["Justin", "Donahue", "@donahue"],
              ["John", "Johnson", "@jj"]
          ]
      }
  }
  let tb = React.createElement(Table, table_props, null);
  ReactDOM.render(tb, document.getElementById("table1"));
}




// function create_element(elem) {
//   let new_jumbotron = React.createElement(eval(elem), newp, null);
//   ReactDOM.render(new_jumbotron, document.getElementById("root2"));
// }


/*
 * Grid Layout.
 * This is a encompassing component.
 * Available props:
 * {
 *     columns: <no of columns>
 * }
 * 
 */

class Grid extends React.Component {
    constructor (props) {
        super(props);
    }
  
    set_style (columns) {
        let grid_template_columns = "repeat(" + columns + ", 1fr)";

        let grid_style = {
            display: 'grid',
            gridAutoRows: 'minmax(20px, auto)',
            gridGap: '5px',
            gridTemplateColumns: grid_template_columns
        };  

        return (grid_style);
    }

    prepare_grid () {
        console.log("Prepare grid");
    }

  render () {
      let jumbo_props = {
          style: this.props.style,
          class: "gelem  c1c4  r1r2  colored"
      }

      let jumbotron = React.createElement(Jumbotron3, 
          jumbo_props, null);
      let gelem1 = React.createElement(
          "div", {class: "gelem  c1c4  r1r2  colored" }, "One");
      let gelem2 = React.createElement(
          "div", {class: "gelem  c1c2 r2r4 colored" }, "two");
      let gelem3 = React.createElement(
          "div", {class: "gelem c2c4 r2r4 colored" }, "three");

      let grid_style = this.set_style(this.props.columns);

      console.log(grid_style);
      let elem = React.createElement(
          "div", {style: grid_style}, "main grid", jumbotron, gelem2, gelem3);

          return elem
  }
}

let gridprops = {
  columns: 3,
  style: {
      color: "yellow"
  }
}
let main_grid = React.createElement(Grid, gridprops, null);
ReactDOM.render(main_grid, document.getElementById("main-grid"));



