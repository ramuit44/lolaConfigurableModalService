'use strict';
(function() {
    angular.module('macApp')
        .service('connectionProfileModalService', ConnectionProfileModalService);
    ConnectionProfileModalService.$inject = ['commonModalService','Constants'];

    function ConnectionProfileModalService(CommonModalService, Constants) {

    	var showMaturingFacilitiesFTApprovalCheckList = function(data) {
            return CommonModalService.openModalWithOptions("maturingFacilitiesFTApprovalCheckList", {
                modalData: data, viewData : {maturingOnLabel:getMaturingOnLabel(data.productDto.maturityDate)}
            });
        };
    	
   
        var showMaturingFacilitiesFTRollOverDetails = function(data,scope,viewMode) {
            return CommonModalService.openModalWithOptions("maturingFacilitiesFTRollOverDetails", {
                modalData: data, viewData : {maturingOnLabel:getMaturingOnLabel(data.productDto.maturityDate)}, parentScope:scope, isOpenModalInViewMode:viewMode
            });
        };

        var showMaturingFacilitiesFTDealTLAResponse = function(data,scope) {
            return CommonModalService.openModalWithOptions("maturingFacilitiesFTDealTLAResponse", {
                modalData: data, viewData : {maturingOnLabel:getMaturingOnLabel(data.rolloverFacilitiesDTO.productDto.maturityDate)}, parentScope:scope
            });
        };

        var getMaturingOnLabel = function(date){
            if(typeof date === "number" && (new Date(date) < new Date())){
                return Constants.rolloverFTFacilityLabels.EXPIRED;
            }
            return Constants.rolloverFTFacilityLabels.MATURING;
        };
        
        
        var showUnsuccessApprovalChecklistMaturingFacModal = function(dealId,scope){
        	return CommonModalService.openModalWithOptions("unsuccessApprovalChecklistMaturingFacilityResponse", {
                modalData: {dealId:dealId}, parentScope:scope
            });
        }


        return {
            
        	showMaturingFacilitiesFTApprovalCheckList: showMaturingFacilitiesFTApprovalCheckList,
        	showMaturingFacilitiesFTRollOverDetails: showMaturingFacilitiesFTRollOverDetails,
            showMaturingFacilitiesFTDealTLAResponse: showMaturingFacilitiesFTDealTLAResponse,
            showUnsuccessApprovalChecklistMaturingFacModal: showUnsuccessApprovalChecklistMaturingFacModal
            
        };

    }
})();