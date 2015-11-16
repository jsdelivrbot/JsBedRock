JsBedRock.Components = JsBedRock.Components || {};

(function (asm) {
    asm.OnLoad(function () {
        JsBedRock.Components.MainLayoutComponent = JsBedRock.Utils.ObjectOriented.CreateClass({
            Inherit: JsBedRock.UI.Web.HtmlComponent,
            Constructor: function (context, renderer, componentFactory) {
                JsBedRock.Utils.ObjectOriented.CallBaseConstructor(this, JsBedRock.UI.Web.HtmlComponent, context, renderer, componentFactory);
            },
            Members: {
                Name: "MainLayout",
                //DI
                _GetServices: function() {
                    return [ JsBedRock.Services.LayoutService ];
                },
                //Model
                _BuildModel: function () {
                    this._Model.Title = "";
                },
                //Controller
                Init: function () {
                    var self = this;
                    
                    this.Base();
                    
                    //Setup Children Components
                    self._Children.Add(
                        self._ComponentFactory.GetComponent(JsBedRock.Components.Blog.BlogWallComponent, { TargetId: "#blogBodyId" })
                    );
                    
                    //Setup RestAPI Calls
                    this._Service.Layout.GetNavData(function (navData) {
                        self._Model.Title = navData.Value1 + " " + navData.Value2;
                    });
                },
                //View
                _GetTemplate: function () { //ViewUI
                    return '\
                        <div class="maincontianer">\
                            <h1 id="testTitleId">{{Title}}</h1>\
                            <div id="blogBodyId"></div>\
                        </div>';
                },
                _InitListeners: function () { //ViewLogic
                    var self = this;
                    
                    $("#testTitleId").click(function () {
                        self._Model.Title = self._Model.Title + "1";
                    });
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);