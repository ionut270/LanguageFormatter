(this["webpackJsonpautomate-conv"]=this["webpackJsonpautomate-conv"]||[]).push([[0],{187:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return Input_table}));var C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(16),C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(17),C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(18),C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(19),C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(20),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(51),semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(32),semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(119),semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(193),Input_table=function(_React$Component){function Input_table(props){var _this;return Object(C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.a)(this,Input_table),_this=Object(C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__.a)(this,Object(C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__.a)(Input_table).call(this,props)),_this.convertToNaturalLanguage=function(e){},_this.updateEditable=function(e,_ref){var value=_ref.value,id=_ref.id;console.log("Update Editable !");var state=_this.state;switch(id.split(/_/)[1]){case"editable":var index=eval(id.split(/_/)[0]);value.split(/^[a-z]/)[1]!==index&&(value=value.split(/\d/)[0]+index),state.states[index]=value,_this.setState(state);break;case"InputValue":console.log("Input value !");var i=id.split(/:/)[0],j=id.split(/:/)[1].split(/_/)[0];value=value.match(/,/)?value.split(/,/):[value];for(var _i=0;_i<value.length;_i++)value[_i].match(/[a-z]/)?value[_i]=eval(value[_i].split(/[a-z]/)[1]):value[_i]=eval(value[_i]);state.transitions[i][j]=value,console.log("What happens : ",state.transitions,value),_this.setState(state);break;case"alphabet":var index=eval(id.split(/_/)[0]);state.alphabet[index]=value,_this.setState(state)}},_this.addCollumn=function(e){console.log("Add column !");var t=_this.state.alphabet;t.push("");var a=t.splice(0,t.length-2);a.push(""),a.push("\u03b5");for(var _=_this.state.transitions,n=0;n<_.length;n++)_[n].push([]);_this.setState({alphabet:a,transitions:_})},_this.addRow=function(e){console.log("Add row !");var t=_this.state.transitions,a=_this.state.states,_=_this.state.alphabet;a.push("q"+a.length),t[a.length-1]=[];for(var n=0;n<_.length;n++)t[a.length-1].push([]);_this.setState({states:a,transitions:t})},_this.convertAutomate=function(e){console.log("Convert Autoamte !");var states=_this.state.states,alphabet=_this.state.alphabet,transitions=_this.state.transitions,eps=alphabet.indexOf("\u03b5");_this.setState({err:null});for(var err=!1,i=0,dfa,q0,Q,marcat,F,S;i<transitions.length;i++)for(var j=0;j<transitions[i].length;j++)for(var k=0;k<transitions[i][j].length;k++)transitions[i][j][k]>transitions.length-1&&(err=!0,_this.setState({err:"The state q"+transitions[i][j][k]+" does not exist !"}));err||function(){var CI=function CI(Q){for(var ci=[],_i2=0;_i2<Q.length;_i2++){var q=Q[_i2];if("string"==typeof Q[_i2])var q=eval(Q[_i2].split(/[a-z]/)[1]);if(-1===ci.indexOf(q)&&(ci.push(q),-1===ci.indexOf(transitions[q][eps])))for(var _j=0;_j<transitions[q][eps].length;_j++)ci.push(transitions[q][eps][_j])}return ci},Final=function(e){for(var t=0;t<e.length;t++)if(states[t].match(/f/))return!0;return!1},delta=function(e,t){t=alphabet.indexOf(t);for(var a=[],_=0;_<e.length;_++)for(var n=0;n<transitions[e[_]][t].length;n++)void 0!==transitions[e[_]][t][n]&&a.push(transitions[e[_]][t][n]);return a};dfa=[],q0=CI([states[0]]),Q=[q0],marcat=[],F=[],Final(q0)&&F.push(q0);for(var x=0;x<Q.length;x++)S=Q[x],-1===marcat.indexOf(S)&&(alphabet.forEach((function(e){if("\u03b5"!==e){var t=CI(delta(S,e));void 0===dfa[Q.indexOf(S)]&&(dfa[Q.indexOf(S)]=[]),dfa[Q.indexOf(S)][alphabet.indexOf(e)]=t,-1===JSON.stringify(Q).indexOf(JSON.stringify(t))&&t.length>0&&(Q.push(t),Final(t)&&F.push(t))}})),marcat.push(S));console.log("DFA",dfa,Q,F,q0),_this.props.passTable({start_state:q0,output:dfa,output_States:Q,alphabet:alphabet,initial_states:states})}()},_this.removeRow=function(e){var t=_this.state.states,a=_this.state.transitions;t.pop(),a.pop(),_this.setState({states:t,transitions:a})},_this.removeCollumn=function(e){var t=_this.state.alphabet,a=_this.state.transitions;t.pop(),t.pop(),t.push("\u03b5");for(var _=0;_<a.length;_++)a[_].pop();_this.setState({alphabet:t,transitions:a}),console.log(t,a)},_this.state={states:["s0","q1","f2"],alphabet:["a","b","\u03b5"],transitions:[[[],[0],[1]],[[1,2],[2],[]],[[],[],[]]],err:null,visible:!1},_this}return Object(C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__.a)(Input_table,_React$Component),Object(C_Users_oance_Desktop_LanguageFormatter_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.a)(Input_table,[{key:"render",value:function(){var e=this;return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div",{className:"ColumnButton"},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__.a,{color:"red",circular:!0,icon:"minus",onClick:this.removeRow}),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div",{className:"RowButton"},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__.a,{color:"red",circular:!0,icon:"minus",style:{marginRight:"1em"},onClick:this.removeCollumn}),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a,{celled:!0,className:"InputTable"},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a.Header,null,react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a.Row,null,react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a.HeaderCell,{className:"HeaderClean"}),this.state.alphabet.map((function(t,a){return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a.HeaderCell,{key:a,className:"InputCell cleanbg",textAlign:"center"},"\u03b5"===t?react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong",null,t):react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__.a,{className:"InputValue clean",id:a+"_alphabet",value:e.state.alphabet[a],onChange:e.updateEditable}))})))),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a.Body,null,this.state.states.map((function(t,a){return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a.Row,{key:a},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a.Cell,{style:{minWidth:"150px"},id:a,className:"InputCell",textAlign:"center"},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__.a,{id:a+"_editable",value:e.state.states[a],className:"InputValue state clean",onChange:e.updateEditable})),e.state.alphabet.map((function(t,_){return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__.a.HeaderCell,{key:_,className:"InputCell",textAlign:"center"},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__.a,{className:"InputValue clean",id:a+":"+_+"_InputValue",value:e.state.transitions[a][_],onChange:e.updateEditable}))})))})))),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__.a,{style:{marginLeft:"1em"},primary:!0,circular:!0,icon:"plus",onClick:this.addCollumn})),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__.a,{primary:!0,circular:!0,icon:"plus",onClick:this.addRow}),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__.a,{primary:!0,style:{marginTop:"1em"},onClick:this.convertAutomate}," ","< Convert >"," "),this.state.err?react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__.a,{negative:!0},react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__.a.Header,null,"We are sorry we cannot convert this automate"),react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p",null,this.state.err)):null)}}]),Input_table}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component)},202:function(e,t,a){e.exports=a(378)},207:function(e,t,a){},209:function(e,t,a){},377:function(e,t,a){},378:function(e,t,a){"use strict";a.r(t);var _=a(16),n=a(17),s=a(18),i=a(19),r=a(20),l=a(0),o=a.n(l),c=a(38),u=a.n(c);a(207),a(208),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var p=a(387),h=(a(209),function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).handleItemClick=function(e,t){var _=t.name;a.setState({activeItem:_}),a.props.changeActiveComponent(_)},a.state={activeItem:"home"},a}return Object(r.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this.state.activeItem;return o.a.createElement(p.a,{inverted:!0,className:"Page_Header"},o.a.createElement(p.a.Item,{name:"Epsilon Transitions",active:"Epsilon Transitions"===e,onClick:this.handleItemClick}))}}]),t}(o.a.Component)),E=a(26),m=a(187),d=a(32),f=function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={},a}return Object(r.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this;return this.props.out?o.a.createElement(d.a,{celled:!0,className:"InputTable"},o.a.createElement(d.a.Header,{className:"HeaderRes"},o.a.createElement(d.a.HeaderCell,{className:"HeaderCellRes"}),this.props.out.alphabet.map((function(e,t){return"\u03b5"===e?null:o.a.createElement(d.a.HeaderCell,{className:"HeaderCellRes flexedFlow",key:t},e)}))),o.a.createElement(d.a.Body,{className:"BodyRes"},this.props.out.output_States.map((function(t,a){return o.a.createElement(d.a.Row,{error:JSON.stringify(t).match(/f/),positive:"s0"===t[0],className:"BodyRowRes rowFlexed",key:a},o.a.createElement(d.a.Cell,{className:"BodyCellRes flexedFlow"},t.map((function(a,_){return o.a.createElement("strong",null,e.props.out.initial_states[a].match(/f/)?"f":e.props.out.start_state===t&&0===_?"s":null)})),"[",t.map((function(a,_){return o.a.createElement("strong",null,e.props.out.initial_states[a].match(/f/)?"f":e.props.out.initial_states[a].match(/s/)?"s":"q",_===t.length-1?a:a+",")})),"]"),e.props.out.output[a].map((function(t,a){return o.a.createElement(d.a.Cell,{className:"BodyCellRes flexedFlow",key:a},"[",t.map((function(a,_){return o.a.createElement("strong",null,e.props.out.initial_states[a].match(/f/)?"f":e.props.out.start_state===t?"s":"q",_===t.length-1?a:a+",")})),0===t.length?o.a.createElement("strong",null,t?"\xd8":null):null,"]")})))})))):null}}]),t}(o.a.Component),O=a(190),b=a.n(O),v={layout:{hierarchical:!1},edges:{color:"#000000",selfReferenceSize:20,smooth:{enabled:!0,type:"dynamic"}},height:"500px"},C={select:function(e){e.nodes,e.edges}},D=function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={graph:{nodes:[],edges:[]}},a}return Object(r.a)(t,e),Object(n.a)(t,[{key:"prepareForRender",value:function(){if(this.props.obj){for(var e=this.props.obj.output_States,t=[],a=0;a<e.length;a++)t.push({id:a,label:JSON.stringify(e[a]),physics:!1,color:JSON.stringify(e[a]).match(/f/)?"#ff9999":"s0"===e[a][0]?"#009933":"#80aaff"});for(var _=[],n=[],s=0;s<e.length;s++)n[s]=JSON.stringify(e[s]);for(var i=this.props.obj.output,r=this.props.obj.alphabet,l=0;l<i.length;l++)for(var o=0;o<r.length-1;o++)_.push({from:l,to:n.indexOf(JSON.stringify(i[l][o])),label:r[o]});var c={nodes:t,edges:_};this.setState({graph:c})}}},{key:"render",value:function(){return o.a.createElement(b.a,{graph:this.state.graph,options:v,events:C,autoResize:!0})}}]),t}(o.a.Component),P=a(51),g=a(39),M=a(386),I=a(389),R=a(193),T=a(385),A=a(390),L=(a(377),function(e){function t(e){var a,n;return Object(_.a)(this,t),(n=Object(s.a)(this,Object(i.a)(t).call(this,e))).passTable=function(e){return function(e){n.setState({output:e})}},n.handleResultDisplay=function(e){n.setState({visible:!n.state.visible}),n.child.prepareForRender()},n.showTooltips=function(e){n.setState({visibleExplanation:!n.state.visibleExplanation})},n.state=(a={input:[],output:[]},Object(E.a)(a,"output",null),Object(E.a)(a,"visible",!1),Object(E.a)(a,"visibleExplanation",!1),a),n}return Object(r.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"Body"},o.a.createElement("div",{className:"Tables"},o.a.createElement(P.a,{primary:!0,circular:!0,className:"Tooltips_button",onClick:this.showTooltips},"How to use"),o.a.createElement(P.a,{secondary:!0,size:"large",className:"GithuButton",circular:!0,onClick:function(){window.open("https://github.com/ionut270/LanguageFormatter"),e.forceUpdate()}},o.a.createElement(g.a,{name:"github",size:"large"})),o.a.createElement(M.a.Pushable,{className:"sidebarWithExplaination"},o.a.createElement(M.a,{as:I.a,animation:"overlay",icon:"labeled",vertical:!0,visible:this.state.visibleExplanation,width:"thick",className:"CenteredContent"},o.a.createElement(I.a,{className:"Explanation"},o.a.createElement("h4",null,"E-NFA to DFA automata convertor"),o.a.createElement("li",null,"The algorithm is based on the one presented in the ",o.a.createElement("a",{href:"https://profs.info.uaic.ro/~otto/LFAC2019-20/lfac3.pdf"},"LFAC-UAIC")," course"),o.a.createElement(R.a,null,"Conditions for proper use :",o.a.createElement("li",null,'The starting simbol is defines by havng "s" in front of the state id and the final one with "f" in front of the state id'),o.a.createElement("li",null,"The first state inside the table should be the starting state"),o.a.createElement("li",null,"Inside the input table only numeric values can be given, each one representing the id of the state which they go to ( ex: q1's id would be 1 )"),o.a.createElement("li",null,"Each id inside the table should have a coresponding state, otherwise an error will pop out"),o.a.createElement("li",null,"As this is an epsilon transitions automata, it needs to have at least, one state going out with \u03b5 otherwise an error will pop out"),o.a.createElement("li",null,'The name and index of each state is automatically generated, when pressing the "+" icon coresponding to the rows of the table')))),o.a.createElement(M.a.Pusher,{className:"InputTableSegment",dimmed:this.state.visibleExplanation},o.a.createElement(m.a,{passTable:this.passTable()}))),o.a.createElement(T.a,{horizontal:!0},o.a.createElement(A.a,{as:"h4"},"Result will appear below")),null!==this.state.inputTable?o.a.createElement(M.a.Pushable,{as:I.a,className:"Sidebaaar"},o.a.createElement(P.a,{className:"SidebarHandler",icon:this.state.visible?"arrow left":"arrow right",primary:!0,circular:!0,onClick:this.handleResultDisplay}),o.a.createElement(M.a,{as:I.a,animation:"overlay",icon:"labeled",vertical:!0,visible:this.state.visible,width:"thick"},o.a.createElement(D,{obj:this.state.output,ref:function(t){e.child=t}})),o.a.createElement(M.a.Pusher,null,o.a.createElement(I.a,{basic:!0},o.a.createElement(f,{out:this.state.output})))):null))}}]),t}(o.a.Component));a.d(t,"default",(function(){return U}));var U=function(e){function t(){var e,a;Object(_.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).state={activeComponent:"Epsilon Transitions"},a.changeActiveComponent=function(e){return function(e){a.setState({activeComponent:e})}},a}return Object(r.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(h,{className:"Header",changeActiveComponent:this.changeActiveComponent()}),"Epsilon Transitions"===this.state.activeComponent?o.a.createElement(L,null):null)}}]),t}(o.a.Component);u.a.render(o.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[202,1,2]]]);
//# sourceMappingURL=main.1d09c175.chunk.js.map