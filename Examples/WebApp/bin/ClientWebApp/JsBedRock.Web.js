!function(){new JsBedRock.Assemblies.AssemblyDef({Name:"JsBedRock.Web",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"})],NodeDependencies:[]})}(),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Http=JsBedRock.Web.Http||{},function(e){e.OnLoad(function(){JsBedRock.Web.Http.HttpClient=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{_Request:{Def:function(e,t,s,o){var n=new XMLHttpRequest;n.open(e,t,!0),n.onreadystatechange=function(){4==n.readyState&&200==n.status?o(n):JsBedRock.Console.Write("error")},n.send()}}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Rest=JsBedRock.Web.Rest||{},function(e){e.OnLoad(function(){JsBedRock.Web.Rest.RestRequestRouteAttribute=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(e){this.Route=e,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Attribute)},Members:{Route:{Def:null}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Rest=JsBedRock.Web.Rest||{},function(e){e.OnLoad(function(){JsBedRock.Web.Rest.RestRequest=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{}})})}(JsBedRock.CurrentAssembly),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Rest=JsBedRock.Web.Rest||{},function(e){e.OnLoad(function(){JsBedRock.Web.Rest.RestResult=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{}})})}(JsBedRock.CurrentAssembly),JsBedRock.Web=JsBedRock.Web||{},JsBedRock.Web.Rest=JsBedRock.Web.Rest||{},function(e){e.OnLoad(function(){JsBedRock.Web.Rest.RestHttpClient=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.Web.Http.HttpClient,Constructor:function(e){this._RootUrl=e,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Web.Http.HttpClient)},Members:{_RootUrl:{Def:null},Post:{Def:function(e,t){var s=new XMLHttpRequest;s.open("POST",this._RootUrl+this._GetUrlFromRequest(e),!0),s.setRequestHeader("Content-type","application/json"),s.send(e.ToJson()),s.onreadystatechange=function(){t(s)}}},Get:{Def:function(e,t,s){}},_GetUrlFromRequest:{Def:function(e){return e.GetClassAttribute(JsBedRock.Web.Rest.RestRequestRouteAttribute).Route}}}})})}(JsBedRock.CurrentAssembly),function(e){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=bin/0.16.02/JsBedRock.Web.js.map