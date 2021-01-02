/**********************************************************************
 * ReactJS Components:
 *
 * This library will use the core ReactJS APIs and not rely
 * on the JSX. Each JSX element is just syntactic sugar for calling
 *
 * Tow main APIs:
 * 1. Create a new component/element:
 *   React.createElement(component, props, ...children).
 *
 * So, anything you can do with JSX can also be done with just plain JavaScript.
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
 * =========================================================================
 *  Lifecycle:
 *  ------------------------------------------------------------------------
 *  MOUNTING:
 *  ---------------------------
 *  These methods are called in the following order when an instancce of the
 *  component is created.
 *  | constructor()
 *  | static getDerivedStateFromProps()
 *  | render()
 *  v componentDidMount()
 * 
 *  UPDATING:
 *  ----------------------------
 *  | static getDerivedStateFromProps()
 *  | shouldComponentUpdate() : Default behavior render  
 *  | render()
 *  | getSnapshotBeforeUpdate()
 *  v componentDidUpdate()
 * 
 *  UNMOUNTING
 * -------------------------------
 *  componentWillUnmount()
 * 
 * =========================================================================
 *  Guidelines:
 *  ------------------------------------------------------------------------
 * 
 *  PROPS:
 * ----------------------------------------------------------
 *  - All Components should handle the following props:
 *   common:
 *   - id       : DOM ID
 *   - class    : CSS Class
 *   - style    : Object that can define additional styles.
 * 
 *   - callback : A callback for communicatig with parent component
 *   - Additional props specific to component
 * 
 *  NAMING CONVENTIONS:
 * ------------------------------------------------------------
 *  - Use Camelcase for variables, functions, class
 *  - Event handlers: <event>Handler()
 *  - Callback handlers: <component name>Callback()
 * 
 *  NOTES:
 * - A parent can add additional css classes to the childs class.
 * 
***************************************************************************/



/******************************************************************
 * Category: Content
 ******************************************************************/

/*
 * Category:  Content.
 * Component: Jumbotron
 * State: Stateless.
 *
 * PROPS Definitions:
 *  id:  <DOM ID>
 *  element_type: ["h1".. "h6"]
 *  class:  [Add "display-1".. "display-6" for BS4 display header]
 *  text: "This is the text to display"
 *  style:
 *    color: Font color
 *    fontFamily: 
 *    backgroundColor
 * 
 * {
 *     id:                    HTML ID of the element 
 *     class:                 Element class 
 *     text:                  Text to display
 *     text_size:             [1...6]  (Default 2) 
 *     style: {
 *         color:             Text color
 *         fontFamily:        Font Family
 *         backgroundColor:   Background color
 *     }
 *   }
 * 
 */
class Jumbotron extends React.Component {
    constructor (props) {
        super(props);
        console.log("Jumbotron - Constructor invoked!");
    }

    componentDidMount () {
        console.log("componentDidMount. Text: " + this.props.text);
        this.setState({data: this.props.text});
    }

    setProps () {
      //Set defaults
      let props = {
        id: "jumbo-" + Math.ceil(Math.random() * 100000),
        element_type: "h2",
        class: "display-2",
        text: "No text",
        style: {
          color: "black",
          backgroundColor: "White",
          padding: "10px",
          fontFamily: "Sans Serif"
        }
      }
      
      if (this.props.hasOwnProperty("id") && this.props.id != undefined) {
        props['id'] = this.props.id;
      }
      if (this.props.hasOwnProperty("text_size") && this.props.text_size != undefined) {
        console.log("Set elem type and class")
        props['element_type'] = "h" + this.props.text_size
        props['class'] = "display-" + this.props.text_size
      } 

      if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
        props['class'] +=  " " + this.props.class;
      }

      if (this.props.hasOwnProperty("text") && this.props.text != undefined) {
        props['text'] = this.props.text;
      }
      
      if (this.props.style != undefined) {
        for (let [key, value] of Object.entries(this.props.style)) {
          console.log( "Key: " + key + ", val: " + value);
          props.style[key] = value
        }
      }
      
      return props;
    }

    clickHandler = (event, data) => {
      console.log("clicked " + event.target.value);
    }

    render () {
        console.log("Jumbotron - render: " + JSON.stringify(this.state));
        let props = this.setProps();
        const headerStyle = props.style;

        props['style'] = headerStyle;
        props['onClick'] = this.clickHandler;

        let elem =  React.createElement(
            props.element_type, props, props.text);

        return(elem);
    }
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

