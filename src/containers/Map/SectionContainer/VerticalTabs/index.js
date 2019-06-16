import React from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const BaseTabs = styled(Tabs).attrs({
	classes:{
		flexContainer:'flex-container',
		indicator:'indicator'
	}
})`
	&& {
		.flex-container{
			flex-direction:column;
		}
		.indicator{
			display:none;
		}
	}
`

const IconTab = styled(Tab).attrs({
	classes:{
		selected:'selected',
		labelContainer:'label-container'
	}
})`
	&& {
		min-width:80px;
		min-height:72px;
		opacity:0.5;
		transition: background-color 200ms ease-in-out;
		
		.label-container{
			margin-top:6px;
			font-size:10px;
			padding:0;
			line-height: 1;
		}
	}
	&.selected{
		background-color:tomato;
		color:white;
		opacity:1
	}
`

function VerticalTabs(props){
	const { tabs, ...tabsProps } = props;
	return (
		<BaseTabs {...tabsProps}>
		{tabs.map((tab,index)=>{
			const key = `navTab-${tab.label}-${index}`;
			return <IconTab key={key} icon={<tab.icon />} label={tab.label} />;
		})}
		</BaseTabs>
	);
}

export default VerticalTabs;