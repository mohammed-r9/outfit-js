"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var OutfitsList_1 = require("./pages/OutfitsList");
var AddOutfit_1 = require("./pages/AddOutfit");
var EditOutfit_1 = require("./pages/EditOutfit");
var login_form_1 = require("./components/login-form");
function App() {
    return (<react_router_dom_1.BrowserRouter>
			<react_router_dom_1.Routes>
				<react_router_dom_1.Route path="/" element={<OutfitsList_1.default />}/>
				<react_router_dom_1.Route path="/add" element={<AddOutfit_1.default />}/>
				<react_router_dom_1.Route path="/edit/:id" element={<EditOutfit_1.default />}/>
				<react_router_dom_1.Route path="login" element={<login_form_1.default />}/>
			</react_router_dom_1.Routes>
		</react_router_dom_1.BrowserRouter>);
}
exports.default = App;
