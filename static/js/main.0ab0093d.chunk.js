(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,t,n){"use strict";n.r(t);n(39);var a=n(1),r=n.n(a),o=n(6),i=n.n(o),l=(n(45),n(4)),s=n(10),c=n(11),d=n(13),u=n(12),h=n(14),m=n(5),f=n.n(m),p=n(8),g=n.n(p),b=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},v=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},k=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t},E=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;b(this,e),this.content=t,this.selection={start:n,end:a}}return v(e,[{key:"isContentEmpty",value:function(){return this.content.length<=0}},{key:"getSelection",value:function(){var e=this.selection,t=e.start,n=e.end;return{word:this.content.substring(t,n),start:t,end:n}}},{key:"isSelectionMultiline",value:function(e){return this.getSelection().word.trim().includes("\n")}}],[{key:"equals",value:function(e,t){return 0===e.content.localeCompare(t.content)&&e.selection.start===t.selection.start&&e.selection.end===t.selection.end}},{key:"insertAt",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=t.content.substring(0,a)+n+t.content.substring(r);return o?r=a+n.length:a=r=i.length,new e(i,a,r)}},{key:"toggleBlockStyle",value:function(t,n,a){return e.toggleInlineStyle(t,n+"\n","\n"+a)}},{key:"toggleInlineStyle",value:function(t,n,a){var r=t.selection,o=r.start,i=r.end,l=t.content.substring(0,o),s=t.content.substring(o,i),c=t.content.substring(i),d=l.endsWith(n)&&c.startsWith(a),u=s.startsWith(n)&&s.endsWith(a);return d?(l=l.substring(0,l.length-n.length),c=c.substring(a.length),o-=n.length,i-=n.length):u?(s=s.substring(n.length,s.length-a.length),i-=n.length):(s=n+s+a,o+=n.length,i+=n.length),new e(l+s+c,o,i)}},{key:"toggleMultilineStyle",value:function(t,n,a){var r=t.selection,o=r.start,i=r.end,l=t.content.substring(0,o),s=t.content.substring(o,i),c=t.content.substring(i);if(!t.isSelectionMultiline())return e.toggleInlineStyle(t,n,a);var d=s.split("\n"),u=d.reduce(function(e,t){return e&&t.startsWith(n)&&t.endsWith(a)},!0);return new e(l+(d=d.map(function(e){return u?(i-=n.length,e.substring(n.length,e.length-a.length)):(i+=n.length,n+e+a)})).join("\n")+c,o,i)}},{key:"toggleNumberedStyle",value:function(t){var n=t.selection,a=n.start,r=n.end,o=t.content.substring(0,a),i=t.content.substring(a,r),l=t.content.substring(r);if(!t.isSelectionMultiline())return e.toggleInlineStyle(t,"1. ","");var s=i.split("\n"),c=1,d=s.reduce(function(e,t){var n=c+". ";return++c,e&&t.startsWith(n)},!0);return c=1,new e(o+(s=s.map(function(e){var t=c+". ";return++c,d?(r-=t.length,e.substring(t.length,e.length)):(r+=t.length,t+e)})).join("\n")+l,a,r)}}]),e}(),w=function(e){function t(e){b(this,t);var n=k(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleEditorStateChange=function(e){var t=new E(e.target.value,e.target.selectionStart,e.target.selectionEnd);n.props.onEditorStateChange(t)},n.handleKeyDown=function(e){(e.ctrlKey||e.metaKey)&&n.props.onCommandKeyDown&&n.props.onCommandKeyDown(e)},n.ref=e.forwardRef||g.a.createRef(),n.handleEditorStateChange=n.handleEditorStateChange.bind(n),n.handleKeyDown=n.handleKeyDown.bind(n),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,p["Component"]),v(t,[{key:"componentDidMount",value:function(){this.ref.current.selectionStart=this.props.editorState.selection.start,this.ref.current.selectionEnd=this.props.editorState.selection.end,this.props.autofocus&&this.ref.current.focus()}},{key:"componentDidUpdate",value:function(){this.ref.current.selectionStart=this.props.editorState.selection.start,this.ref.current.selectionEnd=this.props.editorState.selection.end,this.ref.current.focus()}},{key:"shouldComponentUpdate",value:function(e){return!E.equals(this.props.editorState,e.editorState)}},{key:"render",value:function(){return g.a.createElement("textarea",{ref:this.ref,placeholder:this.props.placeholder,value:this.props.editorState.content,onChange:this.handleEditorStateChange,onSelect:this.handleEditorStateChange,onKeyDown:this.handleKeyDown,style:this.props.style,className:this.props.className})}}]),t}();w.propTypes={autofocus:f.a.bool,editorState:f.a.instanceOf(E).isRequired,onCommandKeyDown:f.a.func,onEditorStateChange:f.a.func.isRequired,forwardRef:f.a.oneOfType([f.a.func,f.a.shape({current:f.a.instanceOf(Element)})])};var S=g.a.forwardRef(function(e,t){return g.a.createElement(w,y({},e,{forwardRef:t}))});function C(e){return g.a.createElement("div",{style:e.style,className:e.className,dangerouslySetInnerHTML:{__html:e.markdownRenderFn(e.editorState.content)}})}C.propTypes={editorState:f.a.instanceOf(E).isRequired,markdownRenderFn:f.a.func.isRequired};var j=n(19),N=n(33),O=n.n(N),x=n(34),D=n.n(x),T=n(37),I=n(20),R=function(e){var t=e.name,n=Object(T.a)(e,["name"]);return r.a.createElement(I.a,Object.assign({},n,{icon:Object(I.b)(t)}))},K=function(e){return r.a.createElement(l.b,{className:e.className},e.buttons.map(function(t){return r.a.createElement(l.a,{key:t.octicon,id:t.octicon,color:"link",className:"text-muted",onClick:(n=t.handler,function(t){t.preventDefault();var a=n(e.editorState);e.onClick(a)})},r.a.createElement(R,{name:t.octicon,size:"small",verticalAlign:"middle",ariaLabel:t.title}),r.a.createElement(l.p,{placement:"top",target:t.octicon,delay:{hide:0}},r.a.createElement("small",null,t.title,t.hotkey?" <cmd-".concat(t.hotkey,">"):"")));var n}))},_=n(7),M=n(15),A=n.n(M),W=n(36),P=Object.keys(A.a.name),H=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e))).show=function(){return n.setState({isHidden:!1})},n.hide=function(){return n.setState({isHidden:!0})},n.handleClick=n.handleClick.bind(Object(_.a)(Object(_.a)(n))),n.handleKeyDown=n.handleKeyDown.bind(Object(_.a)(Object(_.a)(n))),n.filtered=[],n.state={isHidden:!1,option:0},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleClick",value:function(e){this.props.onChange("".concat(e.target.value," "))}},{key:"handleKeyDown",value:function(e){var t=this;if(this.state.isHidden||this.filtered.length<1)return null;switch(e.key){case"Escape":e.preventDefault(),this.hide();break;case"Enter":case"Tab":e.preventDefault();var n=this.filtered[this.state.option].char;this.props.onChange("".concat(n," "));break;case"ArrowUp":e.preventDefault(),this.setState(function(e){var n=e.option;return{option:q(n-1,0,t.filtered.length-1)}});break;case"ArrowDown":e.preventDefault(),this.setState(function(e){var n=e.option;return{option:q(n+1,0,t.filtered.length-1)}})}}},{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.handleKeyDown)}},{key:"componentDidUpdate",value:function(e){this.props.filterText!==e.filterText&&this.state.isHidden&&this.show()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.handleKeyDown)}},{key:"render",value:function(){var e=this;return this.filtered=F(this.props.filterText),r.a.createElement(l.h,{role:"listbox",hidden:this.state.isHidden},this.filtered.map(function(t,n){var a=t.name,o=t.char,i=n===e.state.option;return r.a.createElement(l.i,{role:"option",active:i,"aria-selected":i,key:a,value:o,tag:"button",action:!0,onClick:e.handleClick},o," ",a)}))}}]),t}(a.Component),q=function(e,t,n){return e<t?t:e>n?n:e},F=Object(W.a)(function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[],n=0;n<P.length;n++){var a=P[n];if(t.length>=5)break;(a.startsWith(e)||A.a.name[a].tags.some(function(t){return t.startsWith(e)}))&&t.push({name:a,char:A.a.name[a].emoji})}return t}),z=[{title:"Add header text",octicon:"text-size",handler:function(e){return E.toggleInlineStyle(e,"### ","")}},{hotkey:"b",title:"Add bold text",octicon:"bold",handler:function(e){return E.toggleInlineStyle(e,"**","**")}},{hotkey:"i",title:"Add italic text",octicon:"italic",handler:function(e){return E.toggleInlineStyle(e,"_","_")}},{title:"Insert quote",octicon:"quote",handler:function(e){return E.toggleMultilineStyle(e,"> ","")}},{title:"Insert code",octicon:"code",handler:function(e){return e.isSelectionMultiline()?E.toggleBlockStyle(e,"```","```"):E.toggleInlineStyle(e,"`","`")}},{hotkey:"k",title:"Add a link",octicon:"link",handler:function(e){var t=E.toggleInlineStyle(e,"[","](url)");return t.selection.start=t.selection.end+2,t.selection.end+=5,t}},{title:"Add an image",octicon:"file-media",handler:function(e){var t=E.toggleInlineStyle(e,"![","](url)");return t.selection.start=t.selection.end+2,t.selection.end+=5,t}},{title:"Add a bulleted list",octicon:"list-unordered",handler:function(e){return E.toggleMultilineStyle(e,"- ","")}},{title:"Add a numbered list",octicon:"list-ordered",handler:function(e){return E.toggleNumberedStyle(e)}}],L=Object(j.b)(S),U=new Map(z.filter(function(e){return e.hotkey}).map(function(e){return[e.hotkey,e.handler]})),B=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e))).handleEditorStateChange=function(e){n.setState({editorState:e})},n.handleCommandKeyDown=function(e){var t=e.key;U.has(t)&&(e.preventDefault(),setTimeout(function(){var e=U.get(t)(n.state.editorState);n.setState({editorState:e})},0))},n.handleCursorDropdownChange=function(e){var t=e.value,a=e.cursor,r=a.start,o=a.end,i=n.state.editorState.content.substring(0,r)+t+n.state.editorState.content.substring(o),l=new E(i,i.length);n.setState({editorState:l})},n.handleTabClick=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};n.state.activeTab!==e&&n.setState({activeTab:e},t)},n.handleEditorTabClick=function(e){n.handleTabClick("editor",function(){n.editorRef.current.focus()})},n.handlePreviewTabClick=function(e){n.handleTabClick("preview")},n.markdownIt=new O.a({breaks:!0,typographer:!0}),n.markdownIt.use(D.a),n.markdownRenderFn=n.markdownIt.render.bind(n.markdownIt),n.editorRef=r.a.createRef(),n.state={activeTab:"editor",editorState:new E},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(l.c,null,r.a.createElement(l.e,{className:"px-0 pt-2 pb-0 border-bottom-0 bg-light2"},r.a.createElement(l.j,{tabs:!0},r.a.createElement(l.k,{className:"ml-3"},r.a.createElement(l.l,{className:"btn tab-btn",active:"editor"===this.state.activeTab,onClick:this.handleEditorTabClick},r.a.createElement("small",null,"Write"))),r.a.createElement(l.k,{className:"mr-auto"},r.a.createElement(l.l,{className:"btn tab-btn",disabled:this.state.editorState.isContentEmpty(),active:"preview"===this.state.activeTab,onClick:this.handlePreviewTabClick},r.a.createElement("small",null,"Preview"))),r.a.createElement(l.k,{className:"order-first order-md-last mx-3"},r.a.createElement(K,{className:"flex-wrap",buttons:z,editorState:this.state.editorState,onClick:this.handleEditorStateChange})),r.a.createElement("div",{className:"w-100 order-first order-md-last"}))),r.a.createElement(l.d,{className:"p-2"},r.a.createElement(l.n,{activeTab:this.state.activeTab},r.a.createElement(l.o,{tabId:"editor"},r.a.createElement(L,{autofocus:!0,ref:this.editorRef,editorState:this.state.editorState,onEditorStateChange:this.handleEditorStateChange,onCommandKeyDown:this.handleCommandKeyDown,onCursorDropdownChange:this.handleCursorDropdownChange,className:"editor form-control"},r.a.createElement(j.a,{pattern:/^:([\w+-]*)$/,component:H}))),r.a.createElement(l.o,{tabId:"preview"},r.a.createElement(C,{editorState:this.state.editorState,markdownRenderFn:this.markdownRenderFn,className:"preview border-bottom"})))),r.a.createElement(l.d,{className:"px-2 pt-0 pb-2"},r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://commonmark.org/help/",className:"text-muted"},r.a.createElement(R,{name:"markdown",size:"small",verticalAlign:"middle",ariaLabel:"CommonMark help",className:"mr-1"}),r.a.createElement("small",null,"CommonMark Enabled"))))}}]),t}(a.Component),G=function(){return r.a.createElement(l.g,{className:"my-5"},r.a.createElement(l.m,{className:"justify-content-center"},r.a.createElement(l.f,{sm:"12",md:"10",lg:"8"},r.a.createElement("div",{className:"text-center mb-5"},r.a.createElement("h1",{className:"display-4"},"react-mdex"),r.a.createElement("p",{className:"lead"},"An ultralight library for building Markdown editors in React."),r.a.createElement("p",null,r.a.createElement("a",{className:"github-button",href:"https://github.com/danrpts/react-mdex","data-icon":"octicon-star","data-size":"large","aria-label":"Star danrpts/react-mdex on GitHub"},"Star"),r.a.createElement("span",{className:"ml-2"},r.a.createElement("a",{className:"github-button",href:"https://github.com/danrpts/react-mdex/fork","data-icon":"octicon-repo-forked","data-size":"large","aria-label":"Fork danrpts/react-mdex on GitHub"},"Fork")))),r.a.createElement(B,null),r.a.createElement("p",{className:"mt-3 text-center"},r.a.createElement("span",{className:"d-block lead"},"Get Started"),r.a.createElement("small",{className:"text-muted"},"Start drafting a CommonMark document in the demo Editor above. View the rendered document by clicking on the Preview tab. Highlight some text and use the toolbar to auto insert tags around your selection.")),r.a.createElement("hr",null),r.a.createElement("p",{className:"text-center"},r.a.createElement("small",{className:"text-muted"},r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/danrpts/react-mdex/blob/master/src/components/Editor.js"},"Editor"),","," ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/danrpts/react-mdex/blob/master/src/components/Preview.js"},"Preview"),","," ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/danrpts/react-mdex/blob/master/src/models/EditorState.js"},"EditorState"))),r.a.createElement("hr",null),r.a.createElement("p",{className:"text-center"},r.a.createElement("span",{className:"d-block lead"},"Want Dropdowns?"),r.a.createElement("small",{className:"text-muted"},"Type a colon to show an emoji dropdown"," ",r.a.createElement("span",{role:"img","aria-label":"emoji_ok_hand"},"\ud83d\udc4c"),". Keep typing to filter the emoji list, use the up/down arrows to move the highlight, and enter/tab to select. See"," ",r.a.createElement("a",{href:"https://superdan.io/react-cursor-dropdown/"},"react-cursor-dropdown")," ","to enable this on any input.")))))};i.a.render(r.a.createElement(G,null),document.getElementById("root"))},38:function(e,t,n){e.exports=n(114)},39:function(e,t,n){}},[[38,2,1]]]);
//# sourceMappingURL=main.0ab0093d.chunk.js.map