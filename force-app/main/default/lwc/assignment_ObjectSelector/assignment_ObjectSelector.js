import { api, LightningElement } from 'lwc';

export default class Assignment_ObjectSelector extends LightningElement {
    @api objectOptions
    

    objectSelected;

    handleObjectChange(event) {
        console.log('handleObjectChange', event.detail.value);
    }
    
}