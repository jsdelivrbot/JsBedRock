
;
(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Node.IO',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Core'
			})
		]
	});
})();
;
JsBedRock.Node = JsBedRock.Node || {};
JsBedRock.Node.IO = JsBedRock.Node.IO || {};

//JsBedRock.Node.IO
(function (asm) {
    asm.OnLoad(function () {
		//Private Static fs object.
		
        JsBedRock.Node.IO.FileSystem = JsBedRock.Utils.ObjectOriented.CreateClass({
            Constructor: function () {
				this.__FS = require('fs');
				
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {
				ReadFileSync: function (fileName) {
					return this.__FS.readFileSync(fileName);
				},
				WriteFileSync: function (fileName, data) {
					return this.__FS.writeFileSync(fileName, data);
				},
				ReadFile: function (fileName, callback) {
					return this.__FS.readFile(fileName, callback);
				},
				Rename: function (oldName, newName) {
					this.__FS.renameSync(oldName, newName);
				},
				RenameAsync: function (oldName, newName, callback) {
					this.__FS.rename(oldName, newName, function (err) {
						callback(err);
					});
				},
				__FS: null
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
(function(asm) {
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);