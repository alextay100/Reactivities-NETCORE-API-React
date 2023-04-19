import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Container style={{marginTop: '5%'}}>
            <h1>Reactivities Home</h1>
            <h3>Welcome to Reactivities!</h3>
            <h4>Go to <Link to='/activities'>Activities</Link></h4>
        </Container>
    )
}