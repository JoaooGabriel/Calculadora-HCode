class CalcController {
    constructor() {
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateCalcEl = document.querySelector('#data');
        this._timeCalcEl = document.querySelector('#hora');

        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        },
        1000
        );
    }

    clearAll() {
        this._operation = []; //retorna o array vazio
    }

    cancelEntry() {
        this._operation.pop(); //exclui o ultimo value do array
    }

    getLastOperation() {
         return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {
        this._operation[this._operation - 1] = value;
    }

    isOperator(value) {
       return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    addOperation(value) {
        console.log('A', isNaN(this.getLastOperation()));
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                this._setLastOperation(value);

            } else if(isNaN(value)) {
                console.log(value);
            } else {
                this._operation.push(value); //add um value no array
            }

        } else {
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue)); //add um value no array
        }

        console.log(this._operation);
    }

    setError() {
        this.displayCalc = 'Error';
    }

     execBtn(value) {
        switch(value){
        
        case 'ac':
        this.clearAll();
            break;

        case 'ce':
        this.cancelEntry();
            break;
        
        case 'soma':
        this.addOperation('+');
            break;

        case 'subtracao':
            this.addOperation('-');
            break;

        case 'multiplicacao':
            this.addOperation('*');
            break;

        case 'divisao':
            this.addOperation('/');
            break;

        case 'porcento':
            this.addOperation('%');
            break;

        case 'igual':
            
            break;

        case 'ponto':
            this.addOperation('.');
            break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        this.addOperation(parseInt(value));
            break;

        default:
            this.setError();
            break;
        }
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach((btn, index) =>{
            this.addEventListenerAll(btn, 'click drag', e => {
                let textButton = btn.className.baseVal.replace('btn-', '');

                this.execBtn(textButton);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            });
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayDate() {
        return this._dateCalcEl.innerHTML;
    }
    set displayDate(value) {
        this._dateCalcEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeCalcEl.innerHTML;
    }
    set displayTime(value) {
        this._timeCalcEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    } //get retorna o valor da var _displayCalc

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    } //set atribui um novo valor a var _displayCalc

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}