import React, { Component } from 'react';

class NoMatch extends Component {
    render() {
        return (
            <div>
                <h1 style={{ width: 500, marginLeft: "32%", marginTop: "150px" }}>Uh-oh! This page doesn't exist!<span role="img" aria-label="surprised face">😯</span></h1>
            </div>
        );
    }
}

export default NoMatch;