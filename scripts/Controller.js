angular.module('macApp').controller('modalController', ['$scope', 'childModalService',
    function($scope, childModalService) {

        $scope.init = function() {
           $scope.product = {id:123,name:'MYPROD'};
        };

        $scope.extendFacility = function() {
            $scope.productToBeExtended = $scope.product;
			//Chaining of aysnch calls, the output of a promise call can be a value, a promise or error. Utilizing that concept we have chained the asynch calls. 
		   $scope.getConnectionHealthCheck(connectionProfileFactory).then($scope.shouldEnableFastTrackCheck).then($scope.checkEligibilityForFastTrack).then($scope.checkApprovalCheckListEligibility);
        };

        $scope.getConnectionHealthCheck = function(connectionProfileFactory) {
            /*return customerGroupService
                .checkConnectionHealth(connectionProfileFactory.sourceGroupNo)
                .then(function(connectionHealthCheckresult) {
                    var checkResultObject = connectionHealthCheckresult.data.resultObject;
                    return checkResultObject;
                });*/
				

        };

        $scope.shouldEnableFastTrackCheck = function(connectionHealthCheckResultObject) {
            if (connectionHealthCheckResultObject.abortList === null) {
                return true;
            }
            var TLAabortMsgs = $filter('orderBy')(connectionHealthCheckResultObject.abortList, '-code', true);
            TLAabortMsgs = $filter('orderBy')(TLAabortMsgs, '-type', true);
            if ($.isArray(TLAabortMsgs)) {
                var isTLAabortErrorExists = connectionHealthCheckResultObject.errorCount > 0;
                var op = ModalService.showTLAAbortMessages(TLAabortMsgs, isTLAabortErrorExists, connectionProfileFactory.sourceGroupNo, false).result;
                $scope.hideSpinner();
                return op.then(function(result) {
                    if (result.action === 'start') {
                        return true;
                    }
                }, function() {
                    //console.log("error call back scenario of Dismiss/Close Modal");
                    $scope.hideSpinner();
                    return false;
                });
            }
            return true;
        };


        $scope.checkEligibilityForFastTrack = function(shouldEnableFastTrackCheck) {
            if (shouldEnableFastTrackCheck == true) {
                var productParam = {
                    "id": $scope.productToBeExtended.productId,
                    "sourceGroupNo": connectionProfileFactory.sourceGroupNo
                };
                return customerGroupService
                    .rollOverFTEligibilityCheck(productParam)
                    .then(function(checkEligibilityForFastTrackresult) {
                        if (checkEligibilityForFastTrackresult.data) {
                            if (checkEligibilityForFastTrackresult.data.errorList && checkEligibilityForFastTrackresult.data.errorList.length > 0) {
                                if (checkEligibilityForFastTrackresult.data.errorList[0].code == Constants.commonErrorCodes.PRODUCT_NOT_ELIGIBILE_FAST_TRACK_ERR_CODE) {
                                    var dealId = checkEligibilityForFastTrackresult.data.resultObject.dealId;
                                    $scope.loadDealPageAndExtend(dealId);
                                    return false;
                                } else {
                                    console.error(checkEligibilityForFastTrackresult.data.errorList[0].message);
                                    alert(checkEligibilityForFastTrackresult.data.errorList[0].message);
                                }
                            } else {
                                $scope.hideSpinner();
                                $scope.rolloverFacilitiesDTO.approvalCheckList = checkEligibilityForFastTrackresult.data.resultObject.approvalCheckList;
                                $scope.productToBeExtended.sourceGroupNo = connectionProfileFactory.sourceGroupNo;
                                $scope.rolloverFacilitiesDTO.productDto = $scope.productToBeExtended;
                                $scope.rolloverFacilitiesDTO.productDto.sourceGroupNo = connectionProfileFactory.sourceGroupNo;
                                $scope.removeScroller();
                                var op = connectionProfileModalService.showMaturingFacilitiesFTApprovalCheckList($scope.rolloverFacilitiesDTO).result;
                                return op.then(function(result) {
                                    if (result === 'next') {
                                        $scope.showSpinner();
                                        return customerGroupService.rollOverApprovalChecklistEligibilityCheck($scope.rolloverFacilitiesDTO).then(
                                            function(approvalCheckListEligibilityResult) {
                                                return approvalCheckListEligibilityResult;
                                            });
                                    }
                                }, function() {
                                    $scope.hideSpinner();
                                    return false;
                                });
                            }
                            $scope.hideSpinner();
                            return false;
                        }
                    });
            }
            $scope.hideSpinner();
            return false;
        };

        $scope.checkApprovalCheckListEligibility = function(approvalCheckListEligibilityResult) {
            if (approvalCheckListEligibilityResult.data) {
                if (approvalCheckListEligibilityResult.data.errorList && approvalCheckListEligibilityResult.data.errorList.length > 0) {
                    if (approvalCheckListEligibilityResult.data.errorList[0].code == Constants.commonErrorCodes.ROLLOVER_APPROVAL_CHECKLIST_ELIGIBILITY_FAILURE) {
                    	 //US 1821
                        var dealId = approvalCheckListEligibilityResult.data.resultObject.dealId;
                        //$scope.loadDealPageAndExtend(dealId);
                        $scope.hideSpinner();
                    	var mfFTWzrdunsuccessApprovalChecklistMaturingFacModal=connectionProfileModalService.showUnsuccessApprovalChecklistMaturingFacModal( dealId, $scope);
                    	 
                    } else {
                        console.error(approvalCheckListEligibilityResult.data.errorList[0].message);
                        alert(approvalCheckListEligibilityResult.data.errorList[0].message);
                    }
                } else {
                    $scope.rolloverFacilitiesDTO.productDto = approvalCheckListEligibilityResult.data.resultObject.productDto;
                    $scope.rolloverFacilitiesDTO.customerDetails = approvalCheckListEligibilityResult.data.resultObject.customerDetails;
                   $scope.rolloverFacilitiesDTO.supportingDocImaged = approvalCheckListEligibilityResult.data.resultObject.supportingDocImaged;
                    var mfFtWzrd2 = connectionProfileModalService.showMaturingFacilitiesFTRollOverDetails($scope.rolloverFacilitiesDTO, $scope, false);
                    $scope.hideSpinner();
                }
            }
        }

        $scope.loadDealPageAndExtend = function(dealId){
            custGroupFacilitiesFactory.productToBeExtended = $scope.productToBeExtended;
            $scope.loadDealPage(dealId);
        }
        
        $scope.isLuiIdApplicable = function(luiId,productTypeId){
			return modifyFacilityUiService.isLuiIdApplicable(luiId,productTypeId);
		}

    }
]);