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
                //Controller
                Init: function () {
                    this.Base();
                    
                    this._Model.Title = "My New blog website";
                    
                    var postData = this._Service[JsBedRock.Services.BlogService.prototype.Name].GetPosts();
                    this._ComponentFactory.GetComponent(JsBedRock.Components.BlogPostComponent, { TargetId: "#blogBodyId", PostData: postData }).Render();
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
                },
                //Model
                _Model: {
                    Title: ""
                },
                //DI
                _GetServices: function() {
                    return [ JsBedRock.Services.BlogService ];
                }
            }
        });
    });
})(JsBedRock.CurrentAssembly);