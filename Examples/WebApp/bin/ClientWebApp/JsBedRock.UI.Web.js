!function(){new JsBedRock.Assemblies.AssemblyDef({Name:"JsBedRock.UI.Web",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.UI"})],NodeDependencies:[]})}(),JsBedRock.UI=JsBedRock.UI||{},JsBedRock.UI.Web=JsBedRock.UI.Web||{},function(e){e.OnLoad(function(){JsBedRock.UI.Web.HtmlComponent=JsBedRock.Utils.ObjectOriented.CreateClass({Inherit:JsBedRock.UI.Component,Constructor:function(e,n,t){JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.UI.Component,e,n,t)},Members:{Name:"",Init:function(){var e=this;this.Base(),watch(this._Model,function(n,t,o,s){e.Refresh()})},Render:function(){var e=this;return this.__ListenerRefreshQueue.Add(function(){e._InitListeners()}),new Handlebars.SafeString(this.Base())},Refresh:function(){var e=this.Base();return $("#"+this.GetDivID()).replaceWith(e.toString()),this.__ListenerRefreshQueue.ForEach(function(e){e()}),this.__ListenerRefreshQueue.Clear(),e},GetDivID:function(){return"JsBedRockComponent_"+this._Guid.ToString()},_InitListeners:function(){},__ListenerRefreshQueue:new JsBedRock.Collections.List}})})}(JsBedRock.CurrentAssembly),JsBedRock.UI=JsBedRock.UI||{},JsBedRock.UI.Web=JsBedRock.UI.Web||{},function(e){e.OnLoad(function(){JsBedRock.UI.Web.HtmlComponentRenderer=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){this._ComponentCache=new JsBedRock.UI.ComponentCache,this._ComponentInstanceCache=new JsBedRock.Collections.Dictionary,this._CompiledTemplateCache=new JsBedRock.Collections.Dictionary,JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{Init:function(e){var n=this;this._ComponentCache.PopulateCache(),this._ComponentFactory=e;for(var t in this._ComponentCache.GetComponents())Handlebars.registerHelper(t,this._GenerateHelperFunction(n,t))},Render:function(e,n,t){return this._CompiledTemplateCache.Contains(e)||this._CompiledTemplateCache.Add(e,Handlebars.compile(e)),this._WrapRenderedTemplate(this._CompiledTemplateCache.Get(e)(n),t)},_WrapRenderedTemplate:function(e,n){return"<div id='"+n.GetDivID()+"'>"+e+"</div>"},_GenerateHelperFunction:function(e,n){return function(t){return e._GetOrCreateComponentInstance(t.ObjectGuid.ToString(),n,t).Render()}},_GetOrCreateComponentInstance:function(e,n,t){return this._ComponentInstanceCache.Contains(n+"_"+e)||this._ComponentInstanceCache.Add(n+"_"+e,this._ComponentFactory.GetComponent(this._ComponentCache.GetComponentFromKey(n),t)),this._ComponentInstanceCache.Get(n+"_"+e)},_ComponentCache:null,_ComponentFactory:null,_ComponentInstanceCache:null,_CompiledTemplateCache:null},Implements:[JsBedRock.UI.IComponentRenderer]})})}(JsBedRock.CurrentAssembly),function(e){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=bin/0.16.02/JsBedRock.UI.Web.js.map