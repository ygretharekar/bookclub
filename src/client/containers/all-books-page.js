import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Container, Button, Card, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { logoutUser, searchBook, getBooks } from "../actionPath";

export class AllBooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			search: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this); 
	}
	
	componentWillMount = () => {
		this.props.getBooks();
	}
	
	handleChange(e){
		this.setState(
			{
				search: e.target.value
			}
		);
	}

	handleClick(){
		console.log("====================================");
		console.log(this.state.search);
		console.log("====================================");
		this.props.searchBook(
			{
				book: this.state.search, 
				owner: this.props.username
			}
		);
	}

	render() {
		return (
			<div>
				<Menu 
					fixed='top' 
					size="massive"
					borderless= {true}
				>
					<Container>
						<Menu.Item 
							as={Link}
							to="/" 
							header
						>
							Book Trading Club
						</Menu.Item>
				
						{
							!this.props.isAuthenticated &&
							<Menu.Item>
								<Input
									action={
										<Button
											onClick={this.handleClick}
										>
											search
										</Button>
									}
									placeholder='Add Book...' 
									icon="search"
									loading={this.props.loading}
									iconPosition="left"
									onChange={this.handleChange}
								/>
							</Menu.Item>
						}

						{
							this.props.isAuthenticated ?
								<Menu.Item
									position="right"
								>
									Username
									<Button
										onClick={this.props.logoutUser}
										style={{ marginLeft: "0.5em" }}
									>
										Log In
									</Button>
								</Menu.Item>
								:
								<Menu.Item 
									position="right"
								>
									<Button 
										as={Link}
										to="/login"
										color="black"
									>
										Log In
									</Button>
									<Button 
										as={Link}
										to="/signup"
										color="green"
										style={{ marginLeft: "0.5em" }}
									>
										Sign Up
									</Button>
								</Menu.Item>
						}
					</Container>
				</Menu>
				<Container style={{marginTop:"10%"}}>
					<Card.Group itemsPerRow={3}>
						{
							this.props.books.map(
								(book, i) => (
									<Card

										key={i}
										image={book.image}
									/>
								)
							)
						}
					</Card.Group>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.authReducer.isAuthenticated,
	username: state.authReducer.username,
	books: state.bookReducer.books,
	loading: state.bookReducer.loading
});

const mapDispatchToProps = {
	logoutUser,
	searchBook,
	getBooks
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);