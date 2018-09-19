class SmartCalculator {

    constructor(initialValue) {
      this.stack = [initialValue];

      this.priority = {
          '+': 0,
          '-': 0,
          '*': 0,
          '/': 0,
          '^': 0
      };

      this.ADD = '+';
      this.SUBSTRACT = '-';
      this.MULTIPLY = '*';
      this.DEVIDE = '/';
      this.POW = '^';
    }
  
    add(number) {
      this.stack.push(this.ADD);
      this.stack.push(number);
      return this;
    }
    
    subtract(number) {
      this.stack.push(this.ADD);
      this.stack.push(number * -1);
      return this;
    }
  
    multiply(number) {
        this.stack.push(this.MULTIPLY);
        this.stack.push(number);
      return this;
    }
  
    devide(number) {
      if(!number) {
        throw new Error('Error: you try divide by zero!');
      }
      this.stack.push(this.DEVIDE);
      this.stack.push(number);
      return this;
    }
  
    pow(number) {
      this.stack.push(this.POW);
      this.stack.push(number);
      return this;
    }

    calc(expression) {
        let expLength = expression.length;
        
        if(expLength === 0) {
            return result;
        }

        if(expLength === 1) {
            return expression[0];
        }

        for(let i = 0; i < expLength; i++) {
            if(typeof expression[i] !== "number") {
                if(this.checkPriority(expression[i])) {
                    let operationResult = this.doOperation(expression[i], expression[i-1], expression[i+1]);
                    expression.splice(i-1, 3, operationResult);
                    if(this.calc(expression)) {
                        return expression[0];
                    };
                } else {
                    continue;
                }
            }
        }
    }

    checkPriority(operation) {
        if(operation === this.POW) {
            return true;
        } else if(this.priority[this.POW] === 0 && (operation === this.MULTIPLY || operation === this.DEVIDE)) {
            return true;
        } else if(this.priority[this.POW] === 0 && this.priority[this.MULTIPLY] === 0 && this.priority[this.DEVIDE] === 0 && (operation === this.ADD || operation === this.SUBSTRACT)) {
            return true;
        } else {
            return false;
        }
    }

    calcPriority(expression) {
        for(let i = 0; i < expression.length; i++) {
            if(typeof expression[i] !== "number") {
                switch(expression[i]) {
                    case this.ADD:
                        this.priority[this.ADD] += 1;
                        continue;
                    case this.SUBSTRACT:
                        this.priority[this.SUBSTRACT] += 1;
                        continue;
                    case this.MULTIPLY:
                        this.priority[this.MULTIPLY] += 1;
                        continue;
                    case this.DEVIDE:
                        this.priority[this.DEVIDE] += 1;
                        continue;
                    case this.POW:
                        this.priority[this.POW] += 1;
                        continue;
                }
            }
        }
    }
  
    toString() {
        this.calcPriority(this.stack);
        return this.calc(this.stack);
    }

    doOperation(operationType, leftOperand, rightOperand) {
        let operationResult;
        switch(operationType) {
            case this.ADD:
                operationResult = leftOperand + rightOperand;
                this.priority[this.ADD]--;
                break;
            case this.SUBSTRACT:
                operationResult = leftOperand - rightOperand;
                this.priority[this.SUBSTRACT]--;
                break;
            case this.DEVIDE:
                if(rightOperand === 0) {
                    throw new Error("Error: you try divede by zero!");
                }
                operationResult = leftOperand / rightOperand;
                this.priority[this.DEVIDE]--;
                break;
            case this.MULTIPLY:
                operationResult = leftOperand * rightOperand;
                this.priority[this.MULTIPLY]--;
                break;
            case this.POW:
                operationResult = Math.pow(leftOperand, rightOperand);
                if(leftOperand < 0 && rightOperand > 1) {
                    operationResult *= -1;
                }
                this.priority[this.POW]--;
                break;
        }
        return operationResult;
    }
}

module.exports = SmartCalculator;