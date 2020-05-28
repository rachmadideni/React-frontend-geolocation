import React, { Fragment, Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

export default class TooltipCard extends Component {
  componentDidMount() {
    console.log('props tooltip:', this.props)
  }

  _renderProp = () => {
    const { features } = this.props
    var prop = []
    for (var k in features) {
      if (features.hasOwnProperty(k)) {
        if (k === '0') {
          prop.push(features[k].properties)
        }
      }
    }

    // console.log(prop)

    return prop.map((item, index) => {
      return (
        <Fragment key={index}>
          <h3>{item.nampro}</h3>
          <p>{item.ketera}</p>
          <p>{item.featureId}</p>
          <hr />
          {/*data_upload.files && data_upload.files.map(item=>{
    				return (
    					<div>{item.filename}</div>
    				);
    			})*/}
        </Fragment>
      )
    })
  }

  _renderUpload = () => {
    const { data_upload } = this.props
    console.log(data_upload['files'])
    /*if(files.length > 0){
	    	return files.map(item=>{
	    		return (
	    			<div>{item.filename}</div>
	    		);
	    	})    		
    	}*/
  }

  render() {
    return (
      <Card
        style={{
          position: 'absolute',
          // top:50,
          width: 250,
          height: 150,
          maxWidth: 345,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <CardContent
          style={{
            paddingTop: 0,
          }}
        >
          {this._renderProp()}
          {this._renderUpload()}
        </CardContent>
      </Card>
    )
  }
}
