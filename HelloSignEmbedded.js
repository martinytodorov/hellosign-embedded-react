import React from 'react';
import PropTypes from 'prop-types';

const HS_CONTAINER_ID = "hellosign-embedded";

class HelloSignEmbedded extends React.Component {

    constructor(props) {
        super(props);
        this.getHsSettings = this.getHsSettings.bind(this);
    }

    componentDidMount() {
        if (!window.HelloSign) {
            const script = document.createElement("script");
            script.src = "https://s3.amazonaws.com/cdn.hellosign.com/public/js/hellosign-embedded.LATEST.min.js";
            script.async = true;
            script.type = 'text/javascript';

            // Get the settings and add the container if needed
            var settings = this.getHsSettings();
            if (this.props.inContainer) {
                settings.container = document.getElementById(HS_CONTAINER_ID);
            }

            script.onload = () => {
                window.HelloSign.init(this.props.clientId);
                window.HelloSign.open(settings);
            };
            document.body.appendChild(script);
        }
    }

    getHsSettings() {
        var hs_settings = {};
        
        // Required or default settings
        hs_settings.url = this.props.url;
        hs_settings.uxVersion = this.props.uxVersion;
        hs_settings.allowCancel = this.props.allowCancel;
        hs_settings.debug = this.props.debug;
        hs_settings.skipDomainVerification = this.props.skipDomainVerification;

        // Optional settings
        if (this.props.userCulture) { hs_settings.userCulture = this.props.userCulture }
        if (this.props.redirectUrl) { hs_settings.redirectUrl = this.props.redirectUrl }
        if (this.props.messageListener) { hs_settings.messageListener = this.props.messageListener }
        if (this.props.height) { hs_settings.height = this.props.height }

        return hs_settings;
    }

    render() {
        const container = this.props.inContainer ? <div id={HS_CONTAINER_ID}></div> : "";
        return <div>{container}</div>;
    }
}

HelloSignEmbedded.propTypes = {
    clientId: PropTypes.string.isRequired,
    uxVersion: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    userCulture: PropTypes.string,
    redirectUrl: PropTypes.string,
    allowCancel: PropTypes.bool,
    messageListener: PropTypes.func,
    debug: PropTypes.bool,
    skipDomainVerification: PropTypes.bool,
    inContainer: PropTypes.bool,
    height: PropTypes.number
};

HelloSignEmbedded.defaultProps = {
    uxVersion: 2,
    debug: false,
    allowCancel: true,
    inContainer: false,
    skipDomainVerification: false
};

export default HelloSignEmbedded;