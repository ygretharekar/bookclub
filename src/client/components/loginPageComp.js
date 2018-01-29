import React from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import {Link} from "react-router-dom";

export default props => (
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
				>
					LogIn
				</Header>
				<Form size="large">
					<Segment stacked>
						<Form.Input 
							fluid
							icon="user"
							iconPosition="left"
							placeholder="E-mail address"
							onChange={props.email}
						/>
						<Form.Input 
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
							onChange={props.password}
						/>
						<Button
							fluid
							color="black"
							size="large"
							onClick={props.login}
						> 
							LogIn
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