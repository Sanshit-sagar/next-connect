import React from 'react'
var Loader = require('halogen/PulseLoader');

export var Loading = React.createClass({
    render: function() {
      return (
        <Loader color="#26A65B" size="16px" margin="4px"/>
      );
    }
});