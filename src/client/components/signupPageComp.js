import React from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import {Link} from "react-router-dom";
export default () => (
	<div className="login-form">
		<Grid
			textAlign="center"
			verticalAlign="middle"
		>

			<Grid.Column
			>
				<Header
					as="h2"
					textAlign="center"
					color="green"
				>
					SignUp
				</Header>
				<Form size="large">
					<Segment stacked>
						<Form.Input 
							fluid
							icon="user"
							iconPosition="left"
							placeholder="E-mail address"
						/>
						<Form.Input 
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
						/>
						<Form.Input 
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Retype password"
							type="password"
						/>
						<Button
							fluid
							color="black"
							size="large"
							positive
						> 
							SignUp
						</Button>
					</Segment>
				</Form>
				<Message
				>
					<Link to="/">
						Go Back  
					</Link>
				</Message>
			</Grid.Column>
		</Grid>
	</div>
);