import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import { RoomSharp } from '@material-ui/icons';


const BaseGrid = styled(Grid)`
	&& {
		display:flex;
		position:absolute;		
		left:20px;
		bottom:20px;
	}
`

const ToggleForm = (props) => {
	
	const ToggleFormState = () => {
		props.toggleForm()
	}

	return (

			<BaseGrid 
				container
				wrap="nowrap">
					<IconButton 
						disableRipple
						size = "small"
						onClick = { ToggleFormState }>
							<RoomSharp 
								style={{								
									fontWeight:'bold',
									fontSize:24							
								}}/>
					</IconButton>
			</BaseGrid>
		
	);
}

export default ToggleForm;