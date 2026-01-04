import React, { Component } from 'react';

interface PortfolioProps{
  data: any
};

interface PortfolioState {};

class Portfolio extends Component<PortfolioProps, PortfolioState> {
  render() {

    if(Object.keys(this.props.data.projects).length!==0){
      var projects = this.props.data.projects.map(function(projects: any){
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{projects.title}</h5>
                     <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
        </div>
      })
      return (
        <section id="portfolio">
  
        <div className="row">
  
           <div className="twelve columns collapsed">
  
              <h1>Check Out Some of My Works.</h1>
  
              <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                  {projects}
              </div>
            </div>
        </div>
     </section>
      );
    }
    else{ return <div/>};

    
  }
}

export default Portfolio;
