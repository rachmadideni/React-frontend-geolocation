import React,{ Fragment, Component } from 'react';
import { api } from '../../../environtments';
import Typography from '@material-ui/core/Typography';

export default class PopupContent extends Component {
	
	_renderProp = () => {
		const { features } = this.props;		
		var prop = [];
		for (var k in features) {
        if (features.hasOwnProperty(k)) {
           if(k==="0"){
           	prop.push(features[k].properties);           	
           }
        }
    }    

    return prop.map((item,index)=>{
    	return (
    		<Fragment key={index}>
    			<h3>{item.nampro}</h3>
    			<p>{item.ketera}</p>
    			<p>{item.featureId}</p>
    			<hr/>
    			{/*data_upload.files && data_upload.files.map(item=>{
    				return (
    					<div>{item.filename}</div>
    				);
    			})*/}
    		</Fragment>
    	);
    })
	}

    // _renderUpload = () => {
    //    	const { data_upload } = this.props;
    //    	console.log(data_upload['files']);
    //    	if(files.length > 0){
    //     	return files.map(item=>{
    //     		return (
    //     			<div>{item.filename}</div>
    //     		);
    //     	})    		
    //    	}
    //    }

  _renderInfo = () => {
  	const { attribut_proyek } = this.props;
  	return (
  		<Fragment>
    		<div style={{
    			//maxHeight:'200px',
    			overflowY:'auto',
                boxShadow:'2',
                elevation:2
    		}}>    			
                <Typography 
                    variant="h5" 
                    color="primary"
                    style={{
                        fontSize:16
                    }}>
                    {attribut_proyek.nampro}
                </Typography>
    			<Typography 
                    variant="subtitle1"
                    color="inherit"
                    style={{
                        fontSize:15
                    }}>
                    {attribut_proyek.ketera}                
                </Typography>
                
    			{/*<p>{attribut_proyek.featureId}</p>*/}
    			{/*<hr/>*/}
    		</div>
    		<div>
    			{attribut_proyek.upload.map((item,i)=>{
    				return (
    					<img 
                            alt={`img-${i}`}
    						key={`img-${i}`} 
    						src={`${api.host}/api/static/${item.filename}`}
    						style={{
    							width:'45px',
    							height:'45px'
    						}}>    							
    					</img>
    				);
    			})}    			
    		</div>
    	</Fragment>
    	);
  }

	render(){
		
		return (
			<div style={{
				position:'relative',
				top:0,
				width:250,
				// height:150,				
				maxWidth:345,
                padding:'10px',
				paddingTop:0,
				paddingBottom:0
			}}>
				<div style={{ paddingTop:0 }}>
                {this._renderInfo()}					
				</div>
			</div>
		);
	}
}