import React, { Component } from 'react';
import './LoginForm.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: "",
            pword: "",
            email: "",
            existingUser: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExistingUser = this.handleExistingUser.bind(this);
    }

    // Update the value in state
    handleChange(event) {
        event.persist();
        this.setState({ [event.target.name]: event.target.value });
    }

    // Save Sign Up data
    signUpUser() {
        const userData = JSON.stringify({ uname: this.state.uname, pword: this.state.pword, email: this.state.email });
        // Get current user entries
        const currentUserData = JSON.parse(localStorage.getItem(this.state.uname))

        // Check for existing user
        if (currentUserData === null) {
            // Add new entry in local storage
            localStorage.setItem(this.state.uname, userData);
            // Navigate to dashboard
            this.props.loginFunction();  
        } else {
            // Notify existing user
            this.setState(state => ({ ...state, existingUser: !state.existingUser }));                
        } 
    }

    // Handle the form submission
    handleSubmit(event) {
        event.preventDefault();
        // TODO: Handle the submit action
        this.signUpUser();
        // Reset Fields
        this.setState(state => ({ ...state, uname: "", pword: "", email: "" }));
    }

    // Open SignUP Page
    handleExistingUser(event) {
        this.props.openPage();
    }

    render() {
        return (<div className="card">
            <h1 className="sign">Join Us Today</h1>
            <form onSubmit={this.handleSubmit} className="form1">
                {/* <label htmlFor="username">Username</label><br /> */}
                <input id="username" name="uname" type="text" onChange={this.handleChange} value={this.state.uname} placeholder="Username" className="input-fields" /><br />
                {/* <label htmlFor="email">Email</label><br /> */}
                <input id="email" name="email" type="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" className="input-fields" /><br />
                {/* <label htmlFor="password">Password</label><br /> */}
                <input id="password" name="pword" type="password" onChange={this.handleChange} value={this.state.pword} placeholder="Password" className="input-fields" /><br />
                <button className="submit">Submit</button>
            </form>
            <p onClick={this.handleExistingUser} className="change-page">Already a User? Log In</p>
            {this.state.existingUser && <p onClick={this.handleExistingUser} className="red-flag">You are an existing user, try logging in</p>}
        </div>);
    }
}

export default SignUp;