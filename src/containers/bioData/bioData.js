import React, {Component} from 'react';
import {getAllCountries, getStatesOfCountry, getCitiesOfState} from 'country-state-city'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBFormInline, MDBCardBody, MDBCard, MDBFooter} from 'mdbreact'
import moment from 'moment';
import {Select,InputLabel,FormControl, FormControlLabel, Checkbox, Radio} from '@material-ui/core';

import './bioData.css'
import Ax from '../../hoc/ax'
class BioData extends Component {
    state = {
        countryId : "",
        stateId : "",
        firstName : "",
        lastName : "",
        gen : "",
        address : "",
        dob : "",
        city : "",
        mno : "",
        hobby : ""
    }
    async componentWillMount() {
        await this.setState(this.props.bioData);
    }
    valueChangeHandler = (event) => {
        if(event.target.name !== "hobby")
            this.setState({[event.target.name]:event.target.value});
        else
        {
            let hobby=[];
            if(this.state.hobby!=="")
                hobby = this.state.hobby.split(",");
            if(hobby.includes(event.target.value))
            {
                hobby = hobby.filter((value) => value!==event.target.value)
            }
            else
            {
                hobby.push(event.target.value);
            }
            this.setState({hobby:hobby.join(',')});
        }
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.uploadBioData(this.state);
        this.props.toggleHandler();
    }
    countryChangeHandler = (event) => {
        if(event.target.value!=="0")
            return this.setState({countryId : event.target.value,stateId : ""});
        return this.setState({countryId : "",stateId : ""});
    }
    stateChangeHandler = (event) => {
        if(event.target.value!=="0")
            return this.setState({stateId : event.target.value});
        return this.setState({stateId : ""});
    }
    render() {
        return (
            <MDBContainer className="mt-4">
            <MDBCard>
                <MDBCardBody>
                <MDBRow>
                    <MDBCol size="6">
                        <MDBInput
                            label="First Name"
                            group
                            type="text"
                            id="firstName"
                            name="firstName"
                            validate
                            error="wrong"
                            success="right"
                            value={this.state.firstName}
                            onChange={this.valueChangeHandler}
                        />
                    </MDBCol>
                    <MDBCol size="6">
                        <MDBInput
                            label="Last Name"
                            group
                            type="text"
                            id="lastName"
                            name="lastName"
                            validate
                            error="wrong"
                            success="right"
                            value={this.state.lastName}
                            onChange={this.valueChangeHandler}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <label>Gender</label>
                        <MDBFormInline>
                            <Radio
                                onClick={this.valueChangeHandler}
                                color="primary"
                                value="male"
                                name="gen"
                                id="male"
                                checked={this.state.gen==="male"}
                            />
                            <label>Male</label>
                            <Radio
                                onClick={this.valueChangeHandler}
                                color="primary"
                                value="female"
                                name="gen"
                                id="female"
                                checked={this.state.gen==="female"}
                            />
                            <label>Female</label>
                        </MDBFormInline>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput type="date" name="dob" onChange={this.valueChangeHandler} label="Date of birth"
                                  value={ this.state.dob ? moment(this.state.dob).format("YYYY-MM-DD") : ""}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol size={4}>
                        <FormControl>
                        <InputLabel htmlFor="country">Country</InputLabel>
                            <Select
                                native
                                value={this.state.countryId}
                                onChange={this.countryChangeHandler}
                                inputProps={{
                                    name: 'country',
                                    id: 'country',
                                }}
                            >
                                <Ax>
                                    <option value="0">select country</option>
                                {
                                    getAllCountries().map((country) => {
                                        return <option key={country.id} value={country.id}>{country.name}</option>
                                    })
                                }
                                </Ax>
                            </Select>
                        </FormControl>
                    </MDBCol>
                    <MDBCol size={4}>
                        <FormControl>
                            <InputLabel htmlFor="state">State</InputLabel>
                            <Select
                                native
                                value={this.state.stateId}
                                onChange={this.stateChangeHandler}
                                inputProps={{
                                    name: 'state',
                                    id: 'state',
                                }}
                            >
                            {
                                (!this.state.countryId)?<option>first select country</option>:
                                    <Ax>
                                        <option value="0">select state</option>
                                        {
                                            getStatesOfCountry(this.state.countryId).map((state) => {
                                                return <option key={state.id} value={state.id}>{state.name}</option>
                                            })
                                        }
                                    </Ax>
                            }
                            </Select>
                        </FormControl>
                    </MDBCol>
                    <MDBCol size={4}>
                        <FormControl>
                            <InputLabel htmlFor="city">City</InputLabel>
                            <Select
                                native
                                value={this.state.city}
                                onChange={this.stateChangeHandler}
                                inputProps={{
                                    name: 'city',
                                    id: 'city',
                                }}
                            >
                                {
                                    (!this.state.stateId)?<option>first select state</option>:
                                        <Ax>
                                            <option value="0">select city</option>
                                            {
                                                getCitiesOfState(this.state.stateId).map((city) => {
                                                    return <option key={city.id} value={city.id}>{city.name}</option>
                                                })
                                            }
                                        </Ax>
                                }
                            </Select>
                        </FormControl>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput type="textarea" label="Address" rows="2" name="address" value={this.state.address} onChange={this.valueChangeHandler}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Mobile Number"
                            name="mno"
                            id="mno"
                            value={this.state.mno}
                            onChange={this.valueChangeHandler}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <label>Hobbies</label>
                        <MDBFormInline>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.hobby.includes("reading")}
                                        onChange={this.valueChangeHandler}
                                        value="reading"
                                        color="primary"
                                        name="hobby"
                                    />
                                }
                                label="Reading"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.hobby.includes("drawing")}
                                        onChange={this.valueChangeHandler}
                                        value="drawing"
                                        color="primary"
                                        name="hobby"
                                    />
                                }
                                label="Drawing"
                            />
                        </MDBFormInline>
                    </MDBCol>
                </MDBRow>
                <MDBFooter className="text-center">
                        <MDBBtn color="primary" onClick={this.submitHandler}>SUBMIT</MDBBtn>
                        <MDBBtn color="secondary" onClick={this.props.toggleHandler}>CANCEL</MDBBtn>
                </MDBFooter>
                </MDBCardBody>
            </MDBCard>
            </MDBContainer>
        );
    }
}

export default BioData;