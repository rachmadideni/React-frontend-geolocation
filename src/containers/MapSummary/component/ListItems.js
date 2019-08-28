import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import green from '@material-ui/core/colors/green';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

// icons
import { 
	LinearScale,
	RoomSharp,
	ExpandLess,
	ExpandMore
} from '@material-ui/icons';

const ListItems = (props) => {
	
	const [openListSungai, setOpenListSungai] = React.useState(true);
	const [openListProyek, setOpenListProyek] = React.useState(true);

	const handleOpenListSungai = () => {
		setOpenListSungai(!openListSungai);
	}

	const handleOpenListProyek = () => {
		setOpenListProyek(!openListProyek);
	}
	console.log(props.data);
	return (
		<List 
			component="nav"
			disablePadding>

				<ListItem button 
					onClick={handleOpenListSungai}>
					<ListItemIcon>
						<LinearScale />				
					</ListItemIcon>
					<ListItemText primary="Sungai" 
						style={{
							fontSize:'12px'
						}}/>
					{openListSungai ? <ExpandLess /> : <ExpandMore />}
				</ListItem>

				<Collapse 
					in={openListSungai} 
					timeout="auto" 
					unmountOnExit>
					<div 
						style={{
							height:'400px',
							overflowY:'scroll'
						}}>
					{
						props.data.map(item=>{
							const nmsung = item.properties.nmsung;
							return (
								
								<List 
									component="div" 
									disablePadding>
									<ListItem button style={{ paddingLeft:20 }}>
										
										<ListItemAvatar>
											<Avatar style={{ margin:10,backgroundColor:green[100] }}>											
												<LinearScale style={{
													color:'#FFFFFF'
												}}/>
											</Avatar>										
										</ListItemAvatar>
										<ListItemText primary={nmsung} />
									</ListItem>					
								</List>
								
							)
						})
					}
					</div>													
				</Collapse>
				
		</List>
	);
}

export default withStyles()(ListItems);