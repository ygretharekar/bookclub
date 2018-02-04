import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Menu, Container, Message, Card, Image, Button, Modal, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { confirmTrade } from "../actionPath/index";


export class ProfilePage extends Component {
	static propTypes = {
		state: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			books: []
		};
		this.showModal = this.showModal.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	close = () => this.setState({ modal: false });

	showModal(book) {
		this.setState(
			{
				books: book.requests.map(
					r => (
						<List.Item 
							onClick={ 
								() => this.handleClick(
									{  
										book: book.title,
										owner: book.owner,
										request: r,
										requests: book.requests
									}
								)
								
							}
						>
							<List.Content>
								<List.Header>
									{r}
								</List.Header>
							</List.Content>
						</List.Item>
					)
				),
				modal: true
			}
		);
	}

	handleClick(req){
		
		this.props.confirmTrade(req);
		this.setState({modal: false});

	}

	render() {
		return (
			<div>
				<Menu>
					<Menu.Item>
						<Header
							as = {Link}
							to = '/'
						>
							ProfilePage
						</Header>
					</Menu.Item>
				</Menu>
				<Container>
					<Message success>
						<Message.Header>
							Accepted Requests: 
						</Message.Header>
						<Message.List>
							{
								this.props.accepted.map(
									item => (
										<Message.Item>
											{ item.title + ", OWNER: " + item.owner }
										</Message.Item>
									)
								)
							}
						</Message.List>
					</Message>
					<Message negative>
						<Message.Header>
							Rejected Requests:
						</Message.Header>
						<Message.List>
							{
								this.props.rejected.map(
									item => (
										<Message.Item>
											{ item.title + ", OWNER: " + item.owner }
										</Message.Item>
									)
								)
							}
						</Message.List>
					</Message>
					<Card.Group itemsPerRow={3}>
						{
							this.props.books.map(
								(book, i) => (
									this.props.username === book.owner
									&&
									<Card
										key={i}
										onClick = {() => this.showModal(book)}
									>
										<Image src={book.image} />
									</Card>
								)
							)
						}
					</Card.Group>
					<Modal 
						size="small" 
						open={this.state.modal} 
						onClose={() => this.setState({modal: false})}
					>

						<Modal.Header>
							{this.props.books.title}
						</Modal.Header>
						<Modal.Content>
							<List animated verticalAlign='middle'>
								{this.state.books}
							</List>
						</Modal.Content>
						<Modal.Actions>
							<Button negative>
								No
							</Button>
							<Button positive icon='checkmark' labelPosition='right' content='Yes' />
						</Modal.Actions>
					</Modal>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.authReducer.isAuthenticated,
	username: state.authReducer.username,
	accepted: state.authReducer.accepted,
	rejected: state.authReducer.rejected,
	books: state.bookReducer.books,
	loading: state.bookReducer.loading
});

const mapDispatchToProps = {
	confirmTrade
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
