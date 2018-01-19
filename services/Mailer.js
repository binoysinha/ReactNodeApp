const sendgrid = require('sendgrid');
const Helper = sendgrid.mail;

const keys = require('../config/keys');

class Mailer extends Helper.Mail {
    constructor({ subject, recipients}, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new Helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new Helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({email}) => {
            return new Helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new Helper.TrackingSettings();
        const clickTracking = new Helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new Helper.Personalization();
        
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });

        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;