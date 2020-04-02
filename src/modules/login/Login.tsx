import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './Login.css';

export class Login extends Component<any, any> {

    public render(): React.ReactNode {
        return (
                <Paper className="paper">
                    <span>
                        <h2 className="header" id="login-heading">Sign in</h2>
                        <form className="form">
                            <TextField
                                className="field"
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus={true}
                                label="Email Address"
                                fullWidth={true}
                            />
                            <TextField
                                className="field"
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                label="Password"
                                fullWidth={true}
                            />
                            <Button
                                id="login-button"
                                type="button"
                                fullWidth={true}
                                variant="contained"
                                className="button_action"
                            >
                               Login
                            </Button>
                        </form>
                    </span>
                </Paper>
        );
    }
}

export default Login;
