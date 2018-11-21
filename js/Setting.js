class Setting {
    constructor() {

        //selectors
        this.settingsButton = document.querySelector('.settings-icon'); //Setting
        this.$form = $('form');
        this.formXButton = document.querySelector('.form-x-button'); //Setting
        this.$formOKButton = $('.form-ok-button'); //Setting
        this.repeatForeverCheckBox = document.querySelector('#repeat-forever'); //Setting

        //variables
        this.sessionLength = 25; //Setting
        this.restLength = 5; //Setting
        this.longRestLength = 15; //Setting
        this.targetSessionNumber = 12; //Setting
    }


    /**
     * Toggles form.
     * @return null 
     */

    /**
     * Takes care of eventListeners.
     * @return null 
     */
    createEventListeners() {

        // disable the user input for "Target Session Number" if they check "Repeat forever"
        this.repeatForeverCheckBox.addEventListener('click', function () {
            if (this.repeatForeverCheckBox.checked) {
                document.querySelector('#session-number').setAttribute('disabled', 'true');
            } else {
                document.querySelector('#session-number').removeAttribute('disabled');
            }
        });

        // 
        this.$formOKButton.on('click', function (event) {
            if ($('#session').val() >= 1 && // every number has to be a positive integer
                $('#rest').val() >= 1 &&
                $('#long-rest').val() >= 1 &&
                $('#session-number').val() >= 1 &&
                Number.isInteger(parseInt($('#session').val())) &&
                Number.isInteger(parseInt($('#rest').val())) &&
                Number.isInteger(parseInt($('#long-rest').val())) &&
                Number.isInteger(parseInt($('#session-number').val()))
            ) { // if the condition is not met, event.preventDefault() is not run, thus triggering the form sumbit to the server, and the form automatically checks if all the inputs match the validation of number inputs specified in the HTML. 
                event.preventDefault();
                this.sessionLength = $('#session').val();
                this.restLength = $('#rest').val();
                this.longRestLength = $('#long-rest').val();
                if (this.repeatForeverCheckBox.checked) { // When the user selects "Repeat forever", set the total number of sessions to 1000.
                    this.targetSessionNumber = 1000;
                } else {
                    this.targetSessionNumber = $('#session-number').val();
                }
                pomoState.createStateArray(this.targetSessionNumber)
                this.$form.fadeOut(200);
            }
        });


        document.addEventListener('keydown', function (event) {
            if (event.keyCode == 27) {
                this.$form.fadeOut(200);
            }
        }); // when ESC is pressed, close the setting window.


    }

    /**
     * Sends the form values to the State object.
     * @return null 
     */

    /**
     * takes value from the fully customize form and updates the state array.
     * @return null 
     */









}
