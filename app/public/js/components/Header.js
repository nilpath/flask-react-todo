import React from 'react';
import BaseComponent from './BaseComponent.js';

export default class Header extends BaseComponent {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <header className="todo-header">
        <h1>Todos</h1>
      </header>
    );
  }
  
}