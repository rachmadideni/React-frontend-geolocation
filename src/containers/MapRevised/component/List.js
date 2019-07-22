import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import * as turf from '@turf/turf'

const Container = styled.div`
	&& {
		position:absolute;
		top:10px;
		left:10px;
		width:450px;
		height:450px;
		background-color:#FFFFFF;
		border:solid 1px #EAEAEA;
	}
`

const FormWrapper = styled(Grid)`
	&& {
		width:100%;
		padding:15px 25px 10px 25px;		
		border-radius:0;
		box-shadow:none;
	}
`

const TableWrapper = styled(Grid)`
	&& {
		padding:15px 0px 0px 0px;
		box-shadow:none;
	}
`

const CustomTr = styled.tr`
	width:100%;
	&& {
		&:hover {
      pointer: cursor;      
      background-color: #EAEAEA;      
    }
	}
`
const CustomTd = styled.td`	
	height:20px;
	// padding:5px 25px 5px 25px;
`

class List extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			keyword:'',
			list_sungai:this.props.list_sungai,
			filteredList:[]
		}
	}

	_changeKeyword = e => {
		//console.log(e);
		let currentList = this.props.list_sungai.features;
		let newlist = currentList.filter(item=>{
			// console.log(item.properties.nmsung.toLowerCase())
			let lc = item.properties.nmsung.toLowerCase();
			let filter = e.target.value.toLowerCase();
			return lc.includes(filter);
		});

		//console.log(newlist);

		this.setState({
			keyword:e.target.value,
			filteredList:newlist
		})
	}	

	_onClickRow = (e,coord) => {
		// console.log('_onClickRow:',coord);
		this.props.onViewportChange(coord[0],coord[1]);
		// console.log('_onClickRow E :',e);
	}

	render(){
		const { filteredList } = this.state;
		return (
			<Container>				
				<FormWrapper>
					<Typography 
						align="left" 
						color="secondary" 
						variant="subtitle2">
							{'cari sungai'}
					</Typography>
					<Typography 
						align="left" 						
						variant="body1"
						style={{ fontSize:11 }}>
							{'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, sequi!'}
					</Typography>
					<form 
							noValidate 
							autoComplete="off" 						
							onSubmit={e=>console.log(e)}>
						<TextField 
							id="cari_sungai" 
							label="Keyword"
							placeholder="masukkan nama sungai" 
							autoFocus={true}							
							value={this.state.keyword}
							onChange = {e=>this._changeKeyword(e)} 
							margin="normal" 
							fullWidth />
						
					</form>
					<TableWrapper>
						<table>
							<thead>
								<tr>									
									<th colSpan="3" align="left">Hasil</th>								
								</tr>
							</thead>
							<tbody>
							{filteredList.map((item,index)=>{								
								let coord = item.geometry.coordinates;
								let line = turf.lineString(coord);
								let len1 = turf.length(line,{ units: 'kilometers' });
								var len2 = Math.round(len1 * 100) / 100;
								return (
								<CustomTr 
									key={`key-${index}`} 
									onClick={
											e=>this._onClickRow(e,coord[0])
										}>									
									
									<CustomTd>
											<b>{`${item.properties.nmsung}, `}</b>
										</CustomTd>
										<td>{`kec. ${item.properties.nmkecm }`}</td>
										<td>{`Panjang: ${len2} km`}</td>
								</CustomTr>									
								);
							})}
							</tbody>
						</table>
					</TableWrapper>
				</FormWrapper>
			</Container>
		);
	}
}

export default List;