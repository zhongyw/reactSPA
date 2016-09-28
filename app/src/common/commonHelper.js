/**
 * Created by zhongyongwei on 16/8/16.
 */
(function(self){
    'use strict';

    self.pagerAdapt = function(statePager,remotePager){
        var pagerNew = {
            current: remotePager.pages,
            total: remotePager.total,
            pageSize: remotePager.size
        }
        pagerNew = Object.assign({}, statePager, pagerNew);
        return pagerNew;
    }
})(typeof self !== 'undefined' ? self : this);