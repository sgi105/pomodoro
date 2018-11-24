class Setting {
    constructor() {
        this.settingsButton = document.querySelector('.settings-icon');

        //selectors
        this.$form = $('form');
        this.formXButton = document.querySelector('.form-x-button');
        this.$formOKButton = $('.form-ok-button');
        this.repeatForeverCheckBox = document.querySelector('#repeat-forever');
        this.sessionNumberInput = document.querySelector('#session-number');
        this.fullyCustomizeButton = document.querySelector('.fully-customize-button');

        //customization window elements
        this.$customizationWindow = $('.customization-window');
        this.addGoButton = document.querySelector('.add-go-button');
        this.addRestButton = document.querySelector('.add-rest-button');
        this.addLongRestButton = document.querySelector('.add-long-rest-button');
        this.customizationMainDisplay = document.querySelector('.customization-main-display');
        this.clearAllButton = document.querySelector('.customization-clear-button');
        this.customizationOkButton = document.querySelector('.customization-ok-button');
        this.customizationXButton = document.querySelector('.customization-x-button');


        //variables
        this.sessionLength = 25; //Setting
        this.restLength = 5; //Setting
        this.longRestLength = 15; //Setting
        this.targetSessionNumber = 12; //Setting

        //initialize
        this.createEventListeners();
    }



    /**
     * Creates all the event listeners needed for the form.
     * @return null 
     */
    createEventListeners() {
        this.settingsButton.addEventListener('click', () => {
            this.toggleFade(this.$form);
        });

        this.repeatForeverCheckBox.addEventListener('click', () => {
            this.toggleTargetSessionNumberInput()
        });

        this.$formOKButton.on('click', (event) => {
            if (this.validateForm(event)) {
                // if the condition is not met, event.preventDefault() is not run, thus triggering the form sumbit to the server, and the form automatically checks if all the inputs match the validation of number inputs specified in the HTML. 
                event.preventDefault();
                this.storeValuesOfForm();
                pomoStateManager.createStateArray(this.targetSessionNumber);
                pomoStateManager.render(new State('ready'));
                this.toggleFade(this.$form);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 27) this.toggleFade(this.$form);
        });

        this.formXButton.addEventListener('click', () => {
            this.toggleFade(this.$form);
        })

        this.addGoButton.onclick = () => {
            this.addGo();
            this.renderCustomArray();
        }

        this.addRestButton.onclick = () => {
            this.addRest();
            this.renderCustomArray();
        }

        this.addLongRestButton.onclick = () => {
            this.addLongRest();
            this.renderCustomArray();
        }

        this.clearAllButton.onclick = () => {
            this.clearAllStates();
        }

        this.customizationOkButton.onclick = () => {
            this.createCustomStateArray();
        }

        this.customizationMainDisplay.onclick = (evt) => {
            this.removeState(evt);
        }

        this.customizationOkButton.onclick = (evt) => {
            evt.preventDefault();
            this.createCustomStateArray();
            this.toggleFade(this.$customizationWindow);
            this.toggleFade(this.$form);

            pomoSetting.targetSessionNumber = document.querySelectorAll('.go-label').length;

            pomoStateManager.render(new State('ready'));
        }

        this.fullyCustomizeButton.onclick = (evt) => {
            evt.preventDefault();
            this.toggleFade(this.$customizationWindow);
            this.storeValuesOfForm();
            this.clearAllStates();
        }

        this.customizationXButton.onclick = (evt) => {
            this.toggleFade(this.$customizationWindow);
        }
    }

    removeState(evt) {
        if (evt.target.className.includes('minus')) {
            let list = document.querySelectorAll('.minus');
            let index;
            for (let i = 0; i < list.length; i++) {
                if (list[i] == evt.target) index = i;
            }

            evt.target.nextElementSibling.remove();
            evt.target.nextElementSibling.remove();
            evt.target.remove();

            pomoStateManager.stateArray.splice(index, 1);


            console.log(pomoStateManager.stateArray);
        }
    }



    /**
     * disable the user input for "Target Session Number" if they check "Repeat forever"
     * @return null 
     */
    toggleTargetSessionNumberInput() {
        if (this.repeatForeverCheckBox.checked) this.sessionNumberInput.setAttribute('disabled', 'true');
        else this.sessionNumberInput.removeAttribute('disabled');
    }

    /**
     * Checks if every number is a positive integer.
     * @return {Boolean} true if it is valid, false if it is not. 
     */
    validateForm(event) {
        return ($('#session').val() >= 1 &&
            $('#rest').val() >= 1 &&
            $('#long-rest').val() >= 1 &&
            $('#session-number').val() >= 1 &&
            Number.isInteger(parseInt($('#session').val())) &&
            Number.isInteger(parseInt($('#rest').val())) &&
            Number.isInteger(parseInt($('#long-rest').val())) &&
            Number.isInteger(parseInt($('#session-number').val()))
        )
    }

    /**
     * Stores the values in the form to the object's properties.
     * @return null 
     */
    storeValuesOfForm() {
        // Stores values entered in the form to the appropriate variables.
        this.sessionLength = $('#session').val();
        this.restLength = $('#rest').val();
        this.longRestLength = $('#long-rest').val();
        this.targetSessionNumber =
            (!this.repeatForeverCheckBox.checked) ? $('#session-number').val() : 1000; // When the user selects "Repeat forever", set the total number of sessions to 1000.
    }

    /**
     * Makes the form fade in and out.
     * @return null 
     */
    toggleFade(fadeThis) {
        fadeThis.fadeToggle(200);
    }



    /**
     * takes value from the fully customize form and updates the state array.
     * @return null 
     */
    addGo() {
        pomoStateManager.stateArray.push(new State('go', pomoSetting.sessionLength));
    }

    addRest() {
        pomoStateManager.stateArray.push(new State('rest', pomoSetting.restLength));
    }

    addLongRest() {
        pomoStateManager.stateArray.push(new State('longRest', pomoSetting.longRestLength));
    }



    /**
     * Creates elements and append it to the main display area to show the user visually how the states are created. 
     * @return null 
     */
    renderCustomArray() {
        let stateNameToAdd = pomoStateManager.stateArray.slice(-1)[0].name;
        let stateLengthToAdd = pomoStateManager.stateArray.slice(-1)[0].length;

        let newStateLabel = this.createStateLabel(stateNameToAdd);
        let newCustomLengthControl = this.createCustomLengthControl(stateLengthToAdd);
        let newMinusButton = this.createMinusButton(stateNameToAdd);

        this.customizationMainDisplay.appendChild(newMinusButton);
        this.customizationMainDisplay.appendChild(newStateLabel);
        this.customizationMainDisplay.appendChild(newCustomLengthControl);
        console.log(pomoStateManager.stateArray);
    }

    /**
     * Creates a new state label element go, rest, or long rest with correlated color.
     * @param {String} stateNameToAdd - State name of the new label to be created.
     * @return new label element
     */
    createStateLabel(stateNameToAdd) {
        let newStateLabel = document.createElement('div');

        if (stateNameToAdd == 'longRest') newStateLabel.className = 'long-rest-label';
        else newStateLabel.className = stateNameToAdd + '-label';

        if (stateNameToAdd == 'longRest') newStateLabel.textContent = 'LONG REST';
        else newStateLabel.textContent = stateNameToAdd.toUpperCase();

        return newStateLabel;
    }


    /**
     * Creates a new length control input element.
     * @param {Number} stateLengthToAdd - the length of the state to be added
     * @return new length control input element
     */
    createCustomLengthControl(stateLengthToAdd) {
        let newCustomLengthControl = document.createElement('div');
        newCustomLengthControl.className = 'customLengthControl';

        newCustomLengthControl.innerHTML = `
            <input class="custom-length" type="number" value="${stateLengthToAdd}" min="1">
            <span class='custom-unit'>mins</span>`;

        return newCustomLengthControl;
    }

    /**
     * Creates a new minus button with color depending on which state is to be added.
     * @param {String} stateNameToAdd - State name of the new label to be created.
     * @return new minus button element.
     */
    createMinusButton(stateNameToAdd) {
        let minusButton = document.createElement('img');
        let src;
        let className;

        if (stateNameToAdd == 'go') {
            src = 'img/go-minus-button.png';
            className = 'go-minus-button minus';
        } else if (stateNameToAdd == 'rest') {
            src = 'img/rest-minus-button.png';
            className = 'rest-minus-button minus';
        } else {
            src = 'img/rest-minus-button.png';
            className = 'long-rest-minus-button minus';
        }

        minusButton.src = src;
        minusButton.className = className;
        minusButton.alt = 'minus button';

        return minusButton;
    }



    /**
     * Clears the window of all states. 
     * @return null 
     */
    clearAllStates() {
        this.customizationMainDisplay.innerHTML = '';
        pomoStateManager.stateArray = [];
    }


    createCustomStateArray() {
        for (let i = 0; i < pomoStateManager.stateArray.length; i++) {
            pomoStateManager.stateArray[i].length = document.querySelectorAll('.custom-length')[i].value;
            //            console.log(document.querySelectorAll('.custom-length')[i])

        }

        console.log('custom array:', pomoStateManager.stateArray);
        pomoStateManager.stateArray.push(new State('finish'));
    }







}
