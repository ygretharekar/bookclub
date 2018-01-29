import React from "react";
import { Menu, Container, Button, Segment, Header, Icon } from "semantic-ui-react";
import {Link} from "react-router-dom";
let homePage = () => (
	<div>
		<Segment
			inverted
			textAlign="center"
			vertical
			style={{ minHeight:"662px", padding:"1em 0em" }}
		>
			<Container>
				<Menu
					inverted
					pointing
					secondary
					size="large"
				>
					<Menu.Item 
						as="a" 
						active
						style={{ position:"relative", top: "-1em" }}
					>
						Home
					</Menu.Item>
					<Menu.Item 
						position="right"
					>
						<Button 
							inverted
							as={Link}
							to="/login"
						>
							Log In
						</Button>
						<Button 
							inverted
							as={Link}
							to="/signup"
							style={{ marginLeft: "0.5em" }}
						>
							Sign Up
						</Button>
					</Menu.Item>
				</Menu>
			</Container>
			<Container text>
				<Header 
					as="h1"
					content="Book Trading Club"
					inverted
					style={{ fontSize: "4em", fontWeight: "normal", marginBottom: 0, marginTop: "3em" }}
				/>
				<Header
					as="h2"
					content="Start trading books today!"
					inverted
					style={{ fontSize: "1.7em", fontWeight: "normal" }}
				/>
				<Button
					as={Link}
					to="/allbooks"
					primary 
					size='huge'
					animated
				>
					<Button.Content visible>Get Started</Button.Content>
					<Button.Content hidden>
						<Icon name='right arrow' />
					</Button.Content>
				</Button>
			</Container>
		</Segment>
	</div>
);

export default homePage;