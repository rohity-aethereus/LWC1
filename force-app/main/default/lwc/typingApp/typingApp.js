import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TypingApp extends LightningElement {
    paragraph = 'The quick brown fox jumps over the lazy dog.';
    typedText = '';
    index = 0;
    errorIndex = [];
    errorCount = 0;
    typedCharacterCount = 0; //characters typed so far
    activeSession = false;
    timeElapsed = 0; //in seconds
    timer = null;
    speed = 0;
    accuracy = 0;
    debug_toggle = false;

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
        if(this.activeSession === false) {
            this.activeSession = true;
            this.startTimer();
        }
        this.processKeyStroke(event);
        this.calculateAccuracy();
        this.calculateSpeed();
    }

    processKeyStroke(event) {
        const typedParagraph = event.target.value;
        const typedlength = typedParagraph.length;

        if(this.index == this.paragraphlength) {
            //paragraph is over
            const toastEvent = new ShowToastEvent({
                title: 'Congratulations',
                message: 'You have completed the typing test',
                variant: 'success',
            });
            this.dispatchEvent(toastEvent);
            clearInterval(this.timer);
            alert('Test Over. Time taken: ' + this.timeElapsed + ' seconds');
            return;
        }
        
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
       
        const currentCharacter = this.paragraph[this.index];
        const typedCharacter = typedParagraph[this.index];
        console.log('currentCharacter: ' + currentCharacter);
        console.log('typedCharacter: ' + typedCharacter);
        if(currentCharacter === typedCharacter) {
            this.index++;
        } else {
            this.errorIndex.push(this.index);
            this.errorCount++;
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

    startTimer() {
        this.timer = setInterval(() => {
            this.timeElapsed++;
        }, 1000);
    }

    calculateAccuracy() {
        const totalCharacters = this.typedCharacterCount;
        const errorCharacters = this.errorCount;
        const correctCharacters = totalCharacters - errorCharacters;
        this.accuracy = Math.floor((correctCharacters/totalCharacters)*100);
    }

    calculateSpeed() {
        const totalCharacters = this.typedCharacterCount;
        const timeTaken = this.timeElapsed;
        this.speed = Math.floor((totalCharacters/5)/(timeTaken/60));
    }
    
    handleReset() {
        this.reset();
    }

    reset() {
        this.index = 0;
        this.errorIndex = [];
        this.typedCharacterCount = 0;
        this.activeSession = false;
        this.timeElapsed = 0;
        this.accuracy = 0;
        this.speed = 0;
        this.template.querySelector('lightning-textarea').value = '';
        clearInterval(this.timer);
    }

    toggleDebug() {
        this.debug_toggle = !this.debug_toggle;
    }
}