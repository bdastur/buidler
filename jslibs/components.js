
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


class Form extends React.Component {
    constructor (props) {
        super(props);
    }

    submitForm = (event, value) => {
        alert("Submitted")
        console.log(value);
    }

    render () {
        let props = {
            data: {
                headers: ["#", "First", "Last", "Hanndle"],
                rows: [
                    ["Larry", "Bird", "@bird"],
                    ["Justin", "Donahue", "@donahue"],
                     ["John", "Johnson", "@jj"]
                ]
            }
        }
        let table = React.createElement(Table, props, null);
        let button = React.createElement(
            "button", {onClick: this.submitForm}, "Submit");
        let div = React.createElement("div", null, table, button);
        return(div);
    }
}

/*
 * Category: Content
 * Component: InputFormGroup.
 * 
 * A FormGroup has the following elements:
 *  - A label (describing what the input should be)
 *  - An input field.
 *  - A help text
 * 
 *  PROPS:
 *   label: <label text>
 *   type:  <input type>
 *   class: "form-control-lg", "form-control-sm" (Default always added "form-control")
 *   placeholder: The placeholder text for input
 *   small_text: The helper text underneath the input.
 * 
 * NOTE: 
 * This is a generic component, so it should not have specifics of
 * what data the caller uses. All specific logic should be set
 * in the parent.
 */

class InputFormGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps (props) {
    
    let fgProps = {
      label: props.label,
      type: props.type,
      placeholder: props.placeholder,
      small_text: props.small_text
    }

    fgProps['class'] = "form-control ";
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      fgProps['class'] +=  props.class;
    }

    return (fgProps);
  }

  onChangeHandler = (event) => {
    console.log("Value: " + event.target.value);

    let data = {
      type: this.props.type,
      value: event.target.value
    }
  
    // Invoke the provided callback.
    this.props.callback(data);
  }

  render () {
    let fgProps = this.setProps(this.props);

    let label = React.createElement("label", 
                                    null, 
                                    fgProps.label);

    let input = React.createElement("input", {type: fgProps.type ,
                                    onChange: this.onChangeHandler, 
                                    class: fgProps.class,
                                    placeholder: fgProps.placeholder},
                                    null);

    let small = React.createElement("small",
                                   {class: "form-text text-muted"},
                                   fgProps.small_text);

    let divFg = React.createElement("div", 
                                    {class: "form-group"}, 
                                    label, input, small);

    return (divFg);
  }
}


/*
 * Category: Content
 * Component: SelectFormGroup.
 * 
 * A FormGroup has the following elements:
 *  - A label (describing what the input should be)
 *  - A Select field.
 *  - A help text
 * 
 *  PROPS:
 *   label: <label text>
 *   type:  <input type>
 *   class: "form-control-lg", "form-control-sm" (Default always added "form-control")
 *   placeholder: The placeholder text for input
 *   small_text: The helper text underneath the input.
 *   select_options: A list of values for select options.
 * 
 * NOTE: 
 * This is a generic component, so it should not have specifics of
 * what data the caller uses. All specific logic should be set
 * in the parent.
 */
class SelectFormGroup extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps (props) {
    
    let fgProps = {
      label: props.label,
      placeholder: props.placeholder,
      small_text: props.small_text,
      options: props.select_options
    }

    fgProps['class'] = "form-control ";
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      fgProps['class'] +=  props.class;
    }

    return (fgProps);
  }

  onChangeHandler = (event) => {
    console.log("Value: " + event.target.value);

    let data = {
      type: this.props.type,
      value: event.target.value
    }
  
    // Invoke the provided callback.
    this.props.callback(data);
  }

  render () {
    let fgProps = this.setProps(this.props);

    let label = React.createElement("label", 
                                    null, 
                                    fgProps.label);
    
    let x = 0
    let options = [];
    for (x in fgProps.options) {
      options.push(React.createElement("option", {key: x}, fgProps.options[x]));
    }

    let select = React.createElement("select", {type: fgProps.type ,
                                    onChange: this.onChangeHandler, 
                                    class: fgProps.class,
                                    placeholder: fgProps.placeholder},
                                    options);

    let small = React.createElement("small",
                                   {class: "form-text text-muted"},
                                   fgProps.small_text);

    let divFg = React.createElement("div", 
                                    {class: "form-group"}, 
                                    label, select, small);

    return (divFg);
  }
}


/*
 * Category: Content
 * Component: FormCheck.
 * 
 * A FormCheck has the following elements:
 *  - A label (describing what the input should be)
 *  - A Select field.
 *  - A help text
 * 
 *  PROPS:
 *   label: <label text>
 *   type:  <input type>
 *   class: "form-control-lg", "form-control-sm" (Default always added "form-control")
 *   placeholder: The placeholder text for input
 *   small_text: The helper text underneath the input.
 *   select_options: A list of values for select options.
 * 
 * NOTE: 
 * This is a generic component, so it should not have specifics of
 * what data the caller uses. All specific logic should be set
 * in the parent.
 */
class FormCheck extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps (props) {
    let fgProps = {
      label: props.label,
      type: props.type,
      placeholder: props.placeholder,
      small_text: props.small_text,
      options: props.select_options
    }

    fgProps['class'] = "form-check-input ";
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      fgProps['class'] +=  props.class;
    }

    return (fgProps);
  }

  onChangeHandler = (event) => {
    console.log("Value: " + event.target.value);
    console.log("Checked: " + event.target.checked);
    let data = {
      type: this.props.type,
      value: event.target.checked
    }
  
    // Invoke the provided callback.
    this.props.callback(data);
  }

  render () {
    let fgProps = this.setProps(this.props);

    let label = React.createElement("label",
                                    {class: "form-check-label"},
                                    fgProps.label);
   
    let checkInput = React.createElement("input",
                                         {type: fgProps.type, class: fgProps.class,
                                          onChange: this.onChangeHandler, }, null);

    let divFc = React.createElement("div", 
                                    {class: "form-check"}, 
                                     checkInput, label);

    return (divFc);
  }
}



/*
 * Category: Form
 * Component: Signup
 *
 *
 */
class Signup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: "dummy",
      password: "",
      password_help_text: ""
    }
  }

  ajax_success_handler(data, status, xhr)
  {
    let curdate = new Date()
    let lastupdated_string = curdate.toDateString() + " " +
                         curdate.toTimeString()

    let timeStamp = Math.floor(Date.now() / 1000);
    let lastUpdatedTimestamp = timeStamp;

    console.log("Ajax Success Handler: ", curdate.toDateString(),
                "TIME: ", curdate.toTimeString());
    console.log(JSON.stringify(data));
    console.log(status);
  }

  ajax_error_handler(jqXHR, textStatus, errorThrown)
  {
    console.log("Ajax Error Handler: ", textStatus, "Error: ", errorThrown);
    console.log("Date: ", Date.now());
  }

  formGroupCallback = (data) => {
    if (data.type == "email") {
      this.setState({email: data.value});
    } else {
      this.setState({password: data.value});
      if (data.value.length < 8) {
        this.setState({password_help_text: "Password does not meet our standards"});
      } else {
        this.setState({password_help_text: "Password is Good!"});
      }
    }
  }

  handleonSubmit = (event) => {
    event.preventDefault();
    console.log("Handle Submit:  " + JSON.stringify(this.state));
    let url = "/signup"
    ajaxCall(url,
            this.ajax_success_handler,
            this.ajax_error_handler,
            this.state,
            "POST");
  }

  render () {
    let fg_email_props = {
      label:       "Email address",
      type:        "email",
      placeholder: "Email address",
      small_text:  "We will never share your email with anyone",
      callback:    this.formGroupCallback
    }
    let fg_email = React.createElement(InputFormGroup, fg_email_props, null);

    let fg_password_props = {
      label:       "Password",
      type:        "password",
      placeholder: "password (min 8 chars)",
      small_text:  this.state.password_help_text,
      callback:    this.formGroupCallback
    }
    let fg_password = React.createElement(InputFormGroup, fg_password_props, null);

    let submit_button = React.createElement("button", 
                                            {type: "submit", 
                                            value: "Submit", 
                                            class: "btn btn-primary"}, 
                                            "Submit");

    let form_props = {
      onSubmit: this.handleonSubmit
    }
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      form_props.class = this.props.class
    }

     console.log("BRD >>>> Form props: " + JSON.stringify(form_props));
    let form = React.createElement("form", 
                                   form_props, 
                                   fg_email, fg_password, submit_button)
    return (form);
  }
}


/******************************************************************
 * Category: Containers
 ******************************************************************/


/*
 * Category: Container.
 * Component: Card
 * This  Card  has the following components:
 *  - A card header (div)
 *      - Card title (A jumbotorn)
 *  - A card body  (div)
 *    - element (elements are passed by the caller as props.children)
 * 
 * PROPS:
 * 
 * {
 *     id:                    DOM ID
 *     class:                 Class (Default "card") Any props will be appended
 *     style: {               CSS Styles applied to main 'card' div.
 *       width:                 Width of card (Default: "25rem"),
 *       boxShadow:             Box Shadow (Default "3px 5px #dbdbdb",
 *       borderTopLeftRadius:   Border Radius topleft (Default 10px),
 *       borderTopRightRadius:  Border Radius top right (Default 10px)
 *     },
 *     cardHeader: {            
 *       text: "Sample Text",   Header text
 *       text_size: 4,          Text size. Size refers to h1...6 elems (Default 4)
 *       style: {               CSS Style applied to card-header div
 *         backgroundColor:       Background color
 *         borderTopLeftRadius:   Border Radius topleft (Default 10px)
 *         borderTopRightRadius:  Border Radius top right (Default 10px)
 *       }
 *     },
 *     cardBody: {
 *       class: "card-body"
 *     }
 *   }
 * 
 * Example Usage:
 *  ------------
 * let cardProps = {
 *       id: "card-1",
 *       style: {
 *           width: "22rem"
 *       },
 *       cardHeader: {
 *           text: "Yahoo",
 *           text_size: 4,
 *           style: {
 *               backgroundColor: "red"
 *           }
 *       }
 *    };
 * l
 * let cardObj = React.createElement(Card, fgProps, <child 1>, <child 2>);
 * 
 *  NOTE:
 *  -----
 *  You can pass additional React and non react children to this container.
 *  The child elements will be added to Card body.
 */
class Card extends React.Component {
  constructor (props) {
    super(props);
    this.borderRadius = "10px";
  }

  setProps (props) {    
    //Set Default.
    let cardProps = {
      id: "jumbo-" + Math.ceil(Math.random() * 100000),
      class: "card",
      style: {
        width: "25rem",
        boxShadow: "3px 5px #dbdbdb",
        borderTopLeftRadius: this.borderRadius,
        borderTopRightRadius: this.borderRadius
      },
      cardHeader: {
        class: "card-header",
        text: "Sample Text",
        text_size: 4,
        style: {
          backgroundColor: "#473dff",
          borderTopLeftRadius: this.borderRadius,
          borderTopRightRadius: this.borderRadius
        }
      },
      cardBody: {
        class: "card-body"
      }
    }

    // Override from Props.
    if (this.props.hasOwnProperty("id") && this.props.id != undefined) {
      cardProps.id = this.props.id;
    }
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      cardProps.class +=  " " + this.props.class;
    }
    if (this.props.hasOwnProperty("style") && this.props.style != undefined) {
      for (let [key, value] of Object.entries(this.props.style)) {
        console.log( "Key: " + key + ", val: " + value);
        cardProps.style[key] = value
      }
    }
    

    // Override cardHeader.
    if (this.props.hasOwnProperty("cardHeader") && this.props.cardHeader != undefined) {
      let obj = this.props.cardHeader;
    
      if (obj.hasOwnProperty("text") && obj.text != undefined) {
        cardProps.cardHeader.text = obj.text;
      }
      if (obj.hasOwnProperty("text_size") && obj.text_size != undefined) {
        cardProps.cardHeader.text_size = obj.text_size;
      }

      if (obj.hasOwnProperty("style") && obj.style != undefined) {
        for (let [key, value] of Object.entries(obj.style)) {
          console.log( "Key: " + key + ", val: " + value);
          cardProps.cardHeader.style[key] = value
        }
      }
    }

    // Override cardBody.
    if (this.props.hasOwnProperty("cardBody") && this.props.cardBody != undefined) {
      let obj = this.props.cardBody;

      if (obj.hasOwnProperty("class") && obj.class != undefined) {
        cardProps.cardBody.class += " " + obj.class
      }

      if (obj.hasOwnProperty("style") && obj.style != undefined) {
        for (let [key, value] of Object.entries(obj.style)) {
          console.log( "Key: " + key + ", val: " + value);
          cardProps.cardBody.style[key] = value
        }
      }
    }

    return (cardProps);
  }
  
  render () {
    console.log("Card - render " + this.props.children);
    let cardProps  = this.setProps(this.props);
    
    let cardHeaderStyle = cardProps.cardHeader.style;
    let cardStyle = cardProps.style;
    let cardBody = cardProps.cardBody;


    let jumboProps = {
      id: "j1",
      text: cardProps.cardHeader.text,
      text_size: cardProps.cardHeader.text_size,
      style: {
        color: "white",
        fontFamily: "Roboto, sans-serif",
        backgroundColor: cardHeaderStyle.background,
        borderTopLeftRadius: this.borderRadius,
        borderTopRightRadius: this.borderRadius
      }
    };

    let jumboCardTitle = React.createElement(Jumbotron,
                                             jumboProps, null);

    let cardHeader = React.createElement("div",
                                         {class: cardProps.cardHeader.class, 
                                          style: cardHeaderStyle}, 
                                         jumboCardTitle);

    let divCardBody = React.createElement("div",
                                          {class: cardBody.class}, 
                                          this.props.children);

    let divCard = React.createElement("div",
                                      {class: cardProps.class, style: cardStyle}, 
                                      cardHeader, divCardBody);
    
    return (divCard);
  }
}


/*
 * Category: Container.
 * Component: Card
 * This  ImageCard  has the following components:
 *  - A card header (div)
 *      - An image
 *  - A card body  (div)
 *    - element (elements are passed by the caller as props.children)
 * 
 * PROPS:
 * 
 * {
 *     id:                    DOM ID
 *     class:                 Class (Default "card") Any props will be appended
 *     style: {               CSS Styles applied to main 'card' div.
 *       width:                 Width of card (Default: "25rem"),
 *       boxShadow:             Box Shadow (Default "3px 5px #dbdbdb",
 *       borderTopLeftRadius:   Border Radius topleft (Default 10px),
 *       borderTopRightRadius:  Border Radius top right (Default 10px)
 *     },
 *     cardHeader: {            
 *       text: "Sample Text",   Header text
 *       text_size: 4,          Text size. Size refers to h1...6 elems (Default 4)
 *       style: {               CSS Style applied to card-header div
 *         backgroundColor:       Background color
 *         borderTopLeftRadius:   Border Radius topleft (Default 10px)
 *         borderTopRightRadius:  Border Radius top right (Default 10px)
 *       }
 *     },
 *     cardBody: {
 *       class: "card-body"
 *     }
 *   }
 * 
 * Example Usage:
 *  ------------
 * let cardProps = {
 *       id: "card-1",
 *       style: {
 *           width: "22rem"
 *       },
 *       cardHeader: {
 *           text: "Yahoo",
 *           text_size: 4,
 *           style: {
 *               backgroundColor: "red"
 *           }
 *       }
 *    };
 * l
 * let cardObj = React.createElement(Card, fgProps, <child 1>, <child 2>);
 * 
 *  NOTE:
 *  -----
 *  You can pass additional React and non react children to this container.
 *  The child elements will be added to Card body.
 */
class ImageCard extends React.Component {
  constructor (props) {
    super(props);
    this.borderRadius = "10px";
  }

  setProps (props) {    
    //Set Default.
    let cardProps = {
      id: "jumbo-" + Math.ceil(Math.random() * 100000),
      class: "card",
      style: {
        width: "25rem",
        boxShadow: "3px 5px #dbdbdb",
        borderTopLeftRadius: this.borderRadius,
        borderTopRightRadius: this.borderRadius
      },
      cardHeader: {
        class: "card-header",
        image_src: "https://itsvit.com/wp-content/uploads/2019/05/ItSvit_DevOps-business-value-and-advantages_Cover_1-1.png",
        style: {
          opacity: "0.90",
          padding: 0,
          height: "140px",
          borderTopLeftRadius: this.borderRadius,
          borderTopRightRadius: this.borderRadius
        }
      },
      cardBody: {
        class: "card-body"
      }
    }

    // Override from Props.
    if (this.props.hasOwnProperty("id") && this.props.id != undefined) {
      cardProps.id = this.props.id;
    }
    if (this.props.hasOwnProperty("class") && this.props.class != undefined) {
      cardProps.class +=  " " + this.props.class;
    }
    if (this.props.hasOwnProperty("style") && this.props.style != undefined) {
      for (let [key, value] of Object.entries(this.props.style)) {
        console.log( "Key: " + key + ", val: " + value);
        cardProps.style[key] = value
      }
    }
    

    // Override cardHeader.
    if (this.props.hasOwnProperty("cardHeader") && this.props.cardHeader != undefined) {
      let obj = this.props.cardHeader;
    
      if (obj.hasOwnProperty("text") && obj.text != undefined) {
        cardProps.cardHeader.text = obj.text;
      }
      if (obj.hasOwnProperty("text_size") && obj.text_size != undefined) {
        cardProps.cardHeader.text_size = obj.text_size;
      }

      if (obj.hasOwnProperty("style") && obj.style != undefined) {
        for (let [key, value] of Object.entries(obj.style)) {
          console.log( "Key: " + key + ", val: " + value);
          cardProps.cardHeader.style[key] = value
        }
      }
    }

    // Override cardBody.
    if (this.props.hasOwnProperty("cardBody") && this.props.cardBody != undefined) {
      let obj = this.props.cardBody;

      if (obj.hasOwnProperty("class") && obj.class != undefined) {
        cardProps.cardBody.class += " " + obj.class
      }

      if (obj.hasOwnProperty("style") && obj.style != undefined) {
        for (let [key, value] of Object.entries(obj.style)) {
          console.log( "Key: " + key + ", val: " + value);
          cardProps.cardBody.style[key] = value
        }
      }
    }

    return (cardProps);
  }
  
  render () {
    console.log("Card - render " + this.props.children);
    let cardProps  = this.setProps(this.props);
    
    let cardHeaderStyle = cardProps.cardHeader.style;
    let cardStyle = cardProps.style;
    let cardBody = cardProps.cardBody;

    let image = React.createElement("img",
                                    {class: 'card-img-top', 
                                    alt: 'Card Image',
                                    style: cardHeaderStyle,
                                    src: cardProps.cardHeader.image_src},
                                    null);

    let cardHeader = React.createElement("div",
                                         {class: "card-header",
                                         style: cardHeaderStyle}, 
                                         image);   

    let divCardBody = React.createElement("div",
                                          {class: cardBody.class}, 
                                          this.props.children);

    let divCard = React.createElement("div",
                                      {class: cardProps.class, style: cardStyle}, 
                                      cardHeader, divCardBody);
    
    return (divCard);
  }
}





class CollapseCard extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps(props) {
    let cardProps = {
          header_text: props.header_text,
          card_body_text: props.card_body_text,
          card_id: props.card_id
        }  
    return(cardProps);
  }

  render () {
    let cardProps = this.setProps(this.props);
     
    let button = React.createElement("button",
                                    {class: "btn btn-link", 
                                    'data-toggle': "collapse",
                                    'data-target': "#" + cardProps.card_id,
                                    'aria-expanded': "true",
                                    'aria-controls': cardProps.card_id}, 
                                    cardProps.header_text);
    let header = React.createElement("h5", 
                                    {class: "mb-0"}, 
                                    button);
    let cardHeader = React.createElement("div",
                                          {class: "card-header"}, header);

    let card_body = React.createElement("div",
                                        {class: "card-body"}, 
                                        cardProps.card_body_text);
    let card_collapse_body = React.createElement("div",
                                                 {id: cardProps.card_id,
                                                 'aria-labelledby': "headingOne",
                                                 'data-parent': '#accordian',
                                                 class: "collapse"}, 
                                                 card_body);

    let card = React.createElement("div",
                                   {class: "card"}, 
                                   cardHeader, card_collapse_body);
    return(card);
  }
}

/*
 * Category: Container
 * Component: Collapse
 */
class Collapse extends React.Component {
  constructor (props) {
    super(props);
  }

  setProps(props) {
    for (let x in props.card_info) {
      console.log(props.card_info[x]);
    }
  }

  render () {
    
    let cards = [];
    let collapseProps = this.setProps(this.props);

    let cardProps = {};
    for (let x in this.props.card_info) {
      cardProps = {
        header_text: this.props.card_info[x]['header_text'],
        card_body_text: this.props.card_info[x]['card_body_text'],
        card_id: this.props.card_info[x]['card_id'],
        key: x
      };
      cards.push(React.createElement(CollapseCard, cardProps, null));
    }

    let collapse = React.createElement("div", 
                                       {id: "accordian"}, 
                                       cards);

    return(collapse);
  }
}


/*
 * Category: Container.
 * Component: Grid
 * Grid Layout.
 * This is a encompassing component.
 * PROPS:
 * 
 * 
 *     let gridProps = {
 *       columns: 5,             //Dummy, just keeping it for consistency.
 *       style: {
 *         display: "grid",
 *         gridAutoRows: 'minmax(20px, auto)',
 *         gridGap: '5px',
 *         gridTemplateColumns: grid_template_columns
 *       }
 *     }
 * 
 *  NOTE: The Component takes a list of elements in the grid.
 *  The class field of the prop should have additional classes as below:
 *
 *  class: "gelem c1c2 r1r2 colored" (Required: gelem) (Optional c1c2 r1r2 colored)
 *  
 *  c<n>c<y>  : set grid-column: n / y;
 *  r<n>r<y>  : grid-row: n / y;
 *  colored: optional (sets a default background color of rgba(204, 219, 180, 0.5))
 */

class Grid extends React.Component {
    constructor (props) {
        super(props);
    }

    setProps () {
      let grid_template_columns = "repeat( 5, 1fr)";
      
      let gridProps = {
        columns: 5,             //Dummy, just keeping it for consistency.
        style: {
          display: "grid",
          gridAutoRows: 'minmax(20px, auto)',
          gridGap: '5px',
          gridTemplateColumns: grid_template_columns
        }
      }
      console.log("Props:   >>>> " + JSON.stringify(this.props));

      //Override grid props.
      if (this.props.hasOwnProperty("columns") && this.props.columns != undefined) {
        let grid_template_columns = "repeat(" + this.props.columns + ", 1fr)";
        gridProps.style.gridTemplateColumns = grid_template_columns
        console.log("BRD >>>> override columns.")
      }

      if (this.props.hasOwnProperty("style") && this.props.style != undefined) {
        for (let [key, value] of Object.entries(this.props.style)) {
          gridProps.style[key] = value
        }
      }

      return(gridProps);
    }

    

  render () {
    let gridProps = this.setProps();
    let gridStyle = gridProps.style;

    let grid = React.createElement(
        "div", {style: gridStyle}, this.props.children);

    return(grid)
  }
}




/******************************************************************
 * Category: Charts
 ******************************************************************/

class  BarChart extends React.Component {
  constructor (props) {
    super(props);
    this.chartRef = React.createRef();
  }

  generateRandomColors(transparency) {
    let rRandom = Math.floor(Math.random() * 255);
    let gRandom = Math.floor(Math.random() * 255);
    let bRandom = Math.floor(Math.random() * 255);

    let rgbStrin = "rgba(" + rRandom + ", " + gRandom + ", " + bRandom + ", "  + transparency + ")"
  }

  setProps(props) {
    let chartProps = {
      'data': props.data
    }
    return(chartProps);
  }

  createChart (ctx) {
    let chartProps = this.setProps(this.props);
    Chart.defaults.global.hover.mode = 'nearest';
    
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: chartProps.data,
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    });
  }

  componentDidMount() {
    let ctx = document.getElementById("canvas").getContext('2d');
    this.myChart = this.createChart(ctx);
  }

  render () {
    let canvas = React.createElement("canvas", 
                                  {id: "canvas", width: "400", height: "200",
                                   ref: this.chartRef}, 
                                  null);

    //let myChart = this.createChart(ctx);
   
    return(canvas);
  }

}
