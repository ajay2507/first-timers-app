import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import IssueCard from  './IssueCard';
import Pagination from './Pagination';

// Fetch all the open issues for Good First Issue
class IssuesList extends Component {

    constructor(props){
        super(props);
        this.state = {
            issueList: [],
            pageNo:1
        }

    }

    componentDidUpdate(prevProps,prevState){
        let that = this;
        let language = this.props.language;
        if(this.props.language == "react" || this.props.language == "angular"){
            language = "'+"+language;
        }
        if(this.props.language != prevProps.language){
            axios.get("https://api.github.com/search/issues?q=label:%22good+first+issue%22+language:"+language+"+state:open&page="+this.state.pageNo+"&sort=created&order=asc")
                .then(function (response) {
                    console.log(response);
                    that.setState({
                        issueList: response.data
                    })

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    render() {
        return (
            <section className="margin-top">
            <div>
                 <h2 className="text-transform">{this.props.language+" "}Projects</h2>
                {this.state.issueList.items != undefined &&

                <div className="card-list">
                <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                    {this.state.issueList.items.map((item, index) => {
                        return ( <IssueCard cardItem={item} key={index}/>)})}
                </Masonry></div>} 
                {this.state.issueList.length == 0 && <h2>Want to contribute open source! Search the projects with good first issue to contribute.</h2>}
           
           </div>
         </section>
        );
    }
}

export default IssuesList;
