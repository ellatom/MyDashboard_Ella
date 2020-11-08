import React, { Component } from 'react';
import '../CSS/profile.css';
import { TextArea, Form, Header, Label, Icon } from "semantic-ui-react";
import api from './api';

export default class Profile extends Component {

    state = { userParams: {}, dataset_params: {}, results: {} }

    async componentDidMount() {
        const userParams = await
            api.getUserData('Weather_Params_&_Results');
        this.setState({
            userParams: userParams["User_params"],
            dataset_params: userParams["Dataset_params"],
            results: userParams["Results"]
        });

    }

    render() {
        return (

            <div className="ui card">
                
                <img src="https://semantic-ui.com/images/avatar2/large/matthew.png" height={150} alt="" />
                
                <div className="content">
                    <Header as="h5" id="fonts">Ben</Header>
                    <div className="meta">
                        <span className="date">Joined in 2013</span>
                    </div>
                    <div className="email">
                        Email: Ben@gmail.com
                    </div>
                    <div className="phone">
                        Phone: 0547495898
                    </div>
                </div>
                <div className="extra content">
                    <Form>
                        <Header as="h5" id="fonts">Target</Header>
                        <div>
                            <Label as='h5' id="fonts">
                                <Icon name='target'> Min Target:{this.state.userParams["min_target"]}</Icon>
                            </Label>
                        </div>
                        <div>
                            <Label as='h5' id="fonts">
                                <Icon name='target'> Max Target:{this.state.userParams["max_target"]}</Icon>
                            </Label>
                        </div>
                        <Label as='h5' id="fonts">
                            <Icon name='target'> Neighbours:{this.state.userParams["n_neighbors"]}</Icon>
                        </Label>
                    </Form>
                </div>
                <div className="extra content">
                    <Header as="h5" id="fonts">Additional Info</Header>
                    <div className="n_time_point">
                        Points:<span>{this.state.dataset_params["n_time_points"]}</span>
                    </div>

                    <div className="n_features">
                        Features:<span>{this.state.dataset_params["n_features"]}</span>
                    </div>

                    <div className="RCF">
                        RCF: <span>{this.state.results["RCF"]}</span>
                    </div>
                </div>
            </div>

        );
    }
};


// export default Profile;