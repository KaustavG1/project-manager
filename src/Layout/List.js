import React, { Component } from 'react';
import Item from './Item';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { listId: this.props.heading };
        this.updateText = this.updateText.bind(this);
    }

    // Update the text value of item
    updateText(id, val) {
        this.setState(state => ({ ...state, id: id, val: val }));
        this.props.itemModFunctions.edit(this.state.listId, id, val);
    }

    render() {
        // Render all Items 
        let renderedItems = () => (this.props.items.map(item => 
            <Item id={item.id} 
              key={item.id} 
              textVal={item.todoinp} 
              childFunctions={this.props.itemModFunctions} 
              update={this.updateText} 
              heading={this.props.heading}/>
        ));
        return (<div className="individual-list">
            <h4>{this.props.heading}</h4>
            {renderedItems()}
        </div>);
    }
}

export default List;