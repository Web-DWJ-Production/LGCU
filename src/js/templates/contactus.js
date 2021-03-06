import React, { Component } from 'react';
import ReactGA from 'react-ga';

/* Images */
import back1 from '../../assets/site/mini/back12.jpg';
import emailImg from '../../assets/site/mini/email.jpg';

/* Components */
import FormCpt from './components/formCpt';

/* Header */
class ContactHeader extends Component{
   
    render(){        
        return(
            <div className="headerCard contactusHeader sub-page">
                <div className="header-title header-section">
                    <div className="backImg"><img alt="Contact Header img" src={back1} /></div>
                    <h1>Contact Us</h1>                    
                    <div className="solid-back">
                        <span>Reach out to us to get more information on the great opportunities that we have at LGCU.</span>                        
                    </div>
                </div>                
            </div>
        );
    }
}

/* Body */
class Contact extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contactForm:{
                "title":"contact us", "sendAddress":"admissions@lenkesongcu.org",
                "subject":"Contact Us Form Submission", "additionalData":{}, "type":"core",
                "sendMessage":"Thank you we have received message we will respond as soon as we get the opportunity.",
                "elements":[
                    {"type":"input","sz":7, "required":true, "name":"name", "placeholder":"Name", "value":"", "valueList":[]},
                    {"type":"input","sz":7, "required":true, "name":"email", "placeholder":"Email", "value":"", "valueList":[]},
                    {"type":"textarea","sz":10, "required":true, "name":"message", "placeholder":"Message", "value":"", "valueList":[]}
                ]
            }
        }
        this.initialReactGA = this.initialReactGA.bind(this);
    }

    componentDidMount(){ 
        window.scrollTo(0, 0);
        this.initialReactGA();
    }

    initialReactGA(){
        ReactGA.initialize('UA-147138083-1');
        ReactGA.pageview('/contactUs');
    }

    render(){        
        return(
            <div className="inner-page-body contactus">
                <section className="contactus-section contact-form">
                    <div className="section-container">                        
                        <div className="split-info">
                            <div className="split-img"><img alt="Contact info img" src={emailImg} /></div>
                            <div className="split-txt">
                                <h2 className="lrgTitle ctr" data-text="Contact Us">Contact Us</h2>
                                <p>Thank you for your interest in LGCU. Complete the form to get in touch with our offices to answer any questions regarding our university.</p>
                                <FormCpt form={this.state.contactForm} />
                            </div>                            
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export {Contact, ContactHeader};