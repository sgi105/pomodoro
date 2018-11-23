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

        this.addGoButton = document.querySelector('.add-go-button');
        this.addRestButton = document.querySelector('.add-rest-button');
        this.addLongRestButton = document.querySelector('.add-long-rest-button');
        this.customizationMainDisplay = document.querySelector('.customization-main-display');


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
            this.toggleForm();
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
                this.toggleForm();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 27) this.toggleForm();
        });

        this.formXButton.addEventListener('click', () => {
            this.toggleForm();
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
    toggleForm() {
        this.$form.fadeToggle(200);
    }



    /**
     * takes value from the fully customize form and updates the state array.
     * @return null 
     */
    addGo() {
        pomoStateManager.stateArray.push(new State('go'));
    }

    addRest() {
        pomoStateManager.stateArray.push(new State('rest'));
    }

    addLongRest() {
        pomoStateManager.stateArray.push(new State('longRest'));
    }

    renderCustomArray() {
        let stateNameToAdd = pomoStateManager.stateArray.slice(-1)[0].name;
        let stateLengthToAdd = pomoStateManager.stateArray.slice(-1)[0].length;
        let newStateElement = document.createElement('div');

        if (stateNameToAdd == 'longRest') newStateElement.className = 'long-rest-label';
        else newStateElement.className = stateNameToAdd + '-label';

        if (stateNameToAdd == 'longRest') newStateElement.textContent = 'LONG REST';
        else newStateElement.textContent = stateNameToAdd.toUpperCase();

        let newCustomLengthControl = document.createElement('div');
        newCustomLengthControl.className = 'customLengthControl';

        newCustomLengthControl.innerHTML = `
            <input id="session" name="sessionLength" type="number" value="${stateLengthToAdd}" min="1">
            <span class='custom-unit'>mins</span>`;

        this.customizationMainDisplay.appendChild(newStateElement);
        this.customizationMainDisplay.appendChild(newCustomLengthControl);

    }







}
