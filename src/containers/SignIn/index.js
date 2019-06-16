import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import BaseTypography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core//Button';
import Snackbar from '@material-ui/core/Snackbar';
import LoadingDialog from '../../components/LoadingDialog';
import { color } from '../../styles/constants';
import {
	loginAction,	
	loginErrorAction,
	changeUsernameAction,
	changePasswordAction
} from './actions';
import {
	makeSelectLoading,
	makeSelectError,
	makeSelectCredential 
} from './selectors';

import {
	makeSelectAuth
} from '../../containers/App/selectors';

import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import isEmpty from 'validator/lib/isEmpty';

const FormTitle = styled(props=>{
	const { weight, ...baseProps } = props;
	return (
		<BaseTypography 
			{...baseProps}
			classes={{
				gutterBottom: 'gutter-bottom',
				...(props.classes ? props.classes : undefined),
			}} />
	);
})`
	&& {
		${props=> props.weight ? `font-weight: ${props.weight}` : null}
	}
`
	
class SignIn extends React.Component {	
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			password:'',
			error:{
				username:null,	
				password:null
			},
			isSubmitted:false,
			isSnackbarOpen: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/*componentDidMount(){
		console.log(this.props);
	}*/

	componentDidUpdate(prevProps) {
	    if (!!this.props.error.message && prevProps.error.message === null) {
	        this.setState(state => ({
	            ...state,
	            isSnackbarOpen: true,
	        }));
	    } else if (!!prevProps.error.message && this.props.error.message === null) {
	        this.setState(state => ({
	            ...state,
	            isSnackbarOpen: false,
	        }));
	    }
	}

	validateUsername(username){
		let isError = false;
		let errorMsg = null;
		if(isEmpty(username)){
			isError = true;
			errorMsg = 'Username tidak boleh kosong'
		}else{
			isError = false;
      		errorMsg = null;
		}

		this.setState(state => ({
			...state,
			error:{
				...state.error,
				username:errorMsg
			}
		}))

		return !isError;
	}

	validatePassword(password){
		let isError = false;
		let errorMsg = null;
		if(isEmpty(password)){
			isError = true;
			errorMsg = 'password tidak boleh kosong'
		}else{
			isError = false;
      		errorMsg = null;
		}

		this.setState(state => ({
			...state,
			error:{
				...state.error,
				password:errorMsg
			}
		}))

		return !isError;
	}

	handleSubmit(event){
		event.preventDefault();
		const { credential } = this.props;		
		this.setState(state => ({
      		...state,
      		isSubmitted: true,
    	}));
		
		// return <Redirect to="/dashboard" />;		

		if (this.validateUsername(credential.username) && this.validatePassword(credential.password)) {
			return this.props.login();
		}

    	return false;
	}

	getErrorMessage() {
	    const { error } = this.props;
	    if (!error.message) {
	        return null;
	    }
	    return error.message;
	}

	render() {		
		const {
			credential,
			changeUsername,
			changePassword,
			isLoading,
			setLoginError,
			auth
		} = this.props

		if(auth.token){
			return <Redirect to="/dashboard" />; 
		}
		return (
			<Grid 
				container
				alignItems="center"
				justify="center"
				style={{ 					
					height:'80vh'
				}}>			
					<LoadingDialog isLoading={isLoading} />
					<form						
						autoComplete="off" 
						noValidate
						style={{
							alignItems:'center',
							width:'30%',
						}}
						onSubmit={this.handleSubmit}>
						
						<FormTitle 
							variant="h5"
							align="center"
							gutterBottom
							weight={600}
							style={{
								color:`${color.primary}`
							}}>
							Sign In
						</FormTitle>

						<Grid item xs>
							<TextField 
								id="username"
								label="username"							
								margin="normal"
								fullWidth
								color="inherit"
								value={credential.username}	
								onChange={event=>{
									if(this.state.isSubmitted){
										this.validateUsername(event.target.value)
									}
									return changeUsername(event.target.value)
								}} 
								error={!!this.state.error.username}
              					helperText={this.state.error.username} />
						</Grid>
						<Grid item xs>
							<TextField 
								id="password"
								label="password"							
								margin="normal"
								fullWidth
								color="inherit"								
								type="password"
								value={credential.password}
								onChange={event=>{
									if(this.state.isSubmitted){
										this.validatePassword(event.target.value)
									}
									return changePassword(event.target.value);										
								}} 
								error={!!this.state.error.password}
              					helperText={this.state.error.password} />
						</Grid>
						<Grid item xs style={{ paddingTop:10 }}>
							<Button 
								type="submit"
								fullWidth 
								variant="contained" 
								color="primary"
								style={{
									padding:10
								}}
								disabled={!!this.state.error.username || !!this.state.error.password}>
								LOGIN
							</Button>
						</Grid>
					</form>
					<Snackbar 
						open={this.state.isSnackbarOpen} 
						autoHideDuration={2000} 
						message={<span style={{ bacgroundColor:'tomato' }}>{this.getErrorMessage()}</span>}
						anchorOrigin={{
							vertical:'top',
							horizontal:'center'
						}}
						style={{
							paddingTop:20,
							bacgroundColor:'tomato'
						}}
						onClose={() =>
				            setLoginError({
				              messageScope: null,
				              message: null,
				            })
			        	} />					

			</Grid>
		);
	}
}

const withReducer = injectReducer({ key: 'signInPage', reducer });
const withSaga = injectSaga({ key: 'signInPage', saga });

const mapStateToProps = createStructuredSelector({
	credential: makeSelectCredential(),
	error:makeSelectError(),
	isLoading:makeSelectLoading(),
	auth:makeSelectAuth()
})

function mapDispatchToProps(dispatch){
	return {
		changeUsername: (value) => dispatch(changeUsernameAction(value)),
		changePassword: (value) => dispatch(changePasswordAction(value)),
		login: ()=> dispatch(loginAction()),
		setLoginError: ({ messageScope, message }) => dispatch(loginErrorAction({ messageScope, message }))
	}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
	withReducer,
	withSaga,
	withConnect	
)(SignIn);