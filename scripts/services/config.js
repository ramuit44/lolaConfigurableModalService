/*'use strict';

*//**
 * @ngdoc service
 * @name Stream.StaticRefs
 * @description
 * # StaticRefs
 * Service in the Deal Streaming.
 */
angular.module('macApp')
  .service('StaticReference', function StaticReference() {
    var HEADERS = {
        common : "app/views/modals/common/header.html",
        error : "app/views/modals/common/error-header.html",
        maturingFacilitiesFTApprovalCheckList : "app/views/modals/connectionProfile/header/maturingFacilitiesFTApprovalCheckListHeader.html",
        maturingFacilitiesFTRollOverDetails : "app/views/modals/connectionProfile/header/maturingFacilitiesFTRollOverDetailsHeader.html"
    };
    var FOOTERS = {
        selectOccupation : "app/views/modals/deal/selectOccupationFooter.html",
        addEditEmployment : "app/views/modals/deal/addEditEmploymentFooter.html"
    };
    var BODY = {
        addEditAddress : "app/views/modals/deal/addEditAddressBody.html",
        selectOccupation : "app/views/modals/deal/selectOccupationBody.html",
        addEditEmployment : "app/views/modals/deal/addEditEmploymentBody.html",
        creditCheckResponse : "app/views/modals/deal/creditCheckResponseBody.html",
        maturingFacilitiesFTApprovalCheckList : "app/views/modals/connectionProfile/maturingFacilitiesFTApprovalCheckListBody.html",
        maturingFacilitiesFTRollOverDetails : "app/views/modals/connectionProfile/maturingFacilitiesFTRollOverDetailsBody.html",
        maturingFacilitiesFTDealTLAResponse : "app/views/modals/connectionProfile/maturingFacilitiesFTDealTLAResponseBody.html",
        unsuccessApprovalChecklistMaturingFacilityResponse : "app/views/modals/modalMaturingFacError.html"
    };
    return {
      modalDescription:{
         AddEditAddress : {
          controller : 'modals.addEditAddrCtrl',
          aliasName : 'vm',
          header : HEADERS.common,
          body : BODY.addEditAddress
        },
        SelectOccupation : {
          controller : 'modals.selectOccupationCtrl',
          aliasName : 'vm',
          header : HEADERS.common,
          body : BODY.selectOccupation,
          footer : FOOTERS.selectOccupation
        },
        AddEditEmployment : {
          controller : 'modals.addEditEmplCtrl',
          aliasName : 'vm',
          header : HEADERS.common,
          body : BODY.addEditEmployment,
          footer : FOOTERS.addEditEmployment
        },
        CreditCheckUnconditionallyApproved : {
          controller : 'modals.creditCheckCtrl',
          aliasName : 'vm',
          header : HEADERS.common,
          body : BODY.creditCheckResponse,
          windowClass : 'information-pop-up'
        },
        CreditCheckNoDecision : {
          controller : 'modals.creditCheckCtrl',
          aliasName : 'vm',
          header : HEADERS.common,
          body : BODY.creditCheckResponse,
          windowClass : 'information-pop-up'
        },
        BureauCallException : {
            controller : 'modals.creditCheckCtrl',
            aliasName : 'vm',
            header : HEADERS.common,
            body : BODY.creditCheckResponse,
            windowClass : 'information-pop-up'
        },
        BureauCheckNoDecision : {
          controller : 'modals.creditCheckCtrl',
          aliasName : 'vm',
          header : HEADERS.common,
          body : BODY.creditCheckResponse,
          windowClass : 'information-pop-up'
        },
        CreditCheckOutage : {
          controller : 'modals.creditCheckCtrl',
          aliasName : 'vm',
          header : HEADERS.common,
          body : BODY.creditCheckResponse,
          windowClass : 'information-pop-up'
        },
        CreditCheckBussinessAsset : {
	      controller : 'modals.creditCheckCtrl',
	      aliasName : 'vm',
	      header : HEADERS.common,
	      body : BODY.creditCheckResponse,
	      windowClass : 'information-pop-up'
        },
        CreditCheckValuationPolicy : {
          controller : 'modals.creditCheckCtrl',
          aliasName : 'vm',
          header : HEADERS.common,
          body : BODY.creditCheckResponse,
          windowClass : 'information-pop-up'
        },
        maturingFacilitiesFTApprovalCheckList : {
            controller : 'modals.maturingFacilitiesFTApprovalCheckListCtrl',
            aliasName : 'vm',
            header : HEADERS.maturingFacilitiesFTApprovalCheckList,
            body : BODY.maturingFacilitiesFTApprovalCheckList,
            windowClass : "fat-modal"
        },
        maturingFacilitiesFTRollOverDetails : {
          controller : 'modals.maturingFacilitiesFTRollOverDetailsCtrl',
          aliasName : 'vm',
          header : HEADERS.maturingFacilitiesFTRollOverDetails,
          body : BODY.maturingFacilitiesFTRollOverDetails,
          windowClass : "fat-modal"
        },
        maturingFacilitiesFTDealTLAResponse : {
          controller : 'modals.maturingFacilitiesFTDealTLAResponseCtrl',
          aliasName : 'vm',
          header : HEADERS.maturingFacilitiesFTRollOverDetails,
          body : BODY.maturingFacilitiesFTDealTLAResponse,
          windowClass : "fat-modal"
        },
        unsuccessApprovalChecklistMaturingFacilityResponse : {
            controller : 'modals.unsuccessApprovalChecklistMaturingFacilityCtrl',
            aliasName : 'vm',
            header : HEADERS.maturingFacilitiesFTApprovalCheckList,
            body : BODY.unsuccessApprovalChecklistMaturingFacilityResponse,
            windowClass : "fat-modal"
          }
      },
      creditCheckStatus:{
        SUCCESS:'We checked the bureau and the customers credit came back clean.This deal is now marked for unconditional approval',
        UNSUCCESSFUL:'The credit has come back unsuccessful with some adverse findings.Please provide mitigatory commentary for the below in order to continue with the deal.'
      }
    };
  });
