import React, { Component } from "react";
import { connect } from "react-redux";
import HomePageComp from "../components/homePageComp";

import { getBooks } from "../actionPath";

export class HomePage extends Component {
	componentWillMount() {
		this.props.getBooks();
	}

	render() {
		return (
			<HomePageComp />
		);
	}
}

const mapDispatchToProps = {
	getBooks
};

export default connect(null, mapDispatchToProps)(HomePage);
