(function(self) {
  'use strict';

  self.getAgentVersion = function(platform,allVersion){
        if(!allVersion){
            return "";
        }
        
        if(platform==1){
            var rvIndex=allVersion.indexOf(" rv");
            var bigVersion= allVersion.substring(8,rvIndex);
            var smallVersianStartIndex=allVersion.indexOf(":");
            var smallVersion=allVersion.substring(smallVersianStartIndex+1,allVersion.indexOf(" ", smallVersianStartIndex+1));
            return bigVersion+"("+smallVersion+")";
        }else if(platform==2){

            //若格式不再符合预期则返回null
            if(allVersion.length<4||allVersion.indexOf(" ")<0){
                return;
            }
            var isOldVersionFormat=allVersion.indexOf("/")>0?false:true;
            if(isOldVersionFormat){
                var versionStartIndex = allVersion.indexOf(":");
                if(allVersion.length<8||versionStartIndex<0){
                    return;
                }
                var endIndex=allVersion.indexOf(" ",versionStartIndex+1);
                return allVersion.substring(versionStartIndex+1, endIndex);
            }else{
                return allVersion.substring(4, allVersion.indexOf(" "));
            }

        
            return allVersion.substring(4,allVersion.indexOf(" "));
        }
    }
    // module.exports = self.getAgentVersion;
    self.getActivedStatus = function(managedStatus){    
        if(managedStatus == 1){
            return "<span class='label label-sm label-success'>Enabled</span>";
        }else if(managedStatus == 2){
            return "<span class='label label-sm label-warning'>Deactivated</span>";
        }else{
            return "<span class='label label-sm label-danger'>Not activated</span>";
        }
    }
})(typeof self !== 'undefined' ? self : this);


