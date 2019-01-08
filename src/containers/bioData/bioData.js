import React, {Component} from 'react';
import {getAllCountries, getStatesOfCountry, getCitiesOfState, getCountryById} from 'country-state-city'
import { Button,Row, Col,CustomInput, Form,InputGroupAddon, InputGroup, FormGroup, Label, Input} from 'reactstrap';
import './bioData.css'
import Ax from '../../hoc/ax'
class BioData extends Component {
    constructor(props){
        super(props);
        this.state = {
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
    }
    async componentWillMount() {
        await this.setState(this.props.bioData);
        this.valueSetter();
    }
    valueSetter(){
        if(this.state.firstName!=="") {
            const form = document.forms["bioData"];
            form['firstName'].value = this.state.firstName;
            form['lastName'].value = this.state.lastName;
            form['address'].value = this.state.address;
            form['mno'].value = this.state.mno;
            form['dob'].value = this.state.dob;
            form['country'].value = this.state.countryId;
            form['state'].value = this.state.stateId;
            form['city'].value = this.state.city;
            form['gen'].value = this.state.gen;
            let hobby = this.state.hobby.split(',');
            if (hobby.includes('reading'))
                form['reading'].checked = true;
            if (hobby.includes('drawing'))
                form['drawing'].checked = true;
        }
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
        setTimeout(() => {
            this.props.toggleHandler();
        },1000);
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
            <Form className="bioData" id="bioData">
                <h6>BIO-DATA</h6>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input type="text" name="firstName" id="firstName" placeholder="first" onChange={this.valueChangeHandler} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input type="text" name="lastName" placeholder="last" onChange={this.valueChangeHandler}/>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label>Gender</Label>
                    <div>
                        <CustomInput  id="male" value="male" type="radio"
                                      name="gen" label="Male" onClick={this.valueChangeHandler} inline
                        />
                        <CustomInput id="female" value="female" type="radio"
                                     name="gen" label="Female" onClick={this.valueChangeHandler} inline
                        />
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Date of Birth</Label>
                    <Input type="date" name="dob" onChange={this.valueChangeHandler} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Address</Label>
                    <Input type="textarea" name="address" onChange={this.valueChangeHandler}/>
                </FormGroup>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label>Country</Label>
                            <Input type="select" name="country" id="country" onChange = {this.countryChangeHandler}>
                                <option value="0">select country</option>
                                {
                                    getAllCountries().map((country) => {
                                        return <option key={country.id} value={country.id}>{country.name}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label>State</Label>
                            <Input type="select" name="state" id="state" onChange={this.stateChangeHandler}>
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

                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label>City</Label>
                            <Input type="select" name="city" id="city" onChange={this.valueChangeHandler}>
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
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label>Mobile Number</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">{(this.state.countryId)?'+'+getCountryById(this.state.countryId-1).phonecode:'+'}</InputGroupAddon>
                        <Input name="mno" id="mno" onChange={this.valueChangeHandler}/>
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <Label>Hobby</Label>
                    <div>
                        <CustomInput id="reading" value="reading" type="checkbox"
                                     name="hobby" label="Reading" onClick={this.valueChangeHandler} inline />
                        <CustomInput id="drawing" type="checkbox" value="drawing"
                                     name="hobby" label="Drawing" onChange={this.valueChangeHandler} inline />
                    </div>
                </FormGroup>
                <Button onClick={this.submitHandler}>SUBMIT</Button>
                <Button onClick={this.props.toggleHandler}>CANCEL</Button>
            </Form>
        );
    }
}

export default BioData;