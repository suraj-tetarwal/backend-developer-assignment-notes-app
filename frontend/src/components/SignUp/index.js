import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import { toast } from 'react-toastify'

import './index.css'

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    onChangeName = event => {
        this.setState({name: event.target.value})
    }

    onChangeEmail = event => {
        this.setState({email: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    onSubmitForm = async event => {
        event.preventDefault()

        const toastId = toast.loading("Creating your account...")

        const {name, email, password} = this.state

        if (!name || !email || !password) {
            toast.update(toastId, {
                render: "All fields are requierd",
                type: "warning",
                isLoading: false,
                autoClose: 3000
            })
            return
        }

        const userDetails = {
            name,
            email,
            password
        }

        const url = "http://localhost:3000/api/v1/auth/register"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            const {history} = this.props
            toast.update(toastId, {
                render: "Boom! Your account is ready. Now, sign in and let's go!",
                type: "success",
                isLoading: false,
                autoClose: 3000
            })
            history.replace("/sign-in")
        } else {
            const {message} = data
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000
            })
        }
    }

    renderNameField = () => {
        const {name} = this.state
        return (
            <div className='sign-up-field-container'>
                <label className='sign-up-field-label' htmlFor='name'>Name</label>
                <input
                    id="name" 
                    type="text" 
                    placeholder='name' 
                    value={name}
                    className='sign-up-input-box'
                    onChange={this.onChangeName}
                />
            </div>
        )
    }

    renderEmailField = () => {
        const {email} = this.state
        return (
            <div className='sign-up-field-container'>
                <label className='sign-up-field-label' htmlFor='email'>Email</label>
                <input 
                    id="email"
                    type="text" 
                    placeholder='email'
                    value={email} 
                    className='sign-up-input-box' 
                    onChange={this.onChangeEmail}
                />
            </div>
        )
    }

    renderPasswordField = () => {
        const {password} = this.state
        return (
            <div className='sign-up-field-container'>
                <label className='sign-up-field-label' htmlFor='password'>Password</label>
                <input 
                    id="password"
                    type="password" 
                    placeholder='password'
                    value={password} 
                    className='sign-up-input-box' 
                    onChange={this.onChangePassword}
                />
            </div>
        )
    }

    render() {
        const jwtToken = Cookies.get("jwtToken")
        if (jwtToken) {
            return <Redirect to="/" />
        }
        return (
            <div className="sign-up-page-container">
                <form className="sign-up-form-container" onSubmit={this.onSubmitForm}>
                    <h1 className="sign-up-form-heading">Get Started</h1>
                    {this.renderNameField()}
                    {this.renderEmailField()}
                    {this.renderPasswordField()}
                    <button type="submit" className="sign-up-button">Sign up</button>
                    <p className="already-have-account-text">Already have an account? <Link to="/sign-in" className="sign-in-link">Sign in</Link></p>
                </form>
            </div>
        )
    }
}

export default SignUp