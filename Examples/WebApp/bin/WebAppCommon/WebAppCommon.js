!function(){new JsBedRock.Assemblies.AssemblyDef({Name:"WebAppCommon",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"}),new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Web"})],NodeDependencies:[]})}(),JsBedRock.Models=JsBedRock.Models||{},function(e){e.OnLoad(function(){JsBedRock.Models.TestResult=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.Web.Rest.RestResult,Constructor:function(e,s,t){this.ID=e,this.Value1=s,this.Value2=t,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Web.Rest.RestResult)},Members:{ID:null,Value1:null,Value2:null}})})}(JsBedRock.CurrentAssembly),JsBedRock.Models=JsBedRock.Models||{},function(e){e.OnLoad(function(){JsBedRock.Models.GetPostDataResult=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.Web.Rest.RestResult,Constructor:function(e,s){this.BodyText=e,this.ErrorText=s,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Web.Rest.RestResult)},Members:{BodyText:null,ErrorText:null}})})}(JsBedRock.CurrentAssembly),JsBedRock.Models=JsBedRock.Models||{},function(e){e.OnLoad(function(){JsBedRock.Models.GetPostDataRequest=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.Web.Rest.RestRequest,Constructor:function(e){this.PostID=e,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Web.Rest.RestRequest)},Members:{PostID:null,GetRestUrl:function(){return this.Base()+"Data"}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Models=JsBedRock.Models||{},function(e){e.OnLoad(function(){JsBedRock.Models.ErrorResult=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.Web.Rest.RestResult,Constructor:function(e){this.ErrorMessage=e,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Web.Rest.RestResult)},Members:{ErrorMessage:null}})})}(JsBedRock.CurrentAssembly),function(e){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=Examples/WebApp/bin/WebAppCommon/WebAppCommon.js.map