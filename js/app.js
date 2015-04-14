/**
* @author Samson Kapeyi 
* Email: kapeyisamson@gmail.com
*/

var Calculator = angular.module('Calculator', []);
Calculator.controller('appController', function ($scope) {
    $scope.Calculate = function () {       
        $scope.NSSF = computeNssf($scope.GROSS);
        $scope.NSSFCONTRIBUTION = $scope.NSSF[0];
        $scope.EMPLOYERCONTRIBUTION = $scope.NSSF[1];
        $scope.TOTALCONTRIBUTION = $scope.NSSF[2];
        $scope.PAYE = computePaye($scope.GROSS);
        $scope.NETPAY = computeNetpay($scope.GROSS, $scope.NSSFCONTRIBUTION, $scope.PAYE);
    };  

    //Calculate NSSF
    function computeNssf (gross) {        
        var EMPLOYEE_RATE = 0.05, EMPLOYER_RATE = 0.1;
        var employeeContribution = EMPLOYEE_RATE * gross;
        var employerContribution = EMPLOYER_RATE * gross;
        var totalContribution = employeeContribution + employerContribution;
        values = [];
        values[0] = employeeContribution;
        values[1] = employerContribution;
        values[2] = totalContribution;
        return values;
    }
    //Compute PAYE
    function computePaye(gross) {
        SECOND_TAX_BRACKET_RATE=0.1;
        THIRD_TAX_BRACKET_RATE=.2;
        FOURTH_TAX_BRACKET_RATE=0.3;
        OVER_TEN_MILLION = .1;
        PAYE = 0;
        
        if (gross < 235000) { PAYE = 0; }
        else if (235000 <= gross && gross <= 335000) { PAYE = SECOND_TAX_BRACKET_RATE * gross; }
        else if (335000 <= gross && gross <= 410000) { PAYE = 10000 + THIRD_TAX_BRACKET_RATE * (gross - 335000); }
        else if (gross > 410000 && gross < 10000000) { PAYE = 25000 + FOURTH_TAX_BRACKET_RATE * (gross - 410000); }
        else if (gross > 10000000) { PAYE = 25000 + (FOURTH_TAX_BRACKET_RATE * (gross - 410000)) + (OVER_TEN_MILLION * (gross - 10000000)); }

        return PAYE;
    }
    //compute NETPAY
    function computeNetpay(gross, employeeContribution, paye) {
        NetPay = gross - paye - employeeContribution;
        return NetPay;
    }
});