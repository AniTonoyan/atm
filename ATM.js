class ATM {
    constructor(moneyObj) {
        this.moneyObj = {
            20000: 0,
            10000: 0,
            5000: 0,
            1000: 0, 
        };

        this.cashIn(moneyObj);
    }

    cashIn(moneyObj) {
        if (typeof moneyObj !== "object") {
            throw("Please enter object");
        }

        Object.keys(moneyObj).forEach(money => {
            if (this.moneyObj[money] === undefined) {
                throw("Please enter valid object!!!");
            }

            this.moneyObj[money] += moneyObj[money];
        });
    }

    get balance() {
        let balanceSum = 0;
        Object.keys(this.moneyObj).forEach(unit => { 
            balanceSum += (unit * this.moneyObj[unit]);
        });

        return balanceSum;
    }

    cashOut(money) {
  
        if (this.balance < money) {
            throw ("The ATM doesn't have enough money");
        }
        if (money% 1000 !== 0){
            throw ("Please enter valid money.Error!!!");
        }
        if (money < 0) {
            throw ("Please enter valid money");
        }

        let outMoney = {
                20000:0,
                10000:0,
                5000:0,
                1000:0,
            };
    
        Object.keys(this.moneyObj).forEach(unit => {
            while (money >= unit && this.moneyObj[unit] > 0) {
                money -= unit;               
                this.moneyObj[unit]--;
                outMoney[unit]++;
            }    
        });
        
        if (money > 0) { 
            Object.keys(outMoney).forEach(unit => {
                this.moneyObj[unit] += outMoney[unit];
             });

             throw("Sorry we dont have money!!!!!!!");   
        }

        return outMoney;
    }

  }

let initialArr = [
    {
        20000: 1,
        10000: 2,
        5000: 0,
        1000: 2
    },
    {
        20000: 5,
        10000: 5,
        5000: 2,
        1000: 2
    },
    {
        20000: 2,
        10000: 2,
        5000: 1,
        1000: 3
    },
]

let allAtms = [];

initialArr.forEach(function(initialItem) {
    allAtms.push(new ATM(initialItem));
});

function getAllAtmBalance(allAtms) {
    let balance = 0;
    allAtms.forEach(function(atm) {
        balance += atm.balance;
    });

    return balance;
    
}

  function fillBalance() {
    allAtms.forEach((atm,index) => {
        Object.keys(atm.moneyObj).forEach(money => { 
            if (atm.moneyObj[money] < initialArr[index][money])  {
                let difference = initialArr[index][money] - atm.moneyObj[money];
                console.log(difference);
                if (difference !== 0) {
                    atm.moneyObj[money] += difference;
                }
            }
        });
    });
  }
