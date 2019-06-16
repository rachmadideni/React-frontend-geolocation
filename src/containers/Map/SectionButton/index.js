import React from 'react';
import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { color } from '../../../styles/constants'

const StyledButtonBase = styled(props=>{
	const { active, size, ...buttonProps } = props;
	return <ButtonBase {...buttonProps} />;
})`
	&& {
		width:140px;
		height: ${props => (props.size === 'small' ? '90px' : '130px')};		
		margin:8px;		
		border-radius: 6px;
		border-style:hairline;		
		border-color: ${props => (props.error ? color.primary : color.secondary)};
    	border-width: ${props => (props.size === 'small' ? '0.5px' : '2px')};
		
		display:flex;
		flex-direction: column;
		flex-wrap:nowrap;
		justify-content:center;
		color:${color.secondary};
		background-color:${color.light};
		transition:background-color 200ms ease-in-out;
	}
`;

const IconWrapper = styled.div`  
  font-size: ${props => (props.size === 'small' ? '32px' : '56px')};
`;

function SectionButton(props){
	const { icon, label, ...buttonProps } = props;
	return (
		<StyledButtonBase {...buttonProps}>
			<IconWrapper 
				size={buttonProps.size}>
				{icon}
			</IconWrapper>				
				<Typography
					variant="h3"
					align="center" 
					component="span"
					color="inherit"
					style={{
						fontSize:13
					}}>
				{label}
				</Typography>
		</StyledButtonBase>
	);
}

export default SectionButton;