import { Button, Header, Image, Modal } from 'semantic-ui-react'

import React from "react";

const GeoInfoModal = ({open, onClose, image}) => {
    console.log(image)
    return (
        <Modal
            onClose={onClose}
            open={open}
        >
            <Modal.Header>{image.title}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={image.url} wrapped style ={{margin:'auto'}}/>
                <Modal.Description>
                <Header as ='h4'>{image.location?.locality?._content} - {image.location?.region?._content +' (' + image.location?.country?._content + ')'}</Header>
                    <iframe 
                        src={"https://maps.google.com/maps?q="+image.location.latitude+","+image.location.longitude+"&z=15&output=embed"}
                        width="360" 
                        height="270" 
                    >
                    </iframe>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Close"
                    labelPosition='right'
                    onClick={onClose}
                />
            </Modal.Actions>
        </Modal>
    );
};

export default GeoInfoModal;