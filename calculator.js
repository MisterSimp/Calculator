class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
    }
    allClear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case 'x':
                computation = prev * current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operant')
const equalsButton = document.querySelector('.equal-symbol')
const deleteButton = document.querySelector('.delete')
const allClearButton = document.querySelector('.all-clear')
const previousOperandTextElement = document.querySelector('.previous-operant')
const currentOperandTextElement = document.querySelector('.current-operant')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

for (let button of numberButtons) {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
}

for (let button of operationButtons) {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
}

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.allClear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})