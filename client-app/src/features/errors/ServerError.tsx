﻿import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer (function ServerError() {
    const { commonStore } = useStore();
    return (
        <Container>
            <Header as='h1' content='Server Error' />
            <Header sub as='h5' color='red' content={commonStore.error?.message} />
            {commonStore.error?.stackTrace && (
                <Segment>
                    <Header as='h4' content='Stack Trace:' color='teal' />
                    <code style={{ marginTop: '1em' }}>{commonStore.error.stackTrace}</code>
                </Segment>
            )}
        </Container>
    )
})