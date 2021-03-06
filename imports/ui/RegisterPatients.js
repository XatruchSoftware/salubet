import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';

import ErrorAlert from './ErrorAlert';

export class RegisterPatients extends React.Component {

    state = {
        name: '',
        birthDate: '',
        id: '',
        error: ''
    }

    onSubmit = () => {
        this.state.error ? this.setState({ error: '' }) : null
        event.preventDefault();
        this.props.call('patients.add', { ...this.state}, (error) => (
                error ? this.setState({ error: error.message }) : null
            )
        );
        this.setState({
            name: '',
            birthDate: '',
            id: ''
        });
        this.props.history.push('/searchPatients');
    }

    render() {
        return (
            <div className="register-patients-container">
                {this.state.error ? <ErrorAlert message={this.state.error} /> : null}
                <form onSubmit={this.onSubmit} >
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <div className = "form-group">
                                <label htmlFor="nombreCompleto">Nombre Completo</label>
                                <input 
                                    className="form-control round-input" 
                                    id="nombreCompleto" 
                                    placeholder="Nombre completo del paciente"
                                    value={this.state.name} 
                                    onChange={(event) => this.setState({ name: event.target.value })}
                                />
                            </div>
                            
                        </div>
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <div className = "form-group">
                                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                <input 
                                    className="form-control round-input" 
                                    id="fechaNacimiento" 
                                    placeholder="Fecha de nacimiento del paciente" 
                                    value={this.state.birthDate} 
                                    onChange={(event) => this.setState({ birthDate: event.target.value })}    
                                />
                            </div>
                            
                        </div>
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <div className = "form-group">
                                <label htmlFor="idPaciente">ID del paciente</label>
                                <input 
                                    className="form-control round-input" 
                                    id="idPaciente" 
                                    placeholder="ID del paciente" 
                                    value={this.state.id} 
                                    onChange={(event) => this.setState({ id: event.target.value })}
                                />
                            </div>
                            
                        </div>
                        
                        
                        
                    </div>
                    <div className="row">
                        <div className = "col-sm-6 col-md-4 col-lg-4">
                            <NavLink className="btn btn-block btn-round-no-color btn-green-outline green-text " to="/searchPatients">Regresar</NavLink>
                        </div>
                        <div className = "col-sm-6 col-md-4 col-lg-4">
                            <button type="submit" className="btn btn-block btn-round btn-white-text ">Agregar Paciente</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        );
    }
};

export default withTracker(() => ({
    call: Meteor.call
}))(RegisterPatients);