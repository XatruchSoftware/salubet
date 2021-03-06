import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { history } from '../routes/routes';

import Preloader from './Preloader';
import ErrorAlert from './ErrorAlert';

export class Signup extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        medicalCenterType: '',
        medicalCenter: '',
        error: ''
    }
    onSubmit = async (event) => {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            const user = {
                email: this.state.email,
                password: this.state.password,
                profile: {
                    name: this.state.name,
                    medicalCenterType: this.state.medicalCenterType,
                    medicalCenter: this.state.medicalCenter
                }
            };
            await this.props.call('user.createUser', user, (error) => {
                console.log(error);
                if (error) {
                    this.setState({
                        error: error.message
                    });
                } else {
                    history.push('/');
                }
            });
        } else {
            this.setState({ error: 'Passwords don\'t match.' })
        }
    }
    handleMedicalCenterDropdown = (event) => {
        event.preventDefault();
        this.setState({ medicalCenter: event.target.value });
    }
    render() {
        return (
            <div className="signup-container">
                <Preloader />

                <div className="container absolute-center signup-content-container">
                    <div className="row justify-content-md-center signup-form-container">
                        <div className="col-sm-12 col-md-6 col-lg-6 align-self-center signup-form-container">
                            {this.state.error ? <ErrorAlert message={this.state.error} /> : null}
                            <form onSubmit={this.onSubmit}>

                                <img src="/theme_images/logo_blanco1.png" className="salubet-logo"></img>

                                <div className="form-group">

                                    <input
                                        type="text"
                                        className="form-control bmd-label-floating input-login"
                                        id="name" aria-describedby="userName"
                                        placeholder="Nombre completo"
                                        onChange={(event) => this.setState({ name: event.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Centro médico</label><br />
                                    <div className="form-check mb-1 form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="medicalCenterType"
                                            id="hospital"
                                            value="hospital"
                                            onChange={(event) => this.setState({ medicalCenterType: event.target.value })}
                                        />
                                        <label className="form-check-label" htmlFor="hospital">Hospital</label>
                                    </div>
                                    <div className="form-check mb-1 form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="medicalCenterType"
                                            id="clinic"
                                            value="clinic"
                                            onChange={(event) => this.setState({ medicalCenterType: event.target.value })}
                                        />
                                        <label className="form-check-label" htmlFor="clinic">Clínica</label>
                                    </div>
                                    <select className="form-control mt-2 mb-2 select-signup" id="medicalCenter" onChange={this.handleMedicalCenterDropdown}>
                                        <option className="option-signup" value="default">Centros médicos disponibles</option>
                                        <option className="option-signup" value="HMS">HMS</option>
                                        <option className="option-signup" value="San Felipe">San Felipe</option>
                                        <option className="option-signup" value="Medical Center">Medical Center</option>
                                    </select>
                                </div>
                                <div className="form-group">

                                    <input
                                        type="email"
                                        className="form-control bmd-label-floating input-login"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Correo electrónico"
                                        onChange={(event) => this.setState({ email: event.target.value })}
                                    />
                                </div>
                                <div className="form-group">

                                    <input
                                        type="password"
                                        className="form-control input-login"
                                        id="password"
                                        placeholder="Contraseña"
                                        onChange={(event) => this.setState({ password: event.target.value })}
                                    />
                                </div>
                                <div className="form-group">

                                    <input
                                        type="password"
                                        className="form-control input-login"
                                        id="confirmPassword"
                                        placeholder="Confirmar contraseña"
                                        onChange={(event) => this.setState({ confirmPassword: event.target.value })}
                                    />
                                </div>

                                <button type="submit" className="btn btn-outline-primary submit-button btn-outline-secondary">Registrarse</button>
                                <Link id="linkSignup" className="text-center links-login" to="/">Iniciar sesión</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default withTracker(() => ({
    call: Meteor.call
}))(Signup);