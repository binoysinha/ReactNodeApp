import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions/index';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = formFields.map(({ label, name}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });



    return (
        <React.Fragment>
            <h5>Please confirm entries</h5>
            {reviewFields}
            <button 
                className="yellow darken-3 btn-flat white-text"
                onClick={onCancel}
            >
                Back    
            </button>    
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)} >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </React.Fragment>    
    );
}

function mapStateToProps({form}) {
    return {
        formValues: form.surveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));