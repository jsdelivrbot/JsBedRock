!function(){new JsBedRock.Assemblies.AssemblyDef({Name:"JsBedRock.Web",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"})],NodeDependencies:[]})}(),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Http=JsBedRock.Web.Http||{},function(e){e.OnLoad(function(){JsBedRock.Web.Http.HttpClient=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{_Request:function(e,t,s,o){xmlhttp=new XMLHttpRequest,xmlhttp.open(e,t,!0),xmlhttp.onreadystatechange=function(){4==xmlhttp.readyState&&200==xmlhttp.status?o(xmlhttp):JsBedRock.Console.Write("error")},xmlhttp.send()}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Rest=JsBedRock.Web.Rest||{},function(e){e.OnLoad(function(){JsBedRock.Web.Rest.RestRequest=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{}})})}(JsBedRock.CurrentAssembly),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Rest=JsBedRock.Web.Rest||{},function(e){e.OnLoad(function(){JsBedRock.Web.Rest.RestResult=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{}})})}(JsBedRock.CurrentAssembly),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Rest=JsBedRock.Web.Rest||{},function(e){e.OnLoad(function(){JsBedRock.Web.Rest.RestHttpClient=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.Web.Http.HttpClient,Constructor:function(e){this._RootUrl=e,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Web.Http.HttpClient)},Members:{_RootUrl:null,Post:function(e,t,s){},Get:function(e,t,s){}}})})}(JsBedRock.CurrentAssembly),function(e){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=bin/0.16.02/JsBedRock.Web.js.map