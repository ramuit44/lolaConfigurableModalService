/**
 * Created by L065780 on 9/06/2016.
 */

'use strict';
(function () {
    angular.module('macApp')
        .service('commonModalService', CommonModalService);
    CommonModalService.$inject = ['$modal', 'StaticReference']

    function CommonModalService( $modal, StaticReference) {
        var commonModalService = {
            openModalWithOptions : openModalWithOptions
        }
        return commonModalService;
        /**This custom service opens the modal with the given parameters for all the modals in project
         
         *
         * @param modalKey
         * @param modalPackage 
         * all the parameters for opening modal window are passed from the
         * calling function and are mapped accordingly and the promise is returned
         * This promise in turn can be resolved
         */
        function openModalWithOptions(modalKey, modalPackage){
            var modalMetaData = StaticReference.modalDescription[modalKey];
            var modalInstance = $modal.open({
                templateUrl : 'app/views/modals/modal-template.html',
                controller : modalMetaData.controller,
                controllerAs : modalMetaData.aliasName || 'vm',
                bindToController : true,
                resolve: {
                    modalPackage: function () {
                        
                        var packages = {};

                        var getModalOptions = function(){
                            var modalOptions = {
                                bodyUrl : modalMetaData.body
                            }
                            if(modalMetaData.header){
                                modalOptions.headerUrl = modalMetaData.header;
                            }
                            if(modalMetaData.footer){
                                modalOptions.footerUrl = modalMetaData.footer;
                            }
                            return modalOptions;
                        }

                        packages.setUp = function(scope, vm){
                            if(scope){
                                if(vm){
                                    vm.parentScope = modalPackage.parentScope;
                                    vm.modalData = modalPackage.modalData;
                                    vm.viewData = modalPackage.viewData;
                                    vm.isOpenModalInViewMode = modalPackage.isOpenModalInViewMode;
                                    //$.extend(true, vm, modalPackage.items);
                                    //vm = modalData.items;
                                }else{
                                    scope.modalData = modalPackage.modalData;
                                }
                                scope.modalOptions = getModalOptions();
                                scope.modalOptions.close = function(){
                                    scope.$dismiss('Cancel');
                                };
                            }
                        }

                        return packages;

                    }
                },
                backdrop : modalMetaData.backdrop || 'static',
                backdropClass : modalMetaData.backdropClass || '',
                openedClass : modalMetaData.openedClass || '',
                size : modalMetaData.size || false,
                windowClass : modalMetaData.windowClass || '',
                keyboard : modalMetaData.keyboard || false
            });
            return modalInstance;
        }
    }
})();



