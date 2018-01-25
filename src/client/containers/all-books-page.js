import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class AllBooks extends Component {
	static propTypes = {
		prop: PropTypes
	}

	render() {
		return (
			<div>
				
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	state
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
