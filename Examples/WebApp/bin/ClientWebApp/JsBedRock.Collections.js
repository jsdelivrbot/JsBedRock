!function(){new JsBedRock.Assemblies.AssemblyDef({Name:"JsBedRock.Collections",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"})],NodeDependencies:[]})}(),JsBedRock.Collections=JsBedRock.Collections||{},function(e){e.OnLoad(function(){JsBedRock.Collections.IEnumerable=JsBedRock.Utils.ObjectOriented.CreateInterface({Name:"IEnumerable",Members:{GetEnumerator:function(){}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Collections=JsBedRock.Collections||{},function(e){e.OnLoad(function(){JsBedRock.Collections.IList=JsBedRock.Utils.ObjectOriented.CreateInterface({Name:"IList",Members:{Add:function(e){},Clear:function(){},Count:function(){},Contains:function(e){},IndexOf:function(e){},Insert:function(e,n){},Remove:function(e){},RemoveAt:function(e){},ForEach:function(e){}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Collections=JsBedRock.Collections||{},function(e){e.OnLoad(function(){JsBedRock.Collections.List=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){this.Clear(),JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{GetEnumerator:function(){return this._Values},Add:function(e){this._Values.push(e)},Clear:function(){this._Values=[]},Count:function(){return this._Values.length},Contains:function(e){return-1!==this._Values.indexOf(e)},IndexOf:function(e){return this._Values.indexOf(e)},Insert:function(e,n){this._Values.splice(e,0,n)},Remove:function(e){this.Contains(e)&&this.RemoveAt(this.IndexOf(e))},RemoveAt:function(e){this._Values.splice(e,1)},ForEach:function(e){for(var n=0;n<this._Values.length;n++)e(this._Values[n])},_Values:null},Implements:[JsBedRock.Collections.IEnumerable,JsBedRock.Collections.IList]})})}(JsBedRock.CurrentAssembly),JsBedRock.Collections=JsBedRock.Collections||{},function(e){e.OnLoad(function(){JsBedRock.Collections.IDictionary=JsBedRock.Utils.ObjectOriented.CreateInterface({Name:"IDictionary",Members:{Add:function(e,n){},Clear:function(){},Contains:function(e){},Get:function(e){},Remove:function(e){}}})})}(JsBedRock.CurrentAssembly),JsBedRock.Collections=JsBedRock.Collections||{},function(e){e.OnLoad(function(){JsBedRock.Collections.Dictionary=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){this.Clear(),JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{GetEnumerator:function(){return this._Values},Add:function(e,n){this._Values[e]=n},Clear:function(){this._Values={}},Contains:function(e){return e in this._Values},Get:function(e){return this._Values[e]},Remove:function(e){delete this._Values[e]},_Values:null},Implements:[JsBedRock.Collections.IEnumerable,JsBedRock.Collections.IDictionary]})})}(JsBedRock.CurrentAssembly),function(e){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=bin/0.16.02/JsBedRock.Collections.js.map