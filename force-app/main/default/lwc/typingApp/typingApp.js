import { LightningElement } from 'lwc';

export default class TypingApp extends LightningElement {
    paragraph = 'The quick brown fox jumps over the lazy dog.';
    typedText = '';
    index = 0;
    errorIndex = [];
    typedCharacterCount = 0;

    get currentIndex() {
        return this.index;
    }

    get paragraphlength() {
        return this.paragraph.length;
    }

    get listErrors() {
        return this.errorIndex;
    }
    
    handleTextChange(event) {
        this.processKeyStroke(event);
    }

    processKeyStroke(event) {
        const typedParagraph = event.target.value;
        const typedlength = typedParagraph.length;
        
        if(this.typedCharacterCount < typedlength) {
            //new character is typed
            this.validateKeyStroke(typedParagraph);
            this.typedCharacterCount++;
        }
        else if(this.typedCharacterCount > typedlength) {
            //character is deleted
            this.index--;
            this.typedCharacterCount--;
            this.checkifErrorCharacterDeleted(typedParagraph);
        }
    }

    validateKeyStroke(typedParagraph) {
        //check if the paragraph is over
        if(this.index >= this.paragraphlength) {
            this.template.querySelector('lightning-input').disabled = true;
            return;
        }

        const currentCharacter = this.paragraph[this.index];
        const typedCharacter = typedParagraph[this.index];
        console.log('currentCharacter: ' + currentCharacter);
        console.log('typedCharacter: ' + typedCharacter);
        if(currentCharacter === typedCharacter) {
            this.index++;
        } else {
            this.errorIndex.push(this.index);
            this.index++;
        }
    }

    checkifErrorCharacterDeleted(typedParagraph) {
        const deletedIndex = this.errorIndex.indexOf(this.index);
        console.log(`checking if error character deleted: ${deletedIndex} for index: ${this.index+1}`)
        if(deletedIndex > -1) {
            this.errorIndex.splice(deletedIndex, 1);
        }
    }

    

}