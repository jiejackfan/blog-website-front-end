import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:'AUTH', data: {result, token}});
            history('/');
        } catch(error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful")
    }

    const [showPassword, setShowPassword] = useState(false);
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant='h5'>{isSignUp?'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange}  type='email'/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
                        }
                        
                    </Grid>
                    {/* Google login button */}
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                            {isSignUp ? "Sign Up" : 'Sign In'}
                    </Button>
                    <GoogleLogin clientId='198117324167-tn90r19b6nj01hto91uqu71scl78sqej.apps.googleusercontent.com' 
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolic='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>{isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container> 
    )
}

export default Auth