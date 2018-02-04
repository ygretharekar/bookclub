import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Container, Button, Card, Input, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { logoutUser, searchBook, getBooks, createRequest } from "../actionPath";

export class AllBooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			search: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this); 
		this.handleRequest = this.handleRequest.bind(this);


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

	handleRequest(title) {

		if( this.props.username ){
			this.props.createRequest({ book: title, user: this.props.username });
		}
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
							this.props.isAuthenticated &&
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
									<Link to='/profile'>
										{this.props.username}
									</Link>
									<Button
										onClick={this.props.logoutUser}
										style={{ marginLeft: "0.5em" }}
									>
										Logout
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
									>
										<Image src={book.image} />
										<Card.Content extra>
											<Button
												color='red'
												content='REQUEST'
												label={{ 
													basic: true, 
													color: "red", 
													pointing: "left", 
													content: book.requests.length
												}}
												disabled = { this.props.username === book.owner }			
												onClick={() => this.handleRequest(book.title)}
											/>
										</Card.Content>
									</Card>
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
	getBooks,
	createRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);