
;

;
﻿var JsBedRock = {};
JsBedRock.FrameworkVersion = '0.0.1';
;
JsBedRock.Utils = JsBedRock.Utils || {};

//JsBedRock.Utils.Object
(function () {
    JsBedRock.Utils.Object = JsBedRock.Utils.Object || {};
	var PrivateMembers = {};
	
	JsBedRock.Utils.Object.MergeObjects = function (defaults, overrides) {
		for(var prop in overrides)
			defaults[prop] = overrides[prop];
		return defaults;
	};
})();
;
JsBedRock.Utils = JsBedRock.Utils || {};

//JsBedRock.Utils.ObjectOriented
(function () {
    JsBedRock.Utils.ObjectOriented = JsBedRock.Utils.ObjectOriented || {};
	var PrivateMembers = {
        ObjectDefBuilder: function (_constructor) {
            /// <summary>Takes an object constructor function and returns a class definition.</summary>
            /// <param name="_constructor" type="function">The CTOR function.</param>
            /// <returns type="function">Class definition function.</returns>
    
            if (typeof _constructor != 'function')
                JsBedRock.Console.Error("Invalid Constructor. Cannot create object definition.");
    
            //Setup any methods that all objects should have.
            // GetType
            _constructor.prototype.GetType = function () { return _constructor; };
            // GetAssembly
            var classAssembly = JsBedRock.CurrentAssembly;
            _constructor.prototype.GetAssembly = function () { return classAssembly; }
    
            return _constructor;
        },
        Inherit: function (_cls, _superCls) {
            /// <summary>Inherits an object from a class definition.</summary>
            /// <param name="_cls" type="JsBedRock.Types.Object Type">The class def to inherit to.</param>
            /// <param name="_superCls" type="JsBedRock.Types.Object Type">Class Def to inherit from.</param>
            
            //save GetType. Or else it'll be incorrectly overwritten.
            // TODO: This should probably save any methods defined in ObjectDefBuilder
            var getTypeDef = _cls.prototype.GetType;
    
            //Copy the prototype from the super class.
            var construct = function () { };
            construct.prototype = _superCls.prototype;
            _cls.prototype = new construct;
            _cls.prototype.constructor = _cls;
    
            //restore GetType
            _cls.prototype.GetType = getTypeDef;
            
            //these are public, but they start with __ because VisualStudio's intellisense hides javascript members that start with _.
            //This pattern supports single inheritance chain... So an array is good. No need for worrying about two parents.
            _cls.prototype.__InheritanceChain = _cls.prototype.__InheritanceChain || [];
            
            _cls.prototype.__InheritanceChain.unshift(_superCls);
        },
        Implement: function (_cls, _interface) {
            /// <summary>Ensures an interface is Implemented on an object and marks the object as implemented.</summary>
            /// <param name="_cls" type="JsBedRock.Types.Object Type">The class def to inherit to.</param>
            /// <param name="_interface" type="JsBedRock.Types.Interface Type">Class Def to inherit from.</param>
    
            _cls.prototype.__Implemented = _cls.prototype.__Implemented || [];
    
            //If interface is already Implemented Skip.
            if (_cls.prototype.__Implemented.indexOf(_interface) !== -1)
                return;
    
            for (reqPubilcs in _interface.prototype) {
                //If the instance doesn't have a definition for anything in the Interface's prototype we should blow up.
                if (!_cls.prototype[reqPubilcs]) {
                    JsBedRock.Console.Error(reqPubilcs + ' not implemented on ' + _cls.prototype.Name + ' for ' + _interface.InterfaceName + '.');
                }
            }
    
            //if everything is defined we should add the interface def to the __Implemented array.
            _cls.prototype.__Implemented.push(_interface);
        },
        ClassDefaults: {
            Inherit: null,
            Implements: [],
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.Types.Object);
            },
            Members: {}
        },
        InterfaceDefaults: {
            Name: '',
            Members: {}
        }
    };
    
    JsBedRock.Utils.ObjectOriented.CreateClass = function (overrides) {
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.ClassDefaults, overrides);
        var classDef = PrivateMembers.ObjectDefBuilder(values.Constructor);
        
        if (values.Inherit === null) {
            if (JsBedRock.Types.Object) {
                PrivateMembers.Inherit(classDef, JsBedRock.Types.Object);
            }
        } else {
            PrivateMembers.Inherit(classDef, values.Inherit);
        }
        
        for(var prop in values.Members)
            classDef.prototype[prop] = values.Members[prop];
        
        for(var i = 0; i < values.Implements.length; i++)
            PrivateMembers.Implement(classDef, values.Implements[i]);
            
        //LinkClass To Assembly
        JsBedRock.CurrentAssembly.Classes.push(classDef);
         
        return classDef;
    };
    
    JsBedRock.Utils.ObjectOriented.CreateInterface = function (overrides) {
        var values = JsBedRock.Utils.Object.MergeObjects(PrivateMembers.InterfaceDefaults, overrides);
        
        var interfaceDef = function () {};
	
		interfaceDef.InterfaceName = values.Name;
	
        for(var prop in values.Members)
            interfaceDef.prototype[prop] = values.Members[prop];
	
		return interfaceDef;
    };
	
    JsBedRock.Utils.ObjectOriented.IsOfType = function (_instance, _type) {
        /// <summary>Checks if an JsBedRock.Types.Object Instance inherits or implements from a JsBedRock.Types.Interface Type or JsBedRock.Types.Object Type.</summary>
        /// <param name="_instance" type="JsBedRock.Types.Object Instance">The class instance to inherit to.</param>
        /// <param name="_type" type="JsBedRock.Types.Object or JsBedRock.Types.Interface Type">Class Def to inherit from.</param>
        /// <returns type="Boolean">True if is the instance is in face of the passed Type.</returns>

        //if this is an instance of the type return true. This will get actual instances and inherited types.
        if (_instance instanceof _type)
            return true;

        //If the interface is in the implemented array we should return true.
		if(_instance.__Implemented instanceof Array)
			for(var i = 0; i < _instance.__Implemented.length; i++)
				if(_instance.__Implemented[i] === _type)
				    return true;

		return false;
	};
	
    JsBedRock.Utils.ObjectOriented.CallBaseConstructor = function (_instance, _superCls) {
        /// <summary>Executes the instances inherited constructor.</summary>
        /// <param name="_instance" type="JsBedRock.Types.Object Instance">The class instance to inherit to.</param>
        /// <param name="_superCls" type="JsBedRock.Types.Object Type">Class Def of the inherited class.</param>
        /// <param name="param[]" type="any">Any parameters for the base constructor should be included after.</param>

        //Get any arguments and set them up.
        var args = Array.prototype.slice.call(arguments);

        //Apply the _superCls def function on the instance. 
        _superCls.apply(_instance, args.slice(2, args.length));
    };
})();
;
JsBedRock.Utils = JsBedRock.Utils || {};
JsBedRock.Utils.ObjectOriented = JsBedRock.Utils.ObjectOriented || {};
JsBedRock.Utils.ObjectOriented.Reflection = JsBedRock.Utils.ObjectOriented.Reflection || {};

//JsBedRock.Utils.ObjectOriented.Reflection
(function () {
	var PrivateMembers = {};
    JsBedRock.Utils.ObjectOriented.Reflection.GetMethodName = function (_instance, _value) {
        /// <summary>Returns the method name on an Object Instance of the passed value.</summary>
        /// <param name="instance" type="JsBedRock.Utils.ObjectOriented.Object">The instance with the method.</param>
        /// <param name="value" type="function">The value of the function.</param>
        var methodName;
        //Look through every property on the instance... and compare the value.
        for (var prop in _instance) {
            if (_instance[prop] === _value) {
                methodName = prop;
                break;
            }
        }
        //If we still haven't found the match let's check inherited properties.
        if (JsBedRock.Utils.String.IsEmptyOrSpaces(methodName)) {
            for (var key in _instance.__InheritanceChain) {
                for (var prop in _instance.__InheritanceChain[key].prototype) {
                    if (_instance.__InheritanceChain[key].prototype[prop] === _value) {
                        methodName = prop;
                        break;
                    }
                }
            }
        }
        return methodName;
    };
    JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType = function (_assembly, _type) {
        var ret = [];
        
        for(var i = 0; i < _assembly.Classes.length; i++){
            var instance = new _assembly.Classes[i]();
            if(JsBedRock.Utils.ObjectOriented.IsOfType(instance, _type))
                ret.push(_assembly.Classes[i]);
        }
        
        return ret;
    };
})();
;
JsBedRock.Utils = JsBedRock.Utils || {};

//JsBedRock.Utils.String
(function () {
	var PrivateMembers = {};
    JsBedRock.Utils.String = JsBedRock.Utils.String || {};
	
    JsBedRock.Utils.String.IsEmptyOrSpaces = function (_str) {
        /// <summary>Null/Empty/Whitespace check on strings..</summary>
        /// <param name="_str" type="string">The string to check.</param>
        /// <returns type="Boolean">Returns true if the string is null, empty, or whitespace.</returns>
        return _str == null || _str.trim() === '';
    };
})();
;
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.GlobalAssemblyCache
(function () {
    JsBedRock.Assemblies.GlobalAssemblyCache = JsBedRock.Assemblies.GlobalAssemblyCache || {};
    
	var PrivateMembers = {
		_GAC: {},
        LoadedAsms: [],
        DoesAssemblyExist: function (asmKey) {
		  return asmKey in PrivateMembers._GAC;
        },
        IsAssemblyLoaded: function (asmKey) {
		  return (PrivateMembers.LoadedAsms.indexOf(asmKey) !== -1);
        },
        LoadAssembly: function (asmDep, callback) {
            JsBedRock.Assemblies.LoaderLogic(
                PrivateMembers.GetAssemblyKey(asmDep),
                callback
            );
            
            //add placeholder in GAC.
            PrivateMembers._GAC[PrivateMembers.GetAssemblyKey(asmDep)] = asmDep;
        },
        GetAssemblyKey: function (asmDef) {
            return asmDef.Name;// + '-' + asmDef.Version;
        },
        LoadAssemblyClasses: function (asmDef) {
            JsBedRock.CurrentAssembly = asmDef;    
            for(var i = 0; i < asmDef.Callbacks.length; i++)
                asmDef.Callbacks[i]();
            asmDef.Callbacks = [];
            
            //include in GAC.
            PrivateMembers._GAC[PrivateMembers.GetAssemblyKey(asmDef)] = asmDef;
            PrivateMembers.LoadedAsms.push(PrivateMembers.GetAssemblyKey(asmDef));
        }
	};
    
    JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly = function (asmDef) {
        //Load Dependancies
        for(var i = 0; i < asmDef.Dependencies.length; i++){
            if(!PrivateMembers.DoesAssemblyExist(PrivateMembers.GetAssemblyKey(asmDef.Dependencies[i]))){
                PrivateMembers.LoadAssembly(asmDef.Dependencies[i], function () {
		            setTimeout(function() {
                            JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asmDef);
                        },
                        1
                    );
                });
                return;
            }else if(!PrivateMembers.IsAssemblyLoaded(PrivateMembers.GetAssemblyKey(asmDef.Dependencies[i]))){
		        setTimeout(function() {
                        JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asmDef);
                    },
                    1
                );
                return;
            }
        }
        
        PrivateMembers.LoadAssemblyClasses(asmDef);
    };
})();
;
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDef
(function () {
    JsBedRock.Assemblies.AssemblyDef = function (overrides) {
        var context = this;
        var PrivateMembers = {
            Defaults: {
                Name: '',
                Loaded: false,
                Dependencies: [],
                Callbacks: [],
                Classes: [],
                OnLoad: function(callback) {
                    context.Callbacks.push(callback);
                }
            }
        };
        
        JsBedRock.Utils.Object.MergeObjects(
            context,
            JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides)
        );
        
        JsBedRock.CurrentAssembly = this;
    };
})();
;
JsBedRock.Assemblies = JsBedRock.Assemblies || {};

//JsBedRock.Assemblies.AssemblyDependency
(function () {
    JsBedRock.Assemblies.AssemblyDependency = function (overrides) { 
        var PrivateMembers = {
            Defaults: {
                Name: '',
                Loaded: false
            }
        };
        
        JsBedRock.Utils.Object.MergeObjects(
            this,
            JsBedRock.Utils.Object.MergeObjects(PrivateMembers.Defaults, overrides)
        );
    };
})();
;
(function () {
	new JsBedRock.Assemblies.AssemblyDef({
		Name: 'JsBedRock.Collections.Tests',
		Dependencies: [
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.UnitTesting'
			}),
			new JsBedRock.Assemblies.AssemblyDependency({
				Name: 'JsBedRock.Collections'
			})
		]
	});
})();
;
JsBedRock.Collections = JsBedRock.Collections || {};
JsBedRock.Collections.Tests = JsBedRock.Collections.Tests || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Tests.DictionaryTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'DictionaryTests',
                FirstTest: function () {
                    var list = new JsBedRock.Collections.Dictionary();
                    var list2 = new JsBedRock.Collections.Dictionary();
                    
                    list.Add("test", 1);
                    list.Add("test1", 2);
                    list.Add("test2", 3);
                    list.Add("test3", 4);
                    
                    list2.Add("test", 9);
                    list2.Add("test1", 8);
                    list2.Add("test2", 7);
                    list2.Add("test3", 6);
                    list2.Add("test4", 5);
                    
                    this.Assert(list.Contains("test1") === true, "Console Debugging Turns On");
                    list.Remove("test1");
                    this.Assert(list.Contains("test1") === false, "Console Debugging Turns On");
                    
                    list2.Remove("test");
                    list2.Remove("test3");
                    
                    this.Assert(list2.Get("test4") === 5, "Console Debugging Turns On");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
JsBedRock.Collections = JsBedRock.Collections || {};
JsBedRock.Collections.Tests = JsBedRock.Collections.Tests || {};

//JsBedRock.Collections
(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Collections.Tests.ListTests = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UnitTesting.TestGroup,
            Constructor: function () {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UnitTesting.TestGroup);
            },
            Members: {
                TestGroupName: 'ListTests',
                FirstTest: function () {
                    var list = new JsBedRock.Collections.List();
                    var list2 = new JsBedRock.Collections.List();
                    
                    this.Assert(list.Count() === 0, "Console Debugging Turns On");
                    this.Assert(list2.Count() === 0, "Console Debugging Turns On");
                    
                    list.Add("test");
                    list.Add("test1");
                    list.Add("test2");
                    list.Add("test3");
                    
                    list2.Add("test");
                    list2.Add("test1");
                    list2.Add("test2");
                    list2.Add("test3");
                    list2.Add("test4");
                    
                    this.Assert(list.Count() === 4, "Console Debugging Turns On");
                    this.Assert(list2.Count() === 5, "Console Debugging Turns On");
                    
                    this.Assert(list.IndexOf("test1") === 1, "Console Debugging Turns On");
                    list.Remove("test1");
                    this.Assert(list.IndexOf("test2") === 1, "Console Debugging Turns On");
                    this.Assert(list2.IndexOf("test2") === 2, "Console Debugging Turns On");
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);
;
(function(asm) {
	asm.OnLoad(function () {
		JsBedRock.Console.EnableDebugging();
		
		var testClasses = JsBedRock.Utils.ObjectOriented.Reflection.GetClassesOfType(asm, JsBedRock.UnitTesting.TestGroup);
		
		for(var i = 0; i < testClasses.length; i++) {
			var instance = new testClasses[i]();
			
			instance.InitTestGroup();
			
			for (var j = 0; j < Object.keys(testClasses[i].prototype).length; j++) {
				if(!(Object.keys(testClasses[i].prototype)[j] in JsBedRock.UnitTesting.TestGroup.prototype)) {
					instance.InitTest();
					instance[Object.keys(testClasses[i].prototype)[j]]();
					instance.DeinitTest();
				}
			}
			
			instance.DeinitTestGroup();
			
			JsBedRock.Console.Info(instance.TestGroupName + " results: " + instance.GetSuccesses() + " / " + instance.GetAttempts() + " passed tests.");
			
			if (instance.GetFailures() > 0){
				JsBedRock.Console.Error("Unit Tests Failed. See log for details.");
			}
		}
	});
	
	//TODO: This is awful.
	JsBedRock.Assemblies.LoaderLogic = function (u, c){
		eval(require('fs').readFileSync(__dirname + "/" + u + ".js", 'utf8'));
		
		setTimeout( function() { c(); }, 0 );
	}
	
	JsBedRock.Assemblies.GlobalAssemblyCache.RegisterAssembly(asm);
})(JsBedRock.CurrentAssembly);