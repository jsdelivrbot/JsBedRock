!function(){new JsBedRock.Assemblies.AssemblyDef({Name:"JsBedRock.Node.IO",Dependencies:[new JsBedRock.Assemblies.AssemblyDependency({Name:"JsBedRock.Core"})],NodeDependencies:[]})}(),JsBedRock.Node=JsBedRock.Node||{},JsBedRock.Node.IO=JsBedRock.Node.IO||{},function(e){e.OnLoad(function(){JsBedRock.Node.IO.FileSystem=JsBedRock.Utils.ObjectOriented.CreateClass({Constructor:function(){this.__FS=require("fs"),JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this,JsBedRock.Types.Object)},Members:{ReadFileSync:function(e){return this.__FS.readFileSync(e)},WriteFileSync:function(e,n){return this.__FS.writeFileSync(e,n)},ReadFile:function(e,n){return this.__FS.readFile(e,n)},MkDir:function(e,n){this.__FS.mkdir(e,n)},MkDirSync:function(e){this.__FS.mkdirSync(e)},DirectoryExistsSync:function(e){try{var n=this.__FS.lstatSync(e);return n.isDirectory()}catch(s){return!1}},CopyFile:function(e,n){this.WriteFileSync(n,this.ReadFileSync(e).toString())},Rename:function(e,n){this.__FS.renameSync(e,n)},RenameAsync:function(e,n,s){this.__FS.rename(e,n,function(e){s(e)})},Delete:function(e,n){this.__FS.unlinkSync(e,n)},DeleteSync:function(e){this.__FS.unlinkSync(e)},__FS:null}})})}(JsBedRock.CurrentAssembly),function(e){JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(e)}(JsBedRock.CurrentAssembly);
//# sourceMappingURL=bin/sdk/0.0.1/JsBedRock.Node.IO.js.map